# Flexbike Blog

A professional travel and adventure blog powered by Notion as a CMS and Next.js. This blog showcases motorbike rental stories, travel tips, and motorcycle adventures from the Flexbike community.

## ✨ Features

- 🏍️ **Flexbike Branded**: Complete brand integration with teal color scheme (#39A6A9) and Nunito fonts
- 🚀 **Next.js 15+**: Built with the latest App Router and Server Components
- 📝 **Notion CMS**: Use Notion database for content management
- 🎨 **Responsive Design**: Mobile-first design with dark mode support
- ⚡ **Performance Optimized**: Static generation, image optimization, and caching
- 🔍 **SEO Enhanced**: Open Graph, Twitter cards, and meta optimization
- 🌙 **Dark Mode**: Seamless theme switching with system preference support
- 📱 **Mobile Friendly**: Optimized for all device sizes
- ✨ **Rich Content**: Markdown support, code highlighting, and table rendering
- 📅 **Reading Analytics**: Word count and estimated reading time
- 🔗 **Smart Navigation**: Integrated links to Flexbike app and services
- 🖼️ **Image Optimization**: Next.js Image component with Notion asset support

## 🚀 Quick Start

### Prerequisites

- Node.js 18.17.1 or later
- pnpm package manager
- A Notion account with the Flexbike blog database

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/fotoflo/flexbike-notion-blog.git
   cd flexbike-notion-blog
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

### Notion Setup

1. **Create Notion Integration**

   - Visit [Notion Developers](https://www.notion.so/my-integrations)
   - Create a new integration named "Flexbike Blog"
   - Copy the integration token

2. **Connect to Database**

   - Open your Flexbike blog database in Notion
   - Add the integration via "Connections"
   - Get the database ID from the URL

3. **Environment Configuration**

   - Create `.env.local` in the project root:

   ```env
   NOTION_TOKEN=your_integration_token_here
   NOTION_DATABASE_ID=your_database_id_here
   NEXT_PUBLIC_SITE_URL=http://localhost:3001
   ```

4. **Run the Blog**

   ```bash
   pnpm run cache:posts  # Generate post cache
   pnpm dev              # Start development server
   ```

   Visit `http://localhost:3001` to see your blog!

## 📝 Content Management

### Publishing Posts

To publish a blog post in Notion:

1. **Add to Database**: Create a new entry in your Notion database
2. **Set Properties**:
   - `Status` → "Done"
   - `Work Tags` → Add "Published Blog Post"
   - `Project name` → Your post title
   - `Prioritization Note` → Brief description (optional)
   - `Attach file` → Cover image (optional)
3. **Regenerate Cache**: Run `pnpm run cache:posts` to update the blog

### Database Properties

The Flexbike blog uses these Notion properties:

| Property              | Type         | Description                        | Required |
| --------------------- | ------------ | ---------------------------------- | -------- |
| `Project name`        | Title        | Blog post title                    | ✅       |
| `Status`              | Status       | Must be "Done" to publish          | ✅       |
| `Work Tags`           | Multi-select | Must include "Published Blog Post" | ✅       |
| `End date`            | Date         | Publication date (primary)         | ✅       |
| `Start date`          | Date         | Alternative date if no end date    | ❌       |
| `Prioritization Note` | Rich text    | Post description/excerpt           | ❌       |
| `Attach file`         | Files        | Cover image                        | ❌       |
| `createdBy`           | People       | Post author                        | Auto     |
| `Assignees`           | People       | Alternative author                 | Auto     |

## 🎨 Customization

### Brand Colors

The blog uses Flexbike's brand color system:

- **Primary**: `#39A6A9` (Flexbike Teal)
- **CSS Variable**: `--flexbike-teal`
- **Tailwind Class**: `text-flexbike-teal`

### Fonts

- **Primary**: Nunito (Google Fonts + Local)
- **Weights**: Black (900), ExtraBold (800), Bold (700), SemiBold (600)
- **Fallback**: System fonts

### Navigation Links

- **Header Logo** → `https://flexbike.app`
- **For Business** → `https://flexbike.app/for-business`
- **Book a Bike** → `https://flexbike.app`
- **Blog Footer** → `/` (blog home)

### App Store Links

- **App Store**: `https://apps.apple.com/app/flexbike/id6449488641`
- **Google Play**: `https://play.google.com/store/apps/details?id=com.flexbike`

### Social Media & SEO

- **Open Graph Image**: `/assets/beach-scene.png` (1200x630)
- **Twitter Card**: Large image format
- **Meta Description**: Optimized for travel and adventure keywords
- **Structured Data**: Ready for rich snippets

## 🛠️ Development

### Available Scripts

```bash
pnpm dev              # Start development server (port 3001)
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm run cache:posts  # Regenerate post cache from Notion
```

### URL Structure

The blog supports clean URLs and canonical redirects:

- **Development**: `http://localhost:3001/[slug]`
- **Direct App**: `https://flexbike-notion-blog.vercel.app/[slug]`
- **Production**: `https://flexbike.app/blog/[slug]` (via rewrites)
- **Sitemap**: All URLs use `https://flexbike.app/blog/` prefix

### Project Structure

```
├── src/
│   ├── app/                 # Next.js app router pages
│   │   ├── layout.tsx      # Root layout with branding
│   │   ├── page.tsx        # Home page
│   │   ├── [slug]/         # Clean post URLs (root level)
│   │   └── posts/[slug]/   # Legacy post route (for migration)
│   ├── components/         # Reusable UI components
│   │   ├── layout.tsx      # Main layout wrapper
│   │   ├── post-card.tsx   # Blog post cards
│   │   └── ui/            # shadcn/ui components
│   └── lib/               # Utility functions
│       ├── notion.ts      # Notion API integration
│       ├── urls.ts        # URL helpers for routing
│       └── utils.ts       # Helper functions
├── public/                # Static assets
│   ├── fonts/            # Nunito font files
│   └── logos/            # Flexbike branding assets
└── posts-cache.json      # Cached blog posts
```

### Adding New Features

1. **Custom Components**: Add to `src/components/`
2. **Styling**: Use Tailwind CSS with Flexbike color variables
3. **Fonts**: Nunito is automatically available
4. **Dark Mode**: Use CSS variables for theme compatibility

## 📄 License

This project is part of the Flexbike ecosystem. For licensing information, please contact the Flexbike team.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/fotoflo/flexbike-notion-blog/issues)
- **Email**: team@flexbike.app
- **Website**: [flexbike.app](https://flexbike.app)

## 🙏 Acknowledgments

Built with ❤️ for the Flexbike community. Special thanks to the Notion API and Next.js team for making this possible.
# climatefair-notion-blog
