"use client";

import { useMemo, useSyncExternalStore } from "react";
import type { HomeCopy } from "@/data/home";
import type { NearestSlot, WorkingHours } from "@/data/types";
import type { Locale } from "@/i18n/config";
import { nearestSlot as findNearestSlot } from "@/lib/dates";
import { cn } from "@/lib/format";
import { BookingTrigger } from "@/components/booking/BookingTrigger";
import { buttonClassName } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

// Re-read the clock every half minute, so a page left open moves on to the next slot.
const subscribe = (onChange: () => void) => {
  const id = setInterval(onChange, 30_000);
  return () => clearInterval(id);
};
const currentMinute = () => Math.floor(Date.now() / 60_000);

type NearestSlotCardProps = {
  locale: Locale;
  offer: NearestSlot;
  hours: WorkingHours;
  copy: HomeCopy["nearestSlotCopy"];
  className: string;
};

/**
 * Hero card «Ближайшая запись»: the first slot `leadHours` from now on the clinic's clock. The page
 * is prerendered, so the time is computed on the client; until then the text holds its place hidden.
 */
export function NearestSlotCard({ locale, offer, hours, copy, className }: NearestSlotCardProps) {
  const minute = useSyncExternalStore(subscribe, currentMinute, () => null);
  const slot = useMemo(
    () => (minute === null ? null : findNearestSlot(new Date(minute * 60_000), offer.leadHours, hours, locale)),
    [minute, offer.leadHours, hours, locale],
  );

  return (
    <div className={className}>
      <p className="flex items-center gap-2 text-caption font-medium text-graphite uppercase">
        <Icon name="dot-accent" size={8} />
        {copy.caption}
      </p>
      <p className={cn("text-title font-semibold whitespace-nowrap text-ink", !slot && "invisible")}>
        {slot ? `${slot.dayLabel}, ${slot.time}` : copy.placeholder}
      </p>
      <p className="text-small text-graphite min-[360px]:whitespace-nowrap">{copy.note}</p>
      <BookingTrigger
        preset={{ directionId: offer.directionId, dateIso: slot?.iso ?? null, time: slot?.time ?? null }}
        className={buttonClassName({ variant: "primary", className: "max-[359px]:px-5" })}
      >
        {copy.cta}
      </BookingTrigger>
    </div>
  );
}
