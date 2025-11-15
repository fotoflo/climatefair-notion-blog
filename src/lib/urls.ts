/**
 * URL helpers for the ClimateFair blog
 * With basePath: "/blog" and assetPrefix: "/blog-build", all URLs are prefixed accordingly
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
 * With basePath: "/blog", internal links should be relative - Next.js handles the prefix automatically
 */
export const getInternalPostHref = (slug: string): string => {
  return `/blog/${slug}`;
};

/**
 * Get canonical URL for a specific post
 */
export const getCanonicalPostUrl = (slug: string): string =>
  getCanonicalUrl(`/blog/${slug}`);

/**
 * Get the blog index canonical URL
 */
export const getBlogIndexUrl = (): string => getCanonicalUrl();
