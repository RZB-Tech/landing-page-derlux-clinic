import { getDirections } from "@/data/directions";
import { getHome } from "@/data/home";
import { getServices } from "@/data/services";
import type { Locale } from "@/i18n/config";
import { SectionHead } from "@/components/ui/SectionHead";
import { ServicesTabs } from "./ServicesTabs";

/** «Цены известны заранее» — price list by direction (Figma «04 Услуги и цены»). */
export function Services({ locale }: { locale: Locale }) {
  const { pricesCopy, pricesSection } = getHome(locale);
  return (
    <section id="prices" aria-labelledby="prices-title" className="bg-sand">
      <div className="page-x flex flex-col gap-10 py-20 md:gap-12 md:py-24 xl:gap-18 xl:py-40">
        <SectionHead titleId="prices-title" {...pricesSection} />
        <ServicesTabs locale={locale} directions={getDirections(locale)} services={getServices(locale)} copy={pricesCopy} />
      </div>
    </section>
  );
}
