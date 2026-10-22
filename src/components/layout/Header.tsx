import { bookingHref, getClinic, getMainNav, primaryPhone } from "@/data/clinic";
import { getHome } from "@/data/home";
import type { Locale } from "@/i18n/config";
import { LinkButton } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { LanguageSwitch } from "./LanguageSwitch";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

export function Header({ locale }: { locale: Locale }) {
  const clinic = getClinic(locale);
  const mainNav = getMainNav(locale);
  const { headerCopy } = getHome(locale);

  return (
    <header className="sticky top-0 z-40 border-b border-line-soft bg-milk/85 backdrop-blur-md">
      <div className="page-x flex items-center gap-2 py-3 sm:gap-4 md:gap-5 xl:gap-7 xl:py-5">
        <Logo label={headerCopy.logoLabel} />
        <nav aria-label={headerCopy.nav} className="hidden xl:block">
          <ul className="flex items-start gap-6 text-label font-medium whitespace-nowrap text-ink 2xl:gap-9">
            {mainNav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition-colors hover:text-accent">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden flex-1 md:block" />
        <a
          href={`tel:${primaryPhone.e164}`}
          className="hidden items-center gap-2 text-title font-semibold whitespace-nowrap text-ink md:flex"
        >
          <Icon name="phone-accent" size={18} />
          {primaryPhone.display}
        </a>
        {/* Below 360px only the logo and the menu fit; the CTA moves into the menu. */}
        <LinkButton
          href={bookingHref}
          className="max-md:ml-auto max-md:px-5 max-md:py-3 max-sm:px-4 max-[359px]:hidden"
        >
          {headerCopy.cta}
        </LinkButton>
        {/* Last in the bar from lg up; below, it would not fit, so it is in the menu panel. */}
        <LanguageSwitch locale={locale} label={headerCopy.languageLabel} className="hidden lg:flex" />
        <MobileMenu
          nav={mainNav}
          phone={primaryPhone}
          address={clinic.address.short}
          hours={clinic.hoursShort}
          copy={headerCopy}
          bookingHref={bookingHref}
          languageSwitch={<LanguageSwitch locale={locale} label={headerCopy.languageLabel} />}
        />
      </div>
    </header>
  );
}
