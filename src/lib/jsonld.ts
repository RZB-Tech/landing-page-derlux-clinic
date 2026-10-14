import { clinic } from "@/data/clinic";
import { directions } from "@/data/directions";
import { siteUrl } from "./site";

/**
 * schema.org MedicalClinic for the home page. Reviews and the rating on the page are examples,
 * so they are intentionally left out until real, published reviews exist.
 */
export function clinicJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": `${siteUrl}/#clinic`,
    name: clinic.name,
    description: clinic.description,
    url: `${siteUrl}/`,
    image: `${siteUrl}/images/hero.jpg`,
    telephone: clinic.phones.map((p) => p.e164),
    email: clinic.email,
    foundingDate: String(clinic.foundedYear),
    address: {
      "@type": "PostalAddress",
      streetAddress: clinic.address.street,
      addressLocality: "Ташкент",
      addressRegion: clinic.address.district,
      addressCountry: clinic.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: clinic.geo.lat, longitude: clinic.geo.lng },
    hasMap: clinic.map.url,
    openingHours: clinic.openingHours,
    availableService: directions.map((d) => ({
      "@type": "MedicalProcedure",
      name: d.name,
      description: d.description,
    })),
    medicalSpecialty: ["Dermatology", "Gynecologic", "Endocrine", "Radiography", "LaboratoryScience"],
    isAcceptingNewPatients: true,
  };
}

/** Serialises JSON-LD safely for a <script> tag (escapes «<»). */
export function toJsonLdScript(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
