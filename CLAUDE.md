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
- **No backend:** all content comes from typed mock data in `src/data/`. Components never hardcode content. Keep data shapes API-like so a real backend can replace them later. The one exception (2026-10-15): booking requests go to the clinic's Telegram chat through a Server Action.

## How the code is laid out

- `src/data/` — `types.ts` plus one module per content type; page copy in `home.ts`. Accent words in headings are marked `*like this*` and rendered italic by `AccentTitle`. Placeholder content is marked in comments (`TODO(clinic)` for facts the clinic must confirm).
- `src/components/ui/` — Figma components: `Button` (Primary/Secondary/Light/Dark), `Chip`, `Icon` (SVGs in `public/icons/`), `AccentTitle`, `SectionHead`; `Select` is our styled dropdown (WAI-ARIA select-only combobox) — use it instead of a native `<select>`, whose OS list cannot be styled.
- `src/components/sections/` — one file per Figma section, server components; the interactive parts are small `"use client"` files next to them.
- `src/components/booking/` — `BookingProvider` holds the booking selection for the whole page. Every «Записаться» is a `BookingTrigger` (`<a href="#booking">` that pre-fills the form), implementing the «короткие пути» from Figma step 1.3.
- Logo: the clinic's file is `public/images/logo.jpg` (stacked, on teal; also the JSON-LD `logo`). `src/lib/logo.ts` holds its paths, traced from that JPG, and the horizontal lockup the site uses: `Logo` draws it inline with the `logo-teal`/`logo-gold` tokens, generated images take `logoDataUri`/`logoMarkDataUri`, and `src/app/icon.svg` embeds the mark. If the clinic sends a vector logo, replace the paths and regenerate `icon.svg`.
- Tokens: `@theme` in `src/app/globals.css`. Line heights are Figma's ratios rounded to whole px, as Figma lays them out. `2xl` = 1440 (the design width); `xl` (1280) is the first desktop layout, so desktop rules must still fit 1280. Where CSS cannot reach (viewport, manifest, generated images) colours come from `src/lib/brand.ts` — keep it in sync with `@theme`.
- SEO: page copy for the title and description in `homeMeta` (`home.ts`); structured data in `src/lib/jsonld.ts` (WebSite + MedicalClinic + FAQPage graph, built from `src/data/`); `opengraph-image.tsx` and `apple-icon.tsx` are generated at build time with `ImageResponse`, using the TTF fonts in `assets/fonts/` (Satori cannot read the `next/font` WOFF2). Read files there by static paths — a dynamic `join(process.cwd(), x)` makes Turbopack trace the whole project.
- Booking requests: `BookingForm` calls the Server Action `submitBooking` (`src/actions/booking.ts`), which validates the input again, takes names and prices from `src/data/` by id and sends a Russian message through `src/lib/telegram.ts` (server-only). Spam (the hidden `website` honeypot filled, or submitted under 3 s after the form mounted) gets `ok: true` and is not sent. On failure the form shows an error with the clinic's phone; `booking_submit` is tracked only on success. Telegram is the only copy of a request. `D:\temp-pw\telegram-flow.js` runs the flow (`fast` tests the spam drop).
- Analytics: `src/lib/analytics.ts` (`trackGoal`) and `src/components/analytics/`. Goals: `booking_submit`, `phone_click`, `telegram_click`, `route_click`.
- With `cacheComponents` on, never read the current date during render on the server; `BookingProvider` and `NearestSlotCard` read it on the client via `useSyncExternalStore`. Dates are on the clinic's clock (Tashkent, UTC+5) for every visitor: `clinicToday` and `nearestSlot` in `src/lib/dates.ts`. The hero's «Ближайшая запись» is the first 30-minute slot `leadHours` (3) from now within `bookingHours`, skipping Sunday; the form adds that time to its chips and the server accepts any time on that grid.

## Checking against the design

`design/landing/v2-full.png` is the 1:1 target at 1440. Playwright's Chromium is installed under `%LOCALAPPDATA%\ms-playwright`; `D:\temp-pw` has `playwright-core` and the scripts used for full-page screenshots (`shoot.js`), section geometry (`measure.js`, `measure2.js`), horizontal overflow (`overflow.js`), the booking flow (`interact.js`) and analytics goals (`goals.js`, needs a build with test `NEXT_PUBLIC_GA_ID`/`NEXT_PUBLIC_YM_ID`). Run them against `next start`, not `next dev`.

## Deploy

- GitHub: https://github.com/aoqilov/derlux-clinic (private), branch `main`.
- Vercel project `derlux-clinic` (team aoqilovs-projects), connected to the repo: every push to `main` deploys to production at https://derlux-clinic.vercel.app; other branches get preview URLs.
- `siteUrl` (`src/lib/site.ts`) uses `NEXT_PUBLIC_SITE_URL`, else Vercel's production domain. When the clinic's own domain is attached, set `NEXT_PUBLIC_SITE_URL` in Vercel so canonical, sitemap and JSON-LD use it.
- Required Vercel env vars (server-only, never `NEXT_PUBLIC_`): `TELEGRAM_BOT_TOKEN` (from @BotFather) and `TELEGRAM_CHAT_ID` (the chat that receives bookings; a group id starts with `-100`). Locally they live in `.env.local` (gitignored). While unset, every booking shows the error state. Redeploy after changing them. To find the chat id: add the bot to the group (or press Start in its chat), send `/start`, then read `chat.id` from `https://api.telegram.org/bot<token>/getUpdates`.
- Optional Vercel env vars (nothing is rendered while unset): `GOOGLE_SITE_VERIFICATION` and `YANDEX_VERIFICATION` (Search Console / Yandex Webmaster «HTML tag» codes), `NEXT_PUBLIC_GA_ID` (`G-…`) and `NEXT_PUBLIC_YM_ID` (Metrika counter number). They are read at build time — redeploy after changing them.

## Commands

```bash
npm install        # C: is nearly full → npm install --cache "D:/temp-npm-cache"
npm run dev        # http://localhost:3000
npm run build
npm run lint
```
