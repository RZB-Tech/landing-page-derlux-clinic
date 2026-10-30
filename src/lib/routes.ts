import { localeInfo, type Locale } from "@/i18n/config";

/**
 * Public paths. Russian lives at the root («/», «/directions/…»; `proxy.ts` serves it from the
 * `/ru` route), Uzbek under «/uz».
 */
const base = (locale: Locale) => (locale === "ru" ? "" : localeInfo[locale].path);

/** The home page in a language. */
export const homePath = (locale: Locale) => localeInfo[locale].path;

/** An anchor on the home page, usable from any page: «/#prices», «/uz#prices». */
export const homeAnchor = (locale: Locale, hash: `#${string}`) => `${base(locale) || "/"}${hash}`;

/** A direction's own page: «/directions/dermatologiya», «/uz/directions/dermatologiya». */
export const directionPath = (locale: Locale, slug: string) => `${base(locale)}/directions/${slug}`;

/** A condition's page under its direction: «/directions/dermatologiya/akne». */
export const conditionPath = (locale: Locale, directionSlug: string, conditionSlug: string) =>
  `${directionPath(locale, directionSlug)}/${conditionSlug}`;

/** A doctor's own page: «/doctors/rakhimov», «/uz/doctors/rakhimov». */
export const doctorPath = (locale: Locale, slug: string) => `${base(locale)}/doctors/${slug}`;
