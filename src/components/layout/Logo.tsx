import { cn } from "@/lib/format";

/** Temporary word mark «DERLUX clinic» until the clinic sends its logo (Figma «Logo (временный)»). */
export function Logo({ variant = "header", className }: { variant?: "header" | "footer"; className?: string }) {
  if (variant === "footer") {
    return (
      <a href="#top" aria-label="Derlux Clinic — наверх" className={cn("font-display text-logo-lg font-medium text-on-dark", className)}>
        DERLUX
      </a>
    );
  }
  return (
    <a href="#top" aria-label="Derlux Clinic — наверх" className={cn("flex flex-col font-medium whitespace-nowrap", className)}>
      <span className="font-display text-logo-m text-ink sm:text-logo">DERLUX</span>
      <span className="text-logo-sub-m text-graphite uppercase sm:text-logo-sub">clinic</span>
    </a>
  );
}
