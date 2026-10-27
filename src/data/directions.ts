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
    image: { src: "/images/6-seborrheic-dermatitis-660x660.jpg.avif", alt: "Дерматология", width: 660, height: 660 },
    specialist: "Дерматолог",
    sections: [
      {
        title: "С чем *обращаются*",
        items: [
          "Акне (угри) и постакне",
          "Псориаз",
          "Нейродермит",
          "Экзема",
          "Алопеция",
          "Витилиго",
          "Пигментация",
        ],
      },
      {
        title: "Процедуры и *услуги*",
        items: [
          "Удаление папиллом",
          "Удаление бородавок",
          "Удаление мозолей",
          "Удаление кондилом",
          "Удаление контагиозного моллюска",
          "Лазерная коррекция вросшего ногтя",
          "Антивозрастные процедуры (RF-лифтинг)",
          "Антицеллюлитные аппаратные процедуры",
          "Комплексное лечение стрий и растяжек",
        ],
      },
    ],
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
    sections: [
      {
        title: "Что *делаем*",
        items: [
          "Лазерная коррекция вросшего ногтя",
          "Лечение постакне",
          "Лечение пигментации",
        ],
      },
    ],
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
    sections: [
      {
        title: "Что *делаем*",
        items: [
          "Антивозрастные процедуры (RF-лифтинг)",
          "Антицеллюлитные аппаратные процедуры",
          "Комплексное лечение стрий и растяжек",
        ],
      },
    ],
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
    image: { src: "/images/Healing-Journey-Gynecology.png", alt: "Гинекология", width: 1448, height: 1086 },
    specialist: "Гинеколог",
    sections: [
      {
        title: "С чем *обращаются*",
        items: [
          "Лечение бесплодия",
          "Воспалительные заболевания",
          "Миома",
          "Киста",
          "Ведение беременности",
          "Подбор контрацепции",
          "Лечение эрозии шейки матки",
        ],
      },
    ],
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
    image: { src: "/images/endokrinolog_osmotr_.webp", alt: "Эндокринология", width: 700, height: 525 },
    specialist: "Эндокринолог",
    sections: [
      {
        title: "С чем *обращаются*",
        items: [
          "Заболевания щитовидной железы у детей и взрослых",
          "Задержка физического развития у детей и подростков",
          "Избыточная масса тела",
          "Метаболический синдром",
          "Эндокринное бесплодие у женщин",
          "Сахарный диабет 2 типа",
        ],
      },
    ],
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
    image: { src: "/images/labaratoria.jpg", alt: "Лаборатория", width: 1082, height: 722 },
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
    image: { src: "/images/medroom.jpg", alt: "Процедурный кабинет", width: 1024, height: 683 },
    specialist: "Медсестра",
  },
];

type DirectionText = Pick<Direction, "name" | "shortName" | "summary" | "description" | "specialist" | "sections">;

const directionsUz: Record<string, DirectionText> = {
  dermatology: {
    name: "Dermatologiya",
    shortName: "Dermatologiya",
    summary: "Akne, psoriaz, ekzema, papillomalar",
    description:
      "Teri kasalliklarini davolash (husnbuzar, psoriaz, neyrodermit, ekzema, alopesiya, vitiligo), papillomalar, so'gallar, qadoqlar, kondilomalar, yumshoq molluskani olib tashlash, postakne, pigmentatsiya.",
    specialist: "Dermatolog",
    sections: [
      {
        title: "Nima bilan *murojaat qilishadi*",
        items: [
          "Husnbuzar (akne) va postakne",
          "Psoriaz",
          "Neyrodermit",
          "Ekzema",
          "Alopesiya",
          "Vitiligo",
          "Pigmentatsiya",
        ],
      },
      {
        title: "Muolajalar va *xizmatlar*",
        items: [
          "Papillomalarni olib tashlash",
          "So'gallarni olib tashlash",
          "Qadoqlarni olib tashlash",
          "Kondilomalarni olib tashlash",
          "Yumshoq molluskani olib tashlash",
          "Ichga o'sgan tirnoqni lazer bilan tuzatish",
          "Qarishga qarshi muolajalar (RF-lifting)",
          "Sellulitga qarshi apparat muolajalari",
          "Strialar va yoriqlarni kompleks davolash",
        ],
      },
    ],
  },
  laser: {
    name: "Lazer dermatologiya",
    shortName: "Lazer",
    summary: "Tirnoq, pigmentatsiya, chandiqlar",
    description:
      "Ichga o'sgan tirnoqni lazer bilan tuzatish, pigmentatsiyani olib tashlash, chandiqlar va postakneni davolash.",
    specialist: "Dermatolog",
    sections: [
      {
        title: "*Nimalar* qilamiz",
        items: [
          "Ichga o'sgan tirnoqni lazer bilan tuzatish",
          "Postakneni davolash",
          "Pigmentatsiyani davolash",
        ],
      },
    ],
  },
  aesthetic: {
    name: "Estetik tibbiyot",
    shortName: "Estetika",
    summary: "RF-lifting, strialar, sellulit",
    description:
      "Qarishga qarshi muolajalar (RF-lifting), sellulitga qarshi apparat muolajalari, strialar va yoriqlar.",
    specialist: "Kosmetolog",
    sections: [
      {
        title: "*Nimalar* qilamiz",
        items: [
          "Qarishga qarshi muolajalar (RF-lifting)",
          "Sellulitga qarshi apparat muolajalari",
          "Strialar va yoriqlarni kompleks davolash",
        ],
      },
    ],
  },
  gynecology: {
    name: "Ginekologiya",
    shortName: "Ginekologiya",
    summary: "Bepushtlik, mioma, homiladorlik",
    description:
      "Bepushtlik, yallig'lanish kasalliklari, mioma, kista, homiladorlikni olib borish, kontratseptsiya tanlash, bachadon bo'yni eroziyasini davolash.",
    specialist: "Ginekolog",
    sections: [
      {
        title: "Nima bilan *murojaat qilishadi*",
        items: [
          "Bepushtlikni davolash",
          "Yallig'lanish kasalliklari",
          "Mioma",
          "Kista",
          "Homiladorlikni olib borish",
          "Kontratseptsiya tanlash",
          "Bachadon bo'yni eroziyasini davolash",
        ],
      },
    ],
  },
  endocrinology: {
    name: "Endokrinologiya",
    shortName: "Endokrinologiya",
    summary: "Qalqonsimon bez, diabet, vazn",
    description:
      "Bolalar va kattalarda qalqonsimon bez, jismoniy rivojlanishning kechikishi, ortiqcha vazn, metabolik sindrom, ayollarda endokrin bepushtlik, 2-tur qandli diabet.",
    specialist: "Endokrinolog",
    sections: [
      {
        title: "Nima bilan *murojaat qilishadi*",
        items: [
          "Bolalar va kattalarda qalqonsimon bez kasalliklari",
          "Bolalar va o'smirlarda jismoniy rivojlanishning kechikishi",
          "Ortiqcha vazn",
          "Metabolik sindrom",
          "Ayollarda endokrin bepushtlik",
          "2-tur qandli diabet",
        ],
      },
    ],
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
