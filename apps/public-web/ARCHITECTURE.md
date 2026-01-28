VOYAGE – Blog & Admin Architecture Documentation
===============================================

Purpose
-------
This document describes the architecture of the VOYAGE public blog
and its internal admin system.

It covers folder structure, routing, data flow, authentication,
and the admin UI shell.

A new developer should be able to understand:
- how blog posts are loaded and rendered
- how routing works (public + admin)
- how authentication is handled
- where and how to extend the system


High-Level Overview
-------------------
The VOYAGE public site is implemented using the **Next.js App Router**
inside a monorepo, with authentication delegated to a **Spring Boot backend**.

Key technologies:
- Next.js (App Router, Server Components)
- Spring Boot (session-based auth)
- Tailwind CSS (UI styling)
- File-based content (TXT / MD / MDX)

Core principles:
- Public content is always accessible
- Admin tools are protected via backend session
- No duplicate authentication logic
- Clear separation between public site and admin system


Monorepo Context
----------------
This repository is a monorepo containing multiple applications.

Relevant apps:
- apps/public-web   → Public website, blog, and admin UI
- apps/workspace-api → Spring Boot backend (auth, API, DB)

Other apps (not covered here):
- workspace-ui


Folder Structure (Current)
--------------------------

apps/public-web/
│
├── app/
│   ├── (site)/                     → Public site route group
│   │   ├── layout.tsx              → Shared public layout (TopBar, globals)
│   │   ├── page.tsx                → Homepage
│   │   ├── about/
│   │   │   └── page.tsx            → Static About page
│   │   ├── blog/
│   │   │   ├── layout.tsx          → Blog-specific layout
│   │   │   ├── page.tsx            → Blog index (list of posts)
│   │   │   └── [slug]/
│   │   │       └── page.tsx        → Dynamic blog post page
│   │   └── admin/
│   │       ├── layout.tsx          → Admin auth guard (server-side)
│   │       ├── page.tsx            → Admin dashboard (sidebar + header)
│   │       └── posts/
│   │           └── page.tsx        → Admin posts manager
│   │
│   ├── global.css                  → Tailwind + global styles
│   └── layout.tsx                  → Root layout (imports global.css)
│
├── components/
│   └── shell/
│       └── TopBar.tsx              → Shared public navigation bar
│
├── visuals/
│   └── ImageSphereSketch.tsx       → Creative / visual components
│
├── content/
│   └── posts/
│       ├── YY-MM-DD-title.txt      → Blog post source files (current)
│       ├── YYYY-MM-DD-title.md     → (optional / supported)
│       └── YYYY-MM-DD-title.mdx    → (optional / supported)
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

Public routes:
- /                → app/(site)/page.tsx
- /about           → app/(site)/about/page.tsx
- /blog            → app/(site)/blog/page.tsx
- /blog/[slug]     → app/(site)/blog/[slug]/page.tsx

Admin routes:
- /admin           → Admin dashboard (protected)
- /admin/posts     → Admin post manager (protected)

Dynamic route parameters:
- `[slug]` is derived from the filename in `content/posts`


Blog Data Flow (Rendering a Post)
---------------------------------

1. User navigates to:
   /blog/some-post-slug

2. Next.js resolves:
   app/(site)/blog/[slug]/page.tsx

3. Page receives:
   params.slug

4. The page calls:
   getPostBySlug(slug) from lib/posts.ts

5. lib/posts.ts:
    - Reads a file from content/posts
    - Supports .txt, .md, .mdx
    - Strips date prefix from filename
    - Returns structured post data

6. Page renders:
    - Shared public layout
    - Post metadata
    - Parsed content

7. If the slug does not exist:
    - notFound() is triggered


Admin System Overview
---------------------

The admin system is an **internal tool**, not a CMS yet.

Current capabilities:
- Admin dashboard UI
- Post listing / detection
- Backend session verification
- Logout handling

Admin UI principles:
- Clean, minimal, internal-tool aesthetic
- Sidebar + large system header
- No duplicated navigation actions
- Tailwind-based styling


Admin Authentication & Security
--------------------------------

Authentication is **not handled by Next.js**.

Instead, it is delegated to the Spring Boot backend (`workspace-api`).

Key principles:
- Single source of truth for auth (Spring)
- Session-based authentication (JSESSIONID)
- No JWT
- No duplicate auth logic in frontend
- Admin routes require a valid backend session


Admin Route Protection (Frontend)
---------------------------------

Protection is implemented in:

app/(site)/admin/layout.tsx

Strategy:
- Admin layout is an async Server Component
- On every request:
    - Calls backend endpoint `/api/me`
    - Forwards incoming cookies manually
    - If response is 401 → redirect to /login
    - If response is 200 → render admin UI
    - Optional role check (ROLE_ADMIN)

Important technical detail:
- Server-side fetch MUST forward cookies explicitly
- Using headers().get("cookie") (async)
- credentials: "include" is NOT sufficient in Server Components


Login Flow (End-to-End)
----------------------

1. User navigates to:
   http://localhost:3000/admin

2. Admin layout fetches:
   GET http://localhost:8080/api/me

3. If not authenticated:
    - Backend returns 401
    - Next.js redirects to /login (frontend)

4. Frontend /login redirects to backend:
   GET http://localhost:8080/login-redirect?redirect=http://localhost:3000/admin

5. Backend:
    - Stores redirect target in session
    - Redirects to /login (no query params)

6. Spring Security default login page is shown

7. User submits credentials

8. On successful login:
    - Custom success handler reads redirect from session
    - Redirects user back to:
      http://localhost:3000/admin

9. Admin UI loads successfully


Backend Endpoints Involved
-------------------------

/api/me
- Returns current authenticated user
- 200 → logged in
- 401 → not authenticated
- Never redirects

/login
- Spring Security default login page
- HTML form-based login

/login-redirect
- Helper endpoint
- Stores redirect target in session
- Avoids unsupported query params on /login

/logout
- Invalidates session
- Clears JSESSIONID cookie


Admin Posts Manager
-------------------

Route:
- /admin/posts

Responsibilities:
- Reads files from content/posts on the server
- Detects available posts (.txt / .md / .mdx)
- Derives slugs from filenames
- Displays debug info (detected paths, files)
- Links to public blog pages

This is intentionally read-only for now.


Why This Architecture
---------------------
- Clear separation of concerns
- Public content stays simple and fast
- Admin tools are protected and internal
- No auth duplication
- SSR-safe and production-ready
- Scales cleanly to future CMS features


How to Extend (Future)
----------------------
- Admin post editor UI
- Draft / preview mode
- Role-based admin tools
- Publishing workflow
- CMS integration
- Protected preview links


Current Status
--------------
- App Router fully set up
- Public blog routing stable
- Content loading via filesystem stable
- Tailwind styling active
- Admin auth flow stable and tested
- Admin dashboard + posts manager implemented
- Ready for further UX polish and feature extensions