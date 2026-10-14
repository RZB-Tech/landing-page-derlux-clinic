import Image from "next/image";
import { directions } from "@/data/directions";
import { doctors } from "@/data/doctors";
import { hero, nearestSlot, nearestSlotCopy } from "@/data/home";
import { BookingTrigger } from "@/components/booking/BookingTrigger";
import { AccentTitle } from "@/components/ui/AccentTitle";
import { ButtonContent, LinkButton, buttonClassName } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { HeroBookingBar } from "./HeroBookingBar";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="bg-milk">
      <div className="page-x flex flex-col gap-12 pt-10 pb-10 sm:pb-20 md:pt-16 md:pb-24 xl:flex-row xl:items-center xl:gap-16 xl:pt-22 xl:pb-40">
        <div className="flex min-w-0 flex-col items-start gap-9 xl:max-w-160 xl:flex-1">
          <AccentTitle as="h1" size="h1" id="hero-title" text={hero.title} className="text-ink" />
          <p className="max-w-115 text-lead text-graphite">{hero.lead}</p>
          <div className="flex flex-wrap gap-3">
            <BookingTrigger className={buttonClassName({ variant: "primary" })}>
              <ButtonContent variant="primary" arrow>
                {hero.primaryCta}
              </ButtonContent>
            </BookingTrigger>
            <LinkButton href={hero.secondaryCta.href} variant="secondary">
              {hero.secondaryCta.label}
            </LinkButton>
          </div>
          <HeroBookingBar directions={directions} doctors={doctors} copy={hero.bookingBar} />
        </div>

        {/* Visual: arched photo, «Ближайшая запись» card and the sterility badge. Positions are
            percentages of the 576×720 Figma frame so the composition scales on smaller screens. */}
        <div className="relative mx-auto aspect-576/720 w-full max-w-xl max-sm:mb-20 xl:w-[40%] xl:shrink-0 2xl:w-[45%]">
          <div className="arch-hero absolute top-0 left-[9.7222%] aspect-520/700 w-[90.2778%] overflow-hidden bg-sand">
            <Image
              src={hero.image.src}
              alt={hero.image.alt}
              fill
              preload
              sizes="(min-width: 1440px) 520px, (min-width: 1280px) 36vw, (min-width: 640px) 520px, 90vw"
              className="object-cover"
            />
          </div>

          <div className="absolute top-[72.2222%] left-0 flex max-w-full flex-col items-start gap-2.5 rounded-tile bg-white p-5 shadow-float">
            <p className="flex items-center gap-2 text-caption font-medium text-graphite uppercase">
              <Icon name="dot-accent" size={8} />
              {nearestSlotCopy.caption}
            </p>
            <p className="text-title font-semibold whitespace-nowrap text-ink">
              {nearestSlot.dayLabel}, {nearestSlot.time}
            </p>
            <p className="text-small text-graphite min-[360px]:whitespace-nowrap">{nearestSlot.note}</p>
            <BookingTrigger
              preset={{ directionId: nearestSlot.directionId, dateIso: null, time: nearestSlot.time }}
              className={buttonClassName({ variant: "primary", className: "max-[359px]:px-5" })}
            >
              {nearestSlotCopy.cta}
            </BookingTrigger>
          </div>

          <p className="absolute top-[5.5556%] right-0 flex items-center gap-2.5 rounded-full bg-milk py-3 pr-4.5 pl-3.5 text-label font-medium whitespace-nowrap text-ink 2xl:right-auto 2xl:left-[57.2917%]">
            <Icon name="shield-accent-20" size={20} />
            {hero.badge}
          </p>
        </div>
      </div>
    </section>
  );
}
