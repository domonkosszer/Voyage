# VOYAGE Project Notes

Last updated: 2026-06-21

This file is the living map for the VOYAGE monorepo. Keep it current when routes, ports, app responsibilities, deployment paths, content formats, or collaboration rules change.

## 1. Repository and server location

Active shared working copy on the server:

```text
/mnt/ssd4tb/shared/projects/Voyage
```

GitHub remote:

```text
git@github.com:domonkosszer/Voyage.git
```

Current collaboration model:

- `pupi` and `pascal` should work from the shared server path above.
- Do **not** use `/home/pupi/sites/blog/Voyage` as the shared working copy; that was the older private location and is not cleanly reachable for Pascal.
- Repo is intended as a monorepo.

## 2. Apps in the monorepo

```text
apps/
  public-web/      Main VOYAGE Sports Club public website
  shop-web/        New VOYAGE online shop / sportswear storefront
  workspace-ui/    Separate Next.js app, currently not part of Docker runtime
  workspace-api/   Placeholder/minimal package currently not part of Docker runtime
```

### `apps/public-web`

Purpose:

- Main public VOYAGE Sports Club website.
- Landing page with `VOYAGE`, `for the few.`, events section, animated visual element.
- About page.
- Blog pages based on local MDX content.
- Admin screens for posts, events, collections.

Stack:

- Next.js `^16.1.4`
- React `^19.2.3`
- Tailwind CSS 4 via `@import "tailwindcss"`
- `gray-matter` and `next-mdx-remote` for content
- Visual libs: `p5`, `three`, `lucide-react`

Important files:

```text
apps/public-web/package.json
apps/public-web/app/layout.tsx
apps/public-web/app/global.css
apps/public-web/app/(site)/page.tsx
apps/public-web/app/(site)/about/page.tsx
apps/public-web/app/(site)/blog/page.tsx
apps/public-web/app/(site)/blog/[slug]/page.tsx
apps/public-web/app/admin/*
apps/public-web/lib/posts.ts
apps/public-web/lib/collections.ts
apps/public-web/lib/events/store.file.ts
apps/public-web/public/content/posts/*
apps/public-web/ARCHITECTURE.md
```

Known public routes:

```text
/                 Landing page
/about            About page
/blog             Blog index
/blog/[slug]      Blog post page
/login            Login redirect page
/admin            Admin area
/admin/posts      Admin posts manager
/admin/events     Admin events manager
/admin/collections Admin collections manager
```

Content model:

- Blog posts currently live under:

```text
apps/public-web/public/content/posts/<slug>/<YYYY-MM-DD>.mdx
```

- `lib/posts.ts` reads the newest `.mdx` file inside each post folder and parses frontmatter via `gray-matter`.
- Events are file-based JSON under:

```text
apps/public-web/public/content/events/<id>/event.json
```

- Collections are expected by `lib/collections.ts` under:

```text
apps/public-web/public/content/collections/<slug>.json
```

Current observation:

- The homepage links to `/collection/drop-01`.
- During inspection, `/collection/drop-01` returned `404`, likely because no collection JSON file was present in `apps/public-web/public/content/collections/`.

### `apps/shop-web`

Purpose:

- New premium sportswear online shop for VOYAGE.
- One-page editorial storefront with hero, manifesto, product grid, brand story, editorial images, newsletter and footer.
- Stripe Checkout integration for product purchase.

Stack:

- Next.js `15.5.19`
- React `19.0.0`
- Tailwind CSS 3
- Stripe SDK `^22.2.2`
- CSS-first visual system in `app/globals.css`

Important files:

```text
apps/shop-web/package.json
apps/shop-web/app/layout.tsx
apps/shop-web/app/page.tsx
apps/shop-web/app/globals.css
apps/shop-web/app/impressum/page.tsx
apps/shop-web/app/datenschutz/page.tsx
apps/shop-web/app/success/page.tsx
apps/shop-web/app/api/checkout/route.ts
apps/shop-web/app/api/webhooks/stripe/route.ts
apps/shop-web/lib/data.ts
apps/shop-web/lib/stripe.ts
apps/shop-web/components/Header.tsx
apps/shop-web/components/Hero.tsx
apps/shop-web/components/Manifesto.tsx
apps/shop-web/components/FeaturedProducts.tsx
apps/shop-web/components/ProductCard.tsx
apps/shop-web/components/BuyButton.tsx
apps/shop-web/components/BrandStory.tsx
apps/shop-web/components/Editorial.tsx
apps/shop-web/components/Newsletter.tsx
apps/shop-web/components/Footer.tsx
apps/shop-web/public/assets/*
apps/shop-web/SETUP-STRIPE.md
```

Known routes:

```text
/                  Shop landing page
/impressum         Legal placeholder page
/datenschutz       Privacy placeholder page
/success           Stripe success page
/api/checkout      Creates Stripe Checkout session
/api/webhooks/stripe Stripe webhook endpoint
```

Product model:

- Products are hardcoded in:

```text
apps/shop-web/lib/data.ts
```

Current products:

- `discobole` — Discobole Tee — CHF 55
- `olympionique` — Olympionique Tee — CHF 49
- `sports-club` — Sports Club Tee — CHF 45

Checkout model:

- `BuyButton.tsx` posts `{ items: [{ id, quantity: 1 }] }` to `/api/checkout`.
- `app/api/checkout/route.ts` looks up product data from `lib/data.ts`, creates Stripe Checkout line items in CHF/Rappen, collects shipping address, and redirects to Stripe.
- Stripe secret is loaded lazily in `lib/stripe.ts`, so the app can build without keys but checkout fails until `STRIPE_SECRET_KEY` is configured.
- Webhook setup is documented in `apps/shop-web/SETUP-STRIPE.md`.

Brand/design direction:

- Minimal, premium, editorial, black/white/stone palette.
- Slogan: `for the few.`
- Hero copy: small-batch sportswear for people who train alone.
- Product visuals live under `apps/shop-web/public/assets/`.

## 3. Docker/runtime

Root Docker Compose file:

```text
docker-compose.yml
```

Configured services:

```text
voyage-blog -> apps/public-web on host port 3001
voyage-shop -> apps/shop-web on host port 3002
```

Compose commands:

```bash
cd /mnt/ssd4tb/shared/projects/Voyage

docker compose up -d voyage-blog
docker compose up -d voyage-shop

docker compose logs -f voyage-blog
docker compose logs -f voyage-shop
```

LAN test URLs:

```text
http://192.168.178.53:3001  public-web
http://192.168.178.53:3002  shop-web
```

Local server smoke tests:

```bash
curl -I http://127.0.0.1:3001
curl -I http://127.0.0.1:3002
```

## 4. Current inspection results

Observed during this pass:

- `voyage-blog` container was running on port `3001`.
- `voyage-shop` container was running on port `3002`.
- Public site route checks:
  - `/` returned HTTP 200.
  - `/about` returned HTTP 200.
  - `/blog` returned HTTP 200.
  - `/collection/drop-01` returned HTTP 404.
- Public site build passed with `npm run build` inside `apps/public-web`.
- Shop had previously served HTTP 200, but after inspection/build attempt, `npm run build` in `apps/shop-web` failed with a permission error in `.next`:

```text
EACCES: permission denied, unlink 'apps/shop-web/.next/server/vendor-chunks/@swc.js'
```

Likely cause:

- `.next` was created/owned by a different user, probably the Docker container/root, and the host user could not unlink generated files.

Do not ignore this before production work. The clean fix is to remove or chown generated folders (`.next`, possibly `node_modules`) with the correct server permissions, then rebuild. This requires appropriate permission/approval.

## 5. Development commands

Public website:

```bash
cd /mnt/ssd4tb/shared/projects/Voyage/apps/public-web
npm install
npm run dev
npm run build
```

Shop:

```bash
cd /mnt/ssd4tb/shared/projects/Voyage/apps/shop-web
npm install
npm run dev
npm run build
```

Docker dev/runtime from root:

```bash
cd /mnt/ssd4tb/shared/projects/Voyage
docker compose up -d
```

## 6. Rules for future edits

- Keep `apps/public-web` and `apps/shop-web` logically separate.
- Do not edit `apps/public-web` when the task is only about the shop, unless explicitly asked.
- Do not edit `apps/shop-web` when the task is only about the public website, unless explicitly asked.
- Do not commit generated folders:

```text
node_modules/
.next/
dist/
build/
```

- Never commit secrets:

```text
.env
.env.local
.env.production
Stripe keys
Webhook secrets
```

- After meaningful edits, run at least:

```bash
npm run build
```

for the affected app.

- If Docker has created root-owned generated files, fix ownership/cleanup before judging build failures.

## 7. Near-term cleanup opportunities

1. Add/fix collection content for `/collection/drop-01`, or remove/change the homepage link.
2. Fix `apps/shop-web/.next` permission issue and verify `npm run build` again.
3. Add the missing monorepo path fixes to `apps/shop-web/next.config.ts` if the Next workspace-root warning persists.
4. Replace placeholder legal pages in `shop-web`.
5. Decide whether the shop should stay standalone on `shop.athespot.ch` or be integrated into the main public site navigation.
6. Add real Stripe environment variables only on the server/host, never in Git.
7. Decide whether `workspace-ui` and `workspace-api` are active apps or old leftovers.

## 8. Claude handoff prompt

Use the prompt in `CLAUDE_PROMPT.md` when asking Claude to edit the project.
