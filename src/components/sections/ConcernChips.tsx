"use client";

import type { Concern } from "@/data/types";
import { useBooking } from "@/components/booking/BookingProvider";
import { BookingTrigger } from "@/components/booking/BookingTrigger";
import { chipClassName } from "@/components/ui/Chip";

/** Picking a concern pre-selects the matching direction in the booking form. */
export function ConcernChips({ concerns }: { concerns: Concern[] }) {
  const { selection } = useBooking();
  return (
    <ul className="flex flex-wrap gap-2.5">
      {concerns.map((concern) => {
        const active = selection.concernId === concern.id;
        return (
          <li key={concern.id}>
            <BookingTrigger
              preset={{ concernId: concern.id, directionId: concern.directionId }}
              aria-current={active}
              className={chipClassName(active ? "active" : "default", !active ? "hover:border-ink" : undefined)}
            >
              {concern.label}
            </BookingTrigger>
          </li>
        );
      })}
    </ul>
  );
}
