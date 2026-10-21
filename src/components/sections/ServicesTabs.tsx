"use client";

import { useState } from "react";
import type { Direction, Service } from "@/data/types";
import type { Locale } from "@/i18n/config";
import { cn, formatPriceFrom } from "@/lib/format";
import { BookingTrigger } from "@/components/booking/BookingTrigger";
import { buttonClassName } from "@/components/ui/Button";
import { chipClassName } from "@/components/ui/Chip";
import { Icon } from "@/components/ui/Icon";

type ServicesTabsProps = {
  locale: Locale;
  directions: Direction[];
  services: Service[];
  copy: { cta: string; durationUnit: string; tabsLabel: string };
};

export function ServicesTabs({ locale, directions, services, copy }: ServicesTabsProps) {
  const [activeId, setActiveId] = useState(directions[0]?.id);

  return (
    <div className="flex flex-col gap-10 md:gap-12 xl:gap-18">
      <div
        role="tablist"
        aria-label={copy.tabsLabel}
        className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 md:-mx-10 md:px-10 xl:mx-0 xl:flex-wrap xl:px-0"
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
              className={chipClassName(active ? "active" : "default", cn("shrink-0", !active && "hover:border-ink"))}
            >
              {d.shortName}
            </button>
          );
        })}
      </div>

      {/* All panels stay in the HTML (hidden when inactive) so every price is indexable. */}
      {directions.map((d) => (
        <ul
          key={d.id}
          role="tabpanel"
          id={`prices-panel-${d.id}`}
          aria-labelledby={`prices-tab-${d.id}`}
          hidden={d.id !== activeId}
          className="flex flex-col rounded-card bg-white px-5 py-2 md:px-10"
        >
          {services
            .filter((s) => s.directionId === d.id)
            .map((s) => (
              <li
                key={s.id}
                className="flex flex-col gap-4 border-b border-line-soft py-5 last:border-b-0 md:py-6 lg:flex-row lg:items-center lg:gap-8 lg:py-7.5"
              >
                <p className="min-w-0 text-title font-semibold text-ink lg:flex-1 xl:w-140 xl:flex-initial">{s.name}</p>
                <div className="hidden flex-1 xl:block" />
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between lg:contents">
                  <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 sm:flex-col sm:flex-nowrap sm:items-start sm:gap-1 lg:contents">
                    <p className="flex items-center gap-1.5 text-small whitespace-nowrap text-graphite lg:w-27.5 lg:shrink-0">
                      <Icon name="clock" size={16} />
                      {s.durationMin} {copy.durationUnit}
                    </p>
                    <p className="text-title font-semibold whitespace-nowrap text-ink lg:w-50 lg:shrink-0 lg:text-right">
                      {formatPriceFrom(s.price, locale)}
                    </p>
                  </div>
                  <BookingTrigger
                    preset={{ directionId: d.id, serviceId: s.id }}
                    className={buttonClassName({ variant: "secondary", className: "shrink-0 max-sm:w-full" })}
                  >
                    {copy.cta}
                  </BookingTrigger>
                </div>
              </li>
            ))}
        </ul>
      ))}
    </div>
  );
}
