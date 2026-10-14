import type { Clinic, Link } from "./types";

// Source: Figma «1. Сбор контента» → «Контакты и график».
export const clinic: Clinic = {
  name: "Derlux Clinic",
  legalName: "Derlux Clinic",
  description:
    "Многопрофильная клиника в Ташкенте: дерматология, лазерная дерматология, эстетическая медицина, гинекология, эндокринология, УЗИ, лаборатория и процедурный кабинет.",
  foundedYear: 2026,
  phones: [
    { display: "+998 90 500-50-70", e164: "+998905005070", primary: true },
    { display: "+998 90 328-58-98", e164: "+998903285898" },
  ],
  email: "sarvar2858@gmail.com",
  address: {
    city: "г. Ташкент",
    district: "Мирзо-Улугбекский район",
    street: "ул. Садыка Азимова, 46",
    short: "ул. Садыка Азимова, 46",
    country: "UZ",
  },
  hours: [
    { label: "Понедельник — суббота", value: "9:00–19:00" },
    { label: "Воскресенье", value: "только по записи" },
  ],
  openingHours: ["Mo-Sa 09:00-19:00"],
  hoursShort: "Пн–Сб 9:00–19:00",
  // TODO(clinic): the clinic's own Telegram link. Until then — chat by phone number.
  telegramUrl: "https://t.me/+998905005070",
  // Yandex Maps geocodes «Ташкент, улица Садыка Азимова, 46» to this house.
  // TODO(clinic): check against the map link the clinic sent; if it differs, update geo and map.
  geo: { lat: 41.310108, lng: 69.2904 },
  map: {
    embedUrl: "https://yandex.uz/map-widget/v1/?ll=69.290400%2C41.310108&z=16&pt=69.290400%2C41.310108&lang=ru_RU",
    url: "https://yandex.uz/maps/10335/tashkent/house/sodiq_azimov_ko_chasi_46/YkAYdA5gTUUHQFprfX9wcX1jbA==/",
    routeUrl: "https://yandex.uz/maps/?rtext=~41.310108%2C69.290400&rtt=auto",
  },
  // TODO(clinic): licence number.
  license: { number: null, label: "Лицензия Минздрава РУз № ————" },
  disclaimer: "Имеются противопоказания. Необходима консультация специалиста.",
};

export const primaryPhone = clinic.phones.find((p) => p.primary) ?? clinic.phones[0];

export const mainNav: Link[] = [
  { label: "Направления", href: "#directions" },
  { label: "Цены", href: "#prices" },
  { label: "Врачи", href: "#doctors" },
  { label: "Check-up", href: "#checkup" },
  { label: "Контакты", href: "#contacts" },
];

export const bookingHref = "#booking";
