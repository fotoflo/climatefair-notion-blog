// Load environment variables from .env.local manually
import fs from "fs";
import path from "path";

const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  envContent.split("\n").forEach((line) => {
    // Skip comments and empty lines
    const trimmedLine = line.trim();
    if (!trimmedLine || trimmedLine.startsWith("#")) {
      return;
    }

    const [key, ...valueParts] = trimmedLine.split("=");
    if (key && valueParts.length > 0) {
      let value = valueParts.join("=").trim();
      // Remove surrounding quotes (single or double)
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      process.env[key.trim()] = value;
    }
  });
}

async function cachePosts() {
  try {
    // Dynamically import notion functions after env vars are loaded
    const { fetchPublishedPosts, getPostFromNotion } = await import(
      "../src/lib/notion"
    );

    console.log("Fetching posts from Notion...");
    const token = process.env.NOTION_TOKEN || process.env.NOTION_API_KEY;
    const databaseId = process.env.NOTION_DATABASE_ID;

    if (!token) {
      throw new Error(
        "NOTION_TOKEN or NOTION_API_KEY is not set in .env.local"
      );
    }
    if (!databaseId) {
      throw new Error("NOTION_DATABASE_ID is not set in .env.local");
    }

    console.log("Database ID:", databaseId);
    console.log("Token (first 10 chars):", token.substring(0, 10) + "...");

    const posts = await fetchPublishedPosts();

    const allPosts = [];

    for (const post of posts) {
      const postDetails = await getPostFromNotion(post.id);
      if (postDetails) {
        allPosts.push(postDetails);
      }
    }

    const cachePath = path.join(process.cwd(), "posts-cache.json");
    fs.writeFileSync(cachePath, JSON.stringify(allPosts, null, 2));

    console.log(`Successfully cached ${allPosts.length} posts.`);

    // Also build the route lookup cache
    console.log("Building route lookup cache...");
    const { getRouteLookupMap } = await import("../src/lib/notion");
    await getRouteLookupMap(true); // Force fresh build
    console.log("Route lookup cache built.");
  } catch (error: any) {
    console.error("\n❌ Error caching posts:");
    console.error(error.message || error);

    if (error.code === "unauthorized") {
      console.error("\n💡 Troubleshooting tips:");
      console.error(
        "1. Check that your NOTION_TOKEN in .env.local doesn't have quotes around it"
      );
      console.error(
        "2. Verify the token is correct in Notion: https://www.notion.so/my-integrations"
      );
      console.error("3. Make sure the integration has access to the database:");
      console.error("   - Open the database in Notion");
      console.error(
        "   - Click '...' menu → 'Connections' → Add your integration"
      );
      console.error(
        "4. Verify the database ID is correct:",
        process.env.NOTION_DATABASE_ID
      );
    } else if (error.code === "object_not_found") {
      console.error("\n💡 Troubleshooting tips:");
      console.error("1. Verify the NOTION_DATABASE_ID is correct");
      console.error("2. Make sure the integration has access to the database");
      console.error(
        "3. Check that the database exists in the same workspace as the integration"
      );
    }

    process.exit(1);
  }
}

cachePosts();
