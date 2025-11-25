import { getPostsFromCache, Post } from "@/lib/notion";
import { getCanonicalUrl, getCanonicalPostUrl, getBlogIndexUrl } from "@/lib/urls";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPostsFromCache();
  const postUrls = posts.map((post: Post) => ({
    url: getCanonicalPostUrl(post),
    lastModified: new Date(post.date),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: getBlogIndexUrl(),
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    ...postUrls,
  ];
}
