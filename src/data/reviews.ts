import type { RatingSummary, Review } from "./types";

// Landing v2 — example reviews and rating. Replace with published reviews (with patient consent)
// before launch; do not expose these in structured data.
export const ratingSummary: RatingSummary = {
  value: 4.9,
  valueLabel: "4,9",
  source: "по отзывам в Google и Яндекс Картах (пример)",
};

export const reviews: Review[] = [
  {
    id: "madina",
    author: "Мадина",
    age: 27,
    ageLabel: "27 лет",
    topic: "Лечение акне",
    dateLabel: "сентябрь 2026",
    rating: 5,
    text: "Дерматолог отправила к эндокринологу, анализы сдала здесь же. Через три месяца кожа чистая.",
  },
  {
    id: "shakhnoza",
    author: "Шахноза",
    age: 31,
    ageLabel: "31 год",
    topic: "Ведение беременности",
    dateLabel: "август 2026",
    rating: 5,
    text: "Вела беременность в Derlux. Всё объясняли, УЗИ — без очередей.",
  },
  {
    id: "timur",
    author: "Тимур",
    age: 35,
    ageLabel: "35 лет",
    topic: "Удаление папиллом",
    dateLabel: "октябрь 2026",
    rating: 5,
    text: "Быстро, аккуратно, стерильно. Цену назвали заранее.",
  },
];
