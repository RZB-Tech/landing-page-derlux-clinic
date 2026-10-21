import { getClinic } from "@/data/clinic";
import { getFaq } from "@/data/faq";
import { getHome } from "@/data/home";
import type { Locale } from "@/i18n/config";
import { AccentTitle } from "@/components/ui/AccentTitle";
import { LinkButton } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Caption } from "@/components/ui/SectionHead";

/** «Частые вопросы» (Figma «14 FAQ»). Native <details>: works without JS, answers stay indexable. */
export function Faq({ locale }: { locale: Locale }) {
  const clinic = getClinic(locale);
  const { faqSection } = getHome(locale);
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-milk">
      <div className="page-x flex flex-col gap-10 py-20 md:gap-12 md:py-24 xl:flex-row xl:items-start xl:justify-between xl:py-40">
        <div className="flex flex-col items-start gap-6 xl:w-105">
          <Caption>{faqSection.caption}</Caption>
          <AccentTitle id="faq-title" text={faqSection.title} />
          <p className="max-w-100 text-body text-graphite">{faqSection.lead}</p>
          <LinkButton href={clinic.telegramUrl} target="_blank" rel="noopener noreferrer" variant="secondary">
            {faqSection.cta}
          </LinkButton>
        </div>

        <div className="border-t border-line-stone xl:w-195">
          {getFaq(locale).map((item, i) => (
            <details key={item.id} name="faq" open={i === 0} className="group border-b border-line-stone py-6">
              <summary className="flex cursor-pointer list-none items-center gap-4">
                <span className="flex-1 text-title font-semibold text-ink xl:max-w-160">{item.question}</span>
                <span className="flex size-9.5 shrink-0 items-center justify-center rounded-full bg-sand transition-colors group-open:bg-accent">
                  <Icon name="plus-ink" size={18} className="group-open:hidden" />
                  <Icon name="minus-on-dark" size={18} className="hidden group-open:block" />
                </span>
              </summary>
              <p className="mt-3 text-body text-graphite xl:max-w-160">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
