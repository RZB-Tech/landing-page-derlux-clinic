import { getDirections } from "@/data/directions";
import { getHome } from "@/data/home";
import { getServices } from "@/data/services";
import type { Locale } from "@/i18n/config";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { ServicesTabs } from "./ServicesTabs";

/** «Цены известны заранее» — compact price list: direction picker with photos + a short list. */
export function Services({ locale }: { locale: Locale }) {
  const { pricesCopy, pricesSection } = getHome(locale);
  return (
    <section id="prices" aria-labelledby="prices-title" className="bg-sand">
      <div className="page-x flex flex-col gap-8 py-16 md:gap-10 md:py-20 xl:py-24">
        <Reveal>
          <SectionHead titleId="prices-title" {...pricesSection} />
        </Reveal>
        <Reveal>
          <ServicesTabs locale={locale} directions={getDirections(locale)} services={getServices(locale)} copy={pricesCopy} />
        </Reveal>
      </div>
    </section>
  );
}
