import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { PageObjectResponse } from "@notionhq/client/";
import fs from "fs";
import path from "path";

// Export functions that create clients when called (lazy-loaded to ensure env vars are available)
export function getNotionClient() {
  const token = process.env.NOTION_TOKEN || process.env.NOTION_API_KEY;
  if (!token) {
    throw new Error(
      "NOTION_TOKEN or NOTION_API_KEY environment variable is required"
    );
  }
  return new Client({ auth: token });
}

export function getN2MClient() {
  return new NotionToMarkdown({ notionClient: getNotionClient() });
}

// Extract the first image URL from markdown content
function extractFirstImage(content: string): string | null {
  // Match markdown image syntax: ![alt](url) or plain URLs
  const markdownImageRegex = /!\[.*?\]\((.*?)\)/;
  const urlRegex = /(https?:\/\/[^\s]+\.(?:png|jpg|jpeg|gif|webp))/i;

  const markdownMatch = content.match(markdownImageRegex);
  if (markdownMatch) {
    return markdownMatch[1];
  }

  const urlMatch = content.match(urlRegex);
  if (urlMatch) {
    return urlMatch[1];
  }

  return null;
}

// Timing utility for measuring API latency
export function measureApiLatency<T>(
  operation: () => Promise<T>,
  operationName: string
): Promise<T> {
  const startTime = Date.now();
  console.log(`[${operationName}] Starting operation...`);

  return operation().finally(() => {
    const duration = Date.now() - startTime;
    console.log(`[${operationName}] Completed in ${duration}ms`);
  });
}

// Lookup cache for firstSlash/secondSlash routing
interface RouteLookup {
  [key: string]: string; // "firstSlash/secondSlash" -> pageId
}

interface CachedRouteLookup {
  lookup: RouteLookup;
  lastUpdated: number;
  entryCount: number;
}

let routeLookupCache: RouteLookup | null = null;
let routeLookupLastUpdated: number = 0;
const ROUTE_LOOKUP_CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

// Environment detection for caching strategy
const isProduction = process.env.NODE_ENV === 'production' ||
                    process.env.VERCEL_ENV === 'production' ||
                    process.env.VERCEL_ENV === 'preview';

// Vercel Edge Config client (if available)
let edgeConfigClient: any = null;
try {
  if (isProduction && process.env.EDGE_CONFIG) {
    // Dynamic import for Vercel Edge Config
    const { createClient } = require('@vercel/edge-config');
    edgeConfigClient = createClient(process.env.EDGE_CONFIG);
  }
} catch (error) {
  console.log('Vercel Edge Config not available, using file-based cache');
}

async function getCacheFromStorage(): Promise<CachedRouteLookup | null> {
  if (edgeConfigClient && isProduction) {
    try {
      const cacheData = await edgeConfigClient.get('route-lookup-cache');
      return cacheData || null;
    } catch (error) {
      console.error('Error reading from Vercel Edge Config:', error);
      return null;
    }
  } else {
    // File-based cache for development/local
    const cachePath = path.join(process.cwd(), "route-lookup-cache.json");
    if (fs.existsSync(cachePath)) {
      try {
        return JSON.parse(fs.readFileSync(cachePath, "utf-8"));
      } catch (error) {
        console.error("Error reading route lookup cache file:", error);
        return null;
      }
    }
  }
  return null;
}

async function setCacheInStorage(cacheData: CachedRouteLookup): Promise<void> {
  if (edgeConfigClient && isProduction && process.env.EDGE_CONFIG) {
    try {
      // Parse EDGE_CONFIG URL to extract config ID and token
      // Format: https://edge-config.vercel.com/{config-id}?token={access-token}
      const url = new URL(process.env.EDGE_CONFIG);
      const configId = url.pathname.slice(1); // Remove leading slash
      const accessToken = url.searchParams.get('token');

      if (!configId || !accessToken) {
        throw new Error('Invalid EDGE_CONFIG URL format');
      }

      // Use REST API to update Edge Config (since client is read-only)
      const response = await fetch(`https://api.vercel.com/v1/edge-config/${configId}/items`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [{
            key: 'route-lookup-cache',
            value: cacheData,
            description: `Route lookup cache - ${cacheData.entryCount} entries, updated ${new Date(cacheData.lastUpdated).toISOString()}`
          }]
        })
      });

      if (response.ok) {
        console.log('Saved route lookup cache to Vercel Edge Config');
      } else {
        throw new Error(`Edge Config API error: ${response.status}`);
      }
    } catch (error) {
      console.error('Error writing to Vercel Edge Config:', error);
    }
  } else {
    // File-based cache for development/local
    try {
      const cachePath = path.join(process.cwd(), "route-lookup-cache.json");
      fs.writeFileSync(cachePath, JSON.stringify(cacheData, null, 2));
      console.log('Saved route lookup cache to file');
    } catch (error) {
      console.error("Error writing route lookup cache file:", error);
    }
  }
}

export async function getRouteLookupMap(): Promise<RouteLookup> {
  const now = Date.now();

  // Return in-memory cached version if still valid
  if (routeLookupCache && (now - routeLookupLastUpdated) < ROUTE_LOOKUP_CACHE_TTL) {
    return routeLookupCache;
  }

  // Try to load from persistent storage first
  const cachedData = await getCacheFromStorage();
  if (cachedData && (now - cachedData.lastUpdated) < ROUTE_LOOKUP_CACHE_TTL) {
    routeLookupCache = cachedData.lookup;
    routeLookupLastUpdated = cachedData.lastUpdated;
    console.log(`Loaded route lookup from ${isProduction ? 'Vercel KV' : 'file'} cache (${cachedData.entryCount} entries)`);
    return routeLookupCache;
  }

  // Fetch fresh data from Notion
  console.log("Building fresh route lookup map from Notion...");
  const posts = await measureApiLatency(
    () => fetchPublishedPosts(),
    "Fetch published posts for route lookup"
  );

  const lookup: RouteLookup = {};

  for (const post of posts) {
    try {
      const postDetails = await getPostFromNotion(post.id);
      if (postDetails?.firstSlash && postDetails?.secondSlash) {
        const routeKey = `${postDetails.firstSlash}/${postDetails.secondSlash}`;
        lookup[routeKey] = post.id;
      }
    } catch (error) {
      console.error(`Error processing post ${post.id} for route lookup:`, error);
    }
  }

  // Update in-memory cache
  routeLookupCache = lookup;
  routeLookupLastUpdated = now;

  // Save to persistent storage
  const cacheData: CachedRouteLookup = {
    lookup,
    lastUpdated: now,
    entryCount: Object.keys(lookup).length
  };
  await setCacheInStorage(cacheData);

  console.log(`Built fresh route lookup map with ${Object.keys(lookup).length} entries`);
  return lookup;
}

export async function getPostByRoute(firstSlash: string, secondSlash: string): Promise<Post | null> {
  const lookup = await getRouteLookupMap();
  const routeKey = `${firstSlash}/${secondSlash}`;
  const pageId = lookup[routeKey];

  if (!pageId) {
    return null;
  }

  return await measureApiLatency(
    () => getPostFromNotion(pageId),
    `Get post by route ${routeKey}`
  );
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  coverImage?: string;
  description: string;
  date: string;
  content: string;
  author?: string;
  tags?: string[];
  category?: string;
  firstSlash?: string;
  secondSlash?: string;
}

export async function getDatabaseStructure() {
  const notion = getNotionClient();
  const database = await notion.databases.retrieve({
    database_id: process.env.NOTION_DATABASE_ID!,
  });
  return database;
}

export function getWordCount(content: string): number {
  const cleanText = content
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return cleanText.split(" ").length;
}

export function getPostsFromCache(): Post[] {
  const cachePath = path.join(process.cwd(), "posts-cache.json");
  if (fs.existsSync(cachePath)) {
    try {
      const cache = fs.readFileSync(cachePath, "utf-8");
      return JSON.parse(cache);
    } catch (error) {
      console.error("Error reading posts cache:", error);
      return [];
    }
  }
  return [];
}

export async function fetchPublishedPosts() {
  // This function is now intended to be used only by the caching script.
  const notion = getNotionClient();
  const posts = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      and: [
        {
          property: "Status",
          status: {
            equals: "Done",
          },
        },
        {
          property: "Work Tags",
          multi_select: {
            contains: "Published Blog Post",
          },
        },
        {
          property: "Work Tags",
          multi_select: {
            contains: "ClimateFair",
          },
        },
      ],
    },
    sorts: [
      {
        property: "createdAt",
        direction: "descending",
      },
    ],
  });

  return posts.results as PageObjectResponse[];
}

export async function getPost(slug: string): Promise<Post | null> {
  const posts = getPostsFromCache();
  const post = posts.find((p) => p.slug === slug);
  return post || null;
}

export async function getPostFromNotion(pageId: string): Promise<Post | null> {
  try {
    const notion = getNotionClient();
    const n2m = getN2MClient();
    const page = (await notion.pages.retrieve({
      page_id: pageId,
    })) as PageObjectResponse;
    const properties = page.properties as any;

    const mdBlocks = await n2m.pageToMarkdown(pageId);
    const markdownResult = n2m.toMarkdownString(mdBlocks);
    // Handle different return types from toMarkdownString
    const contentString =
      typeof markdownResult === "string"
        ? markdownResult
        : markdownResult?.parent || "";

    // Find the title property - try common names
    let titleProperty = null;
    const titlePropertyNames = ["Project name", "Title", "Name", "Post Title"];

    for (const propName of titlePropertyNames) {
      if (
        properties[propName]?.type === "title" &&
        properties[propName].title?.length > 0
      ) {
        titleProperty = properties[propName];
        break;
      }
    }

    // If no title property found, log available properties for debugging
    if (!titleProperty) {
      console.warn(
        `No title property found for page ${pageId}. Available properties:`,
        Object.keys(properties)
      );
      // Try to find any title-type property
      for (const [key, value] of Object.entries(properties)) {
        if ((value as any)?.type === "title") {
          titleProperty = value;
          console.warn(`Using property "${key}" as title`);
          break;
        }
      }
    }

    const titleText = titleProperty?.title?.[0]?.plain_text || "Untitled";

    // Use Prioritization Note as description if available, otherwise first paragraph
    const prioritizationNote =
      properties["Prioritization Note"]?.rich_text?.[0]?.plain_text || "";
    let description = prioritizationNote;

    if (!description && contentString) {
      // Fallback to first paragraph of content
      const paragraphs =
        typeof contentString === "string"
          ? contentString
              .split("\n")
              .filter((line: string) => line.trim().length > 0)
          : [];
      const firstParagraph = paragraphs[0] || "";
      description =
        firstParagraph.slice(0, 280) +
        (firstParagraph.length > 280 ? "..." : "");
    }
    const post: Post = {
      id: page.id,
      title: titleText,
      slug:
        titleText
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-") // Replace any non-alphanumeric chars with dash
          .replace(/^-+|-+$/g, "") || // Remove leading/trailing dashes
        "untitled",
      coverImage:
        properties["Attach file"]?.files?.[0]?.external?.url ||
        properties["Attach file"]?.files?.[0]?.file?.url ||
        extractFirstImage(contentString) ||
        undefined,
      description,
      date: properties["createdAt"]?.date?.start || new Date().toISOString(),
      content: contentString,
      author:
        properties.createdBy?.name || properties.Assignees?.people[0]?.name,
      tags:
        properties["Work Tags"]?.multi_select?.map((tag: any) => tag.name) ||
        [],
      category: undefined, // No category property
      firstSlash: properties["firstSlash"]?.rich_text?.[0]?.plain_text,
      secondSlash: properties["secondSlash"]?.rich_text?.[0]?.plain_text,
    };

    return post;
  } catch (error) {
    console.error("Error getting post:", error);
    return null;
  }
}
