import Image from "next/image";
import type { CSSProperties } from "react";
import { getClinic } from "@/data/clinic";
import { getDirections } from "@/data/directions";
import { getHome, heroImage } from "@/data/home";
import type { SocialLink } from "@/data/types";
import type { Locale } from "@/i18n/config";
import { BookingTrigger } from "@/components/booking/BookingTrigger";
import { AccentTitle } from "@/components/ui/AccentTitle";
import { ButtonContent, LinkButton, buttonClassName } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";

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

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function Hero({ locale }: { locale: Locale }) {
  const clinic = getClinic(locale);
  const { hero } = getHome(locale);
  const directions = getDirections(locale);
  return (
    <section aria-labelledby="hero-title" className="relative flex flex-col overflow-hidden bg-milk xl:block">
      {/*
        The clinic's reception photo. From xl it is the background and only the left ~45% (under the copy
        panel) is darkened, so the lit DERLUX sign on the right stays clear. Below xl it is a block under the
        copy, so the panel never covers it.
      */}
      <div className="relative order-2 aspect-16/10 xl:absolute xl:inset-0 xl:order-0 xl:aspect-auto">
        <Image
          src="/images/clinic-reception.png"
          alt=""
          fill
          quality={90}
          sizes="100vw"
          className="object-cover object-[70%_35%]"
        />
        <div aria-hidden className="absolute inset-0 hidden bg-linear-to-r from-black/30 via-transparent via-45% to-transparent xl:block" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 hidden h-32 bg-linear-to-t from-milk to-transparent xl:block" />
      </div>

      <div className="page-x relative order-1 flex flex-col gap-14 pt-8 pb-12 md:pt-14 xl:flex-row xl:items-center xl:gap-14 xl:pt-16 xl:pb-16">
        <div className="flex min-w-0 flex-col items-start gap-8 xl:max-w-150 xl:flex-1">
          <p
            style={delay(0)}
            className="rise flex items-center gap-2.5 rounded-full border border-line-stone bg-white/70 py-2 pr-4 pl-3 text-label-sm font-medium text-graphite backdrop-blur"
          >
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-50" />
              <span className="relative inline-flex size-2.5 rounded-full bg-accent" />
            </span>
            {clinic.address.locality} · {clinic.hoursShort}
          </p>
          {/* One panel behind the copy keeps it readable on the bare photo. */}
          <div className="flex w-full flex-col items-start gap-8 rounded-[48px] bg-milk/50 p-6 shadow-float backdrop-blur-md md:p-10">
            <div style={delay(100)} className="rise">
              <AccentTitle as="h1" size="h2" id="hero-title" text={hero.title} className="text-ink" />
            </div>
            <p style={delay(200)} className="rise max-w-125 text-lead text-graphite">
              {hero.lead}
            </p>
            <div style={delay(300)} className="rise flex flex-wrap gap-3">
              <BookingTrigger className={buttonClassName({ variant: "primary" })}>
                <ButtonContent variant="primary" arrow>
                  {hero.primaryCta}
                </ButtonContent>
              </BookingTrigger>
              <LinkButton href={hero.secondaryCta.href} variant="secondary">
                {hero.secondaryCta.label}
              </LinkButton>
            </div>
          </div>
        </div>

        {/* Collage: a tall rounded photo, a round inset of the reception and two floating cards. */}
        <div
          style={delay(250)}
          className="rise relative mx-auto hidden w-full max-w-sm xl:-mr-8 xl:ml-auto xl:w-[30%] xl:max-w-none xl:shrink-0"
        >
          <div className="relative aspect-4/5 overflow-hidden rounded-[48px] bg-sand shadow-float">
            <Image
              src={heroImage.src}
              alt={hero.imageAlt}
              fill
              preload
              sizes="(min-width: 1440px) 600px, (min-width: 1280px) 42vw, (min-width: 640px) 560px, 92vw"
              className="object-cover"
            />
            <div aria-hidden className="absolute inset-0 bg-linear-to-t from-ink/25 via-transparent to-transparent" />
          </div>

          <p
            style={delay(1200)}
            className="float absolute top-6 -right-2 flex items-center gap-2.5 rounded-full bg-white/90 py-3 pr-4.5 pl-3.5 text-label font-medium whitespace-nowrap text-ink shadow-float backdrop-blur md:-right-6"
          >
            <Icon name="shield-accent-20" size={20} />
            {hero.badge}
          </p>
        </div>
      </div>

      {/* Running line of the clinic's directions. The list is doubled so it loops seamlessly. */}
      <div aria-hidden className="relative order-3 overflow-hidden bg-accent py-5 text-on-dark">
        <div className="marquee flex w-max">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 items-center">
              {directions.map((d) => (
                <li key={d.id} className="flex items-center font-display text-display-h3 italic">
                  <span className="px-8">{d.name}</span>
                  <span className="text-nude">✦</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* Social links, not in Figma; added at the clinic's request. */}
      <div className="page-x relative order-4">
        <ul aria-label={hero.socialsLabel} className="flex flex-wrap gap-x-10 gap-y-4 py-6 md:py-8">
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
