/**
 * Site languages. Russian is the default and lives at «/», Uzbek (Latin) at «/uz». Routes are
 * `app/[lang]`; `proxy.ts` serves «/» from `/ru`.
 */
export const locales = ["ru", "uz"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ru";

export const hasLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

/** One value per language: the type makes sure none is forgotten. */
export type Localized<T> = Record<Locale, T>;

export const localeInfo: Localized<{
  /** `<html lang>` and schema.org `inLanguage`. */
  htmlLang: string;
  /** Open Graph `locale`. */
  og: string;
  /** `Intl` locale. */
  intl: string;
  /** Public path of the home page. */
  path: string;
  /** Short label in the language switcher. */
  label: string;
  /** The language's own name, for the switcher's tooltip. */
  name: string;
}> = {
  ru: { htmlLang: "ru", og: "ru_RU", intl: "ru-RU", path: "/", label: "RU", name: "Русский" },
  uz: { htmlLang: "uz", og: "uz_UZ", intl: "uz-UZ", path: "/uz", label: "UZ", name: "O'zbekcha" },
};
