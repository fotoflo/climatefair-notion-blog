# Flexbike Blog - Agent Documentation

## 📋 Project Overview

The Flexbike Blog is a professional travel and adventure blog built with Next.js 15, powered by Notion as a CMS. This blog showcases motorbike rental stories, travel tips, and motorcycle adventures from the Flexbike community.

**Repository**: https://github.com/fotoflo/flexbike-notion-blog
**Tech Stack**: Next.js 15, TypeScript, Tailwind CSS, Notion API, pnpm

## 🎯 Implementation Summary

### Phase 1: Initial Setup & Integration
- ✅ Configured Next.js 15 with App Router
- ✅ Set up Notion API integration with proper authentication
- ✅ Implemented post caching system (`posts-cache.json`)
- ✅ Configured environment variables and database connections
- ✅ Set up TypeScript interfaces for type safety

### Phase 2: Flexbike Branding Implementation
- ✅ **Color System**: Implemented #39A6A9 (Flexbike Teal) throughout
- ✅ **Typography**: Integrated Nunito font family (Google Fonts + Local fallbacks)
- ✅ **Logo Integration**: Added Flexbike logos and branding assets
- ✅ **Dark Mode**: Complete theme support with proper color variables
- ✅ **Navigation**: Professional header with integrated Flexbike links

### Phase 3: Content & UX Enhancements
- ✅ **Post Cards**: Enhanced design with longer descriptions (280 chars, 4 lines)
- ✅ **Markdown Cleaning**: Removed unwanted formatting from titles
- ✅ **Image Optimization**: Notion S3 asset support with Next.js Image
- ✅ **SEO Optimization**: Open Graph, Twitter cards, meta tags
- ✅ **Responsive Design**: Mobile-first approach with backdrop blur effects

### Phase 4: Navigation & Footer
- ✅ **Smart Links**: Proper routing to Flexbike app and business pages
- ✅ **App Store Integration**: Official download links for iOS/Android
- ✅ **Footer Structure**: Company links, legal pages, social media
- ✅ **Cross-linking**: Seamless navigation between blog and main site

## 🏗️ Technical Architecture

### Core Technologies
```json
{
  "framework": "Next.js 15.0.3",
  "language": "TypeScript",
  "styling": "Tailwind CSS 4.0",
  "cms": "Notion API",
  "packageManager": "pnpm",
  "deployment": "Ready for Vercel/Netlify"
}
```

### Key Dependencies
- `@notionhq/client`: Notion API integration
- `notion-to-md`: Markdown conversion
- `next/font`: Font optimization
- `date-fns`: Date formatting
- `lucide-react`: Icons
- `react-markdown`: Content rendering

### File Structure
```
src/
├── app/                     # Next.js App Router
│   ├── globals.css         # Tailwind config + Flexbike styles
│   ├── layout.tsx          # Root layout with branding
│   ├── page.tsx            # Home page with hero/stats
│   └── posts/[slug]/       # Dynamic post pages
├── components/             # Reusable UI components
│   ├── layout.tsx          # Navigation & footer
│   ├── post-card.tsx       # Blog post cards
│   ├── theme-toggle.tsx    # Dark mode switcher
│   └── ui/                # shadcn/ui primitives
└── lib/                   # Business logic
    ├── notion.ts          # Notion API functions
    └── utils.ts           # Helper functions

public/
├── fonts/                # Nunito font files
├── logos/                # Flexbike brand assets
└── [other assets]        # App store badges, etc.
```

## 🎨 Design System

### Color Palette
```css
/* Primary Brand Colors */
--flexbike-teal: #39A6A9;
--flexbike-teal-hover: #2d8a8d;    /* Darker shade */
--flexbike-teal-light: #5bb5b8;    /* Lighter shade */

/* Usage */
.text-flexbike-teal { color: var(--flexbike-teal); }
.bg-flexbike-teal { background-color: var(--flexbike-teal); }
.hover\:text-flexbike-teal:hover { color: var(--flexbike-teal); }
```

### Typography
```css
/* Font Stack */
--font-sans: Nunito, var(--font-nunito-local), ui-sans-serif, system-ui, sans-serif;

/* Available Weights */
font-thin: 100;      /* Not included */
font-light: 300;     /* Not included */
font-normal: 400;    /* Google Fonts fallback */
font-medium: 500;    /* Not included */
font-semibold: 600;  /* Local file */
font-bold: 700;      /* Local file */
font-extrabold: 800; /* Local file */
font-black: 900;     /* Local file */
```

### Spacing & Layout
- **Container**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Header Height**: `h-20` (80px) for better logo proportion
- **Card Spacing**: `space-y-16` for major sections
- **Mobile First**: Responsive breakpoints with `sm:`, `md:`, `lg:`

## 🔧 Configuration Details

### Environment Variables
```env
# Required
NOTION_TOKEN=ntn_...                    # Notion integration token
NOTION_DATABASE_ID=239c4096592580...   # Database ID from URL
NEXT_PUBLIC_SITE_URL=http://localhost:3001  # Site URL

# Optional
NODE_ENV=development                    # Environment
```

## 🔧 Notion Setup Guide

### Step 1: Create Your Notion Integration

1. **Go to Notion Integrations**:
   - Visit https://www.notion.com/my-integrations
   - Click "New integration"

2. **Configure Integration**:
   - **Name**: "Flexbike Blog" (or your preferred name)
   - **Type**: "Internal integration" (if creating for your workspace)
   - **Logo**: Upload Flexbike logo (optional)
   - **Associated workspace**: Select your workspace

3. **Set Capabilities**:
   - ✅ Read content
   - ✅ Read user information (to get author names)
   - ❌ Update content (not needed)
   - ❌ Insert content (not needed)

4. **Save and Copy Token**:
   - Save the integration
   - Copy the "Internal Integration Token" (starts with `ntn_...`)
   - Store this securely - you'll need it as `NOTION_TOKEN`

### Step 2: Create the Blog Database

1. **Create New Database**:
   - In Notion, create a new page
   - Choose "Database" → "Table view"

2. **Configure Database Properties**:

   **Required Properties**:
   - `Project name` (Title) - Internal Notion organization (e.g., "Post-123")
   - `post-title` (Text) - Blog post display title (what users see)
   - `Status` (Status) - Must include "Done" option for published posts
   - `Work Tags` (Multi-select) - Must include "Published Blog Post" and "ClimateFair"

   **Optional but Recommended Properties**:
   - `End date` (Date) - Publication date (preferred over Start date)
   - `Start date` (Date) - Fallback publication date
   - `Prioritization Note` (Text) - Post description/excerpt (280 chars recommended)
   - `Attach file` (Files) - Cover images for posts
   - `Assignees` (People) - Post authors
   - `createdBy` (People) - Alternative author source
   - `firstSlash` (Text) - First part of nested URL path (e.g., "success-stories", "solutions", "events")
   - `post-title` (Text) - Post title for URL slug (automatically slugified, e.g., "urban-composting-initiative")

3. **Database Template**:
   ```
   Project name: [Internal Notion Title - e.g., "Post-123"]
   post-title: [Blog Post Display Title - e.g., "Urban Composting Initiative"]
   Status: Done ✅
   Work Tags: Published Blog Post, ClimateFair, [Category Tags]
   createdAt: [Publication Date]
   Prioritization Note: [Brief description, max 280 chars]
   Attach file: [Cover image]
   Assignees: [Author name]
   firstSlash: [URL category - e.g., "success-stories"]
   ```

### Step 3: Share Database with Integration

1. **Open Database Share Menu**:
   - Click the "Share" button in the top-right
   - Click "Invite"

2. **Invite the Integration**:
   - Search for your integration name (e.g., "Flexbike Blog")
   - Select it and give it "Can edit" permissions
   - Save

3. **Get Database ID**:
   - Copy the database URL from your browser
   - The ID is the long string between the last `/` and `?`
   - Example: `https://www.notion.so/workspace/239c4096592580d8a9b8c0f5b8c5?v=...`
   - Database ID: `239c4096592580d8a9b8c0f5b8c5`

### Step 4: Environment Configuration

Create a `.env.local` file in your project root:

```env
# Notion Configuration
NOTION_TOKEN=ntn_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=239c4096592580d8a9b8c0f5b8c5

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3001
```

### Step 5: Content Creation Workflow

**For Each Blog Post**:

1. **Create New Entry**:
   - Add new row in your Notion database

2. **Fill Required Fields**:
   - `Project name`: Your blog post title (supports markdown formatting)
   - `Status`: Set to "Done" when ready to publish
   - `Work Tags`: Add "Published Blog Post" plus any category tags

3. **Add Content**:
   - Write your post content in the main content area using Notion's editor
   - Use headings, lists, images, links, etc. - all supported!

4. **Optional Enhancements**:
   - `End date`: Set publication date (defaults to today)
   - `Prioritization Note`: Add excerpt/description
   - `Attach file`: Upload cover image
   - `Assignees`: Set author

5. **Publish**:
   - Ensure Status = "Done"
   - Ensure "Published Blog Post" tag is present
   - Run `pnpm run cache:posts` to update the blog

### Database Schema Reference

```typescript
interface NotionPage {
  "Project name": { title: [{ plain_text: string }] };           // Blog title
  "Status": { status: { name: string } };                       // Must be "Done"
  "Work Tags": { multi_select: [{ name: string }] };           // Must include "Published Blog Post"
  "End date": { date: { start: string } };                      // Publication date
  "Start date": { date: { start: string } };                   // Fallback date
  "Prioritization Note": { rich_text: [{ plain_text: string }] }; // Description
  "Attach file": { files: [{ external?: { url: string }, file?: { url: string } }] }; // Cover image
  "createdBy": { people: [{ name: string }] };                 // Author
  "Assignees": { people: [{ name: string }] };                 // Alternative author
  "firstSlash": { rich_text: [{ plain_text: string }] };       // First URL segment
  "post-title": { rich_text: [{ plain_text: string }] };      // Post title (auto-slugified)
}
```

### Content Formatting Best Practices

**Supported Notion Features**:
- ✅ **Text Formatting**: Bold, italic, strikethrough, inline code
- ✅ **Headings**: H1, H2, H3 (H1 becomes title, others render normally)
- ✅ **Lists**: Bulleted and numbered lists
- ✅ **Links**: Internal and external links
- ✅ **Images**: Inline images and cover images
- ✅ **Code Blocks**: Syntax highlighting supported
- ✅ **Tables**: Render as markdown tables
- ✅ **Quotes**: Blockquotes
- ✅ **Dividers**: Horizontal rules

**Content Writing Tips**:

1. **Titles**: Fill `post-title` with readable titles under 60 characters for SEO
2. **Project names**: Use `Project name` for internal organization (e.g., "Post-123")
3. **Descriptions**: Write compelling 150-280 character summaries in `Prioritization Note`
4. **Headings**: Use H2, H3 for structure (H1 reserved for title)
5. **Images**: Upload high-quality images, add alt text in Notion
6. **Links**: Use descriptive link text, not "click here"
7. **Code**: Use code blocks with language specification

**Example Post Structure**:
```
Project name: Post-001 (internal organization)
post-title: Urban Composting Initiative (display title)
firstSlash: success-stories
Status: Done ✅
Work Tags: Published Blog Post, ClimateFair

# Urban Composting Initiative

Brief description in Prioritization Note field...

## Introduction

Your opening paragraph...

## Main Content Section

- Point 1
- Point 2

### Subsection

More detailed content...

## Conclusion

Wrap up your thoughts...
```

### Post Mapping Logic
```typescript
// Title: Clean markdown from "Project name"
title: cleanMarkdown(properties["Project name"].title[0]?.plain_text)

// Status: Must be "Done"
filter: { property: "Status", status: { equals: "Done" } }

// Tags: Must include "Published Blog Post"
filter: { property: "Work Tags", multi_select: { contains: "Published Blog Post" } }

// Date: End date preferred, fallback to Start date
date: properties["End date"]?.date?.start || properties["Start date"]?.date?.start

// Author: createdBy preferred, fallback to Assignees
author: properties.createdBy?.name || properties.Assignees?.people[0]?.name
```

## 🚀 Development Workflow

### Local Development
```bash
# Install dependencies
pnpm install

# Set up environment
cp .env.example .env.local  # Edit with your tokens

# Generate post cache
pnpm run cache:posts

# Start development server
pnpm dev  # Runs on port 3001
```

### Content Publishing
```bash
# Add/edit posts in Notion database
# Set Status = "Done"
# Add "Published Blog Post" tag
# Run cache regeneration
pnpm run cache:posts
```

### Building for Production
```bash
# Build with fresh cache
pnpm run cache:posts && pnpm build

# Preview production build
pnpm start
```

## 🚀 Deployment Guide

### Vercel Deployment (Recommended)

1. **Connect Repository**:
   - Go to vercel.com and sign in
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Build Settings**:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `pnpm run cache:posts && next build`
   - **Output Directory**: `.next` (automatic)

3. **Environment Variables**:
   Add these in Vercel dashboard:
   ```
   NOTION_TOKEN=ntn_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   NOTION_DATABASE_ID=239c4096592580d8a9b8c0f5b8c5
   NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
   NEXT_PUBLIC_GOOGLE_GTAG_ID=G-XXXXXXXXXX  # Optional
   ```

4. **Domain Setup**:
   - Vercel will provide a `.vercel.app` domain
   - Add custom domain if needed
   - Update `NEXT_PUBLIC_SITE_URL` accordingly

5. **Deploy**:
   - Push to main branch or deploy manually
   - Vercel automatically runs `pnpm run cache:posts` before build

### Manual Deployment

```bash
# 1. Build locally
pnpm run cache:posts && pnpm build

# 2. Test production build
pnpm start

# 3. Deploy to your hosting provider
# Copy .next folder and public folder to your server
```

### Content Updates After Deployment

```bash
# After adding new posts in Notion:
pnpm run cache:posts  # Updates posts-cache.json

# For Vercel: Push changes to trigger redeploy
git add posts-cache.json
git commit -m "Update blog posts cache"
git push

# Vercel will automatically rebuild with fresh content
```

### Route Cache Management

**Automatic Cache Refresh**:
The route lookup cache is automatically refreshed when:
- Cache TTL (7 days) expires
- Manual refresh via API call
- Server restart

**Manual Cache Refresh**:
```bash
# Refresh route lookup cache
pnpm run cache:routes

# Or call the API directly
curl -X GET https://your-domain.vercel.app/api/cache
```

**Vercel Cron Setup** (Paid Plan Required):
1. Go to Vercel Dashboard → Project Settings → Functions
2. Add a cron job:
   - Path: `/api/cache`
   - Schedule: `0 0 * * 1` (weekly on Mondays)
   - Method: `GET`

**Cache Storage**:
- **Development/Local**: File-based cache (`posts-cache.json`, `route-lookup-cache.json`)
- **Production/Staging (Vercel)**: Vercel KV persistent storage (if available) or file-based fallback
- **Cache TTL**: 7 days with automatic refresh capability

**Vercel Edge Config Setup** (Recommended for Production):
1. Create Edge Config in Vercel Dashboard: Project Settings → Edge Config
2. Get your Edge Config ID and access token
3. Set environment variables:
   ```
   EDGE_CONFIG=https://edge-config.vercel.com/your-edge-config-id?token=your-token
   EDGE_CONFIG_ACCESS_TOKEN=your-access-token
   EDGE_CONFIG_ID=your-edge-config-id
   ```
4. Cache persists globally with low-latency reads
5. Multiple instances share the same cache

## 📚 Component API Reference

### Core UI Components

#### Card System

**Card Component Family**
```typescript
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

// Basic usage
<Card className="w-full max-w-md">
  <CardHeader>
    <CardTitle>Post Title</CardTitle>
    <CardDescription>Brief description of the post</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Main content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Read More</Button>
  </CardFooter>
</Card>
```

**Props:**
- `Card`: `React.ComponentProps<"div">` - Standard div props
- `CardHeader`: `React.ComponentProps<"div">` - Header container
- `CardTitle`: `React.ComponentProps<"div">` - Title with font-semibold
- `CardDescription`: `React.ComponentProps<"div">` - Description with muted text
- `CardContent`: `React.ComponentProps<"div">` - Main content area
- `CardFooter`: `React.ComponentProps<"div">` - Footer with flex layout

#### Button Component

**Variants and Sizes**
```typescript
import { Button } from "@/components/ui/button"

// Variants
<Button variant="default">Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>

// With icons
<Button>
  <Download className="w-4 h-4" />
  Download
</Button>

// As child component
<Button asChild>
  <Link href="/posts">View Posts</Link>
</Button>
```

**Props:**
- `variant`: `"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"`
- `size`: `"default" | "sm" | "lg" | "icon"`
- `asChild`: `boolean` - Render as child component using Radix Slot
- All standard button props: `onClick`, `disabled`, `type`, etc.

#### PostCard Component

**Main Blog Post Display**
```typescript
import PostCard from "@/components/post-card"

// Usage in blog listing
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {posts.map((post) => (
    <PostCard key={post.id} post={post} />
  ))}
</div>
```

**Props:**
```typescript
interface PostCardProps {
  post: Post; // See Post interface in notion.ts
}
```

**Features:**
- Responsive card design with hover effects
- Automatic image optimization
- Reading time calculation
- Clean markdown title processing
- Tag display with badges
- Author attribution
- Date formatting

#### Layout Component

**Main App Layout**
```typescript
import Layout from "@/components/layout"

// Automatically wraps children with header/footer
<Layout>
  <main>{children}</main>
</Layout>
```

**Features:**
- Responsive navigation header
- Footer with company links and app store badges
- Google Analytics tracking integration
- Theme-aware styling
- Mobile-first responsive design

#### Theme Components

**ThemeProvider**
```typescript
import { ThemeProvider } from "@/components/theme-provider"

// Wrap entire app
<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange
>
  <App />
</ThemeProvider>
```

**Theme Toggle**
```typescript
import { ModeToggle } from "@/components/mode-toggle"

// Add to header/navigation
<header>
  <ModeToggle />
</header>
```

### Custom Hooks

#### useGoogleAnalytics

**Analytics Tracking Hook**
```typescript
import { useGoogleAnalytics } from "@/hooks/use-google-analytics"

function MyComponent() {
  const { trackEvent, trackNavigation } = useGoogleAnalytics()

  const handleClick = () => {
    trackEvent("button_click", {
      button_name: "cta_button",
      page: "homepage"
    })
  }

  const handleNavClick = () => {
    trackNavigation("About Us", "/about")
  }

  return (
    <div>
      <button onClick={handleClick}>Click me</button>
      <a href="/about" onClick={() => handleNavClick("About Us", "/about")}>
        About
      </a>
    </div>
  )
}
```

**Methods:**
- `trackEvent(eventName, parameters?)` - Track custom events
- `trackNavigation(linkText, href, category?)` - Track navigation clicks

#### useMobile

**Responsive Hook**
```typescript
import { useMobile } from "@/hooks/use-mobile"

function ResponsiveComponent() {
  const isMobile = useMobile()

  return (
    <div>
      {isMobile ? (
        <MobileLayout />
      ) : (
        <DesktopLayout />
      )}
    </div>
  )
}
```

**Returns:** `boolean` - True if screen width < 768px

## 🔧 API Reference

### Notion Integration (`lib/notion.ts`)

#### Core Functions

**getPostsFromCache()**
```typescript
function getPostsFromCache(): Post[]
```
- **Purpose**: Retrieve cached blog posts from `posts-cache.json`
- **Returns**: Array of Post objects
- **Usage**: Used in components to display blog posts without API calls
- **Performance**: Fast, no network requests

**getPost(slug: string)**
```typescript
async function getPost(slug: string): Promise<Post | null>
```
- **Purpose**: Get a single post by slug from cache
- **Parameters**: `slug` - URL slug of the post
- **Returns**: Post object or null if not found
- **Usage**: Used in dynamic post pages

**getPostFromNotion(pageId: string)**
```typescript
async function getPostFromNotion(pageId: string): Promise<Post | null>
```
- **Purpose**: Fetch and transform a Notion page into a Post object
- **Parameters**: `pageId` - Notion page ID
- **Returns**: Transformed Post object
- **Usage**: Internal function used by caching script

**fetchPublishedPosts()**
```typescript
async function fetchPublishedPosts(): Promise<PageObjectResponse[]>
```
- **Purpose**: Query Notion database for published posts
- **Filters**:
  - Status = "Done"
  - "Published Blog Post" tag present
- **Sorts**: By "End date" descending
- **Returns**: Raw Notion page objects

#### Utility Functions

**getWordCount(content: string)**
```typescript
function getWordCount(content: string): number
```
- **Purpose**: Count words in markdown content
- **Processing**: Removes markdown syntax, normalizes whitespace
- **Returns**: Word count number

**extractFirstImage(content: string)**
```typescript
function extractFirstImage(content: string): string | null
```
- **Purpose**: Extract first image URL from markdown content
- **Supports**: Markdown syntax `![alt](url)` and plain URLs
- **Returns**: Image URL or null

### URL Helpers (`lib/urls.ts`)

**URL Construction Functions**
```typescript
// Canonical URLs (for SEO/metadata)
getCanonicalUrl(path?: string): string
getCanonicalPostUrl(slug: string): string
getBlogIndexUrl(): string

// Internal links (for Next.js routing)
getInternalPostHref(slug: string): string
```

**Usage Examples:**
```typescript
import { getCanonicalPostUrl, getInternalPostHref } from "@/lib/urls"

// In metadata generation
const canonicalUrl = getCanonicalPostUrl("my-blog-post")
// Returns: "https://flexbike.app/blog/my-blog-post"

// In component links
<Link href={getInternalPostHref("my-blog-post")}>Read More</Link>
// Returns: "/blog/my-blog-post"
```

### Utility Functions (`lib/utils.ts`)

**cn() - Class Name Merger**
```typescript
function cn(...inputs: ClassValue[]): string
```
- **Purpose**: Merge Tailwind classes with clsx and tailwind-merge
- **Benefits**: Handles conflicting classes, removes duplicates
- **Usage**:
```typescript
import { cn } from "@/lib/utils"

const className = cn(
  "base-class",
  condition && "conditional-class",
  "always-applied"
)
```

**calculateReadingTime(wordCount: number)**
```typescript
function calculateReadingTime(wordCount: number): string
```
- **Formula**: `Math.ceil(wordCount / 225) + " min read"`
- **Assumption**: 225 words per minute (average adult reading speed)
- **Returns**: Formatted string like "5 min read"

### Type Definitions

**Post Interface**
```typescript
interface Post {
  id: string;              // Notion page ID
  title: string;           // Cleaned title from Project name
  slug: string;            // URL-friendly slug
  coverImage?: string;     // Cover image URL
  description: string;     // Excerpt/description
  date: string;            // ISO date string
  content: string;         // Full markdown content
  author?: string;         // Author name
  tags?: string[];         // Tag array
  category?: string;       // Optional category
}
```

**Notion Database Schema**
```typescript
interface NotionPage {
  "Project name": { title: [{ plain_text: string }] };
  "Status": { status: { name: string } };
  "Work Tags": { multi_select: [{ name: string }] };
  "End date": { date: { start: string } };
  "Start date": { date: { start: string } };
  "Prioritization Note": { rich_text: [{ plain_text: string }] };
  "Attach file": { files: [{ external?: { url: string }, file?: { url: string } }] };
  "createdBy": { people: [{ name: string }] };
  "Assignees": { people: [{ name: string }] };
}
```

### MDX Components (`components/mdx-component.tsx`)

**Custom Markdown Components**
```typescript
// Available components for markdown rendering
const components = {
  h1: (props) => <h1 className="text-3xl font-bold mb-4" {...props} />,
  h2: (props) => <h2 className="text-2xl font-semibold mb-3" {...props} />,
  h3: (props) => <h3 className="text-xl font-medium mb-2" {...props} />,
  p: (props) => <p className="mb-4 leading-relaxed" {...props} />,
  a: (props) => <a className="text-blue-600 hover:text-blue-800 underline" {...props} />,
  ul: (props) => <ul className="mb-4 ml-6 list-disc" {...props} />,
  ol: (props) => <ol className="mb-4 ml-6 list-decimal" {...props} />,
  li: (props) => <li className="mb-2" {...props} />,
  blockquote: (props) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4" {...props} />
  ),
  code: CodeBlock, // Syntax highlighting component
  pre: (props) => <pre className="bg-gray-100 p-4 rounded overflow-x-auto" {...props} />,
  // ... more components
}
```

## 🔒 Security Guide

### Environment Variables & Secrets

**Never Commit Secrets**
```bash
# ❌ WRONG - Never commit these
.env.local
.env.production
.env.staging

# ✅ CORRECT - Only commit example files
.env.example
.env.local.example
```

**Required Environment Variables**
```env
# Notion API (Required)
NOTION_TOKEN=ntn_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=239c4096592580d8a9b8c0f5b8c5

# Site Configuration (Required)
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Analytics (Optional)
NEXT_PUBLIC_GOOGLE_GTAG_ID=G-XXXXXXXXXX
```

**Security Best Practices**
- Store secrets in environment variables, never in code
- Use different tokens for development/staging/production
- Rotate API keys regularly
- Use Vercel environment variables for production deployments

### API Security

**Notion Integration Security**
- ✅ **Read-only access**: Integration only needs read permissions
- ✅ **Database-level access**: Scoped to specific database only
- ✅ **Token rotation**: Regenerate tokens when team members leave
- ❌ **Never share tokens**: Keep tokens confidential

**Rate Limiting Considerations**
- Notion API has rate limits (3 requests/second per integration)
- Caching system reduces API calls significantly
- Build failures trigger cache regeneration (acceptable for content updates)

### Content Security

**Markdown Sanitization**
```typescript
// Content is rendered with react-markdown + rehype-raw
// Be cautious with user-generated content
<ReactMarkdown
  components={components}
  remarkPlugins={[remarkGfm]}
  rehypePlugins={[rehypeRaw]} // Allows HTML - use carefully
>
  {post.content}
</ReactMarkdown>
```

**Image Security**
- Only allow images from trusted domains (Notion S3, approved CDNs)
- Next.js Image component provides automatic optimization
- Consider implementing image allowlists for additional security

### Data Validation

**Input Validation**
```typescript
// Always validate data from external sources
function validatePost(post: any): Post {
  if (!post.id || !post.title) {
    throw new Error("Invalid post data");
  }
  return post as Post;
}
```

**Type Safety**
- Use TypeScript interfaces for all data structures
- Validate Notion API responses before processing
- Handle missing or malformed data gracefully

### Authentication & Authorization

**Current Security Model**
- No user authentication (public blog)
- Content management through Notion (team access controlled)
- API keys provide access to specific databases

**Future Considerations**
- If adding user features: Implement proper authentication
- Use HTTPS everywhere
- Consider CSRF protection for forms
- Implement proper session management

### Deployment Security

**Vercel Security Features**
- Automatic HTTPS certificates
- DDoS protection
- Web Application Firewall (WAF)
- Regular security updates

**Environment Isolation**
```javascript
// vercel.json environment configuration
{
  "env": {
    "NOTION_TOKEN": "@notion-token-production",
    "NOTION_DATABASE_ID": "@notion-database-id"
  }
}
```

### Monitoring & Incident Response

**Security Monitoring**
- Monitor for unusual API usage patterns
- Set up alerts for failed deployments
- Regular security audits of dependencies
- Keep packages updated with security patches

**Incident Response**
1. **API Key Compromise**: Immediately rotate Notion tokens
2. **Data Breach**: Assess impact, notify affected parties if needed
3. **DDoS Attack**: Vercel automatically mitigates most attacks
4. **Vulnerability**: Update dependencies, redeploy immediately

### Dependency Security

**Regular Updates**
```bash
# Check for vulnerabilities
pnpm audit

# Update dependencies
pnpm update

# Update Next.js specifically
pnpm add next@latest
```

**Security Headers (Future Enhancement)**
Consider adding security headers for additional protection:
- Content Security Policy (CSP)
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy

### Code Security Best Practices

**Secure Coding Guidelines**
- Avoid `dangerouslySetInnerHTML` unless necessary
- Sanitize all user inputs
- Use parameterized queries (if applicable)
- Implement proper error handling (don't expose internal errors)
- Validate all external API responses

**Code Review Checklist**
- [ ] No secrets committed to version control
- [ ] Environment variables properly configured
- [ ] Input validation implemented
- [ ] Error messages don't expose sensitive information
- [ ] Dependencies are up-to-date and secure

## ⚡ Performance Guide

### Core Web Vitals Monitoring

**Key Metrics to Track**
- **LCP (Largest Contentful Paint)**: <2.5s (good), <4.0s (needs improvement)
- **FID (First Input Delay)**: <100ms (good), <300ms (needs improvement)
- **CLS (Cumulative Layout Shift)**: <0.1 (good), <0.25 (needs improvement)

**Monitoring Tools**
```typescript
// Add to layout.tsx for performance monitoring
useEffect(() => {
  // Report Core Web Vitals
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    getCLS(console.log);
    getFID(console.log);
    getFCP(console.log);
    getLCP(console.log);
    getTTFB(console.log);
  });
}, []);
```

### Performance Optimization Techniques

#### Image Optimization

**Next.js Image Component Usage**
```typescript
// ✅ OPTIMIZED - Always use Next.js Image
<Image
  src={post.coverImage}
  alt={post.title}
  width={800}
  height={450}
  priority={index === 0} // Only for above-the-fold images
  className="rounded-lg"
/>

// ❌ AVOID - Regular img tags
<img src={post.coverImage} alt={post.title} />
```

**Image Configuration (next.config.ts)**
```typescript
// Already configured for optimal performance
images: {
  formats: ['image/avif', 'image/webp'], // Modern formats first
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
}
```

#### Caching Strategy

**Static Generation Benefits**
- Posts cached as JSON (no database queries on requests)
- HTML pre-generated at build time
- Instant loading for users
- Better SEO performance

**Cache Invalidation**
```bash
# Regenerate cache when content changes
pnpm run cache:posts

# Triggers new build on Vercel
git add posts-cache.json
git commit -m "Update blog posts cache"
git push
```

#### Bundle Optimization

**Current Optimizations**
- ✅ Tree shaking enabled
- ✅ Dynamic imports for theme toggle
- ✅ Minimal runtime JavaScript
- ✅ Font optimization with display: swap

**Bundle Analysis**
```bash
# Analyze bundle size
pnpm build
npx @next/bundle-analyzer

# Check for large dependencies
pnpm ls --depth=0
```

### Database Performance

**Notion API Optimization**
```typescript
// ✅ EFFICIENT - Single query with filters
const response = await notion.databases.query({
  database_id: DATABASE_ID,
  filter: {
    and: [
      { property: "Status", status: { equals: "Done" } },
      { property: "Work Tags", multi_select: { contains: "Published Blog Post" } }
    ]
  },
  sorts: [{ property: "End date", direction: "descending" }],
  page_size: 100 // Limit results
});
```

**Caching Benefits**
- Reduces API calls from ~50/request to 0/request
- Faster page loads (<100ms vs ~500ms)
- Lower bandwidth costs
- Better reliability (no API downtime impact)

### Runtime Performance

#### Component Optimization

**React Best Practices**
```typescript
// ✅ GOOD - Memoize expensive calculations
const readingTime = useMemo(() =>
  calculateReadingTime(wordCount), [wordCount]
);

// ✅ GOOD - Avoid unnecessary re-renders
const PostCard = memo(function PostCard({ post }: PostCardProps) {
  return <Card>{/* content */}</Card>;
});
```

**Lazy Loading**
```typescript
// ✅ GOOD - Lazy load heavy components
const ThemeToggle = dynamic(() => import('@/components/theme-toggle'), {
  ssr: false, // Disable SSR for client-only component
});
```

#### Font Loading Optimization

**Current Strategy**
```typescript
// layout.tsx - Optimized font loading
const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap', // Prevents layout shift
  variable: '--font-nunito',
});
```

**Font Display Options**
- `swap`: Shows fallback font, then swaps (no layout shift)
- `fallback`: Brief invisible period, then fallback
- `optional`: Uses fallback if font loading is slow

### Monitoring & Alerting

**Performance Monitoring Setup**
```typescript
// Google Analytics 4 - Automatic Core Web Vitals tracking
// Enabled when NEXT_PUBLIC_GOOGLE_GTAG_ID is set

// Vercel Analytics - Automatic performance monitoring
// Enabled by default on Vercel deployments
```

**Performance Budgets**
```javascript
// next.config.ts - Add performance budgets
module.exports = {
  experimental: {
    webVitals: {
      // Custom performance budgets
      budgets: [
        {
          path: '/',
          budget: {
            LCP: 2500, // 2.5s
            FID: 100,  // 100ms
            CLS: 0.1,  // 0.1
          },
        },
      ],
    },
  },
};
```

### Network Optimization

**HTTP/2 Benefits**
- Multiplexing (multiple requests over single connection)
- Header compression
- Server push capabilities

**CDN Benefits (Vercel)**
- Global edge network
- Automatic caching
- DDoS protection
- SSL termination

### Memory & Bundle Size

**Bundle Size Monitoring**
```bash
# Check bundle size after build
du -sh .next/static

# Analyze with webpack-bundle-analyzer
npm install --save-dev @next/bundle-analyzer
```

**Common Performance Issues**

1. **Large Images**
   - Solution: Use Next.js Image with proper sizing
   - Impact: Can add 2-5s to LCP

2. **Unnecessary Re-renders**
   - Solution: Use React.memo, useMemo, useCallback
   - Impact: Poor interactivity, high CPU usage

3. **Blocking Scripts**
   - Solution: Use dynamic imports, lazy loading
   - Impact: Slows initial page load

4. **Inefficient Caching**
   - Solution: Implement proper cache strategies
   - Impact: Slow API responses, high bandwidth

### Testing Performance

**Performance Testing Checklist**
- [ ] Test on 3G connection (DevTools Network tab)
- [ ] Test on mobile devices
- [ ] Check Core Web Vitals in Search Console
- [ ] Monitor bundle size changes
- [ ] Test with large content (many posts/images)

**Lighthouse Audit Goals**
- Performance: >90
- Accessibility: >90
- Best Practices: >90
- SEO: >90

### Future Performance Enhancements

**Potential Improvements**
- [ ] Implement ISR (Incremental Static Regeneration)
- [ ] Add service worker for caching
- [ ] Implement image lazy loading with blur placeholders
- [ ] Add performance monitoring dashboard
- [ ] Implement CDN for static assets
- [ ] Add compression for API responses

## 🧪 Testing Guide

### Testing Philosophy

**Testing Strategy**
- **Unit Tests**: Test individual functions and components
- **Integration Tests**: Test component interactions and API calls
- **E2E Tests**: Test complete user workflows
- **Performance Tests**: Monitor Core Web Vitals and bundle size

**Current Testing Setup**
- No automated tests currently implemented
- Manual testing via development server
- Vercel preview deployments for integration testing

### Manual Testing Checklist

**Pre-deployment Testing**
```bash
# 1. Local development testing
pnpm dev
# - Test all pages load correctly
# - Test navigation between pages
# - Test theme switching
# - Test responsive design (mobile/desktop)

# 2. Production build testing
pnpm build && pnpm start
# - Test all functionality works in production mode
# - Check for hydration mismatches
# - Verify static generation works

# 3. Content testing
pnpm run cache:posts
# - Verify posts load from cache
# - Test post detail pages
# - Check image loading and optimization
```

**Content Testing Scenarios**
- [ ] New post appears on homepage
- [ ] Post detail page loads correctly
- [ ] Images display properly
- [ ] Markdown renders correctly
- [ ] Author and date display
- [ ] Tags show correctly
- [ ] Reading time calculation accurate

### Future Testing Implementation

**Recommended Testing Stack**
```bash
# Install testing dependencies
pnpm add -D jest @testing-library/react @testing-library/jest-dom
pnpm add -D @testing-library/user-event jest-environment-jsdom
pnpm add -D msw # Mock Service Worker for API testing
```

**Unit Test Examples**
```typescript
// __tests__/lib/utils.test.ts
import { calculateReadingTime, cn } from '@/lib/utils'

describe('calculateReadingTime', () => {
  it('calculates reading time correctly', () => {
    expect(calculateReadingTime(225)).toBe('1 min read')
    expect(calculateReadingTime(450)).toBe('2 min read')
    expect(calculateReadingTime(100)).toBe('1 min read') // Rounds up
  })
})

describe('cn', () => {
  it('merges classes correctly', () => {
    expect(cn('base', 'additional')).toBe('base additional')
    expect(cn('base', false && 'conditional')).toBe('base')
  })
})

// __tests__/lib/notion.test.ts - Routing tests
describe('Route Lookup Cache', () => {
  it('should handle empty route lookup map', async () => {
    // Test basic functionality
  })

  it('should handle invalid routes gracefully', async () => {
    // Test 404 handling
  })
})

describe('Post Mapping', () => {
  it('should include firstSlash and post-title in post object', () => {
    const post = {
      id: 'test-id',
      title: 'Test Post',
      firstSlash: 'success-stories',
      post-title: 'urban-composting',
    }
    expect(post.firstSlash).toBe('success-stories')
    expect(post.post-title).toBe('urban-composting')
  })
})
```

**Component Testing Examples**
```typescript
// __tests__/components/post-card.test.tsx
import { render, screen } from '@testing-library/react'
import PostCard from '@/components/post-card'

const mockPost = {
  id: '1',
  title: 'Test Post',
  slug: 'test-post',
  description: 'Test description',
  date: '2024-01-01',
  content: 'Test content',
  author: 'Test Author'
}

describe('PostCard', () => {
  it('renders post information correctly', () => {
    render(<PostCard post={mockPost} />)

    expect(screen.getByText('Test Post')).toBeInTheDocument()
    expect(screen.getByText('Test description')).toBeInTheDocument()
    expect(screen.getByText('Test Author')).toBeInTheDocument()
  })
})
```

**API Testing Examples**
```typescript
// __tests__/lib/notion.test.ts
import { getPostsFromCache } from '@/lib/notion'
import fs from 'fs'

// Mock filesystem
jest.mock('fs')

describe('getPostsFromCache', () => {
  it('returns parsed posts from cache file', () => {
    const mockPosts = [{ id: '1', title: 'Test' }]
    ;(fs.existsSync as jest.Mock).mockReturnValue(true)
    ;(fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockPosts))

    const posts = getPostsFromCache()
    expect(posts).toEqual(mockPosts)
  })

  it('returns empty array when cache missing', () => {
    ;(fs.existsSync as jest.Mock).mockReturnValue(false)

    const posts = getPostsFromCache()
    expect(posts).toEqual([])
  })
})
```

### Testing Best Practices

**Test Organization**
```
__tests__/
├── components/     # Component tests
├── lib/           # Utility function tests
├── pages/         # Page tests
├── integration/   # Integration tests
└── e2e/          # End-to-end tests
```

**Testing Guidelines**
- Test behavior, not implementation details
- Use descriptive test names
- Keep tests fast and isolated
- Test error conditions and edge cases
- Use meaningful assertions
- Mock external dependencies (APIs, filesystem)

**CI/CD Testing**
```yaml
# .github/workflows/test.yml
name: Test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - run: pnpm install
      - run: pnpm test
      - run: pnpm build
```

## 📏 Code Style Guide

### TypeScript/JavaScript Conventions

**File Naming**
```typescript
// ✅ GOOD
post-card.tsx
notion-api.ts
utils.ts
theme-provider.tsx

// ❌ AVOID
PostCard.tsx
notionAPI.ts
helperFunctions.ts
ThemeProvider.tsx
```

**Component Naming**
```typescript
// ✅ GOOD - PascalCase for components
function PostCard() { /* ... */ }
function ThemeProvider() { /* ... */ }

// ✅ GOOD - camelCase for hooks
function useMobile() { /* ... */ }
function useGoogleAnalytics() { /* ... */ }
```

**Variable Naming**
```typescript
// ✅ GOOD - Descriptive names
const readingTime = calculateReadingTime(wordCount)
const canonicalUrl = getCanonicalPostUrl(slug)

// ❌ AVOID - Abbreviations or unclear names
const rt = calcRT(wc)
const url = getURL(slug)
```

**Import Order**
```typescript
// 1. React imports
import React, { useState, useEffect } from 'react'

// 2. Third-party libraries
import { format } from 'date-fns'
import Link from 'next/link'

// 3. Local imports (absolute paths)
import { cn } from '@/lib/utils'
import PostCard from '@/components/post-card'

// 4. Type imports
import type { Post } from '@/lib/notion'
```

### Styling Conventions

**Tailwind Class Order**
```typescript
// ✅ GOOD - Logical order
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">

// ❌ AVOID - Random order
<div className="bg-white p-4 shadow-sm flex hover:shadow-md items-center rounded-lg justify-between transition-shadow">
```

**Responsive Design**
```typescript
// ✅ GOOD - Mobile-first approach
<div className="text-sm md:text-base lg:text-lg">
  Responsive text
</div>

// ✅ GOOD - Consistent breakpoints
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

**Custom CSS Variables**
```css
/* ✅ GOOD - Consistent naming */
--flexbike-teal: #39A6A9;
--flexbike-teal-hover: #2d8a8d;

/* ❌ AVOID - Inconsistent naming */
--primary-color: #39A6A9;
--teal-hover: #2d8a8d;
```

### Code Quality Standards

**ESLint Configuration**
```javascript
// .eslintrc.json (recommended)
{
  "extends": ["next/core-web-vitals"],
  "rules": {
    "react-hooks/exhaustive-deps": "error",
    "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "prefer-const": "error",
    "no-var": "error"
  }
}
```

**Prettier Configuration**
```javascript
// .prettierrc
{
  "semi": false,
  "trailingComma": "es5",
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false
}
```

**Code Review Checklist**
- [ ] Code follows established patterns
- [ ] Variables and functions have descriptive names
- [ ] No console.log statements in production code
- [ ] Proper error handling implemented
- [ ] Components are properly typed
- [ ] Imports are organized and optimized
- [ ] No unused dependencies or variables
- [ ] Tests added for new functionality
- [ ] Documentation updated if needed

### Git Workflow

**Branch Naming Convention**
```bash
# Feature branches
feature/add-dark-mode-toggle
feature/implement-search-functionality
feature/optimize-image-loading

# Bug fixes
fix/broken-navigation-on-mobile
fix/image-optimization-fallback

# Hotfixes (production issues)
hotfix/critical-api-error

# Documentation
docs/update-api-documentation
docs/add-deployment-guide
```

**Commit Message Format**
```bash
# Format: type(scope): description

# ✅ GOOD Examples
feat: add dark mode toggle component
fix: resolve image loading issue on mobile
docs: update API documentation
refactor: simplify post card component
test: add unit tests for utility functions

# ❌ AVOID
fixed bug
updated code
changes
```

**Pull Request Guidelines**
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Manual testing completed
- [ ] Unit tests added/updated
- [ ] E2E tests pass

## Screenshots (if applicable)
<!-- Add screenshots for UI changes -->

## Checklist
- [ ] Code follows style guidelines
- [ ] Tests pass
- [ ] Documentation updated
- [ ] No breaking changes
```

**Git Workflow**
```bash
# 1. Create feature branch
git checkout -b feature/new-feature

# 2. Make changes with frequent commits
git add .
git commit -m "feat: implement new feature"

# 3. Push branch
git push origin feature/new-feature

# 4. Create pull request
# - Use GitHub interface
# - Add description and screenshots
# - Request review from team members

# 5. Address feedback
git add .
git commit -m "fix: address review feedback"
git push

# 6. Merge after approval
# - Use "Squash and merge" for clean history
# - Delete branch after merge
```

### Development Workflow

**Daily Development Cycle**
```bash
# Morning - Pull latest changes
git pull origin main

# Start development server
pnpm dev

# Work on feature branch
git checkout -b feature/my-feature

# Regular commits
git add .
git commit -m "feat: implement feature part 1"

# Test changes
pnpm build
pnpm start

# Push and create PR when ready
git push origin feature/my-feature
```

**Code Review Process**
1. **Author**: Create PR with clear description
2. **Reviewer**: Review code, test functionality
3. **Author**: Address feedback, make changes
4. **Reviewer**: Approve or request more changes
5. **Merge**: Use squash merge for clean history

## 🔍 Key Features & Technical Decisions

### 1. Font Strategy
**Decision**: Hybrid Google Fonts + Local fonts
**Reasoning**:
- Google Fonts for reliability and CDN optimization
- Local fonts as fallbacks for performance and privacy
- Nunito chosen for modern, readable typography
- Black/ExtraBold weights for headings, SemiBold for emphasis

### 2. Color System Architecture
**Decision**: CSS custom properties with Tailwind integration
**Implementation**:
```css
/* CSS Variables */
--flexbike-teal: #39A6A9;

/* Tailwind Integration */
@theme inline {
  --color-flexbike-teal: var(--flexbike-teal);
}

/* Usage */
text-flexbike-teal hover:text-flexbike-teal/80
```

### 3. Dark Mode Implementation
**Decision**: CSS variables with opacity modifiers
**Pattern**:
```css
/* Light mode base, dark mode adjusted */
text-foreground/80 hover:text-flexbike-teal dark:hover:text-flexbike-teal/90
```

### 4. Navigation Architecture
**Decision**: Strategic cross-linking between blog and main site
**Links**:
- Header logo → flexbike.app (main site)
- "For Business" → flexbike.app/for-business
- Footer "Blog" → / (blog home)
- All logos → flexbike.app

### 5. Content Processing
**Decision**: Aggressive markdown cleaning for titles
**Function**:
```typescript
function cleanMarkdown(text: string): string {
  return text
    .replace(/^#+\s*/gm, '') // Remove heading markers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/`([^`]+)`/g, '$1') // Remove code
    .replace(/^\s*[-*+]\s+/gm, '') // Remove lists
    .trim();
}
```

### 6. URL Routing Architecture
**Decision**: Clean URLs with canonical redirects
**Implementation**:
- **Clean URLs**: Posts accessible at `/[slug]` instead of `/posts/[slug]`
- **Canonical URLs**: All SEO metadata points to `flexbike.app/blog/[slug]`
- **Dual Access**: Works on both Vercel subdomain and main site via rewrites
- **Centralized Helpers**: `lib/urls.ts` for consistent URL construction

**URL Mapping**:
```typescript
// Internal links (components)
getInternalPostHref(slug) → `/${slug}`

// Canonical URLs (SEO/metadata)
getCanonicalPostUrl(slug) → `https://flexbike.app/blog/${slug}`

// Sitemap URLs
getBlogIndexUrl() → `https://flexbike.app/blog`
getCanonicalPostUrl(slug) → `https://flexbike.app/blog/${slug}`
```

### Nested URL Routing System

**Overview**: In addition to the standard slug-based routing (`/blog/[slug]`), the system now supports nested URL routing using `/{firstSlash}/{post-title}/` patterns. This enables more semantic and SEO-friendly URLs.

**Examples**:
- `/success-stories/urban-composting-initiative` - Maps to a post with `firstSlash: "success-stories"` and `post-title: "Urban Composting Initiative"` (auto-slugified)
- `/solutions/climate-action-program` - Maps to a post with `firstSlash: "solutions"` and `post-title: "Climate Action Program"` (auto-slugified)
- `/events/2024-sustainability-summit` - Maps to a post with `firstSlash: "events"` and `post-title: "2024 Sustainability Summit"` (auto-slugified)

**CMS Configuration**:
1. Add `firstSlash` (Text) property to your Notion database
2. Add `post-title` (Text) property to your Notion database
3. Fill these fields for posts that should use nested routing
4. Posts without these fields continue to work with the standard slug routing

**Caching Strategy**:
- Route lookup map is cached for 7 days to improve performance
- Cache is stored in `route-lookup-cache.json` file
- Cache can be refreshed via API call: `GET /api/cache`
- Automatic cache refresh on Vercel via cron jobs

**Performance Benefits**:
- **Cold start**: 200-2000ms (Notion API call, varies by network and load)
- **Cache hit**: <50ms (uses persistent cache)
- **Cache TTL**: 7 days with automatic refresh
- **Storage**: Vercel Edge Config (production) or file-based (development)

**Production Testing**:
```bash
# Test cache API on staging/production
curl -X GET https://your-staging-domain.vercel.app/api/cache

# Test a nested route (after adding firstSlash/post-title to a post)
curl -I https://your-staging-domain.vercel.app/success-stories/urban-composting
```

### 7. Image Optimization Strategy
**Decision**: Next.js Image with Notion S3 domains
**Configuration**:
```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
    }
  ],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
}
```

## 🐛 Common Issues & Solutions

### 1. Font Loading Issues
**Problem**: Local fonts not loading
**Solution**: Ensure correct relative paths in `layout.tsx`
```typescript
// Correct: Relative to src/app/
path: "../../public/fonts/Nunito-Black.ttf"
```

### 2. Notion API Authentication
**Problem**: "API token is invalid"
**Solution**:
- Regenerate Notion integration token
- Ensure token has read permissions
- Verify database sharing settings

### 3. Environment Variable Loading
**Problem**: Variables not available in build
**Solution**: Use manual parsing for early access
```typescript
// Load .env.local manually before imports
const envPath = path.join(process.cwd(), '.env.local');
// Parse and set process.env variables
```

### 4. Dark Mode Color Conflicts
**Problem**: Colors not adapting to themes
**Solution**: Use opacity modifiers with CSS variables
```css
/* Instead of fixed colors */
text-gray-600 dark:text-gray-400

/* Use theme-aware variables */
text-muted-foreground hover:text-flexbike-teal
```

### 5. Post Cache Regeneration
**Problem**: New posts not appearing
**Solution**: Always run `pnpm run cache:posts` after content changes

### 6. Build Failures

**Problem**: "Module not found" errors
**Symptoms**: Build fails with import errors
**Solutions**:
- Check file paths and extensions
- Ensure all dependencies are installed: `pnpm install`
- Verify TypeScript path mapping in `tsconfig.json`
- Clear Next.js cache: `rm -rf .next`

**Problem**: TypeScript compilation errors
**Symptoms**: "Property does not exist" or type mismatches
**Solutions**:
- Check interface definitions in `lib/notion.ts`
- Ensure all props are passed to components
- Verify import statements match exports
- Run `pnpm build` to see detailed error messages

### 7. Notion Content Issues

**Problem**: Posts not filtering correctly
**Symptoms**: Unpublished posts appearing, or published posts missing
**Debug Steps**:
1. Check Notion database properties match exactly
2. Verify Status = "Done" and "Published Blog Post" tag present
3. Ensure database is shared with integration
4. Check API permissions in Notion integration settings

**Problem**: Content formatting issues
**Symptoms**: Markdown not rendering properly
**Solutions**:
- Clean markdown in titles using `cleanMarkdown()` function
- Check for unsupported Notion features
- Verify image URLs are accessible
- Test content in Notion editor first

### 8. Image Loading Problems

**Problem**: Images not displaying
**Symptoms**: Broken image icons or loading errors
**Solutions**:
- Check image URLs are from allowed domains (configured in `next.config.ts`)
- Verify Notion S3 URLs are correct
- Ensure images are publicly accessible
- Use Next.js Image component instead of regular `img` tags

**Problem**: Slow image loading
**Symptoms**: Large images causing layout shift
**Solutions**:
- Use proper `width` and `height` props on Image components
- Implement `priority` for above-the-fold images
- Consider lazy loading for below-the-fold images
- Optimize image sizes in Notion

### 9. Theme and Styling Issues

**Problem**: Dark mode not working
**Symptoms**: Colors not switching between themes
**Solutions**:
- Ensure `ThemeProvider` wraps the entire app
- Check CSS variables are defined for both light/dark
- Verify `class` attribute is used (not `data-theme`)
- Test theme toggle functionality

**Problem**: Tailwind classes not applying
**Symptoms**: Styles not showing up in browser
**Solutions**:
- Run `pnpm dev` or `pnpm build` to compile CSS
- Check for typos in class names
- Ensure custom CSS variables are defined
- Verify `globals.css` is imported in `layout.tsx`

### 10. Deployment Issues

**Problem**: Vercel build fails
**Symptoms**: Build succeeds locally but fails on Vercel
**Solutions**:
- Check environment variables are set in Vercel dashboard
- Ensure build command includes cache regeneration
- Verify Node.js version compatibility
- Check build logs for specific error messages

**Problem**: Environment variables not working
**Symptoms**: API calls failing with auth errors
**Solutions**:
- Never commit `.env.local` to version control
- Set variables in Vercel dashboard (not in code)
- Restart development server after changing `.env.local`
- Check variable names match exactly (case-sensitive)

### 11. Development Environment Issues

**Problem**: Port 3001 already in use
**Symptoms**: "Port already in use" error
**Solutions**:
```bash
# Find process using port
lsof -ti:3001 | xargs kill -9

# Or use a different port
pnpm dev -p 3002
```

**Problem**: Hot reload not working
**Symptoms**: Changes not reflecting in browser
**Solutions**:
- Check for TypeScript compilation errors
- Clear Next.js cache: `rm -rf .next`
- Restart development server
- Check file is saved and not ignored by `.gitignore`

### 12. Performance Issues

**Problem**: Slow page loads
**Symptoms**: Lighthouse scores below 90
**Solutions**:
- Run `pnpm run cache:posts` to ensure fresh cache
- Check image optimization (use Next.js Image component)
- Verify fonts are loading with `font-display: swap`
- Minimize bundle size by removing unused dependencies

**Problem**: Large bundle size
**Symptoms**: Slow initial page load
**Solutions**:
- Analyze bundle: `npx @next/bundle-analyzer`
- Remove unused dependencies
- Use dynamic imports for large components
- Implement code splitting where possible

### 13. SEO and Metadata Issues

**Problem**: Open Graph images not working
**Symptoms**: Social media previews show wrong images
**Solutions**:
- Ensure `NEXT_PUBLIC_SITE_URL` is set correctly
- Check image paths in metadata generation
- Verify images are accessible and correct size (1200x630 recommended)
- Test with Facebook/Open Graph debuggers

**Problem**: Pages not indexing in search engines
**Symptoms**: New posts not appearing in Google Search
**Solutions**:
- Submit sitemap to Google Search Console
- Ensure canonical URLs are correct
- Check robots.txt allows crawling
- Wait 24-48 hours for indexing (or request re-indexing)

### 14. Analytics and Tracking Issues

**Problem**: Google Analytics not tracking
**Symptoms**: No events appearing in GA dashboard
**Solutions**:
- Verify `NEXT_PUBLIC_GOOGLE_GTAG_ID` is set
- Check Google Analytics script loads in browser dev tools
- Ensure events are fired after GA loads
- Test with GA debug mode enabled

**Problem**: Navigation tracking not working
**Symptoms**: Click events not appearing in analytics
**Solutions**:
- Check `useGoogleAnalytics` hook is properly implemented
- Verify `trackNavigation` is called on link clicks
- Ensure Google Analytics script loads before events fire
- Test tracking in browser dev tools network tab

### 15. Content Management Issues

**Problem**: Notion database schema changes
**Symptoms**: Posts not loading or showing wrong data
**Solutions**:
- Update TypeScript interfaces in `lib/notion.ts`
- Modify mapping logic for new/changed properties
- Test with sample data before deploying
- Document schema changes in this guide

**Problem**: Author information missing
**Symptoms**: Posts showing without author names
**Solutions**:
- Check `Assignees` field has people selected
- Verify integration has "Read user information" permission
- Fallback to `createdBy` field if `Assignees` is empty
- Handle cases where no author is specified

### 16. Mobile Responsiveness Issues

**Problem**: Layout breaks on mobile devices
**Symptoms**: Content overflowing or misaligned
**Solutions**:
- Test with browser dev tools mobile view
- Use responsive Tailwind classes (`sm:`, `md:`, `lg:`)
- Check container max-widths and padding
- Verify touch targets are at least 44px

**Problem**: Theme toggle not accessible on mobile
**Symptoms**: Hard to tap theme toggle on small screens
**Solutions**:
- Increase touch target size
- Position toggle in easily accessible location
- Test on actual mobile devices
- Consider bottom navigation for mobile

### 17. Error Handling Issues

**Problem**: Unhandled errors crashing the app
**Symptoms**: White screen or error boundaries triggering
**Solutions**:
- Implement error boundaries around components
- Add try-catch blocks around API calls
- Provide fallback UI for failed states
- Log errors for debugging

**Problem**: 404 pages not working correctly
**Symptoms**: Wrong 404 page or missing custom 404
**Solutions**:
- Create `app/404.tsx` for custom 404 page
- Test with non-existent URLs
- Ensure proper status codes are returned
- Check static generation for 404 page

### 18. Caching and Data Freshness Issues

**Problem**: Old content showing after updates
**Symptoms**: Changes not reflecting on live site
**Solutions**:
```bash
# Always run cache regeneration
pnpm run cache:posts

# For Vercel: Push changes to trigger rebuild
git add posts-cache.json
git commit -m "Update blog content"
git push
```

**Problem**: Cache file corruption
**Symptoms**: JSON parsing errors
**Solutions**:
- Delete `posts-cache.json` and regenerate
- Check for special characters in Notion content
- Validate JSON structure before saving
- Add error handling in cache reading logic

## 📈 Performance Optimizations

### 1. Static Generation
- Posts cached as JSON for instant loading
- Static HTML generation for SEO benefits
- ISR-ready for future dynamic updates

### 2. Image Optimization
- Next.js Image component with responsive sizing
- WebP format with fallbacks
- Lazy loading and priority hints

### 3. Font Loading
- `font-display: swap` for no layout shift
- Local fonts for offline capability
- Preconnect to Google Fonts CDN

### 4. Bundle Optimization
- Tree shaking enabled
- Dynamic imports for theme toggle
- Minimal runtime JavaScript

## 🔮 Future Enhancements

### Phase 1: Content Features
- [ ] Author profiles with photos
- [ ] Related posts recommendations
- [ ] Search functionality
- [ ] Categories/tags filtering
- [ ] Newsletter signup integration

### Phase 2: Performance & SEO
- [ ] ISR (Incremental Static Regeneration)
- [ ] Sitemap generation
- [ ] RSS feed
- [ ] Structured data (JSON-LD)
- [ ] Performance monitoring

### Phase 3: Social Features
- [ ] Social sharing buttons
- [ ] Comments system
- [ ] Reading progress indicator
- [ ] Print-friendly styles
- [ ] Social media embeds

### Phase 4: Analytics & Insights
- [ ] Post view tracking
- [ ] Popular posts widget
- [ ] Author analytics
- [ ] Content performance metrics

## 📞 Support & Maintenance

### Regular Tasks
1. **Content Updates**: Run `pnpm run cache:posts` after Notion changes
2. **Dependency Updates**: Monitor for Next.js, Notion API updates
3. **Performance Monitoring**: Check Core Web Vitals
4. **SEO Auditing**: Verify meta tags and structured data

### Deployment Checklist
- [ ] Environment variables configured
- [ ] Post cache regenerated
- [ ] Build successful
- [ ] Images optimized
- [ ] Links functional
- [ ] Mobile responsive
- [ ] Dark mode working

### Emergency Contacts
- **Repository**: https://github.com/fotoflo/flexbike-notion-blog
- **Issues**: Create GitHub issues for bugs/features
- **Email**: team@flexbike.app
- **Notion**: Check integration status if API fails

---

**Last Updated**: November 7, 2025
**Version**: 1.0.0
**Maintainer**: Flexbike Development Team
