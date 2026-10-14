@AGENTS.md

# CLAUDE.md

## What this is

Public marketing website for **Derlux Clinic**, built 1:1 from Figma:
https://www.figma.com/design/2Bc2Mqj0BDF79HTSSmd0g6/Derlux-Clinic (file key `2Bc2Mqj0BDF79HTSSmd0g6`).
Read the design through the `figma` MCP server (user scope). Save what you pull (node structure, screenshots, tokens) under `design/` so it is not fetched twice; Figma limits tool calls.

**Figma quota:** the account has a View seat — 20 MCP calls per month, all used on 2026-10-14. Start from `design/README.md` (what was pulled, node ids, how each section was built) before spending a call. The home page design is page `0:1` «5. Лендинг», frame v2 `40:222`; `get_metadata` without a node does not list that page.

## Decisions (agreed 2026-10-14)

- **Stack:** Next.js 16 App Router, TypeScript, Tailwind v4. Read `node_modules/next/dist/docs/` before using a Next API (see AGENTS.md).
- **SEO is a requirement:** server components by default, static generation, per-page `metadata`, `sitemap.ts`, `robots.ts`, JSON-LD for the clinic. Client components only where interaction needs them.
- **1:1 with Figma:** sizes, colors, spacing, typography, radii and shadows match the design exactly. Tokens come from Figma variables/styles into `@theme` in `globals.css`; no raw hex or arbitrary pixel values in components when a token exists.
- **Responsive:** Figma has desktop only. Tablet and mobile layouts are ours to design, reusing the desktop tokens and components.
- **No backend:** all content comes from typed mock data in `src/data/`. Components never hardcode content. Keep data shapes API-like so a real backend can replace them later.

## How the code is laid out

- `src/data/` — `types.ts` plus one module per content type; page copy in `home.ts`. Accent words in headings are marked `*like this*` and rendered italic by `AccentTitle`. Placeholder content is marked in comments (`TODO(clinic)` for facts the clinic must confirm).
- `src/components/ui/` — Figma components: `Button` (Primary/Secondary/Light/Dark), `Chip`, `Icon` (SVGs in `public/icons/`), `AccentTitle`, `SectionHead`; `Select` is our styled dropdown (WAI-ARIA select-only combobox) — use it instead of a native `<select>`, whose OS list cannot be styled.
- `src/components/sections/` — one file per Figma section, server components; the interactive parts are small `"use client"` files next to them.
- `src/components/booking/` — `BookingProvider` holds the booking selection for the whole page. Every «Записаться» is a `BookingTrigger` (`<a href="#booking">` that pre-fills the form), implementing the «короткие пути» from Figma step 1.3.
- Tokens: `@theme` in `src/app/globals.css`. Line heights are Figma's ratios rounded to whole px, as Figma lays them out. `2xl` = 1440 (the design width); `xl` (1280) is the first desktop layout, so desktop rules must still fit 1280.
- With `cacheComponents` on, never read the current date during render on the server; `BookingProvider` reads it on the client via `useSyncExternalStore`.

## Checking against the design

`design/landing/v2-full.png` is the 1:1 target at 1440. Playwright's Chromium is installed under `%LOCALAPPDATA%\ms-playwright`; `D:\temp-pw` has `playwright-core` and the scripts used for full-page screenshots (`shoot.js`), section geometry (`measure.js`, `measure2.js`), horizontal overflow (`overflow.js`) and the booking flow (`interact.js`). Run them against `next start`, not `next dev`.

## Deploy

- GitHub: https://github.com/aoqilov/derlux-clinic (private), branch `main`.
- Vercel project `derlux-clinic` (team aoqilovs-projects), connected to the repo: every push to `main` deploys to production at https://derlux-clinic.vercel.app; other branches get preview URLs.
- `siteUrl` (`src/lib/site.ts`) uses `NEXT_PUBLIC_SITE_URL`, else Vercel's production domain. When the clinic's own domain is attached, set `NEXT_PUBLIC_SITE_URL` in Vercel so canonical, sitemap and JSON-LD use it.

## Commands

```bash
npm install        # C: is nearly full → npm install --cache "D:/temp-npm-cache"
npm run dev        # http://localhost:3000
npm run build
npm run lint
```
