VOYAGE – Blog Architecture Documentation
========================================

Purpose
-------
This document describes the architecture of the VOYAGE public blog,
including folder structure, routing, data flow, and rendering logic.

A new developer should be able to understand how blog posts are loaded,
render routes work, and where to extend the system after reading this file.


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
│   │   ├── blog/
│   │   │   ├── layout.tsx          → Blog-specific layout (optional)
│   │   │   ├── page.tsx            → Blog index (list of posts)
│   │   │   └── [slug]/
│   │   │       └── page.tsx        → Dynamic blog post page
│   │   └── admin/
│   │       └── page.tsx            → Admin-only page (protected)
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

Admin route:
- /admin           → app/(site)/admin/page.tsx (protected)

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


Admin Authentication & Security
--------------------------------

The blog includes an **admin-only section** used for internal tools
(e.g. editor preview, drafts, future CMS features).

Authentication is **not handled by Next.js**, but delegated to the
existing Spring Boot backend (`workspace-api`).

Key principles:
- Public blog remains fully accessible without login
- Admin routes require a valid backend session
- Session-based authentication (JSESSIONID)
- No JWT, no duplicate auth system


Admin Route Protection (Frontend)
---------------------------------

Route:
- /admin → app/(site)/admin/page.tsx

Protection strategy:
- Implemented as an **async Server Component guard**
- On each request:
    - Calls backend endpoint `/api/me`
    - Forwards cookies manually
    - If response is 401 → redirect to /login
    - If response is 200 → render admin UI

Important detail:
- Server-side fetch must forward cookies explicitly
- credentials: "include" is NOT sufficient in Server Components


Login Flow (End-to-End)
----------------------

1. User navigates to:
   http://localhost:3000/admin

2. Admin page fetches:
   GET http://localhost:8080/api/me

3. If not authenticated:
    - Backend returns 401
    - Next.js redirects to /login (frontend route)

4. Frontend /login page redirects to backend:
   GET http://localhost:8080/login-redirect?redirect=http://localhost:3000/admin

5. Backend:
    - Stores redirect target in session
    - Redirects to /login (without query params)

6. Spring Security default login page is shown

7. User submits credentials

8. On successful login:
    - Custom successHandler reads redirect from session
    - User is redirected to:
      http://localhost:3000/admin

9. Admin page loads successfully


Backend Endpoints Involved
-------------------------

/api/me
- Returns current authenticated user
- 200 → logged in
- 401 → not authenticated
- Never redirects (API-safe)

/login
- Spring Security default login page
- HTML form-based login

/login-redirect
- Helper endpoint
- Stores redirect target in session
- Avoids unsupported query params on /login


Why This Architecture
---------------------
- Single source of truth for authentication (Spring)
- No duplicate auth logic in frontend
- Clean separation:
    - Public content → no auth
    - Admin tools → backend session
- Works with SSR and Server Components
- Production-ready pattern for multi-app monorepos


How to Extend (Future)
----------------------
- Admin editor UI
- Draft / preview mode
- Role-based admin features
- CMS integration
- Protected preview links


Current Status
--------------
- App Router fully set up
- Dynamic blog slugs working
- Shared public layout integrated
- MDX content loading stable
- Admin auth flow stable and tested
- Ready for styling, animations, and feature extensions