import { getCheckups } from "@/data/checkups";
import { getHome } from "@/data/home";
import type { Locale } from "@/i18n/config";
import { cn, formatPriceFrom } from "@/lib/format";
import { BookingTrigger } from "@/components/booking/BookingTrigger";
import { AccentTitle } from "@/components/ui/AccentTitle";
import { buttonClassName } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Icon } from "@/components/ui/Icon";
import { SectionHead } from "@/components/ui/SectionHead";

/** «Всё обследование — за один визит» (Figma «06 Check-up»). Carousel below xl. */
export function Checkups({ locale }: { locale: Locale }) {
  const { checkupCopy, checkupSection } = getHome(locale);
  return (
    <section id="checkup" aria-labelledby="checkup-title" className="bg-sand">
      <div className="page-x flex flex-col gap-10 py-20 md:gap-12 md:py-24 xl:gap-18 xl:py-40">
        <SectionHead titleId="checkup-title" {...checkupSection} />
        <ul className="snap-row xl:mx-0 xl:grid xl:grid-cols-3 xl:gap-6 xl:overflow-visible xl:px-0">
          {getCheckups(locale).map((program) => {
            const dark = program.featured;
            return (
              <li
                key={program.id}
                className={cn(
                  "flex w-85 flex-col items-start gap-6 rounded-card px-6 py-8 md:w-102.5 md:px-9 md:py-10 xl:min-h-151.25 xl:w-auto",
                  dark ? "bg-accent text-on-dark" : "bg-white text-ink",
                )}
              >
                <div className="flex gap-2">
                  {program.badge && <Chip>{program.badge}</Chip>}
                  <Chip state={dark ? "default" : "accent"}>{program.durationLabel}</Chip>
                </div>
                <AccentTitle as="h3" size="h3" quoted text={program.title} />
                <p className={cn("text-small", dark ? "opacity-85" : "text-graphite")}>{program.audience}</p>
                <ul className="flex flex-col gap-3">
                  {program.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-small">
                      <Icon name={dark ? "check-on-dark" : "check-accent"} size={18} />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex-1" />
                <hr className={cn("w-full", dark ? "border-on-dark" : "border-line-soft")} />
                <p className="text-number font-medium whitespace-nowrap">{formatPriceFrom(program.price, locale)}</p>
                <BookingTrigger
                  preset={{ checkupId: program.id }}
                  className={buttonClassName({ variant: dark ? "light" : "primary", fullWidth: true })}
                >
                  {checkupCopy.cta}
                </BookingTrigger>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
