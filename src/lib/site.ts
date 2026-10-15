/**
 * Public origin of the site, used for canonical URLs, the sitemap, Open Graph and JSON-LD.
 * NEXT_PUBLIC_SITE_URL wins (set it once the clinic's domain is live); on Vercel it falls back
 * to the project's production domain.
 */
const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined;

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? vercelProduction ?? "http://localhost:3000").replace(/\/$/, "");

/**
 * Codes from Google Search Console and Yandex Webmaster («HTML tag» method), set in Vercel.
 * Not needed for Google once the clinic's domain is verified by DNS.
 */
export const siteVerification = {
  google: process.env.GOOGLE_SITE_VERIFICATION,
  yandex: process.env.YANDEX_VERIFICATION,
};
