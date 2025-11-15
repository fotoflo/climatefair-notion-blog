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

### Notion Database Schema
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
