import { getCheckups } from "@/data/checkups";
import { getClinic, primaryPhone } from "@/data/clinic";
import { getDirections } from "@/data/directions";
import { getFaq } from "@/data/faq";
import { getServices } from "@/data/services";
import { serviceConditionIds } from "@/data/conditions";
import type { Condition, Direction, Doctor } from "@/data/types";
import { localeInfo, type Locale } from "@/i18n/config";
import { directionPath, doctorPath, homePath } from "./routes";
import { siteUrl } from "./site";

const clinicId = `${siteUrl}/#clinic`;

/** Address of the home page in a language, e.g. «https://…/uz». */
const pageUrl = (locale: Locale) => `${siteUrl}${localeInfo[locale].path}`;

/** WebSite: tells Google the site name to show above the result. */
function websiteJsonLd(locale: Locale) {
  return {
    "@type": "WebSite",
    "@id": `${pageUrl(locale)}#website`,
    url: pageUrl(locale),
    name: getClinic(locale).name,
    inLanguage: localeInfo[locale].htmlLang,
    publisher: { "@id": clinicId },
  };
}

/** Lowest and highest «от» price across the price list and Check-up programs: «90000–1100000 UZS». */
function priceRange() {
  const prices = [...getServices("ru"), ...getCheckups("ru")].map((item) => item.price.from);
  return `${Math.min(...prices)}–${Math.max(...prices)} UZS`;
}

/**
 * schema.org MedicalClinic (a LocalBusiness). Reviews and the rating on the page are examples,
 * so they are intentionally left out until real, published reviews exist.
 */
function clinicJsonLd(locale: Locale) {
  const clinic = getClinic(locale);
  const { address } = clinic;
  return {
    "@type": "MedicalClinic",
    "@id": clinicId,
    name: clinic.name,
    description: clinic.description,
    url: pageUrl(locale),
    image: `${siteUrl}/images/hero.jpg`,
    logo: `${siteUrl}/images/logo.jpg`,
    telephone: primaryPhone.e164,
    email: clinic.email,
    foundingDate: String(clinic.foundedYear),
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.locality,
      addressRegion: address.district,
      ...(address.postalCode && { postalCode: address.postalCode }),
      addressCountry: address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: clinic.geo.lat, longitude: clinic.geo.lng },
    hasMap: clinic.map.url,
    areaServed: { "@type": "City", name: address.locality },
    openingHoursSpecification: clinic.openingHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    priceRange: priceRange(),
    currenciesAccepted: "UZS",
    ...(clinic.profiles.length > 0 && { sameAs: clinic.profiles }),
    availableService: getDirections(locale).map((d) => ({
      "@type": "MedicalProcedure",
      name: d.name,
      description: d.description,
    })),
    medicalSpecialty: ["Dermatology", "Gynecologic", "Endocrine", "Radiography", "LaboratoryScience"],
    isAcceptingNewPatients: true,
  };
}

/** The FAQ section, question by question, as shown on the page. */
function faqJsonLd(locale: Locale) {
  return {
    "@type": "FAQPage",
    "@id": `${pageUrl(locale)}#faq`,
    inLanguage: localeInfo[locale].htmlLang,
    mainEntity: getFaq(locale).map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** Structured data for the home page: site, clinic and FAQ in one graph. */
export function homeJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@graph": [websiteJsonLd(locale), clinicJsonLd(locale), faqJsonLd(locale)],
  };
}

/**
 * Structured data for a direction's page: breadcrumbs and the medical service with its «от» price.
 * The clinic itself is described on the home page; here it is referenced by its `@id`.
 */
export function directionJsonLd(locale: Locale, direction: Direction, labels: { home: string; directions: string }) {
  const clinic = getClinic(locale);
  const url = `${siteUrl}${directionPath(locale, direction.slug)}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: labels.home, item: `${siteUrl}${homePath(locale)}` },
          { "@type": "ListItem", position: 2, name: labels.directions, item: `${siteUrl}${homePath(locale)}#directions` },
          { "@type": "ListItem", position: 3, name: direction.name, item: url },
        ],
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: direction.name,
        description: direction.description,
        url,
        image: `${siteUrl}${direction.image.src}`,
        inLanguage: localeInfo[locale].htmlLang,
        areaServed: { "@type": "City", name: clinic.address.locality },
        provider: { "@type": "MedicalClinic", "@id": clinicId, name: clinic.name, url: `${siteUrl}${homePath(locale)}` },
        offers: {
          "@type": "Offer",
          priceCurrency: direction.priceFrom.currency,
          priceSpecification: {
            "@type": "PriceSpecification",
            minPrice: direction.priceFrom.from,
            priceCurrency: direction.priceFrom.currency,
          },
        },
      },
    ],
  };
}

/** schema.org MedicalSpecialty of each direction (for the doctors' pages). */
const specialtyByDirection: Record<string, string> = {
  dermatology: "Dermatology",
  laser: "Dermatology",
  aesthetic: "Dermatology",
  gynecology: "Gynecologic",
  endocrinology: "Endocrine",
  ultrasound: "Radiography",
  laboratory: "LaboratoryScience",
};

/**
 * Structured data for a condition's page: breadcrumbs (home → direction → condition) and a MedicalWebPage
 * about the condition, with its signs, risk factors and treatments as on the page. Services such as
 * pregnancy care are not described as a MedicalCondition.
 */
export function conditionJsonLd(
  locale: Locale,
  direction: Direction,
  condition: Condition,
  url: string,
  labels: { home: string },
) {
  const about = serviceConditionIds.has(condition.id)
    ? { "@type": "Thing", name: condition.name, description: condition.about }
    : {
        "@type": "MedicalCondition",
        name: condition.name,
        description: condition.about,
        signOrSymptom: condition.symptoms.map((name) => ({ "@type": "MedicalSignOrSymptom", name })),
        riskFactor: condition.causes.map((name) => ({ "@type": "MedicalRiskFactor", name })),
        possibleTreatment: condition.treatment.map((name) => ({ "@type": "MedicalTherapy", name })),
      };
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: labels.home, item: `${siteUrl}${homePath(locale)}` },
          { "@type": "ListItem", position: 2, name: direction.name, item: `${siteUrl}${directionPath(locale, direction.slug)}` },
          { "@type": "ListItem", position: 3, name: condition.name, item: url },
        ],
      },
      {
        "@type": "MedicalWebPage",
        "@id": `${url}#page`,
        url,
        name: condition.name,
        description: condition.about,
        inLanguage: localeInfo[locale].htmlLang,
        isPartOf: { "@id": `${pageUrl(locale)}#website` },
        publisher: { "@id": clinicId },
        about,
      },
    ],
  };
}

/**
 * Structured data for a doctor's page: breadcrumbs (home → doctor) and the doctor as an IndividualPhysician
 * who practises at the clinic (referenced by its `@id`).
 */
export function doctorJsonLd(locale: Locale, doctor: Doctor, description: string, labels: { home: string }) {
  const url = `${siteUrl}${doctorPath(locale, doctor.id)}`;
  const specialties = [...new Set(doctor.directionIds.map((id) => specialtyByDirection[id]).filter(Boolean))];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: labels.home, item: `${siteUrl}${homePath(locale)}` },
          { "@type": "ListItem", position: 2, name: doctor.name, item: url },
        ],
      },
      {
        "@type": "IndividualPhysician",
        "@id": `${url}#physician`,
        name: doctor.name,
        description,
        url,
        image: `${siteUrl}${doctor.photo.src}`,
        medicalSpecialty: specialties,
        knowsAbout: doctor.focus,
        practicesAt: { "@id": clinicId },
      },
    ],
  };
}

/** Serialises JSON-LD safely for a <script> tag (escapes «<»). */
export function toJsonLdScript(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
