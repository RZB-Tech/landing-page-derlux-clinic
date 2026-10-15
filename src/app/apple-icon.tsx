import { ImageResponse } from "next/og";
import { brandColors } from "@/lib/brand";
import { logo, logoMarkDataUri } from "@/lib/logo";

// iOS home-screen icon: the logo mark, as in `icon.svg`, on a full square (iOS rounds the corners itself).
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const markHeight = 120;

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: brandColors.logoTeal,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- rendered by Satori, not the browser */}
        <img
          src={logoMarkDataUri(brandColors.logoGold)}
          alt=""
          width={Math.round((logo.mark.width * markHeight) / logo.mark.height)}
          height={markHeight}
        />
      </div>
    ),
    size,
  );
}
