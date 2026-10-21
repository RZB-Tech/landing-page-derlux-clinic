import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Onest } from "next/font/google";
import { notFound } from "next/navigation";
import { clinicName } from "@/data/clinic";
import { getHome } from "@/data/home";
import { hasLocale, localeInfo, locales } from "@/i18n/config";
import { brandColors } from "@/lib/brand";
import { siteUrl, siteVerification } from "@/lib/site";
import { Analytics } from "@/components/analytics/Analytics";
import { IntroSplash } from "@/components/layout/IntroSplash";
import "../globals.css";

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

// Both languages are built ahead of time: «/» (Russian, served from `/ru` by `proxy.ts`) and «/uz».
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

// The share image comes from `opengraph-image.tsx` next to this file.
export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { title, description } = getHome(lang).homeMeta;
  const info = localeInfo[lang];
  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: `%s — ${clinicName}` },
    description,
    applicationName: clinicName,
    // Each language is its own page; hreflang links them as translations of one another.
    alternates: {
      canonical: info.path,
      languages: { ...Object.fromEntries(locales.map((l) => [localeInfo[l].htmlLang, localeInfo[l].path])), "x-default": "/" },
    },
    openGraph: {
      type: "website",
      locale: info.og,
      alternateLocale: locales.filter((l) => l !== lang).map((l) => localeInfo[l].og),
      url: info.path,
      siteName: clinicName,
      title,
      description,
    },
    twitter: { card: "summary_large_image", title, description },
    formatDetection: { telephone: false, email: false, address: false },
    verification: siteVerification,
  };
}

export const viewport: Viewport = {
  themeColor: brandColors.milk,
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    // suppressHydrationWarning: the intro splash's inline script may set data-intro-seen on <html>.
    <html lang={localeInfo[lang].htmlLang} className={`${onest.variable} ${cormorant.variable}`} suppressHydrationWarning>
      <body>
        <IntroSplash />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
