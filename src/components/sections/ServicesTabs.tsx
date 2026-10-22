"use client";

import Image from "next/image";
import { useState } from "react";
import type { Direction, Service } from "@/data/types";
import type { Locale } from "@/i18n/config";
import { cn, formatAmount, formatPriceFrom } from "@/lib/format";
import { BookingTrigger } from "@/components/booking/BookingTrigger";
import { Icon } from "@/components/ui/Icon";

type ServicesTabsProps = {
  locale: Locale;
  directions: Direction[];
  services: Service[];
  copy: { cta: string; durationUnit: string; tabsLabel: string };
};

const currency = (locale: Locale) => (locale === "uz" ? "so'mdan" : "сум");

/**
 * Picker of directions (thumbnail + name) on the left, a short price list on the right. Rows are
 * compact on purpose: name, time and price on one line.
 */
export function ServicesTabs({ locale, directions, services, copy }: ServicesTabsProps) {
  const [activeId, setActiveId] = useState(directions[0]?.id);

  return (
    <div className="grid gap-4 xl:grid-cols-[22rem_1fr] xl:gap-6">
      <div
        role="tablist"
        aria-label={copy.tabsLabel}
        aria-orientation="vertical"
        className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 md:-mx-10 md:px-10 xl:mx-0 xl:flex-col xl:gap-1.5 xl:overflow-visible xl:px-0"
      >
        {directions.map((d) => {
          const active = d.id === activeId;
          return (
            <button
              key={d.id}
              type="button"
              role="tab"
              id={`prices-tab-${d.id}`}
              aria-selected={active}
              aria-controls={`prices-panel-${d.id}`}
              onClick={() => setActiveId(d.id)}
              className={cn(
                "group flex shrink-0 items-center gap-3 rounded-full p-1.5 pr-5 text-left transition-all duration-300 xl:rounded-tile xl:pr-4",
                active ? "bg-accent text-on-dark shadow-bar" : "bg-white/60 text-ink hover:bg-white",
              )}
            >
              <span className="relative size-10 shrink-0 overflow-hidden rounded-full xl:size-12 xl:rounded-field">
                <Image src={d.image.src} alt="" fill sizes="48px" className="object-cover" />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="text-label font-semibold whitespace-nowrap xl:whitespace-normal">{d.shortName}</span>
                <span className={cn("hidden text-label-sm xl:block", active ? "text-on-dark/75" : "text-graphite")}>
                  {formatPriceFrom(d.priceFrom, locale)}
                </span>
              </span>
              <Icon
                name={active ? "arrow-right-on-dark" : "arrow-right-ink"}
                size={18}
                className={cn("ml-auto hidden transition-transform duration-300 xl:block", !active && "opacity-0 group-hover:opacity-100")}
              />
            </button>
          );
        })}
      </div>

      {/* All panels stay in the HTML (hidden when inactive) so every price is indexable. */}
      {directions.map((d) => (
        <div
          key={d.id}
          role="tabpanel"
          id={`prices-panel-${d.id}`}
          aria-labelledby={`prices-tab-${d.id}`}
          hidden={d.id !== activeId}
          className="flex flex-col gap-3"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="relative size-24 overflow-hidden rounded-tile shadow-bar">
              <Image src={d.image.src} alt={d.image.alt} fill sizes="96px" className="object-cover" />
            </div>
            <p className="w-full rounded-full bg-white/70 px-5 py-2.5 text-center font-display text-display-h3 text-ink">{d.name}</p>
          </div>
          <ul className="flex flex-1 flex-col rounded-card bg-white px-4 py-2 md:px-6">
            {services
              .filter((s) => s.directionId === d.id)
              .map((s) => (
                <li
                  key={s.id}
                  className="group flex items-center gap-3 flex-1 border-b border-line-soft py-3 last:border-b-0 md:gap-5"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-label font-medium text-ink">{s.name}</p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-label-sm text-graphite">
                      <Icon name="clock" size={14} />
                      {s.durationMin} {copy.durationUnit}
                    </p>
                  </div>
                  <p className="text-right text-label font-semibold whitespace-nowrap text-ink">
                    {formatAmount(s.price.from)}
                    <span className="text-label-sm font-normal text-graphite"> {currency(locale)}</span>
                  </p>
                  <BookingTrigger
                    preset={{ directionId: d.id, serviceId: s.id }}
                    aria-label={`${copy.cta}: ${s.name}`}
                    className="shrink-0 rounded-full bg-accent-10 p-2.5 transition-colors duration-200 group-hover:bg-accent group-hover:[&_img]:brightness-0 group-hover:[&_img]:invert"
                  >
                    <Icon name="arrow-right-accent" size={16} />
                  </BookingTrigger>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
