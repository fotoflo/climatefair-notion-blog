// Load environment variables from .env.local manually
import fs from "fs";
import path from "path";

const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  envContent.split("\n").forEach((line) => {
    const [key, ...valueParts] = line.split("=");
    if (key && valueParts.length > 0) {
      const value = valueParts.join("=").trim();
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
    console.log("Notion API Key:", process.env.NOTION_TOKEN);
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
  } catch (error) {
    console.error("Error caching posts:", error);
    process.exit(1);
  }
}

cachePosts();
