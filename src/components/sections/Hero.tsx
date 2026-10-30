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
    <section data-hero aria-labelledby="hero-title" className="relative flex flex-col overflow-hidden bg-milk xl:block">
      {/*
        The clinic's reception photo. From xl it is the background and only the left ~45% (under the copy
        panel) is darkened, so the lit DERLUX sign on the right stays clear. Below xl it is a block under the
        copy, so the panel never covers it.
      */}
      <div className="relative order-2 aspect-16/10 xl:absolute xl:inset-y-0 xl:right-0 xl:-left-[24%] xl:order-0 xl:aspect-auto">
        <Image
          src="/images/clinic-reception.png"
          alt=""
          fill
          quality={90}
          sizes="100vw"
          className="object-cover object-[70%_35%]"
        />
        <div aria-hidden className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 via-50% to-transparent xl:bg-linear-to-r xl:from-black/85 xl:via-black/50" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 hidden h-32 bg-linear-to-t from-milk to-transparent xl:block" />
      </div>

      <div className="page-x relative order-1 flex flex-col gap-14 pt-8 pb-12 md:pt-14 xl:min-h-140 xl:flex-row xl:items-center xl:gap-14 xl:pt-16 xl:pb-16">
        <div className="flex min-w-0 flex-col items-center gap-8 text-center xl:items-start xl:text-left xl:w-[min(30rem,38vw)] xl:flex-none">
          {/* One panel behind the copy keeps it readable on the bare photo. */}
          <div className="flex w-full flex-col items-center gap-8 xl:items-start rounded-[48px] bg-milk/50 p-6 shadow-float backdrop-blur-md md:p-10 xl:p-8">
            {/* The <h1> says what the clinic is and where (what patients search for); the design's title is the
                visual headline under it. */}
            <div style={delay(100)} className="rise flex flex-col items-center gap-4 xl:items-start">
              <h1 id="hero-title" className="text-caption font-medium text-accent uppercase">
                {hero.eyebrow}
              </h1>
              <AccentTitle as="p" size="h2" text={hero.title} className="text-ink" />
            </div>
            <p style={delay(200)} className="rise max-w-125 text-lead text-graphite">
              {hero.lead}
            </p>
            <div style={delay(300)} className="rise flex flex-wrap justify-center gap-3 xl:justify-start">
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

        {/* Photo on the right, from xl: it sits between the copy panel and the page edge so the lit sign in
            the background stays clear. `right` is measured from the viewport edge (8.5vw), not the row. */}
        <div
          style={{ ...delay(250), right: "calc(8.5vw - max(0px, (100vw - 90rem) / 2))" }}
          className="rise hidden xl:absolute xl:top-1/2 xl:block xl:w-[min(27rem,23vw)] xl:-translate-y-1/2"
        >
          {/* Frame: a thin accent outline offset behind the photo, and a milk mat with a hairline around it. */}
          <div aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 rounded-[56px] border border-accent/50" />
          <div className="relative rounded-[56px] border border-white/80 bg-milk/70 p-2 shadow-float backdrop-blur">
            <div className="relative aspect-4/5 overflow-hidden rounded-[48px] bg-sand ring-1 ring-accent/30">
              <Image
                src={heroImage.src}
                alt={hero.imageAlt}
                fill
                preload
                sizes="(min-width: 1440px) 432px, 23vw"
                className="object-cover"
              />
            </div>
          </div>
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
