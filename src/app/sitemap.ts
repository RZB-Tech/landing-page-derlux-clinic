import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// Bump when home page content changes. New pages (directions, doctors, prices) go here as they ship.
const contentUpdated = "2026-10-15";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${siteUrl}/`, lastModified: contentUpdated, changeFrequency: "weekly", priority: 1 }];
}
