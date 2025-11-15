import { getPostsFromCache, Post } from "@/lib/notion";
import PostCard from "@/components/post-card";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const allPosts = getPostsFromCache();
  // Filter out any Flexbike-related posts
  const posts = allPosts.filter((post) => {
    const titleLower = post.title.toLowerCase();
    const slugLower = post.slug.toLowerCase();
    const contentLower = (post.content || "").toLowerCase();
    const descriptionLower = (post.description || "").toLowerCase();
    
    return (
      !titleLower.includes("flexbike") &&
      !slugLower.includes("flexbike") &&
      !contentLower.includes("flexbike") &&
      !descriptionLower.includes("flexbike")
    );
  });

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <div className="flex justify-center mb-8">
          <Link href="/" className="inline-block">
            <Image
              src="/Logo.png"
              alt="ClimateFair Blog"
              width={200}
              height={60}
              className="h-12 w-auto"
            />
          </Link>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
          ClimateFair
          <br />
          <span className="text-flexbike-teal">Blog</span>
        </h1>

        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Insights, stories, and updates from the climate business community.
          Learn about sourcing, franchising, and funding opportunities in the
          climate sector.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="bg-flexbike-teal text-white px-8 py-3 rounded-lg font-semibold hover:bg-flexbike-teal/90 transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="#posts"
            className="border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Read Posts
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-muted/50 rounded-2xl p-8 md:p-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-flexbike-teal mb-2">5</div>
            <div className="text-muted-foreground">Climate Businesses</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-flexbike-teal mb-2">1</div>
            <div className="text-muted-foreground">Active Franchises</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-flexbike-teal mb-2">$1.1M</div>
            <div className="text-muted-foreground">Funds Raised</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-flexbike-teal mb-2">20</div>
            <div className="text-muted-foreground">Community Members</div>
          </div>
        </div>
      </section>

      {/* Posts Section */}
      <section id="posts">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Latest Posts
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Insights and updates from the climate business community
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <svg
                className="w-16 h-16 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No Posts Yet
            </h3>
            <p className="text-muted-foreground mb-6">
              We're working on some amazing content. Check back soon!
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-flexbike-teal text-white rounded-lg font-semibold hover:bg-flexbike-teal/90 transition-colors"
            >
              Back to Home
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
