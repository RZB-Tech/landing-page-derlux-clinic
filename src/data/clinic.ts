import type { Locale, Localized } from "@/i18n/config";
import { homeAnchor } from "@/lib/routes";
import type { Clinic, Link, SocialLink } from "./types";

// TODO(clinic): the clinic's own Telegram link. Until then — chat by phone number.
const telegramUrl = "https://t.me/+998905005070";

export const clinicName = "Derlux Clinic";

const socialLinks: (SocialLink & { url: string })[] = [
  { network: "instagram", label: "Instagram", url: "https://www.instagram.com/dermatolog_dr.sarvar" },
  { network: "facebook", label: "Facebook", url: "https://www.facebook.com/share/18c8YEqjbF/" },
  { network: "telegram", label: "@dermatolog_drSarvar", url: "https://t.me/dermatolog_drSarvar" },
  { network: "telegram", label: "@ozonoterapiya_uz", url: "https://t.me/ozonoterapiya_uz" },
  { network: "youtube", label: "YouTube", url: "https://youtube.com/@sarvarrahimov2858" },
];

// Text of the clinic card in each language. Uzbek: TODO(clinic) have a native speaker proofread.
const text: Localized<
  Pick<Clinic, "description" | "address" | "hours" | "hoursShort" | "disclaimer"> & { licenseLabel: string }
> = {
  ru: {
    description:
      "Многопрофильная клиника в Ташкенте: дерматология, лазерная дерматология, эстетическая медицина, гинекология, эндокринология, УЗИ, лаборатория и процедурный кабинет.",
    address: {
      city: "г. Ташкент",
      district: "Мирзо-Улугбекский район",
      street: "ул. Садыка Азимова, 46",
      short: "ул. Садыка Азимова, 46",
      locality: "Ташкент",
      // TODO(clinic): postal code.
      postalCode: null,
      country: "UZ",
    },
    hours: [
      { label: "Понедельник — суббота", value: "9:00–19:00" },
      { label: "Воскресенье", value: "только по записи" },
    ],
    hoursShort: "Пн–Сб 9:00–19:00",
    licenseLabel: "Лицензия Минздрава РУз № ————",
    disclaimer: "Имеются противопоказания. Необходима консультация специалиста.",
  },
  uz: {
    description:
      "Toshkentdagi ko'p tarmoqli klinika: dermatologiya, lazer dermatologiya, estetik tibbiyot, ginekologiya, endokrinologiya, UZI, laboratoriya va muolaja xonasi.",
    address: {
      city: "Toshkent sh.",
      district: "Mirzo Ulug'bek tumani",
      street: "Sodiq Azimov ko'chasi, 46",
      short: "Sodiq Azimov ko'chasi, 46",
      locality: "Toshkent",
      postalCode: null,
      country: "UZ",
    },
    hours: [
      { label: "Dushanba — shanba", value: "9:00–19:00" },
      { label: "Yakshanba", value: "faqat oldindan yozilish bilan" },
    ],
    hoursShort: "Du–Sha 9:00–19:00",
    licenseLabel: "O'zR SSV litsenziyasi № ————",
    disclaimer: "Qarshi ko'rsatmalar mavjud. Mutaxassis maslahati zarur.",
  },
};

// Source: Figma «1. Сбор контента» → «Контакты и график».
export function getClinic(locale: Locale): Clinic {
  const { licenseLabel, ...localized } = text[locale];
  return {
    name: clinicName,
    legalName: clinicName,
    foundedYear: 2026,
    phones: [
      { display: "+998 90 500-50-70", e164: "+998905005070", primary: true },
      { display: "+998 90 328-58-98", e164: "+998903285898" },
    ],
    email: "sarvar2858@gmail.com",
    // Sunday is by appointment only, so it is not listed as open.
    openingHours: [
      { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:00", closes: "19:00" },
    ],
    telegramUrl,
    // The doctor's own accounts, sent by the clinic on 2026-10-16.
    socials: socialLinks,
    // TODO(clinic): links to the Google Business Profile, Yandex Business and 2GIS once they exist.
    profiles: socialLinks.map((s) => s.url),
    // Yandex Maps geocodes «Ташкент, улица Садыка Азимова, 46» to this house.
    // TODO(clinic): check against the map link the clinic sent; if it differs, update geo and map.
    geo: { lat: 41.310108, lng: 69.2904 },
    map: {
      embedUrl: "https://yandex.uz/map-widget/v1/?ll=69.290400%2C41.310108&z=16&pt=69.290400%2C41.310108&lang=ru_RU",
      url: "https://yandex.uz/maps/10335/tashkent/house/sodiq_azimov_ko_chasi_46/YkAYdA5gTUUHQFprfX9wcX1jbA==/",
      routeUrl: "https://yandex.uz/maps/?rtext=~41.310108%2C69.290400&rtt=auto",
    },
    // TODO(clinic): licence number.
    license: { number: null, label: licenseLabel },
    ...localized,
  };
}

export const primaryPhone = getClinic("ru").phones.find((p) => p.primary) ?? getClinic("ru").phones[0];

const nav: Localized<Link[]> = {
  ru: [
    { label: "Направления", href: "#directions" },
    { label: "Цены", href: "#prices" },
    { label: "Врачи", href: "#doctors" },
    // { label: "Check-up", href: "#checkup" }, // hidden with the Check-up section, see page.tsx
    { label: "Контакты", href: "#contacts" },
  ],
  uz: [
    { label: "Yo'nalishlar", href: "#directions" },
    { label: "Narxlar", href: "#prices" },
    { label: "Shifokorlar", href: "#doctors" },
    // { label: "Check-up", href: "#checkup" }, // hidden with the Check-up section, see page.tsx
    { label: "Aloqa", href: "#contacts" },
  ],
};

// The links point at the home page's sections, so they work from the direction pages too.
export const getMainNav = (locale: Locale): Link[] =>
  nav[locale].map((item) => ({ ...item, href: homeAnchor(locale, item.href as `#${string}`) }));

export const bookingHref = "#booking";
