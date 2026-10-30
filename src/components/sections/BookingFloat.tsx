"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/format";
import { Icon } from "@/components/ui/Icon";

type BookingFloatProps = {
  copy: { label: string; close: string };
  /** The section's caption, title and lead, rendered on the server. */
  intro: ReactNode;
  /** A second `BookingForm`: it shares the selection with the one in the section. */
  children: ReactNode;
};

/**
 * Round «Записаться» button fixed at the bottom right (not in Figma). It opens the «Онлайн-запись» form in
 * a dialog with the section's look. It hides over the hero and while the section itself is on screen.
 */
export function BookingFloat({ copy, intro, children }: BookingFloatProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  // Hidden until the hero (`data-hero`) has scrolled away and while the booking section is on screen.
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const targets = [document.querySelector("[data-hero]"), document.getElementById("booking")].filter(
      (el): el is Element => el !== null,
    );
    const onScreen = new Map<Element, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) onScreen.set(entry.target, entry.isIntersecting);
        setHidden([...onScreen.values()].some(Boolean));
      },
      { threshold: 0.05 },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        aria-haspopup="dialog"
        aria-hidden={hidden}
        tabIndex={hidden ? -1 : 0}
        className={cn(
          "group fixed right-4 bottom-4 z-40 flex items-center gap-3 rounded-full bg-accent p-2 text-on-dark shadow-float transition-all duration-300 hover:bg-accent/90 md:right-8 md:bottom-8 md:pl-6",
          hidden && "pointer-events-none translate-y-4 opacity-0",
        )}
      >
        <span className="sr-only text-label font-semibold md:not-sr-only">{copy.label}</span>
        <span className="flex size-11 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:rotate-45">
          <Icon name="arrow-right-on-dark" size={20} className="-rotate-45" />
        </span>
      </button>

      <dialog
        ref={dialogRef}
        aria-label={copy.label}
        onClick={(e) => e.target === dialogRef.current && close()}
        className="dialog-in m-auto max-h-[92dvh] w-[min(64rem,calc(100%-1.5rem))] overflow-hidden rounded-[32px] lg:overflow-visible bg-accent p-0 text-on-dark backdrop:bg-ink/60 backdrop:backdrop-blur-sm"
      >
        <div className="relative flex max-h-[92dvh] flex-col gap-8 overflow-y-auto lg:overflow-visible p-5 pt-16 md:px-10 md:pb-10 lg:flex-row lg:items-center lg:gap-10">
          <button
            type="button"
            onClick={close}
            aria-label={copy.close}
            className="absolute top-4 right-4 z-10 flex size-11 items-center justify-center rounded-full bg-white text-ink shadow-bar transition-transform duration-200 hover:rotate-90"
          >
            <span aria-hidden className="text-2xl leading-none">
              ×
            </span>
          </button>
          <div className="flex flex-col items-start gap-5 lg:flex-1">{intro}</div>
          <div className="w-full lg:w-135 lg:shrink-0">{children}</div>
        </div>
      </dialog>
    </>
  );
}
