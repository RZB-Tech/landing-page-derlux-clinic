"use client";

import { createContext, use, useCallback, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import type { Doctor } from "@/data/types";
import { clinicToday, upcomingWorkingDays, type BookingDay } from "@/lib/dates";

/**
 * Shared booking selection. Every «Записаться» on the page (hero bar, concern chips, price rows,
 * doctor cards, Check-up, promos) pre-fills it and jumps to the form — the «short paths» from
 * Figma «1.3 Ключевой сценарий записи».
 */
export type BookingSelection = {
  directionId: string | null;
  checkupId: string | null;
  /** «Не знаю — подскажите»: request without a direction, the administrator will advise. */
  unsure: boolean;
  concernId: string | null;
  serviceId: string | null;
  /** null = any doctor. */
  doctorId: string | null;
  /** null = the first available day. */
  dateIso: string | null;
  time: string | null;
};

export type BookingPreset = Partial<Omit<BookingSelection, "unsure">> & { unsure?: boolean };

type BookingContextValue = {
  selection: BookingSelection;
  days: BookingDay[];
  /** Effective day: the chosen one, or the first available. */
  day: BookingDay | null;
  update: (preset: BookingPreset) => void;
  reset: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

// Matches the design's default state: dermatology, «Акне и постакне», any doctor, today.
const initialSelection: BookingSelection = {
  directionId: "dermatology",
  checkupId: null,
  unsure: false,
  concernId: "acne",
  serviceId: null,
  doctorId: null,
  dateIso: null,
  time: null,
};

const noopSubscribe = () => () => {};
// The clinic's date, so the days match the hero's «Ближайшая запись» for visitors in any time zone.
const todayKey = () => clinicToday(new Date()).toDateString();

function applyPreset(prev: BookingSelection, preset: BookingPreset, doctors: Doctor[]): BookingSelection {
  const next: BookingSelection = { ...prev, ...preset };

  if (preset.checkupId) {
    Object.assign(next, { directionId: null, unsure: false, serviceId: null, doctorId: null, concernId: null });
  } else if (preset.unsure) {
    Object.assign(next, { directionId: null, checkupId: null, serviceId: null, doctorId: null, concernId: null });
  } else if (preset.directionId) {
    next.checkupId = null;
    next.unsure = false;
    if (preset.serviceId === undefined && prev.directionId !== preset.directionId) next.serviceId = null;
    if (preset.concernId === undefined && prev.directionId !== preset.directionId) next.concernId = null;
  }

  if (next.doctorId) {
    const doctor = doctors.find((d) => d.id === next.doctorId);
    if (doctor) {
      if (preset.doctorId && (!next.directionId || !doctor.directionIds.includes(next.directionId))) {
        // Picked a doctor first: follow them to their direction.
        next.directionId = doctor.directionIds[0];
        next.checkupId = null;
        next.unsure = false;
      } else if (next.directionId && !doctor.directionIds.includes(next.directionId)) {
        next.doctorId = null;
      }
    }
    if (next.checkupId || next.unsure) next.doctorId = null;
  }
  return next;
}

export function BookingProvider({
  doctors,
  daysAhead,
  children,
}: {
  doctors: Doctor[];
  daysAhead: number;
  children: ReactNode;
}) {
  const [selection, setSelection] = useState<BookingSelection>(initialSelection);

  // The date is read on the client only, so prerendered HTML stays static.
  const today = useSyncExternalStore(noopSubscribe, todayKey, () => null);
  const days = useMemo(() => (today ? upcomingWorkingDays(new Date(today), daysAhead) : []), [today, daysAhead]);
  const day = days.find((d) => d.iso === selection.dateIso) ?? days[0] ?? null;

  const update = useCallback(
    (preset: BookingPreset) => setSelection((prev) => applyPreset(prev, preset, doctors)),
    [doctors],
  );
  const reset = useCallback(() => setSelection(initialSelection), []);

  const value = useMemo(() => ({ selection, days, day, update, reset }), [selection, days, day, update, reset]);
  return <BookingContext value={value}>{children}</BookingContext>;
}

export function useBooking() {
  const ctx = use(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside <BookingProvider>");
  return ctx;
}
