import { cn } from "@/lib/format";

type Size = "h1" | "h2" | "h3";

const base: Record<Size, string> = {
  h1: "text-display-h1-m md:text-display-h1",
  h2: "text-display-h2-m md:text-display-h2",
  h3: "text-display-h3",
};

const accent: Record<Size, string> = {
  h1: "text-display-h1-accent-m md:text-display-h1-accent",
  h2: "text-display-h2-accent-m md:text-display-h2-accent",
  h3: "text-display-h3-accent",
};

type AccentTitleProps = {
  /** Text with the accent word(s) wrapped in asterisks: «Цены известны *заранее*». */
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  size?: Size;
  /** Wrap in «guillemets» (Check-up program names). */
  quoted?: boolean;
  id?: string;
  className?: string;
};

/** Cormorant heading with one italic, slightly larger accent word — the landing's signature style. */
export function AccentTitle({ text, as: Tag = "h2", size = "h2", quoted, id, className }: AccentTitleProps) {
  const parts = text.split(/(\*[^*]+\*)/).filter(Boolean);
  return (
    <Tag id={id} className={cn("font-display font-medium", base[size], className)}>
      {quoted && "«"}
      {parts.map((part, i) =>
        part.startsWith("*") && part.endsWith("*") ? (
          <em key={i} className={cn("italic", accent[size])}>
            {part.slice(1, -1)}
          </em>
        ) : (
          part
        ),
      )}
      {quoted && "»"}
    </Tag>
  );
}
