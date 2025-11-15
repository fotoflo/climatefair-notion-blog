import Link from "next/link";
import { getPostsFromCache } from "@/lib/notion";
import PostCard from "@/components/post-card";

interface RecentPostsProps {
  /** Number of posts to display (default: 3) */
  limit?: number;
  /** Section title (default: "Latest Insights") */
  title?: string;
  /** Section description */
  description?: string;
  /** Show "View All Posts" link (default: true) */
  showViewAll?: boolean;
  /** Custom className for the section */
  className?: string;
}

export default function RecentPosts({
  limit = 3,
  title = "Latest Insights",
  description = "Stay updated with the latest news, insights, and stories from the climate business community",
  showViewAll = true,
  className = "",
}: RecentPostsProps) {
  const allPosts = getPostsFromCache();
  const recentPosts = allPosts.slice(0, limit);

  if (recentPosts.length === 0) {
    return null;
  }

  return (
    <section className={`space-y-12 ${className}`}>
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
          {title}
        </h2>
        {description && (
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {description}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recentPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {showViewAll && (
        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-flexbike-teal hover:text-flexbike-teal/80 font-semibold transition-colors"
          >
            View All Posts
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      )}
    </section>
  );
}

