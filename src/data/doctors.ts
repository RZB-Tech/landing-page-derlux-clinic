import type { Locale } from "@/i18n/config";
import { translate } from "@/i18n/translate";
import { doctorsUz } from "./uz";
import type { Doctor } from "./types";

// The clinic's doctors (names and specialties from the clinic, 2026-10-15).
// TODO(clinic): experience, category and languages — the card shows them once they are filled in.
const doctorsRu: Doctor[] = [
  {
    id: "rakhimov",
    name: "Рахимов Сарвар Самукович",
    position: "Дерматолог",
    directionIds: ["dermatology"],
    photo: { src: "/images/doctor-rakhimov.jpg", alt: "Рахимов Сарвар Самукович, дерматолог", width: 822, height: 1067 },
  },
  {
    id: "akbarova",
    name: "Акбарова Дилдора Гайратовна",
    position: "Дерматолог",
    directionIds: ["dermatology"],
    photo: { src: "/images/doctor-akbarova.jpg", alt: "Акбарова Дилдора Гайратовна, дерматолог", width: 659, height: 855 },
  },
  {
    id: "salomova",
    name: "Саломова Шахло Иноятовна",
    position: "Гинеколог, врач УЗИ",
    directionIds: ["gynecology", "ultrasound"],
    photo: {
      src: "/images/doctor-salomova.jpg",
      alt: "Саломова Шахло Иноятовна, гинеколог и врач УЗИ",
      width: 822,
      height: 1067,
    },
  },
];

export function getDoctors(locale: Locale): Doctor[] {
  if (locale === "ru") return doctorsRu;
  return translate(doctorsRu, doctorsUz, (d, t) => ({
    ...d,
    ...t,
    photo: { ...d.photo, alt: `${t.name}, ${t.position.toLowerCase()}` },
  }));
}
