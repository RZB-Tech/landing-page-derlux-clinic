import { getHome } from "@/data/home";
import { getPromotions } from "@/data/promotions";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/format";
import { BookingTrigger } from "@/components/booking/BookingTrigger";
import { Chip } from "@/components/ui/Chip";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";

/** «Предложения месяца» (Figma «09 Акции»). Carousel below xl. */
export function Promotions({ locale }: { locale: Locale }) {
  const { promotionsCopy, promotionsSection } = getHome(locale);
  return (
    <section id="promotions" aria-labelledby="promotions-title" className="bg-milk">
      <div className="page-x flex flex-col gap-10 py-16 md:gap-12 md:py-20 xl:gap-14 xl:py-28">
        <Reveal><SectionHead titleId="promotions-title" {...promotionsSection} /></Reveal>
        <ul className="snap-row xl:mx-0 xl:grid xl:grid-cols-3 xl:gap-6 xl:overflow-visible xl:px-0">
          {getPromotions(locale).map((promo) => {
            const dark = promo.featured;
            return (
              <li
                key={promo.id}
                className={cn(
                  "flex min-h-90 w-85 flex-col items-start gap-6 rounded-card p-9 md:w-102.5 xl:w-auto",
                  dark ? "bg-accent text-on-dark" : "bg-sand text-ink",
                )}
              >
                <Chip>
                  <time dateTime={promo.validUntil}>{promo.validUntilLabel}</time>
                </Chip>
                <p className="font-display text-display-promo font-medium">{promo.value}</p>
                <h3 className="text-title font-semibold">{promo.title}</h3>
                <div className="flex-1" />
                <BookingTrigger
                  preset={promo.checkupId ? { checkupId: promo.checkupId } : { directionId: promo.directionId }}
                  className={cn("group inline-flex items-center gap-2 text-label font-medium", dark ? "text-on-dark" : "text-accent")}
                >
                  {promotionsCopy.cta}
                  <Icon
                    name={dark ? "arrow-right-on-dark" : "arrow-right-accent"}
                    size={18}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </BookingTrigger>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
