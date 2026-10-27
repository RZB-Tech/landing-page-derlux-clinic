import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { clinicName, getClinic, primaryPhone } from "@/data/clinic";
import { getDirections } from "@/data/directions";
import { getDoctors } from "@/data/doctors";
import { bookingDaysAhead, getHome } from "@/data/home";
// import { getServices } from "@/data/services"; // for the hidden services block below
import { hasLocale, localeInfo, locales } from "@/i18n/config";
import { fillTemplate, formatPriceFrom } from "@/lib/format";
import { directionJsonLd, toJsonLdScript } from "@/lib/jsonld";
import { directionPath, homeAnchor, homePath } from "@/lib/routes";
import { BookingTrigger } from "@/components/booking/BookingTrigger";
import { BookingProvider } from "@/components/booking/BookingProvider";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Reveal } from "@/components/motion/Reveal";
import { Booking } from "@/components/sections/Booking";
import { AccentTitle } from "@/components/ui/AccentTitle";
import { buttonClassName, ButtonContent, LinkButton } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Caption } from "@/components/ui/SectionHead";

// The page is fully prerendered (below), so it is not checked for instant navigation (dev-only insight).
export const instant = false;

// Every direction in both languages is built ahead of time.
export function generateStaticParams() {
  return locales.flatMap((lang) => getDirections("ru").map((d) => ({ lang, slug: d.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/directions/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const direction = getDirections(lang).find((d) => d.slug === slug);
  if (!direction) notFound();
  const { directionPage } = getHome(lang);
  const title = fillTemplate(directionPage.metaTitle, { name: direction.name });
  const description = fillTemplate(directionPage.metaDescription, {
    description: direction.description,
    address: getClinic(lang).address.short,
  });
  const path = directionPath(lang, slug);
  const info = localeInfo[lang];
  const image = { url: direction.image.src, width: direction.image.width, height: direction.image.height, alt: direction.image.alt };
  return {
    title,
    description,
    // The same page in each language; the slug is shared.
    alternates: {
      canonical: path,
      languages: {
        ...Object.fromEntries(locales.map((l) => [localeInfo[l].htmlLang, directionPath(l, slug)])),
        "x-default": directionPath("ru", slug),
      },
    },
    openGraph: {
      type: "website",
      locale: info.og,
      alternateLocale: locales.filter((l) => l !== lang).map((l) => localeInfo[l].og),
      url: path,
      siteName: clinicName,
      title: `${title} — ${clinicName}`,
      description,
      images: [image],
    },
    twitter: { card: "summary_large_image", title: `${title} — ${clinicName}`, description, images: [image.url] },
  };
}

export default async function DirectionPage({ params }: PageProps<"/[lang]/directions/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const directions = getDirections(lang);
  const direction = directions.find((d) => d.slug === slug);
  if (!direction) notFound();

  const { directionPage: copy } = getHome(lang);
  // const { pricesCopy } = getHome(lang); // for the hidden services block below
  const doctors = getDoctors(lang);
  // const services = getServices(lang).filter((s) => s.directionId === direction.id);
  // const directionDoctors = doctors.filter((d) => d.directionIds.includes(direction.id));
  const others = directions.filter((d) => d.id !== direction.id);
  const phone = primaryPhone;

  return (
    <BookingProvider locale={lang} doctors={doctors} daysAhead={bookingDaysAhead}>
      <Header
        locale={lang}
        logoHref={homePath(lang)}
        paths={Object.fromEntries(locales.map((l) => [l, directionPath(l, slug)])) as Record<(typeof locales)[number], string>}
      />
      <main>
        <section aria-labelledby="direction-title" className="bg-milk">
          <div className="page-x flex flex-col gap-10 pt-6 pb-16 md:pt-8 md:pb-20 xl:gap-16 xl:pb-28">
            <nav aria-label={copy.breadcrumbLabel}>
              <ol className="flex flex-wrap items-center gap-2 text-small text-graphite">
                <li>
                  <a href={homeAnchor(lang, "#top")} className="transition-colors hover:text-accent">
                    {copy.breadcrumbHome}
                  </a>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <a href={homeAnchor(lang, "#directions")} className="transition-colors hover:text-accent">
                    {copy.breadcrumbDirections}
                  </a>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="text-ink">
                  {direction.name}
                </li>
              </ol>
            </nav>

            <div className="flex flex-col gap-10 xl:flex-row xl:items-center xl:gap-16">
              <div className="flex min-w-0 flex-col items-start gap-6 xl:flex-1">
                <Caption>{copy.caption}</Caption>
                <AccentTitle as="h1" size="h1" id="direction-title" text={direction.name} className="text-ink" />
                <p className="max-w-150 text-lead text-graphite">{direction.description}</p>
                <dl className="flex flex-wrap gap-x-10 gap-y-4">
                  <div>
                    <dt className="text-small text-graphite">{copy.priceLabel}</dt>
                    <dd className="text-title font-semibold text-ink">{formatPriceFrom(direction.priceFrom, lang)}</dd>
                  </div>
                  <div>
                    <dt className="text-small text-graphite">{copy.specialistLabel}</dt>
                    <dd className="text-title font-semibold text-ink">{direction.specialist}</dd>
                  </div>
                </dl>
                <div className="flex flex-wrap gap-3">
                  <BookingTrigger preset={{ directionId: direction.id }} className={buttonClassName({ variant: "primary" })}>
                    <ButtonContent variant="primary" arrow>
                      {copy.cta}
                    </ButtonContent>
                  </BookingTrigger>
                  <LinkButton href={`tel:${phone.e164}`} variant="secondary">
                    {phone.display}
                  </LinkButton>
                </div>
              </div>

              <div className="relative aspect-4/5 w-full max-w-md overflow-hidden rounded-[48px] bg-sand shadow-float xl:w-[38%] xl:max-w-none xl:shrink-0">
                <Image
                  src={direction.image.src}
                  alt={direction.image.alt}
                  fill
                  preload
                  quality={90}
                  sizes="(min-width: 1280px) 38vw, (min-width: 768px) 448px, 92vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {direction.sections && direction.sections.length > 0 && (
          <section aria-label={copy.detailsCaption} className="bg-milk">
            <div className="page-x pb-16 md:pb-20 xl:pb-28">
              <div className="grid grid-cols-1 gap-5 md:gap-6 xl:grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
                {direction.sections.map((section, i) => (
                  <Reveal key={section.title} delay={i * 120}>
                    <div className="flex h-full flex-col gap-6 rounded-card bg-white p-6 md:rounded-panel md:p-8">
                      <AccentTitle as="h2" size="h3" text={section.title} className="text-ink" />
                      <ul className="grid grid-cols-1 gap-x-8 gap-y-3.5 md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                        {section.items.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-body text-ink">
                            <Icon name="check-accent" size={20} className="mt-0.5 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Services and prices: hidden at the client's request until the price list is final; may come back.
            To restore, uncomment this block and the `services` constant above.
        {services.length > 0 && (
          <section aria-labelledby="direction-services-title" className="bg-sand">
            <div className="page-x flex flex-col gap-8 py-16 md:gap-10 md:py-20 xl:py-24">
              <Reveal>
                <div className="flex flex-col items-start gap-4">
                  <Caption>{copy.servicesCaption}</Caption>
                  <AccentTitle id="direction-services-title" text={copy.servicesTitle} />
                  <p className="max-w-135 text-body text-graphite">{copy.servicesNote}</p>
                </div>
              </Reveal>
              <Reveal>
                <ul className="flex flex-col divide-y divide-line-stone rounded-card bg-white px-5 md:rounded-panel md:px-8">
                  {services.map((service) => (
                    <li key={service.id} className="flex flex-wrap items-center gap-x-6 gap-y-3 py-5">
                      <div className="flex min-w-0 flex-1 basis-60 flex-col">
                        <span className="text-title font-medium text-ink">{service.name}</span>
                        <span className="text-small text-graphite">
                          {service.durationMin} {pricesCopy.durationUnit}
                        </span>
                      </div>
                      <span className="text-title font-semibold whitespace-nowrap text-ink">
                        {formatPriceFrom(service.price, lang)}
                      </span>
                      <BookingTrigger
                        preset={{ directionId: direction.id, serviceId: service.id }}
                        className={buttonClassName({ variant: "secondary", className: "px-5 py-3" })}
                      >
                        {pricesCopy.cta}
                      </BookingTrigger>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </section>
        )}
        */}

        {/* Doctors of the direction: hidden at the client's request, may come back. To restore, uncomment this block
            and the `directionDoctors` constant above.
        {directionDoctors.length > 0 && (
          <section aria-labelledby="direction-doctors-title" className="bg-milk">
            <div className="page-x flex flex-col gap-8 py-16 md:gap-10 md:py-20 xl:py-24">
              <Reveal>
                <div className="flex flex-col items-start gap-4">
                  <Caption>{copy.doctorsCaption}</Caption>
                  <AccentTitle id="direction-doctors-title" text={copy.doctorsTitle} />
                </div>
              </Reveal>
              <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {directionDoctors.map((doctor, i) => (
                  <Reveal as="li" key={doctor.id} delay={i * 120}>
                    <article className="flex h-full flex-col gap-5 rounded-card bg-white p-4 md:rounded-panel">
                      <div className="relative aspect-4/5 overflow-hidden rounded-tile bg-sand">
                        <Image
                          src={doctor.photo.src}
                          alt={doctor.photo.alt}
                          fill
                          sizes="(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 90vw"
                          className="object-cover object-top"
                        />
                      </div>
                      <div className="flex flex-1 flex-col gap-1 px-1">
                        <h3 className="font-display text-display-h3 font-medium text-ink">{doctor.name}</h3>
                        <p className="text-body text-graphite">{doctor.position}</p>
                      </div>
                      <BookingTrigger
                        preset={{ directionId: direction.id, doctorId: doctor.id }}
                        className={buttonClassName({ variant: "primary", fullWidth: true })}
                      >
                        <ButtonContent variant="primary" arrow>
                          {copy.doctorCta}
                        </ButtonContent>
                      </BookingTrigger>
                    </article>
                  </Reveal>
                ))}
              </ul>
            </div>
          </section>
        )}
        */}

        <section aria-labelledby="direction-others-title" className="bg-sand">
          <div className="page-x flex flex-col gap-8 py-16 md:gap-10 md:py-20 xl:py-24">
            <Reveal>
              <div className="flex flex-col items-start gap-4">
                <Caption>{copy.othersCaption}</Caption>
                <AccentTitle id="direction-others-title" text={copy.othersTitle} />
              </div>
            </Reveal>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-5 xl:grid-cols-4">
              {others.map((other) => (
                <li key={other.id}>
                  <Link
                    href={directionPath(lang, other.slug)}
                    className="group flex h-full items-end justify-between gap-3 rounded-card bg-white p-5 transition-shadow hover:shadow-float md:rounded-panel md:p-6"
                  >
                    <span className="flex min-w-0 flex-col gap-1.5">
                      <span className="font-display text-display-h3 font-medium text-ink">{other.name}</span>
                      <span className="text-small text-graphite">{other.summary}</span>
                      <span className="text-label-sm font-medium text-accent">
                        {formatPriceFrom(other.priceFrom, lang)}
                      </span>
                    </span>
                    <span className="shrink-0 rounded-full bg-milk p-2.5 transition-transform duration-300 group-hover:-rotate-45">
                      <Icon name="arrow-right-ink" size={18} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Booking locale={lang} />
      </main>
      <Footer locale={lang} logoHref={homePath(lang)} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: toJsonLdScript(
            directionJsonLd(lang, direction, { home: copy.breadcrumbHome, directions: copy.breadcrumbDirections }),
          ),
        }}
      />
    </BookingProvider>
  );
}
