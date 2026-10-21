"use client";

import { useState } from "react";
import type { Clinic, Link } from "@/data/types";
import type { HomeCopy } from "@/data/home";
import { cn } from "@/lib/format";
import type { ReactNode } from "react";
import { buttonClassName } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

type MobileMenuProps = {
  nav: Link[];
  phone: Clinic["phones"][number];
  address: string;
  hours: string;
  copy: HomeCopy["headerCopy"];
  bookingHref: string;
  /** The language switcher, rendered on the server. */
  languageSwitch: ReactNode;
};

/** Below xl the nav collapses into this panel (the design has desktop only). */
export function MobileMenu({ nav, phone, address, hours, copy, bookingHref, languageSwitch }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="max-[359px]:ml-auto xl:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? copy.menuClose : copy.menuOpen}
        onClick={() => setOpen((v) => !v)}
        className="relative flex size-10 items-center justify-center rounded-full border border-line-stone bg-white sm:size-11"
      >
        <span className={cn("absolute h-px w-4.5 bg-ink transition-transform duration-200", open ? "rotate-45" : "-translate-y-1.5")} />
        <span className={cn("absolute h-px w-4.5 bg-ink transition-opacity duration-200", open && "opacity-0")} />
        <span className={cn("absolute h-px w-4.5 bg-ink transition-transform duration-200", open ? "-rotate-45" : "translate-y-1.5")} />
      </button>

      <div
        id="mobile-menu"
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-line-soft bg-milk shadow-float"
      >
        <nav aria-label={copy.mobileNav} className="page-x flex flex-col gap-8 py-8">
          <ul className="flex flex-col gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={close} className="block py-2 font-display text-display-h3 text-ink">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-4 border-t border-line-soft pt-6">
            <a href={`tel:${phone.e164}`} onClick={close} className="flex items-center gap-2 text-title font-semibold text-ink">
              <Icon name="phone-accent" size={18} />
              {phone.display}
            </a>
            <p className="text-small text-graphite">
              {address} · {hours}
            </p>
            <a href={bookingHref} onClick={close} className={buttonClassName({ fullWidth: true })}>
              {copy.cta}
            </a>
            <div className="flex items-center justify-between gap-4 border-t border-line-soft pt-6 lg:hidden">
              <span className="text-small text-graphite">{copy.languageLabel}</span>
              {languageSwitch}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
