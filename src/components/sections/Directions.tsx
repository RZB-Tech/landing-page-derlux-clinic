import Image from "next/image";
import { getDirections } from "@/data/directions";
import { getHome } from "@/data/home";
import type { Locale } from "@/i18n/config";
import { cn, formatPriceFrom } from "@/lib/format";
import { BookingTrigger } from "@/components/booking/BookingTrigger";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { SectionHead } from "@/components/ui/SectionHead";

// Bento layout on a 4-column grid: the first direction is the big tile, the last one is wide.
const tileSpans = ["col-span-2 row-span-2", "", "", "", "", "", "", "col-span-2"];

export function Directions({ locale }: { locale: Locale }) {
  const { directionsSection } = getHome(locale);
  return (
    <section id="directions" aria-labelledby="directions-title" className="bg-milk">
      <div className="page-x flex flex-col gap-10 py-16 md:gap-12 md:py-20 xl:py-28">
        <Reveal>
          <SectionHead titleId="directions-title" {...directionsSection} />
        </Reveal>
        <ul className="grid auto-rows-50 grid-cols-2 gap-3 md:auto-rows-60 md:gap-5 xl:grid-cols-4">
          {getDirections(locale).map((direction, i) => (
            <Reveal as="li" key={direction.id} delay={(i % 4) * 90} className={cn("min-h-0", tileSpans[i])}>
              <BookingTrigger
                preset={{ directionId: direction.id }}
                className="group relative flex size-full flex-col justify-end overflow-hidden rounded-card bg-sand p-4 text-on-dark md:rounded-panel md:p-6"
              >
                <Image
                  src={direction.image.src}
                  alt={direction.image.alt}
                  fill
                  sizes="(min-width: 1280px) 40vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <span aria-hidden className="absolute inset-0 bg-linear-to-t from-ink/85 via-ink/35 to-ink/5" />
                <span className="relative flex flex-col gap-1.5">
                  <span className={cn("font-display font-medium", i === 0 ? "text-display-h3 md:text-display-h2" : "text-display-h3")}>
                    {direction.name}
                  </span>
                  <span className="hidden text-small opacity-85 md:block">{direction.summary}</span>
                  <span className="mt-1 flex items-center justify-between gap-2">
                    <span className="rounded-full bg-white/20 px-3 py-1.5 text-label-sm font-medium backdrop-blur">
                      {formatPriceFrom(direction.priceFrom, locale)}
                    </span>
                    <span className="rounded-full bg-milk p-2.5 transition-transform duration-300 group-hover:-rotate-45">
                      <Icon name="arrow-right-ink" size={18} />
                    </span>
                  </span>
                </span>
              </BookingTrigger>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
