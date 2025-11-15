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
    };

    return post;
  } catch (error) {
    console.error("Error getting post:", error);
    return null;
  }
}
