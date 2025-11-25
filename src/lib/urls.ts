/**
 * URL helpers for the ClimateFair blog
 * Supports both traditional /blog routes and new nested /{firstSlash}/{postTitle} routes
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://climatefair.co";

/**
 * Get the canonical URL for the blog (used for SEO, sitemaps, etc.)
 * Points to climatefair.co/blog for production
 */
export const getCanonicalUrl = (path: string = ""): string => {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}/blog${cleanPath}`;
};

/**
 * Get internal href for post links (used in <Link> components)
 * Prefers nested routes /{firstSlash}/{postTitle} when available, falls back to /blog/{slug}
 */
export const getInternalPostHref = (post: { slug: string; firstSlash?: string; postTitle?: string }): string => {
  // Use nested route if both firstSlash and postTitle are available
  if (post.firstSlash && post.postTitle) {
    return `/${post.firstSlash}/${post.postTitle}`;
  }
  // Fallback to traditional blog route
  return `/blog/${post.slug}`;
};

/**
 * Get canonical URL for a specific post
 * Uses nested route as canonical when available
 */
export const getCanonicalPostUrl = (post: { slug: string; firstSlash?: string; postTitle?: string }): string => {
  // Use nested route as canonical if available
  if (post.firstSlash && post.postTitle) {
    return `${SITE_URL}/${post.firstSlash}/${post.postTitle}`;
  }
  // Fallback to traditional blog URL
  return getCanonicalUrl(`/blog/${post.slug}`);
};

/**
 * Get the blog index canonical URL
 */
export const getBlogIndexUrl = (): string => getCanonicalUrl();
