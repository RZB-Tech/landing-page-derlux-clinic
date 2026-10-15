import type { WorkingHours } from "@/data/types";

const WEEKDAYS_SHORT = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
const WEEKDAYS = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
const MONTHS_GENITIVE = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];
const MONTHS_SHORT = ["янв", "фев", "мар", "апр", "мая", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];

export type BookingDay = {
  /** ISO date, e.g. "2026-10-14". */
  iso: string;
  /** «Вт 14» — date chips. */
  chip: string;
  /** «14 октября» — submit button, confirmation. */
  long: string;
  /** «Сегодня, 14 окт» / «Чт, 16 окт» — compact selects. */
  short: string;
};

function toIso(d: Date): string {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

/**
 * Next `count` working days starting today. Sunday is skipped: the clinic sees patients
 * on Sundays only by prior arrangement (Пн–Сб 9:00–19:00).
 * Call on the client only — it reads the current date.
 */
export function upcomingWorkingDays(from: Date, count: number): BookingDay[] {
  const days: BookingDay[] = [];
  const cursor = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  let offset = 0;
  while (days.length < count) {
    if (cursor.getDay() !== 0) {
      const dd = cursor.getDate();
      const prefix = offset === 0 ? "Сегодня" : offset === 1 ? "Завтра" : WEEKDAYS_SHORT[cursor.getDay()];
      days.push({
        iso: toIso(cursor),
        chip: `${WEEKDAYS_SHORT[cursor.getDay()]} ${dd}`,
        long: `${dd} ${MONTHS_GENITIVE[cursor.getMonth()]}`,
        short: `${prefix}, ${dd} ${MONTHS_SHORT[cursor.getMonth()]}`,
      });
    }
    cursor.setDate(cursor.getDate() + 1);
    offset += 1;
  }
  return days;
}

/** Tashkent is UTC+5 all year (no daylight saving). */
const CLINIC_UTC_OFFSET_MS = 5 * 60 * 60 * 1000;
const MINUTE_MS = 60 * 1000;
const DAY_MS = 24 * 60 * MINUTE_MS;

/** «9:30» → 570. */
export function toMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function toTime(minutes: number): string {
  return `${Math.floor(minutes / 60)}:${String(minutes % 60).padStart(2, "0")}`;
}

/** Today on the clinic's clock, as local midnight — the form for `upcomingWorkingDays`. */
export function clinicToday(now: Date): Date {
  const clinic = new Date(now.getTime() + CLINIC_UTC_OFFSET_MS);
  return new Date(clinic.getUTCFullYear(), clinic.getUTCMonth(), clinic.getUTCDate());
}

/** A start time on the slot grid inside working hours, e.g. «14:30» for 9:00–19:00 in 30-minute steps. */
export function isBookableTime(time: string, hours: WorkingHours): boolean {
  if (!/^\d{1,2}:\d{2}$/.test(time)) return false;
  const minutes = toMinutes(time);
  return (
    minutes >= toMinutes(hours.opens) &&
    minutes <= toMinutes(hours.closes) - hours.stepMinutes &&
    (minutes - toMinutes(hours.opens)) % hours.stepMinutes === 0
  );
}

export type SlotTime = {
  /** ISO date of the slot, as in `BookingDay.iso`. */
  iso: string;
  /** «15:30» */
  time: string;
  /** «Сегодня», «Завтра» or the weekday: «Понедельник». */
  dayLabel: string;
};

/**
 * The first slot at least `leadHours` from `now`, on the clinic's clock: rounded up to the slot
 * grid, moved into working hours, past Sunday (by appointment only) to the next working day.
 */
export function nearestSlot(now: Date, leadHours: number, hours: WorkingHours): SlotTime {
  const opens = toMinutes(hours.opens);
  const lastStart = toMinutes(hours.closes) - hours.stepMinutes;
  // The clinic's wall clock, read through the UTC getters.
  const clinicNow = now.getTime() + CLINIC_UTC_OFFSET_MS;
  const earliest = clinicNow + leadHours * 60 * MINUTE_MS;
  let dayStart = Math.floor(earliest / DAY_MS) * DAY_MS;
  const sinceOpen = Math.ceil((earliest - dayStart) / MINUTE_MS) - opens;
  let minutes = opens + Math.max(0, Math.ceil(sinceOpen / hours.stepMinutes) * hours.stepMinutes);
  while (minutes > lastStart || new Date(dayStart).getUTCDay() === 0) {
    dayStart += DAY_MS;
    minutes = opens;
  }
  const day = new Date(dayStart);
  const offset = Math.round((dayStart - Math.floor(clinicNow / DAY_MS) * DAY_MS) / DAY_MS);
  return {
    iso: day.toISOString().slice(0, 10),
    time: toTime(minutes),
    dayLabel: offset === 0 ? "Сегодня" : offset === 1 ? "Завтра" : WEEKDAYS[day.getUTCDay()],
  };
}
