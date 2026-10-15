import type { MetadataRoute } from "next";
import { clinic } from "@/data/clinic";
import { brandColors } from "@/lib/brand";

export default function manifest(): MetadataRoute.Manifest {
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
