import type { Locale } from "@/i18n/config";
import { translate } from "@/i18n/translate";
import type { Direction } from "./types";

const uzs = (from: number) => ({ from, currency: "UZS" as const });

// Names and descriptions: Figma «1. Сбор контента». Card subtitles and «от» prices: landing v2
// (prices are examples until the clinic sends its price list). Photos: Unsplash placeholders.
const directionsRu: Direction[] = [
  {
    id: "dermatology",
    slug: "dermatologiya",
    name: "Дерматология",
    shortName: "Дерматология",
    summary: "Акне, псориаз, экзема, папилломы",
    description:
      "Лечение кожных заболеваний (угри, псориаз, нейродермит, экзема, алопеция, витилиго), удаление папиллом, бородавок, мозолей, кондилом, контагиозного моллюска, постакне, пигментация.",
    priceFrom: uzs(150_000),
    image: { src: "/images/direction-derm.jpg", alt: "Дерматология", width: 1600, height: 1067 },
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
    image: { src: "/images/direction-laser.jpg", alt: "Лазерная дерматология", width: 1600, height: 2133 },
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
    image: { src: "/images/direction-aest.jpg", alt: "Эстетическая медицина", width: 1600, height: 1067 },
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
    image: { src: "/images/direction-gyn.jpg", alt: "Гинекология", width: 1400, height: 2099 },
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
    image: { src: "/images/direction-endo.jpg", alt: "Эндокринология", width: 1600, height: 2038 },
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
    image: { src: "/images/direction-uzi.jpg", alt: "УЗИ всех органов", width: 1600, height: 2400 },
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
    image: { src: "/images/direction-lab.jpg", alt: "Лаборатория", width: 1600, height: 1067 },
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
    image: { src: "/images/direction-proc.jpg", alt: "Процедурный кабинет", width: 1600, height: 1059 },
    specialist: "Медсестра",
  },
];

type DirectionText = Pick<Direction, "name" | "shortName" | "summary" | "description" | "specialist">;

const directionsUz: Record<string, DirectionText> = {
  dermatology: {
    name: "Dermatologiya",
    shortName: "Dermatologiya",
    summary: "Akne, psoriaz, ekzema, papillomalar",
    description:
      "Teri kasalliklarini davolash (husnbuzar, psoriaz, neyrodermit, ekzema, alopesiya, vitiligo), papillomalar, so'gallar, qadoqlar, kondilomalar, yumshoq molluskani olib tashlash, postakne, pigmentatsiya.",
    specialist: "Dermatolog",
  },
  laser: {
    name: "Lazer dermatologiya",
    shortName: "Lazer",
    summary: "Tirnoq, pigmentatsiya, chandiqlar",
    description:
      "Ichga o'sgan tirnoqni lazer bilan tuzatish, pigmentatsiyani olib tashlash, chandiqlar va postakneni davolash.",
    specialist: "Dermatolog",
  },
  aesthetic: {
    name: "Estetik tibbiyot",
    shortName: "Estetika",
    summary: "RF-lifting, strialar, sellulit",
    description:
      "Qarishga qarshi muolajalar (RF-lifting), sellulitga qarshi apparat muolajalari, strialar va yoriqlar.",
    specialist: "Kosmetolog",
  },
  gynecology: {
    name: "Ginekologiya",
    shortName: "Ginekologiya",
    summary: "Bepushtlik, mioma, homiladorlik",
    description:
      "Bepushtlik, yallig'lanish kasalliklari, mioma, kista, homiladorlikni olib borish, kontratseptsiya tanlash, bachadon bo'yni eroziyasini davolash.",
    specialist: "Ginekolog",
  },
  endocrinology: {
    name: "Endokrinologiya",
    shortName: "Endokrinologiya",
    summary: "Qalqonsimon bez, diabet, vazn",
    description:
      "Bolalar va kattalarda qalqonsimon bez, jismoniy rivojlanishning kechikishi, ortiqcha vazn, metabolik sindrom, ayollarda endokrin bepushtlik, 2-tur qandli diabet.",
    specialist: "Endokrinolog",
  },
  ultrasound: {
    name: "Barcha a'zolar UZI",
    shortName: "UZI",
    summary: "Barcha a'zolar, homiladorlik",
    description: "Barcha a'zolarning ultratovush tekshiruvi, shu jumladan homiladorlik paytida.",
    specialist: "UZI shifokori",
  },
  laboratory: {
    name: "Laboratoriya",
    shortName: "Laboratoriya",
    summary: "Barcha turdagi tahlillar",
    description: "Barcha turdagi tahlillar.",
    specialist: "Laboratoriya",
  },
  procedures: {
    name: "Muolaja xonasi",
    shortName: "Muolaja",
    summary: "Kapelnitsa, inyeksiyalar",
    description: "Kapelnitsa, tomir ichiga va mushak ichiga inyeksiyalar.",
    specialist: "Hamshira",
  },
};

export function getDirections(locale: Locale): Direction[] {
  if (locale === "ru") return directionsRu;
  return translate(directionsRu, directionsUz, (d, t) => ({ ...d, ...t, image: { ...d.image, alt: t.name } }));
}
