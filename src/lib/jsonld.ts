import { checkups } from "@/data/checkups";
import { clinic, primaryPhone } from "@/data/clinic";
import { directions } from "@/data/directions";
import { faq } from "@/data/faq";
import { services } from "@/data/services";
import { siteUrl } from "./site";

const clinicId = `${siteUrl}/#clinic`;

/** WebSite: tells Google the site name to show above the result. */
function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: `${siteUrl}/`,
    name: clinic.name,
    inLanguage: "ru",
    publisher: { "@id": clinicId },
  };
}

/** Lowest and highest «от» price across the price list and Check-up programs: «90000–1100000 UZS». */
function priceRange() {
  const prices = [...services, ...checkups].map((item) => item.price.from);
  return `${Math.min(...prices)}–${Math.max(...prices)} UZS`;
}

/**
 * schema.org MedicalClinic (a LocalBusiness). Reviews and the rating on the page are examples,
 * so they are intentionally left out until real, published reviews exist.
 */
function clinicJsonLd() {
  const { address } = clinic;
  return {
    "@type": "MedicalClinic",
    "@id": clinicId,
    name: clinic.name,
    description: clinic.description,
    url: `${siteUrl}/`,
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
    availableService: directions.map((d) => ({
      "@type": "MedicalProcedure",
      name: d.name,
      description: d.description,
    })),
    medicalSpecialty: ["Dermatology", "Gynecologic", "Endocrine", "Radiography", "LaboratoryScience"],
    isAcceptingNewPatients: true,
  };
}

/** The FAQ section, question by question, as shown on the page. */
function faqJsonLd() {
  return {
    "@type": "FAQPage",
    "@id": `${siteUrl}/#faq`,
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** Structured data for the home page: site, clinic and FAQ in one graph. */
export function homeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [websiteJsonLd(), clinicJsonLd(), faqJsonLd()],
  };
}

/** Serialises JSON-LD safely for a <script> tag (escapes «<»). */
export function toJsonLdScript(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
