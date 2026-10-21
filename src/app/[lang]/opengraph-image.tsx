import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { getClinic, primaryPhone } from "@/data/clinic";
import { getHome } from "@/data/home";
import { hasLocale, locales } from "@/i18n/config";
import { brandColors } from "@/lib/brand";
import { keepShortWords } from "@/lib/format";
import { logo, logoDataUri } from "@/lib/logo";

// Link preview (Telegram, WhatsApp, Facebook, search). Generated at build time from the hero copy,
// once per language. The alt text is static, so it is the brand name.
export const alt = "Derlux Clinic";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Static paths, so the build traces only these files.
const [display, displayItalic, sans, sansMedium, photo] = await Promise.all([
  readFile(join(process.cwd(), "assets/fonts/CormorantGaramond-Medium.ttf")),
  readFile(join(process.cwd(), "assets/fonts/CormorantGaramond-MediumItalic.ttf")),
  readFile(join(process.cwd(), "assets/fonts/Onest-Regular.ttf")),
  readFile(join(process.cwd(), "assets/fonts/Onest-Medium.ttf")),
  readFile(join(process.cwd(), "public/images/hero.jpg")),
]);
const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;
const logoSrc = logoDataUri({ name: brandColors.logoTeal, gold: brandColors.logoGold });
const logoHeight = 60;

/**
 * «Здоровая *кожа* …» → words with their accent flag, so the title wraps word by word. Splits on
 * plain spaces only: short words glued with a no-break space stay with the next word.
 */
function titleWords(text: string) {
  return text
    .split(/(\*[^*]+\*)/)
    .filter(Boolean)
    .flatMap((part) => {
      const accent = part.startsWith("*") && part.endsWith("*");
      return keepShortWords(part.replaceAll("*", ""))
        .split(/ +/)
        .filter(Boolean)
        .map((word) => ({ word, accent }));
    });
}

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const clinic = getClinic(lang);
  const { hero } = getHome(lang);
  const { milk, white, ink, graphite, accent } = brandColors;
  const [weekdays, sunday] = clinic.hours;

  return new ImageResponse(
    (
      <div style={{ position: "relative", display: "flex", width: "100%", height: "100%", padding: "64px 72px", background: milk }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 620 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- rendered by Satori, not the browser */}
          <img
            src={logoSrc}
            alt=""
            width={Math.round((logo.width * logoHeight) / logo.height)}
            height={logoHeight}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "baseline",
                fontFamily: "Cormorant",
                fontSize: 68,
                lineHeight: 1.05,
                letterSpacing: -0.68,
                color: ink,
              }}
            >
              {titleWords(hero.title).map(({ word, accent: isAccent }, i) => (
                <span key={i} style={{ marginRight: 16, ...(isAccent && { fontStyle: "italic", fontSize: 80 }) }}>
                  {word}
                </span>
              ))}
            </div>
            <div style={{ fontFamily: "Onest", fontSize: 26, lineHeight: 1.45, color: graphite }}>
              {keepShortWords(hero.lead)}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 10, height: 10, borderRadius: 5, background: accent }} />
            <span style={{ fontFamily: "Onest", fontWeight: 500, fontSize: 22, color: ink }}>
              {`${clinic.address.locality}, ${clinic.address.short} · ${primaryPhone.display}`}
            </span>
          </div>
        </div>

        {/* The hero arch: half-width round top, card radius at the bottom (`arch-hero`). */}
        {/* eslint-disable-next-line @next/next/no-img-element -- rendered by Satori, not the browser */}
        <img
          src={photoSrc}
          alt=""
          width={400}
          height={538}
          style={{
            position: "absolute",
            top: 46,
            right: 72,
            objectFit: "cover",
            borderTopLeftRadius: 200,
            borderTopRightRadius: 200,
            borderBottomLeftRadius: 28,
            borderBottomRightRadius: 28,
          }}
        />

        {/* Opening hours card over the arch's bottom-left corner — the hero photo is filled in there
            and must stay covered, as on the page. */}
        <div
          style={{
            position: "absolute",
            top: 416,
            left: 696,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            width: 284,
            padding: 24,
            borderRadius: 20,
            background: white,
            boxShadow: "0 16px 40px 0 rgba(28, 26, 26, 0.1)",
            fontFamily: "Onest",
          }}
        >
          <span style={{ fontWeight: 500, fontSize: 13, letterSpacing: 0.78, textTransform: "uppercase", color: graphite }}>
            {weekdays.label}
          </span>
          <span style={{ fontWeight: 500, fontSize: 34, color: ink }}>{weekdays.value}</span>
          <span style={{ fontSize: 17, lineHeight: 1.35, color: graphite }}>{keepShortWords(`${sunday.label} — ${sunday.value}`)}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Cormorant", data: display, weight: 500, style: "normal" },
        { name: "Cormorant", data: displayItalic, weight: 500, style: "italic" },
        { name: "Onest", data: sans, weight: 400, style: "normal" },
        { name: "Onest", data: sansMedium, weight: 500, style: "normal" },
      ],
    },
  );
}
