import { getPostsFromCache, getWordCount } from "@/lib/notion";
import { format } from "date-fns";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import { ResolvingMetadata } from "next";
import { Badge } from "@/components/ui/badge";
import { calculateReadingTime } from "@/lib/utils";
import { getCanonicalPostUrl, getInternalPostHref } from "@/lib/urls";
import { components } from "@/components/mdx-component";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface PostPageProps {
  params: Promise<{ slug: string }>;
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

export async function generateMetadata(
  { params }: PostPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const posts = getPostsFromCache();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  // Try to get OG image: cover image -> first image in content -> default
  const firstContentImage = post.content
    ? extractFirstImage(post.content)
    : null;
  const ogImage =
    post.coverImage ||
    firstContentImage ||
    `${process.env.NEXT_PUBLIC_SITE_URL}/assets/beach-scene.png`;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: getCanonicalPostUrl(post),
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: getCanonicalPostUrl(post),
      publishedTime: new Date(post.date).toISOString(),
      authors: post.author ? [post.author] : [],
      tags: post.tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [
        {
          url: ogImage,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const posts = getPostsFromCache();
  const post = posts.find((p) => p.slug === slug);
  const wordCount = post?.content ? getWordCount(post.content) : 0;

  if (!post) {
    notFound();
  }

  // If post has nested routing, redirect to canonical URL
  if (post.firstSlash && post.postTitle) {
    redirect(getInternalPostHref(post));
  }

  // Use the same OG image logic for structured data
  const firstContentImage = post.content
    ? extractFirstImage(post.content)
    : null;
  const jsonLdImage =
    post.coverImage ||
    firstContentImage ||
    `${process.env.NEXT_PUBLIC_SITE_URL}/assets/beach-scene.png`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: jsonLdImage,
    datePublished: new Date(post.date).toISOString(),
    author: {
      "@type": "Person",
      name: post.author || "ClimateFair Team",
    },
    publisher: {
      "@type": "Organization",
      name: "ClimateFair",
      logo: {
        "@type": "ImageObject",
        url: `/Logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": getCanonicalPostUrl(post.slug),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-3xl mx-auto prose dark:prose-invert">
        {post.coverImage && (
          <div className="relative aspect-video w-full mb-8 rounded-lg overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <header className="mb-8">
          <div className="flex items-center gap-4 text-muted-foreground mb-4">
            <time>{format(new Date(post.date), "MMMM d, yyyy")}</time>
            {post.author && <span>By {post.author}</span>}
            <span>{calculateReadingTime(wordCount)}</span>
            <span>{wordCount} words</span>
          </div>

          <h1 className="text-4xl font-bold mb-4 text-foreground">
            {post.title}
          </h1>

          <div className="flex gap-4 mb-4">
            {post.category && (
              <Badge variant="secondary">{post.category}</Badge>
            )}
            {post.tags &&
              post.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
          </div>
        </header>

        <div className="max-w-none">
          <ReactMarkdown
            components={components}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </>
  );
}
