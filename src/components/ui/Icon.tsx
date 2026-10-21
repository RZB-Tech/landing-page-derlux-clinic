import Image from "next/image";
import { cn } from "@/lib/format";

/** SVG files in /public/icons (exported from the Figma «_Components / Icons» set, Feather style). */
export type IconName =
  | "arrow-right-accent"
  | "arrow-right-ink"
  | "arrow-right-on-dark"
  | "check-accent"
  | "check-accent-24"
  | "check-checkbox"
  | "check-on-dark"
  | "chevron-down"
  | "chevron-down-16"
  | "clock"
  | "dot-accent"
  | "facebook-accent"
  | "heart-accent"
  | "instagram-accent"
  | "mail-accent"
  | "map-pin-accent"
  | "minus-on-dark"
  | "phone-accent"
  | "phone-on-dark"
  | "plus-ink"
  | "send-accent"
  | "send-on-dark"
  | "shield-accent-20"
  | "shield-accent-24"
  | "star-16"
  | "star-18"
  | "users-accent"
  | "youtube-accent";

type IconProps = {
  name: IconName;
  size: number;
  className?: string;
};

export function Icon({ name, size, className }: IconProps) {
  return (
    <Image
      src={`/icons/${name}.svg`}
      width={size}
      height={size}
      alt=""
      aria-hidden
      unoptimized
      className={cn("block shrink-0", className)}
    />
  );
}
