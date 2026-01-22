VOYAGE – Blog Architecture Documentation
========================================

Purpose
-------
This document explains how the blog system is structured,
how data flows through the application, and how blog posts
are rendered. A new developer should be able to understand
and extend the blog after reading this file.


High-Level Overview
-------------------
The blog is implemented using the Next.js App Router with
file-based routing and dynamic segments.

Key concepts:
- Blog posts are stored as MDX files
- Each post is identified by a slug
- Pages are generated dynamically based on folder structure
- Shared UI elements are reused across pages


Folder Structure
----------------

apps/public-web/
│
├── app/
│   ├── (site)/
│   │   ├── layout.tsx          → Shared layout for public pages
│   │   ├── page.tsx            → Homepage
│   │   ├── about/
│   │   │   └── page.tsx        → Static About page
│   │   └── blog/
│   │       ├── page.tsx        → Blog index (list of posts)
│   │       └── [slug]/
│   │           └── page.tsx    → Dynamic blog post page
│   │
│   └── globals.css             → Global styles
│
├── components/
│   └── shell/
│       └── TopBar.tsx          → Shared navigation shell
│
├── content/
│   └── posts/
│       └── YYYY-MM-DD-title.mdx → Blog post content files
│
├── lib/
│   └── posts.ts                → Blog data loading logic


Routing Logic
-------------
The App Router uses the folder structure to define routes:

- /blog
  → app/(site)/blog/page.tsx

- /blog/some-post-slug
  → app/(site)/blog/[slug]/page.tsx

The [slug] directory defines a dynamic route parameter.


Data Flow (How a blog post is rendered)
---------------------------------------

1. User navigates to /blog/[slug]

2. Next.js extracts the slug from the URL:
   params.slug

3. The page component calls:
   getPostBySlug(slug)

4. getPostBySlug:
    - Reads the MDX file from content/posts
    - Parses frontmatter metadata (title, date, etc.)
    - Returns structured post data

5. The page component renders:
    - TopBar (shared navigation)
    - Metadata (date, title)
    - Post content


Core Files Explained
-------------------

app/(site)/blog/[slug]/page.tsx
--------------------------------
- Async server component
- Receives params as a Promise
- Loads blog content using lib/posts
- Handles notFound() if slug does not exist
- Renders blog UI

lib/posts.ts
-------------
- Central data access layer for blog posts
- Abstracts file system and parsing logic
- Keeps page components clean and focused

content/posts/*.mdx
-------------------
- Source of truth for blog content
- File name defines the slug
- Frontmatter stores metadata
- Content is rendered as React components

components/shell/TopBar.tsx
---------------------------
- Shared navigation bar
- Used across all public pages
- Keeps layout consistent


Why This Architecture
---------------------
- Clear separation of concerns
- File-based routing = no manual route config
- Easy to add new posts (just add an MDX file)
- Easy to extend with tags, categories, RSS, etc.
- Scales well as content grows


How to Add a New Blog Post
-------------------------
1. Create a new MDX file in:
   content/posts/

2. Use a unique filename:
   YYYY-MM-DD-your-title.mdx

3. Add frontmatter metadata

4. The post becomes automatically available
   at /blog/your-title


Current Status
--------------
- Blog routing implemented
- Dynamic slugs working
- Shared layout integrated
- MDX content loading in place
- Ready for styling and feature extensions