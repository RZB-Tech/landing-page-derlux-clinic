import Image from "next/image";
import Link from "next/link";
import { getDirections } from "@/data/directions";
import { getHome } from "@/data/home";
import type { Locale } from "@/i18n/config";
import { directionPath } from "@/lib/routes";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonContent, buttonClassName } from "@/components/ui/Button";
import { SectionHead } from "@/components/ui/SectionHead";

export function Directions({ locale }: { locale: Locale }) {
  const { directionsSection, directionsCopy } = getHome(locale);
  return (
    <section id="directions" aria-labelledby="directions-title" className="bg-milk">
      <div className="page-x flex flex-col gap-10 py-16 md:gap-12 md:py-20 xl:py-28">
        <Reveal>
          <SectionHead titleId="directions-title" {...directionsSection} />
        </Reveal>
        {/* Figma «03 Направления»: a photo tile, then the name, the summary and a «Подробнее» button. */}
        <ul className="grid grid-cols-2 gap-x-3 gap-y-8 md:gap-x-5 md:gap-y-10 xl:grid-cols-4">
          {getDirections(locale).map((direction, i) => (
            <Reveal as="li" key={direction.id} delay={(i % 4) * 90}>
              <Link href={directionPath(locale, direction.slug)} className="group flex h-full flex-col gap-4">
                <span className="relative block aspect-5/4 overflow-hidden rounded-tile bg-sand">
                  <Image
                    src={direction.image.src}
                    alt={direction.image.alt}
                    fill
                    quality={90}
                    sizes="(min-width: 1280px) 25vw, 50vw"
                    className="object-cover object-[50%_30%] transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </span>
                <span className="flex flex-1 flex-col gap-2">
                  <span className="text-title font-medium text-ink">{direction.name}</span>
                  <span className="text-small text-graphite">{direction.summary}</span>
                </span>
                <span className={buttonClassName({ variant: "secondary", className: "self-start px-5 py-3 group-hover:bg-ink/5" })}>
                  <ButtonContent variant="secondary" arrow>
                    {directionsCopy.more}
                  </ButtonContent>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
