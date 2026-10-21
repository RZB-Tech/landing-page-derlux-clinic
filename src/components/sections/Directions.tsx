import Image from "next/image";
import { getDirections } from "@/data/directions";
import { getHome } from "@/data/home";
import type { Locale } from "@/i18n/config";
import { formatPriceFrom } from "@/lib/format";
import { BookingTrigger } from "@/components/booking/BookingTrigger";
import { Icon } from "@/components/ui/Icon";
import { SectionHead } from "@/components/ui/SectionHead";

export function Directions({ locale }: { locale: Locale }) {
  const { directionsSection } = getHome(locale);
  return (
    <section id="directions" aria-labelledby="directions-title" className="bg-milk">
      <div className="page-x flex flex-col gap-10 py-20 md:gap-12 md:py-24 xl:gap-18 xl:py-40">
        <SectionHead titleId="directions-title" {...directionsSection} />
        <ul className="grid grid-cols-1 gap-x-4 gap-y-10 min-[360px]:grid-cols-2 md:gap-x-6 md:gap-y-12 xl:grid-cols-4 xl:gap-y-18">
          {getDirections(locale).map((direction) => (
            <li key={direction.id}>
              <BookingTrigger preset={{ directionId: direction.id }} className="group flex flex-col gap-3">
                <span className="relative block aspect-302/240 overflow-hidden rounded-tile bg-sand">
                  <Image
                    src={direction.image.src}
                    alt={direction.image.alt}
                    fill
                    sizes="(min-width: 1440px) 302px, (min-width: 1280px) 22vw, (min-width: 768px) 45vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </span>
                <span className="text-title font-semibold text-ink">{direction.name}</span>
                <span className="text-small text-graphite">{direction.summary}</span>
                <span className="flex items-center justify-between gap-2">
                  <span className="text-label font-medium text-accent">{formatPriceFrom(direction.priceFrom, locale)}</span>
                  {/* Decorative (the whole card is the link); hidden where it cannot fit next to the price. */}
                  <span className="shrink-0 rounded-full bg-accent-10 p-2.5 transition-colors group-hover:bg-accent/15 max-[379px]:hidden">
                    <Icon name="arrow-right-accent" size={18} />
                  </span>
                </span>
              </BookingTrigger>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
