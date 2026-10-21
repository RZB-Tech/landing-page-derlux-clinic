import { cn } from "@/lib/format";
import { logo } from "@/lib/logo";

/** The clinic's logo as the horizontal lockup (`src/lib/logo.ts`): teal «DERLUX» on light, milk on dark. */
export function LogoArt({ onDark, className }: { onDark?: boolean; className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${logo.width} ${logo.height}`}
      width={logo.width}
      height={logo.height}
      fillRule="evenodd"
      aria-hidden
      className={cn("block w-auto", className)}
    >
      <path className="fill-logo-gold" d={logo.mark.d} />
      <g transform={`translate(${logo.wordmarkX} ${logo.wordmarkY})`}>
        <path className={onDark ? "fill-on-dark" : "fill-logo-teal"} d={logo.wordmark.name} />
        <path className="fill-logo-gold" d={logo.wordmark.sub} />
      </g>
    </svg>
  );
}

/**
 * The logo linking to the top of the page. The header logo grows only at 2xl: at 1280 a wider one
 * pushes «Check-up» in the nav onto two lines.
 */
export function Logo({ variant = "header", label, className }: { variant?: "header" | "footer"; label: string; className?: string }) {
  const onDark = variant === "footer";
  return (
    <a href="#top" aria-label={label} className={cn("w-fit shrink-0", className)}>
      <LogoArt onDark={onDark} className={onDark ? "h-12 xl:h-14" : "h-8 sm:h-10 2xl:h-12"} />
    </a>
  );
}
