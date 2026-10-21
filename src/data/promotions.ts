import type { Locale } from "@/i18n/config";
import { translate } from "@/i18n/translate";
import { promotionsUz } from "./uz";
import type { Promotion } from "./types";

// Landing v2 — placeholder offers.
const promotionsRu: Promotion[] = [
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

export function getPromotions(locale: Locale): Promotion[] {
  if (locale === "ru") return promotionsRu;
  return translate(promotionsRu, promotionsUz, (p, t) => ({ ...p, ...t }));
}
