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

/** «Акне, псориаз» → «акне, псориаз», to continue a sentence. */
export const lowerFirst = (text: string) => text.charAt(0).toLocaleLowerCase() + text.slice(1);

/**
 * Shortens text to `max` characters for a search snippet: at the last full sentence that fits, else at
 * the last whole word, with «…».
 */
export function clipText(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const sentenceEnd = cut.lastIndexOf(". ");
  if (sentenceEnd > max / 2) return cut.slice(0, sentenceEnd + 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:—–-]\s*$/, "")}…`;
}

/** Russian «год / года / лет» for a number of years; Uzbek has one form. */
export function yearsLabel(n: number, locale: Locale): string {
  if (locale === "uz") return "yil";
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "год";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "года";
  return "лет";
}

/** Joins class names, skipping falsy values. */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
