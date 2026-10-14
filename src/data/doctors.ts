import type { Doctor } from "./types";

// Placeholder doctors from landing v2: names, experience, categories and languages are fictional
// until the clinic sends real profiles. Photos: Unsplash placeholders.
export const doctors: Doctor[] = [
  {
    id: "karimova",
    name: "Дилноза Каримова",
    position: "Дерматолог, косметолог",
    directionIds: ["dermatology", "laser", "aesthetic"],
    experienceYears: 12,
    category: "Высшая категория",
    languages: ["ru", "uz"],
    photo: { src: "/images/doctor-1.jpg", alt: "Дилноза Каримова, дерматолог", width: 302, height: 392 },
  },
  {
    id: "yusupova",
    name: "Нилуфар Юсупова",
    position: "Акушер-гинеколог",
    directionIds: ["gynecology"],
    experienceYears: 15,
    category: "Высшая категория",
    languages: ["ru", "uz"],
    photo: { src: "/images/doctor-2.jpg", alt: "Нилуфар Юсупова, акушер-гинеколог", width: 302, height: 392 },
  },
  {
    id: "rakhimova",
    name: "Малика Рахимова",
    position: "Эндокринолог, детский эндокринолог",
    directionIds: ["endocrinology"],
    experienceYears: 9,
    category: "Первая категория",
    languages: ["ru", "uz"],
    photo: { src: "/images/doctor-3.jpg", alt: "Малика Рахимова, эндокринолог", width: 302, height: 392 },
  },
  {
    id: "alieva",
    name: "Сабина Алиева",
    position: "Врач УЗИ-диагностики",
    directionIds: ["ultrasound"],
    experienceYears: 11,
    category: "Высшая категория",
    languages: ["ru", "uz", "en"],
    photo: { src: "/images/doctor-4.jpg", alt: "Сабина Алиева, врач УЗИ-диагностики", width: 302, height: 392 },
  },
];
