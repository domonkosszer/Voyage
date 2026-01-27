VOYAGE – Blog Architecture Documentation
========================================

Purpose
-------
This document describes the architecture of the VOYAGE public blog,
including folder structure, routing, data flow, and rendering logic.

A new developer should be able to understand how blog posts are loaded,
renderouten funktionieren, and where to extend the system after reading this file.


High-Level Overview
-------------------
The blog is implemented using the **Next.js App Router** with:

- File-based routing
- Dynamic route segments
- MDX-based content
- A shared public layout

Key principles:
- Blog content lives outside the app router (content/posts)
- Routing is derived from folder structure
- Rendering happens in async server components
- Shared UI is colocated in components/


Monorepo Context
----------------
This repository is a monorepo containing multiple applications.

Relevant app for the blog:
- apps/public-web → Public website & blog

Other apps (not covered here):
- workspace-api
- workspace-ui


Folder Structure (Current)
--------------------------

apps/public-web/
│
├── app/
│   ├── (site)/                     → Public site route group
│   │   ├── layout.tsx              → Shared layout (TopBar, globals)
│   │   ├── page.tsx                → Homepage
│   │   ├── about/
│   │   │   └── page.tsx            → Static About page
│   │   └── blog/
│   │       ├── layout.tsx          → Blog-specific layout (optional)
│   │       ├── page.tsx            → Blog index (list of posts)
│   │       └── [slug]/
│   │           └── page.tsx        → Dynamic blog post page
│   │
│   ├── global.css                  → Global styles
│   └── layout.tsx                  → Root layout
│
├── components/
│   └── shell/
│       └── TopBar.tsx              → Shared navigation bar
│
├── visuals/
│   └── ImageSphereSketch.tsx       → Creative / visual components
│
├── content/
│   └── posts/
│       ├── YYYY-MM-DD-title.mdx    → Blog post source files
│       └── ...
│
├── lib/
│   └── posts.ts                    → Blog data loading & parsing logic
│
├── public/
│   └── blog/
│       └── visuals/
│           ├── first.jpg
│           ├── second.jpg
│           └── ...


Routing Logic
-------------
Routing is defined entirely by the folder structure.

Static routes:
- /                → app/(site)/page.tsx
- /about           → app/(site)/about/page.tsx
- /blog            → app/(site)/blog/page.tsx

Dynamic routes:
- /blog/[slug]     → app/(site)/blog/[slug]/page.tsx

The `[slug]` directory defines a dynamic route parameter
that is passed to the page component as `params.slug`.


Data Flow (How a Blog Post Is Rendered)
---------------------------------------

1. User navigates to:
   /blog/some-post-slug

2. Next.js resolves the route:
   app/(site)/blog/[slug]/page.tsx

3. The page component receives:
   params.slug

4. The page calls:
   getPostBySlug(slug) from lib/posts.ts

5. lib/posts.ts:
    - Reads the corresponding MDX file from content/posts
    - Parses frontmatter metadata (title, date, etc.)
    - Returns structured post data

6. The page component renders:
    - Shared layout (TopBar)
    - Post metadata
    - MDX content as React components

7. If the slug does not exist:
    - notFound() is triggered


Core Files Explained
-------------------

app/(site)/blog/[slug]/page.tsx
--------------------------------
- Async Server Component
- Receives dynamic params (slug)
- Loads post data via lib/posts
- Handles invalid slugs with notFound()
- Renders full blog post view

app/(site)/blog/page.tsx
------------------------
- Blog index page
- Loads all posts via lib/posts
- Renders list / preview of posts

lib/posts.ts
-------------
- Central data access layer for blog content
- Handles file system access and MDX parsing
- Keeps routing and rendering logic clean

content/posts/*.mdx
-------------------
- Source of truth for blog content
- File name defines the slug
- Frontmatter stores metadata
- Body is rendered as MDX

components/shell/TopBar.tsx
---------------------------
- Shared navigation component
- Used across all public pages
- Ensures consistent layout and navigation

public/blog/visuals/
--------------------
- Static images for blog posts
- Served directly by Next.js
- Referenced in MDX or page components


Why This Architecture
---------------------
- Clear separation of concerns
- File-based routing (no manual routing config)
- Content-driven architecture
- Easy to add new posts
- Scales well for future features:
    - Tags
    - Categories
    - RSS feeds
    - Pagination
    - Search


How to Add a New Blog Post
-------------------------
1. Create a new MDX file in:
   content/posts/

2. Use a unique filename:
   YYYY-MM-DD-your-title.mdx

3. Add frontmatter metadata (title, date, etc.)

4. Optionally add images to:
   public/blog/visuals/

5. The post is automatically available at:
   /blog/your-title


Current Status
--------------
- App Router fully set up
- Dynamic blog slugs working
- Shared public layout integrated
- MDX content loading stable
- Ready for styling, animations, and feature extensions