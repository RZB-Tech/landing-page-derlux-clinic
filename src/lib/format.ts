import type { Money } from "@/data/types";
import type { Locale } from "@/i18n/config";

export const NBSP = " ";

/** Glues one- and two-letter words («с», «по», «—») to the next word so they never end a line. */
export function keepShortWords(text: string): string {
  return text.replace(/(?<=^|\s)(\S{1,2}) /g, `$1${NBSP}`);
}

/** 150000 → «150 000» (non-breaking group separators, so prices never wrap mid-number). */
export function formatAmount(value: number): string {
  return String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, NBSP);
}

/** «от 150 000 сум» / «150 000 so'mdan» */
export function formatPriceFrom(price: Money, locale: Locale): string {
  const amount = formatAmount(price.from);
  return locale === "uz" ? `${amount}${NBSP}so'mdan` : `от${NBSP}${amount}${NBSP}сум`;
}

/** Fills «Шаг {step} из {total}» style templates from data. */
export function fillTemplate(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));
}

/** Joins class names, skipping falsy values. */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
