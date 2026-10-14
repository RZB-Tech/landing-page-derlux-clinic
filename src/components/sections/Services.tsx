import { directions } from "@/data/directions";
import { pricesCopy, pricesSection } from "@/data/home";
import { services } from "@/data/services";
import { SectionHead } from "@/components/ui/SectionHead";
import { ServicesTabs } from "./ServicesTabs";

/** «Цены известны заранее» — price list by direction (Figma «04 Услуги и цены»). */
export function Services() {
  return (
    <section id="prices" aria-labelledby="prices-title" className="bg-sand">
      <div className="page-x flex flex-col gap-10 py-20 md:gap-12 md:py-24 xl:gap-18 xl:py-40">
        <SectionHead titleId="prices-title" {...pricesSection} />
        <ServicesTabs directions={directions} services={services} copy={pricesCopy} />
      </div>
    </section>
  );
}
