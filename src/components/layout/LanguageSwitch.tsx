import Link from "next/link";
import { localeInfo, locales, type Locale } from "@/i18n/config";
import { cn } from "@/lib/format";

/**
 * RU / UZ switch: two plain links, so it works without JS and search engines follow both
 * languages (`hrefLang`). The current language is marked with `aria-current`.
 */
export function LanguageSwitch({ locale, label, className }: { locale: Locale; label: string; className?: string }) {
  return (
    <nav aria-label={label} className={cn("flex rounded-full border border-line-stone bg-white p-0.5", className)}>
      {locales.map((item) => {
        const info = localeInfo[item];
        const active = item === locale;
        return (
          <Link
            key={item}
            href={info.path}
            hrefLang={info.htmlLang}
            lang={info.htmlLang}
            title={info.name}
            aria-current={active ? "true" : undefined}
            className={cn(
              "rounded-full px-3 py-1.5 text-small font-medium transition-colors duration-200",
              active ? "bg-ink text-on-dark" : "text-graphite hover:text-ink",
            )}
          >
            {info.label}
          </Link>
        );
      })}
    </nav>
  );
}
