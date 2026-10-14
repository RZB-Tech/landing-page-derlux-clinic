import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Onest } from "next/font/google";
import { clinic } from "@/data/clinic";
import { siteUrl } from "@/lib/site";
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

const title = "Derlux Clinic — многопрофильная клиника в Ташкенте";
const description =
  "Дерматология, гинекология, эндокринология, УЗИ и анализы в одной клинике. Цены известны заранее, онлайн-запись за минуту. Ташкент, ул. Садыка Азимова, 46.";

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
    images: [{ url: "/images/hero.jpg", width: 520, height: 700, alt: clinic.name }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/images/hero.jpg"] },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#f6f2ec",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${onest.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  );
}
