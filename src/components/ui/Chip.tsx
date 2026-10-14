import { cn } from "@/lib/format";

/** Figma «_Components / Chip»: Default · Active · Accent. */
export type ChipState = "default" | "active" | "accent";

const states: Record<ChipState, string> = {
  default: "border-line-stone bg-white text-ink",
  // Same box as the bordered default chip, so toggling never shifts neighbours.
  active: "border-transparent bg-ink text-on-dark",
  accent: "border-transparent bg-accent-10 text-accent",
};

export function chipClassName(state: ChipState = "default", className?: string) {
  return cn(
    "inline-flex items-center rounded-full border px-4.5 py-2.5 text-label font-medium whitespace-nowrap transition-colors duration-200",
    states[state],
    className,
  );
}

export function Chip({ state = "default", className, children }: { state?: ChipState; className?: string; children: React.ReactNode }) {
  return <span className={chipClassName(state, className)}>{children}</span>;
}
