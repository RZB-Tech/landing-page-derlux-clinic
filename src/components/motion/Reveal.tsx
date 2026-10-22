"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/format";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger in ms, for siblings that enter together. */
  delay?: number;
  as?: "div" | "li" | "section" | "p" | "span";
};

/**
 * Fades and lifts its content once, when it scrolls into view. The content is in the HTML either
 * way (the hidden state is CSS-only and needs scripting), so crawlers and no-JS visitors see it.
 */
export function Reveal({ children, className, delay = 0, as: Tag = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      data-in={shown ? "" : undefined}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
      className={cn("reveal", className)}
    >
      {children}
    </Tag>
  );
}
