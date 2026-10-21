import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { getClinic, primaryPhone } from "@/data/clinic";
import { hasLocale, locales } from "@/i18n/config";
import { brandColors } from "@/lib/brand";
import { logo, logoDataUri } from "@/lib/logo";

// Link preview (Telegram, WhatsApp, Facebook, search): the clinic's logo on the page background,
// with the address under it. Generated at build time, once per language. The alt text is static,
// so it is the brand name.
export const alt = "Derlux Clinic";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Static paths, so the build traces only these files.
const sansMedium = await readFile(join(process.cwd(), "assets/fonts/Onest-Medium.ttf"));
const logoSrc = logoDataUri({ name: brandColors.logoTeal, gold: brandColors.logoGold });
const logoWidth = 760;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const clinic = getClinic(lang);
  const { milk, ink, accent } = brandColors;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 64,
          width: "100%",
          height: "100%",
          background: milk,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- rendered by Satori, not the browser */}
        <img src={logoSrc} alt="" width={logoWidth} height={Math.round((logoWidth * logo.height) / logo.width)} />
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 10, height: 10, borderRadius: 5, background: accent }} />
          <span style={{ fontFamily: "Onest", fontWeight: 500, fontSize: 28, color: ink }}>
            {`${clinic.address.locality}, ${clinic.address.short} · ${primaryPhone.display}`}
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Onest", data: sansMedium, weight: 500, style: "normal" }],
    },
  );
}
