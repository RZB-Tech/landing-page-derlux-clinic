import type { Promotion } from "./types";

// Landing v2 — placeholder offers.
export const promotions: Promotion[] = [
  {
    id: "derm-first-visit",
    value: "−20%",
    title: "На первую консультацию дерматолога",
    validUntil: "2026-11-30",
    validUntilLabel: "до 30 ноября",
    directionId: "dermatology",
  },
  {
    id: "womens-checkup",
    value: "−15%",
    title: "Check-up «Женское здоровье»",
    validUntil: "2026-12-15",
    validUntilLabel: "до 15 декабря",
    checkupId: "womens-health",
    featured: true,
  },
  {
    id: "rf-lifting",
    value: "3 + 1",
    title: "Четвёртая процедура RF-лифтинга — в подарок",
    validUntil: "2026-12-31",
    validUntilLabel: "до 31 декабря",
    directionId: "aesthetic",
  },
];
