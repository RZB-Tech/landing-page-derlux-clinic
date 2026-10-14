const WEEKDAYS_SHORT = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
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
