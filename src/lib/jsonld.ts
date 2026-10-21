import { getCheckups } from "@/data/checkups";
import { getClinic, primaryPhone } from "@/data/clinic";
import { getDirections } from "@/data/directions";
import { getFaq } from "@/data/faq";
import { getServices } from "@/data/services";
import { localeInfo, type Locale } from "@/i18n/config";
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

/** Serialises JSON-LD safely for a <script> tag (escapes «<»). */
export function toJsonLdScript(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
