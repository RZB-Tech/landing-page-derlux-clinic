import Image from "next/image";
import Link from "next/link";
import { getDirections } from "@/data/directions";
import { getHome } from "@/data/home";
import type { Locale } from "@/i18n/config";
import { directionPath } from "@/lib/routes";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { SectionHead } from "@/components/ui/SectionHead";

export function Directions({ locale }: { locale: Locale }) {
  const { directionsSection } = getHome(locale);
  return (
    <section id="directions" aria-labelledby="directions-title" className="bg-milk">
      <div className="page-x flex flex-col gap-10 py-16 md:gap-12 md:py-20 xl:py-28">
        <Reveal>
          <SectionHead titleId="directions-title" {...directionsSection} />
        </Reveal>
        {/* Equal 4:5 tiles, four per row from xl (two rows of four), two per row below. */}
        <ul className="grid grid-cols-2 gap-3 md:gap-5 xl:grid-cols-4">
          {getDirections(locale).map((direction, i) => (
            <Reveal as="li" key={direction.id} delay={(i % 4) * 90} className="aspect-4/5 min-h-0">
              <Link
                href={directionPath(locale, direction.slug)}
                className="group relative flex size-full flex-col justify-end overflow-hidden rounded-card bg-sand p-4 text-on-dark md:rounded-panel md:p-6"
              >
                <Image
                  src={direction.image.src}
                  alt={direction.image.alt}
                  fill
                  quality={90}
                  sizes="(min-width: 1280px) 40vw, 50vw"
                  className="object-contain transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <span aria-hidden className="absolute inset-0 bg-linear-to-t from-ink/55 via-transparent to-transparent" />
                {/* Glass panel: frosted blur, a light border and a soft inner highlight. */}
                <span className="relative flex items-end justify-between gap-3 rounded-tile border border-white/40 bg-milk/70 p-4 text-ink shadow-[inset_0_1px_0_rgb(255_255_255/0.6)] backdrop-blur-md md:p-5">
                  <span className="flex min-w-0 flex-col gap-1.5">
                    <span className="font-display text-display-h3 font-medium">{direction.name}</span>
                    <span className="hidden text-small text-graphite md:block">{direction.summary}</span>
                  </span>
                  <span className="shrink-0 rounded-full bg-white p-2.5 transition-transform duration-300 group-hover:-rotate-45">
                    <Icon name="arrow-right-ink" size={18} />
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
