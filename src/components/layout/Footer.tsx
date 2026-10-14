import { bookingHref, clinic, mainNav, primaryPhone } from "@/data/clinic";
import { footerCopy } from "@/data/home";
import { LinkButton } from "@/components/ui/Button";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-ink text-on-dark">
      <div className="page-x flex flex-col pt-16 pb-10 xl:pt-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Logo variant="footer" />
          <div className="flex flex-wrap items-center gap-4">
            <a href={`tel:${primaryPhone.e164}`} className="text-title font-semibold whitespace-nowrap">
              {primaryPhone.display}
            </a>
            <LinkButton href={bookingHref} variant="light" arrow>
              {footerCopy.cta}
            </LinkButton>
          </div>
        </div>

        <hr className="mt-10 border-on-dark xl:mt-12" />

        <div className="mt-10 flex flex-col gap-6 text-small xl:mt-12 xl:flex-row xl:items-center xl:justify-between">
          <nav aria-label="Навигация в подвале">
            <ul className="flex flex-wrap gap-x-10 gap-y-3">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="transition-opacity hover:opacity-70">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <p className="text-on-dark/60">
            {clinic.address.short} · {clinic.hoursShort}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 text-small text-on-dark/60 xl:mt-12 xl:flex-row xl:justify-between xl:gap-6">
          <p>
            © {clinic.foundedYear} {clinic.name} · {clinic.license.label}
          </p>
          <p>{clinic.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
