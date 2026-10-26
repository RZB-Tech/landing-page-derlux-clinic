import type { MetadataRoute } from "next";
import { getDirections } from "@/data/directions";
import { localeInfo, locales } from "@/i18n/config";
import { directionPath } from "@/lib/routes";
import { siteUrl } from "@/lib/site";

// Bump when page content changes. New pages (doctors, prices) go here as they ship.
const contentUpdated = "2026-10-26";

// Each language is its own page; `alternates` tells search engines they are translations of each other.
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((l) => [localeInfo[l].htmlLang, `${siteUrl}${localeInfo[l].path}`]));
  const home = locales.map((locale) => ({
    url: `${siteUrl}${localeInfo[locale].path}`,
    lastModified: contentUpdated,
    changeFrequency: "weekly" as const,
    priority: 1,
    alternates: { languages },
  }));
  const directions = getDirections("ru").flatMap(({ slug }) => {
    const languages = Object.fromEntries(locales.map((l) => [localeInfo[l].htmlLang, `${siteUrl}${directionPath(l, slug)}`]));
    return locales.map((locale) => ({
      url: `${siteUrl}${directionPath(locale, slug)}`,
      lastModified: contentUpdated,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: { languages },
    }));
  });
  return [...home, ...directions];
}
