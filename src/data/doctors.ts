import type { Locale } from "@/i18n/config";
import { translate } from "@/i18n/translate";
import { doctorsUz } from "./uz";
import type { Doctor, Image } from "./types";

/** Scans of diplomas and certificates: `public/images/documents/<prefix>-<n>.webp`, sizes as exported. */
const scans = (prefix: string, sizes: [number, number][]): Image[] =>
  sizes.map(([width, height], i) => ({
    src: `/images/documents/${prefix}-${i + 1}.webp`,
    alt: `Документ ${i + 1}`,
    width,
    height,
  }));

// The clinic's doctors (names and specialties from the clinic, 2026-10-15).
// Experience, category, specializations and education: the clinic's doctor questionnaire (2026-10).
// TODO(clinic): languages — the card shows them once they are filled in. Akbarova's category is not given.
// TODO(clinic): Akbarova's diplomas and certificates are not sent yet.
const doctorsRu: Doctor[] = [
  {
    id: "rakhimov",
    name: "Рахимов Сарвар Самукович",
    position: "Дерматолог",
    directionIds: ["dermatology"],
    specializations: ["Дерматолог", "Специалист по лазерной дерматологии"],
    experienceYears: 18,
    category: "Высшая категория",
    education: ["2001–2008 — ТашМИ, бакалавриат", "2008–2011 — магистратура"],
    focus: ["Акне и постакне", "Псориаз", "Нейродермит и экзема", "Алопеция", "Витилиго", "Пигментация", "Папилломы и бородавки", "Стрии и растяжки"],
    documents: scans("sarvar", [[1200, 1600], [1200, 1600], [1200, 1600], [1600, 1200]]),
    photo: { src: "/images/doctor-rakhimov.jpg", alt: "Рахимов Сарвар Самукович, дерматолог", width: 822, height: 1067 },
  },
  {
    id: "akbarova",
    name: "Акбарова Дилдора Гайратовна",
    position: "Дерматолог",
    directionIds: ["dermatology"],
    specializations: ["Дерматолог", "Специалист по лазерной дерматологии"],
    experienceYears: 7,
    education: ["2004–2011 — ТошПТИ, бакалавриат", "2011–2013 — ординатура"],
    focus: ["Акне и постакне", "Псориаз", "Нейродермит и экзема", "Алопеция", "Витилиго", "Пигментация", "Папилломы и бородавки", "Стрии и растяжки"],
    photo: { src: "/images/doctor-akbarova.jpg", alt: "Акбарова Дилдора Гайратовна, дерматолог", width: 659, height: 855 },
  },
  {
    id: "salomova",
    name: "Саломова Шахло Иноятовна",
    position: "Гинеколог, врач УЗИ",
    directionIds: ["gynecology", "ultrasound"],
    specializations: ["Врач акушер-гинеколог", "Гинеколог-эндокринолог", "Врач УЗИ", "Дерматокосметолог"],
    experienceYears: 30,
    category: "Высшая категория",
    education: ["1985–1991 — СамМИ, бакалавриат", "1991–1992 — интернатура"],
    focus: ["Бесплодие", "Воспалительные заболевания", "Миома и кисты", "Ведение беременности", "Подбор контрацепции", "Эрозия шейки матки", "УЗИ всех органов"],
    documents: scans("shaxlo", [[1200, 1600], [1600, 1200], [1200, 1600], [1600, 1200], [1600, 1200], [1600, 1200]]),
    photo: {
      src: "/images/doctor-salomova.jpg",
      alt: "Саломова Шахло Иноятовна, гинеколог и врач УЗИ",
      width: 822,
      height: 1067,
    },
  },
  {
    id: "khaydarova",
    name: "Хайдарова Гавхар Абраровна",
    position: "Эндокринолог",
    directionIds: ["endocrinology"],
    specializations: ["Эндокринолог", "Детский и взрослый эндокринолог"],
    experienceYears: 11,
    education: ["2003–2010 — ТМА, бакалавриат", "2013–2015 — РСПМЦЭ"],
    // TODO(clinic): the list in the questionnaire is cut off after «лечение ожирения» — send the full one.
    focus: ["Заболевания щитовидной железы", "Лечение ожирения"],
    documents: scans("gavhar", [[1600, 1123], [1280, 907]]),
    photo: { src: "/images/lisense/doctor4.png", alt: "Хайдарова Гавхар Абраровна, эндокринолог", width: 1254, height: 1254 },
  },
];

export function getDoctors(locale: Locale): Doctor[] {
  if (locale === "ru") return doctorsRu;
  return translate(doctorsRu, doctorsUz, (d, t) => ({
    ...d,
    ...t,
    photo: { ...d.photo, alt: `${t.name}, ${t.position.toLowerCase()}` },
    documents: d.documents?.map((doc, i) => ({ ...doc, alt: `Hujjat ${i + 1}` })),
  }));
}
