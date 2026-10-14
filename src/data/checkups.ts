import type { CheckupProgram } from "./types";

// Landing v2. Composition and prices are a proposal to agree with the clinic.
export const checkups: CheckupProgram[] = [
  {
    id: "healthy-skin",
    title: "Здоровая *кожа*",
    audience: "Для тех, у кого акне, выпадение волос или пигментация не проходят",
    includes: [
      "Консультация дерматолога",
      "Консультация эндокринолога",
      "Гормоны щитовидной железы и половые гормоны",
      "Биохимия крови и ферритин",
    ],
    durationLabel: "≈ 2 часа",
    price: { from: 950_000, currency: "UZS" },
  },
  {
    id: "womens-health",
    title: "Женское *здоровье*",
    audience: "Ежегодный осмотр и планирование беременности",
    includes: [
      "Консультация гинеколога",
      "УЗИ органов малого таза",
      "УЗИ молочных желёз",
      "Мазок на онкоцитологию и флору",
    ],
    durationLabel: "≈ 2,5 часа",
    price: { from: 1_100_000, currency: "UZS" },
    featured: true,
    badge: "Популярно",
  },
  {
    id: "thyroid",
    title: "Щитовидная *железа*",
    audience: "При усталости, перепадах веса и выпадении волос — взрослым и детям",
    includes: ["Консультация эндокринолога", "УЗИ щитовидной железы", "ТТГ, Т4 свободный, АТ-ТПО", "Общий анализ крови"],
    durationLabel: "≈ 1,5 часа",
    price: { from: 650_000, currency: "UZS" },
  },
];
