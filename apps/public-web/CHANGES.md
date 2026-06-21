# Voyage — linking & design pass

## Linking / routing (functional fixes)
- **Broken "collection" link fixed.** The homepage linked to `/collection/drop-01`,
  which 404'd: no `drop-01.json` existed, and `drop-03`/`drop-77` were sitting in
  the wrong folder (`apps/public-web/public/content/collections/`, a leftover from
  the monorepo move) where `getCollection()` never looks.
  → Moved the collection JSONs into the correct `public/content/collections/`.
  → Created a real `drop-01.json` using the image already in
    `public/uploads/collections/drop-01/`, so the featured drop shows real content.
- **Consistent navigation across all interior pages.** Added one shared `SiteNav`
  (wordmark → home, plus about · collection · blog, with active-page highlighting).
  It replaces the ad-hoc / commented-out `TopBar` usage, so blog posts, the About
  page and collection pages are no longer dead-ends. Homepage keeps its hero hub.
- Fixed a **pre-existing build-breaking type error** in `app/api/blog/[slug]/route.ts`
  (`RouteContext<...>` isn't a valid type in this Next version).

## Design (no fundamentals changed — same brand, type, voice, marquees, trackfield)
- **Blog post body now styled.** It used `prose` classes, but the Tailwind typography
  plugin isn't installed, so the text was unstyled. Added a self-contained
  `.article-body` style (measure, line-height, headings, links, lists, quotes).
- **Collection page no longer crashes** on empty images. `next/image` was being fed
  `src=""` (throws). Now empty hero/editorial/product images degrade to a neutral
  block. Also removed the `?v=Date.now()` cache-buster and a leftover `console.log`.
- **Blog cards** got hover lift + image zoom, a tidier date/excerpt hierarchy, and a
  graceful "Voyage" placeholder for posts without an image (the old `/blog/placeholder.jpg`
  didn't exist).
- **Homepage Events** shows an empty-state line instead of a blank grid.
- **Accessibility / polish:** visible keyboard focus everywhere, smooth scrolling, and
  `prefers-reduced-motion` support (freezes the marquees / loop for motion-sensitive users).

## One thing to note (not changed)
The stray `apps/public-web/` folder at the project root is a leftover duplicate from the
monorepo move and isn't read by the app. Safe to delete when you get a chance.

## Verified
`tsc --noEmit` clean · `next build` passes · routes return 200 incl. `/collection/drop-01`.

---

# Round 2 — blog refresh + working /admin

## /admin now works
- **Root cause:** there was no env file, so `BACKEND_URL` was `undefined` →
  the auth fetch threw → it redirected to `/login`, which *also* read the
  undefined backend and redirected to a broken `undefined/login-redirect…` URL.
  A dead loop.
- Added **`.env.local`** (working) and **`.env.example`** (documented) with
  `BACKEND_URL` / `NEXT_PUBLIC_BACKEND_URL`.
- Rewrote the admin auth gate so it's robust:
  - Backend up + valid `ROLE_ADMIN` session → real Spring login (unchanged).
  - Backend down → **local dev bypass** (`ADMIN_DEV_BYPASS=true`) opens the admin
    with a visible "Dev mode" banner. Double-guarded with `NODE_ENV !== production`,
    so the bypass can **never** apply to a production build.
  - No backend + no bypass → a clear config notice instead of a broken redirect.
- Hardened `/login` to show a helpful message instead of redirecting to `undefined`.
- **Fixed the double-sidebar bug:** the layout *and* the dashboard each rendered a
  sidebar. Navigation now lives once in the layout shell (Dashboard · Posts · Events ·
  Collections, with active state, + View site / Database / Log out). The dashboard is
  content-only and re-themed to the brand's black/white palette.

  Backend is already complete — seeded admin is **`admin` / `admin123!`** (dev profile).
  To use real auth: set `ADMIN_DEV_BYPASS=false`, then `cd ../workspace-api && ./gradlew bootRun`.

## Blog made fresher / catchier (same fundamentals)
- Kept the signature scrolling **BLOG** marquee hero and the bold type.
- The latest post is now a large **featured cover** with the title set over the image,
  a "Latest · date" eyebrow, and an animated "Read story →".
- Remaining posts flow into a refined **"More stories"** grid with hover image-zoom,
  a date eyebrow, and a "Read →" cue that fades in on hover.
- Graceful empty-states and image fallbacks throughout.
