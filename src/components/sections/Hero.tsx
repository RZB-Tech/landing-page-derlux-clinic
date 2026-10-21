import Image from "next/image";
import { getClinic } from "@/data/clinic";
import { getDirections } from "@/data/directions";
import { getDoctors } from "@/data/doctors";
import { bookingHours, getHome, heroImage, nearestSlot } from "@/data/home";
import type { SocialLink } from "@/data/types";
import type { Locale } from "@/i18n/config";
import { BookingTrigger } from "@/components/booking/BookingTrigger";
import { AccentTitle } from "@/components/ui/AccentTitle";
import { ButtonContent, LinkButton, buttonClassName } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { HeroBookingBar } from "./HeroBookingBar";
import { NearestSlotCard } from "./NearestSlotCard";

const socialIcons: Record<SocialLink["network"], IconName> = {
  instagram: "instagram-accent",
  facebook: "facebook-accent",
  telegram: "send-accent",
  youtube: "youtube-accent",
};

/** Icon in a ring + the network's name; a plain item until the clinic sends the link. */
function Social({ network, label, url }: SocialLink) {
  const content = (
    <>
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-line-stone transition-colors group-hover:border-accent">
        <Icon name={socialIcons[network]} size={20} />
      </span>
      {label}
    </>
  );
  const className = "group flex items-center gap-3 text-label font-medium text-ink";
  return url ? (
    <a href={url} target="_blank" rel="noopener noreferrer" className={className}>
      {content}
    </a>
  ) : (
    <span className={className}>{content}</span>
  );
}

export function Hero({ locale }: { locale: Locale }) {
  const clinic = getClinic(locale);
  const { hero, nearestSlotCopy } = getHome(locale);
  return (
    <section aria-labelledby="hero-title" className="bg-milk">
      <div className="page-x flex flex-col gap-12 pt-10 pb-8 md:pt-16 md:pb-10 xl:flex-row xl:items-center xl:gap-16 xl:pt-22 xl:pb-12">
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
          <HeroBookingBar directions={getDirections(locale)} doctors={getDoctors(locale)} copy={hero.bookingBar} />
        </div>

        {/* Visual: arched photo, «Ближайшая запись» card and the sterility badge. Positions are
            percentages of the 576×720 Figma frame so the composition scales on smaller screens. */}
        <div className="relative mx-auto aspect-576/720 w-full max-w-xl max-sm:mb-20 xl:w-[40%] xl:shrink-0 2xl:w-[45%]">
          <div className="arch-hero absolute top-0 left-[9.7222%] aspect-520/700 w-[90.2778%] overflow-hidden bg-sand">
            <Image
              src={heroImage.src}
              alt={hero.imageAlt}
              fill
              preload
              sizes="(min-width: 1440px) 520px, (min-width: 1280px) 36vw, (min-width: 640px) 520px, 90vw"
              className="object-cover"
            />
          </div>

          <NearestSlotCard
            locale={locale}
            offer={nearestSlot}
            hours={bookingHours}
            copy={nearestSlotCopy}
            className="absolute top-[72.2222%] left-0 flex max-w-full flex-col items-start gap-2.5 rounded-tile bg-white p-5 shadow-float"
          />

          <p className="absolute top-[5.5556%] right-0 flex items-center gap-2.5 rounded-full bg-milk py-3 pr-4.5 pl-3.5 text-label font-medium whitespace-nowrap text-ink 2xl:right-auto 2xl:left-[57.2917%]">
            <Icon name="shield-accent-20" size={20} />
            {hero.badge}
          </p>
        </div>
      </div>

      {/* Social links: not in Figma, added at the clinic's request. No bottom padding: the next
          section's top padding is the gap. */}
      <div className="page-x">
        <ul aria-label={hero.socialsLabel} className="flex flex-wrap gap-x-10 gap-y-4 border-t border-line-soft pt-6 md:pt-8">
          {clinic.socials.map((social) => (
            <li key={social.label}>
              <Social {...social} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
