# SEO — what is done on the site

Short reference of everything built for search engines and link previews, with the file where each
piece lives. Update it when SEO changes.

## 1. Rendering

- **Static generation.** Both languages and every direction page are prerendered at build time
  (`generateStaticParams` in `src/app/[lang]/layout.tsx` and `src/app/[lang]/directions/[slug]/page.tsx`).
  Crawlers get complete HTML, no JavaScript needed.
- **Server components by default.** Client components (`"use client"`) are used only for interaction:
  the booking form, dropdowns, the intro splash. All text content is in the server HTML.
- Next.js 16 with `cacheComponents`; the current date is never read on the server, so pages stay static.

## 2. Languages and URLs

| Language | Home | Direction page |
| --- | --- | --- |
| Russian (default) | `/` | `/directions/<slug>` |
| Uzbek (Latin) | `/uz` | `/uz/directions/<slug>` |

- Russian lives at the root; `src/proxy.ts` serves it from the internal `/ru` route and 308-redirects
  `/ru…` back, so every page has **one** address (no duplicate content).
- Each language is its own page with its own title, description, canonical, Open Graph image and JSON-LD.
- `<html lang>` is set per language (`ru`, `uz-Latn`, from `src/i18n/config.ts`).
- Paths come from one place, `src/lib/routes.ts`.

## 3. Metadata (`<head>`)

Built in `generateMetadata` (`src/app/[lang]/layout.tsx`, and the direction page for its own values).

- **Title and description** per language — page copy in `homeMeta` (`src/data/home.ts`). Direction pages
  use templates from `directionPage.metaTitle` / `metaDescription` filled with the direction's name,
  description and the clinic address. Title template for inner pages: `%s — Derlux Clinic`.
- **Canonical** — the page's own path, `metadataBase` is the site URL.
- **hreflang** — `ru`, `uz-Latn` and `x-default` (Russian) link each page to its translation.
- **Open Graph and Twitter cards** (`summary_large_image`): type, locale + alternate locale, url, site
  name, title, description, image.
- `formatDetection` off, so mobile browsers do not turn text into phone/address links.
- `applicationName`, `viewport.themeColor` (brand colour).
- **Search-engine verification** — `GOOGLE_SITE_VERIFICATION`, `YANDEX_VERIFICATION` (optional env vars,
  `src/lib/site.ts`). Rendered only when set.

## 4. Crawling files

- `src/app/sitemap.ts` → `/sitemap.xml`: home and all direction pages in both languages, each with
  `alternates.languages` (hreflang), `lastModified`, `changeFrequency` and `priority`
  (home 1, directions 0.8). Bump `contentUpdated` there when content changes.
- `src/app/robots.ts` → `/robots.txt`: allows everything, points to the sitemap and sets `host`.
- `src/app/manifest.ts` → web manifest (name, theme colour, icons).

## 5. Structured data (JSON-LD) — `src/lib/jsonld.ts`

Built from `src/data/`, so it always matches what is on the page.

- **Home page**: one `@graph` with
  - `WebSite` (site name for the search result),
  - `MedicalClinic` (address, geo, phone, e-mail, opening hours, price range, services, specialties,
    logo, map link, `sameAs` social profiles),
  - `FAQPage` (the FAQ section, question by question).
- **Direction pages**: `BreadcrumbList` (Home → Directions → page) and `Service` with the «from» price
  as `Offer`, linked to the clinic by `@id`.
- Safe serialisation (`<` is escaped) in `toJsonLdScript`.
- Reviews and a rating are **deliberately not marked up**: the reviews on the page are examples. Add them
  only when real, published reviews exist (fake review markup can lead to a Google penalty).

## 6. Link previews and icons

- `src/app/[lang]/opengraph-image.tsx` — 1200×630 share image (logo on the brand background + address),
  generated at build time for each language. Direction pages use their own photo as the share image.
- `src/app/apple-icon.tsx` (180×180) and `src/app/icon.svg` (favicon) from the clinic logo.
- Fonts for the generated images are TTF files in `assets/fonts/` (Satori cannot read `next/font` WOFF2).

## 7. Page content and semantics

- One `<h1>` per page (hero on the home page, the direction name on a direction page); sections use
  `<h2>`/`<h3>` in order.
- Landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`, sections with `aria-labelledby`.
- Direction pages have a breadcrumb `<nav>` (`aria-current="page"`) matching the `BreadcrumbList` markup.
- Direction pages are linked from the home page and from each other («Другие направления»), so crawlers
  reach all of them through plain `<a href>` links.
- Images use `next/image` with `alt` text from the data files; the hero and direction image are
  preloaded; `sizes` are set so mobile gets small files.
- Fonts (`next/font`) are self-hosted with `display: swap` — no layout shift or blocking request.
- Phone numbers are `tel:` links, the address and map are real text and links, not images.

## 8. Analytics (for measuring SEO)

`src/lib/analytics.ts` and `src/components/analytics/`: Google Analytics and Yandex Metrika, loaded only
when `NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_YM_ID` are set. Goals: `booking_submit`, `phone_click`,
`telegram_click`, `route_click`.

## 9. To do before / after launch

- [ ] Attach the clinic's own domain and set `NEXT_PUBLIC_SITE_URL` in Vercel, then redeploy — canonical,
  sitemap, hreflang, Open Graph and JSON-LD all use it. Until then they point to the Vercel domain.
- [ ] Verify the site in **Google Search Console** and **Yandex Webmaster** (env vars above, or DNS), submit
  `/sitemap.xml`.
- [ ] Set `NEXT_PUBLIC_GA_ID` and `NEXT_PUBLIC_YM_ID` if analytics is wanted.
- [ ] Clinic confirms the facts marked `TODO(clinic)` (address, hours, phone, e-mail, founding year, price
  range) — they go straight into JSON-LD.
- [ ] A native speaker proofreads the Uzbek title/description.
- [ ] Add real reviews and the clinic's social profiles (`profiles` in `src/data/clinic.ts`) →
  `sameAs`, then review markup.
- [ ] Create / claim the **Google Business Profile** and the Yandex Business listing with the same name,
  address and phone as in the JSON-LD.
- [ ] If the hidden blocks (doctors, services and prices, check-ups) come back, add them to the sitemap
  and to JSON-LD (`Physician`, `Offer` per service).
- [ ] After launch: check the pages in the Rich Results Test and the Search Console coverage report.
