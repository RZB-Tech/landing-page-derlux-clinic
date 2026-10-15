import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Onest } from "next/font/google";
import { clinic } from "@/data/clinic";
import { homeMeta } from "@/data/home";
import { brandColors } from "@/lib/brand";
import { siteUrl, siteVerification } from "@/lib/site";
import { Analytics } from "@/components/analytics/Analytics";
import "./globals.css";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["cyrillic", "latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["cyrillic", "latin"],
  weight: "500",
  style: ["normal", "italic"],
  display: "swap",
});

const { title, description } = homeMeta;

// The share image comes from `opengraph-image.tsx` next to this file.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s — ${clinic.name}` },
  description,
  applicationName: clinic.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "/",
    siteName: clinic.name,
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  formatDetection: { telephone: false, email: false, address: false },
  verification: siteVerification,
};

export const viewport: Viewport = {
  themeColor: brandColors.milk,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${onest.variable} ${cormorant.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
