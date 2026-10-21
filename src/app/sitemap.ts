import type { MetadataRoute } from "next";
import { localeInfo, locales } from "@/i18n/config";
import { siteUrl } from "@/lib/site";

// Bump when home page content changes. New pages (directions, doctors, prices) go here as they ship.
const contentUpdated = "2026-10-15";

// Each language is its own page; `alternates` tells search engines they are translations of each other.
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((l) => [localeInfo[l].htmlLang, `${siteUrl}${localeInfo[l].path}`]));
  return locales.map((locale) => ({
    url: `${siteUrl}${localeInfo[locale].path}`,
    lastModified: contentUpdated,
    changeFrequency: "weekly",
    priority: 1,
    alternates: { languages },
  }));
}
