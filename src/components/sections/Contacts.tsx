import type { ReactNode } from "react";
import { clinic } from "@/data/clinic";
import { contactsSection } from "@/data/home";
import { AccentTitle } from "@/components/ui/AccentTitle";
import { LinkButton } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Caption } from "@/components/ui/SectionHead";
import { MapIllustration } from "./MapIllustration";
import { YandexMap } from "./YandexMap";

function ContactRow({ icon, children }: { icon: IconName; children: ReactNode }) {
  return (
    <div className="flex items-start gap-3.5">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sand">
        <Icon name={icon} size={20} />
      </span>
      <div className="flex min-w-0 flex-col gap-0.5 text-title font-semibold wrap-break-word text-ink">{children}</div>
    </div>
  );
}

/** «Как нас найти» (Figma «15 Контакты»). */
export function Contacts() {
  return (
    <section id="contacts" aria-labelledby="contacts-title" className="bg-sand">
      <div className="page-x flex flex-col gap-6 py-20 md:py-24 xl:flex-row xl:py-40">
        <div className="flex flex-col items-start gap-6 rounded-panel bg-white p-5 sm:p-8 md:p-10 xl:w-130 xl:shrink-0">
          <Caption>{contactsSection.caption}</Caption>
          <AccentTitle id="contacts-title" text={contactsSection.title} />
          <address className="flex w-full flex-col gap-6 not-italic">
            <ContactRow icon="map-pin-accent">
              <span>{clinic.address.city}, {clinic.address.district},</span>
              <span>{clinic.address.street}</span>
            </ContactRow>
            <ContactRow icon="phone-accent">
              {clinic.phones.map((p) => (
                <a key={p.e164} href={`tel:${p.e164}`} className="hover:text-accent">
                  {p.display}
                </a>
              ))}
            </ContactRow>
            <ContactRow icon="mail-accent">
              <a href={`mailto:${clinic.email}`} className="hover:text-accent">
                {clinic.email}
              </a>
            </ContactRow>
          </address>
          <dl className="w-full">
            {clinic.hours.map((row) => (
              <div key={row.label} className="flex items-center justify-between gap-4 border-t border-line-soft py-3.5">
                <dt className="text-body text-graphite">{row.label}</dt>
                <dd className="text-label font-medium text-ink">{row.value}</dd>
              </div>
            ))}
          </dl>
          <div className="flex w-full flex-wrap gap-3">
            <LinkButton href={clinic.map.routeUrl} target="_blank" rel="noopener noreferrer" arrow className="max-[359px]:px-5">
              {contactsSection.routeCta}
            </LinkButton>
            <LinkButton href={clinic.telegramUrl} target="_blank" rel="noopener noreferrer" variant="secondary">
              {contactsSection.telegramCta}
            </LinkButton>
          </div>
        </div>

        <YandexMap
          src={clinic.map.embedUrl}
          title={`${contactsSection.mapLabel} на Яндекс Картах — ${clinic.address.street}`}
          activateLabel={contactsSection.mapActivate}
          placeholder={<MapIllustration label={contactsSection.mapLabel} address={clinic.address.short} />}
        />
      </div>
    </section>
  );
}
