import type { Direction } from "./types";

const uzs = (from: number) => ({ from, currency: "UZS" as const });

// Names and descriptions: Figma «1. Сбор контента». Card subtitles and «от» prices: landing v2
// (prices are examples until the clinic sends its price list). Photos: Unsplash placeholders.
export const directions: Direction[] = [
  {
    id: "dermatology",
    slug: "dermatologiya",
    name: "Дерматология",
    shortName: "Дерматология",
    summary: "Акне, псориаз, экзема, папилломы",
    description:
      "Лечение кожных заболеваний (угри, псориаз, нейродермит, экзема, алопеция, витилиго), удаление папиллом, бородавок, мозолей, кондилом, контагиозного моллюска, постакне, пигментация.",
    priceFrom: uzs(150_000),
    image: { src: "/images/direction-derm.jpg", alt: "Дерматология", width: 302, height: 240 },
    specialist: "Дерматолог",
  },
  {
    id: "laser",
    slug: "lazernaya-dermatologiya",
    name: "Лазерная дерматология",
    shortName: "Лазер",
    summary: "Ногти, пигментация, рубцы",
    description: "Лазерная коррекция вросшего ногтя, удаление пигментации, лечение рубцов и постакне.",
    priceFrom: uzs(300_000),
    image: { src: "/images/direction-laser.jpg", alt: "Лазерная дерматология", width: 302, height: 240 },
    specialist: "Дерматолог",
  },
  {
    id: "aesthetic",
    slug: "esteticheskaya-medicina",
    name: "Эстетическая медицина",
    shortName: "Эстетика",
    summary: "RF-лифтинг, стрии, целлюлит",
    description: "Антивозрастные процедуры (RF-лифтинг), антицеллюлитные аппаратные процедуры, стрии и растяжки.",
    priceFrom: uzs(250_000),
    image: { src: "/images/direction-aest.jpg", alt: "Эстетическая медицина", width: 302, height: 240 },
    specialist: "Косметолог",
  },
  {
    id: "gynecology",
    slug: "ginekologiya",
    name: "Гинекология",
    shortName: "Гинекология",
    summary: "Бесплодие, миома, беременность",
    description:
      "Бесплодие, воспалительные заболевания, миома, киста, ведение беременности, подбор контрацепции, лечение эрозии шейки матки.",
    priceFrom: uzs(180_000),
    image: { src: "/images/direction-gyn.jpg", alt: "Гинекология", width: 302, height: 240 },
    specialist: "Гинеколог",
  },
  {
    id: "endocrinology",
    slug: "endokrinologiya",
    name: "Эндокринология",
    shortName: "Эндокринология",
    summary: "Щитовидная железа, диабет, вес",
    description:
      "Щитовидная железа у детей и взрослых, задержка физического развития, избыточная масса тела, метаболический синдром, эндокринное бесплодие у женщин, сахарный диабет 2 типа.",
    priceFrom: uzs(180_000),
    image: { src: "/images/direction-endo.jpg", alt: "Эндокринология", width: 302, height: 240 },
    specialist: "Эндокринолог",
  },
  {
    id: "ultrasound",
    slug: "uzi",
    name: "УЗИ всех органов",
    shortName: "УЗИ",
    summary: "Все органы, беременность",
    description: "Ультразвуковая диагностика всех органов, в том числе при беременности.",
    priceFrom: uzs(120_000),
    image: { src: "/images/direction-uzi.jpg", alt: "УЗИ всех органов", width: 302, height: 240 },
    specialist: "Врач УЗИ",
  },
  {
    id: "laboratory",
    slug: "laboratoriya",
    name: "Лаборатория",
    shortName: "Лаборатория",
    summary: "Все виды анализов",
    description: "Все виды анализов.",
    priceFrom: uzs(35_000),
    image: { src: "/images/direction-lab.jpg", alt: "Лаборатория", width: 302, height: 240 },
    specialist: "Лаборатория",
  },
  {
    id: "procedures",
    slug: "procedurnyy-kabinet",
    name: "Процедурный кабинет",
    shortName: "Процедурный",
    summary: "Капельницы, инъекции",
    description: "Капельницы, внутривенные и внутримышечные инъекции.",
    priceFrom: uzs(50_000),
    image: { src: "/images/direction-proc.jpg", alt: "Процедурный кабинет", width: 302, height: 240 },
    specialist: "Медсестра",
  },
];
