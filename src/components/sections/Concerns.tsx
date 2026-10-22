import { getHome } from "@/data/home";
import type { Advantage } from "@/data/types";
import type { Locale } from "@/i18n/config";
import { AccentTitle } from "@/components/ui/AccentTitle";
import { LinkButton } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Caption } from "@/components/ui/SectionHead";
import { ConcernChips } from "./ConcernChips";

const advantageIcons: Record<Advantage["icon"], IconName> = {
  shield: "shield-accent-24",
  users: "users-accent",
  check: "check-accent-24",
  heart: "heart-accent",
};

/** «Что вас беспокоит?» + «Почему Derlux» + advantages (Figma «03»). */
export function Concerns({ locale }: { locale: Locale }) {
  const { advantages, concerns, concernsSection, whyCard } = getHome(locale);
  return (
    <section aria-labelledby="concerns-title" className="bg-milk">
      <div className="page-x flex flex-col gap-14 pb-16 md:pb-20 xl:gap-14 xl:pt-10 xl:pb-28">
        <div className="flex flex-col gap-12 xl:flex-row xl:items-start xl:justify-between xl:gap-6">
          <div className="flex flex-col items-start gap-7 xl:w-155">
            <Caption>{concernsSection.caption}</Caption>
            <AccentTitle id="concerns-title" text={concernsSection.title} />
            <p className="max-w-135 text-body text-graphite">{concernsSection.lead}</p>
            <ConcernChips concerns={concerns} />
          </div>

          <div className="flex flex-col items-start gap-8 rounded-panel bg-accent p-5 text-on-dark sm:p-8 md:p-12 xl:w-149 xl:shrink-0">
            <Caption onDark>{whyCard.caption}</Caption>
            <AccentTitle as="p" size="h3" text={whyCard.title} className="max-w-125" />
            <p className="max-w-125 text-body opacity-85">{whyCard.text}</p>
            <ul
              aria-label={whyCard.specialistsLabel}
              className="grid w-full max-w-125 grid-cols-[1fr_auto_1fr_auto_1fr] items-center md:flex"
            >
              {whyCard.specialists.map((name, i) => (
                <li key={name} className="contents">
                  {i > 0 && <span aria-hidden className="h-px w-3 bg-on-dark md:w-13" />}
                  <span className="flex aspect-square w-full items-center justify-center rounded-full border border-on-dark px-1 text-center text-label-sm font-medium hyphens-auto md:size-33 md:shrink-0 md:px-0 md:text-label">
                    {name}
                  </span>
                </li>
              ))}
            </ul>
            <LinkButton href={whyCard.cta.href} variant="light" arrow>
              {whyCard.cta.label}
            </LinkButton>
          </div>
        </div>

        <ul className="grid grid-cols-1 gap-x-6 gap-y-8 min-[360px]:grid-cols-2 xl:grid-cols-4">
          {advantages.map((item) => (
            <li key={item.id} className="flex flex-col items-start gap-4">
              <span className="rounded-full bg-sand p-3.5">
                <Icon name={advantageIcons[item.icon]} size={24} />
              </span>
              <span className="text-title font-semibold text-ink">{item.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
