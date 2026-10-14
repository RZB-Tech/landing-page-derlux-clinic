"use client";

import type { ReactNode } from "react";
import { bookingHref } from "@/data/clinic";
import { useBooking, type BookingPreset } from "./BookingProvider";

type BookingTriggerProps = {
  preset?: BookingPreset;
  className: string;
  children: ReactNode;
  "aria-current"?: boolean;
};

/**
 * «Записаться» link: pre-fills the booking form and scrolls to it. A plain #booking anchor,
 * so it still works before hydration.
 */
export function BookingTrigger({ preset, className, children, ...rest }: BookingTriggerProps) {
  const { update } = useBooking();
  return (
    <a href={bookingHref} className={className} onClick={() => preset && update(preset)} {...rest}>
      {children}
    </a>
  );
}
