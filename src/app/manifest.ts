import type { MetadataRoute } from "next";
import { getClinic } from "@/data/clinic";
import { brandColors } from "@/lib/brand";

// One manifest for the site, in the default language.
export default function manifest(): MetadataRoute.Manifest {
  const clinic = getClinic("ru");
  return {
    name: clinic.name,
    short_name: "Derlux",
    description: clinic.description,
    lang: "ru",
    start_url: "/",
    display: "browser",
    background_color: brandColors.milk,
    theme_color: brandColors.milk,
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
