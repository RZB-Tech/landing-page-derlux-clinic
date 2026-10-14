import type { ReactNode } from "react";
import type { Link } from "@/data/types";
import { cn } from "@/lib/format";
import { AccentTitle } from "./AccentTitle";
import { Icon } from "./Icon";

export function Caption({ children, onDark, className }: { children: ReactNode; onDark?: boolean; className?: string }) {
  return (
    <p className={cn("text-caption font-medium uppercase", onDark ? "text-on-dark" : "text-accent", className)}>
      {children}
    </p>
  );
}

export function TextLink({ link, className }: { link: Link; className?: string }) {
  return (
    <a
      href={link.href}
      className={cn("group inline-flex items-center gap-2 text-label font-medium text-accent", className)}
    >
      {link.label}
      <Icon name="arrow-right-accent" size={18} className="transition-transform duration-200 group-hover:translate-x-0.5" />
    </a>
  );
}

type SectionHeadProps = {
  caption: string;
  title: string;
  lead?: string;
  link?: Link;
  /** Replaces the default right column (lead + link). */
  aside?: ReactNode;
  titleId?: string;
};

/** Section header: caption + accent title on the left, lead / link on the right (Figma «Head»). */
export function SectionHead({ caption, title, lead, link, aside, titleId }: SectionHeadProps) {
  const right =
    aside ??
    (lead || link ? (
      <div className={cn("flex flex-col items-start gap-5", lead && "xl:w-110")}>
        {lead && <p className="text-body text-graphite">{lead}</p>}
        {link && <TextLink link={link} />}
      </div>
    ) : null);

  return (
    <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
      <div className="flex flex-col items-start gap-4 xl:w-190">
        <Caption>{caption}</Caption>
        <AccentTitle text={title} id={titleId} />
      </div>
      {right}
    </div>
  );
}
