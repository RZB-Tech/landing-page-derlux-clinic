import { bookingHref, clinic, mainNav, primaryPhone } from "@/data/clinic";
import { headerCopy } from "@/data/home";
import { LinkButton } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line-soft bg-milk">
      <div className="page-x flex items-center gap-2 py-3 sm:gap-4 md:gap-5 xl:gap-7 xl:py-5">
        <Logo />
        <nav aria-label={headerCopy.nav} className="hidden xl:block">
          <ul className="flex items-start gap-9 text-label font-medium text-ink">
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
        <MobileMenu
          nav={mainNav}
          phone={primaryPhone}
          address={clinic.address.short}
          hours={clinic.hoursShort}
          copy={headerCopy}
          bookingHref={bookingHref}
        />
      </div>
    </header>
  );
}
