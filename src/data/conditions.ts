import type { Locale } from "@/i18n/config";
import { conditionsRu } from "./conditions-ru";
import { conditionsUz } from "./conditions-uz";
import type { Condition, Image } from "./types";

const conditions = { ru: conditionsRu, uz: conditionsUz };

/** Photos by condition id, shared by both languages; the alt text is the condition's name. */
const conditionImages: Record<string, Omit<Image, "alt">> = {
  acne: { src: "/images/conditions/acne-2.jpg", width: 736, height: 484 },
  psoriasis: { src: "/images/conditions/psoriasis.jpg", width: 600, height: 600 },
  neurodermatitis: { src: "/images/conditions/neurodermatitis.jpg", width: 736, height: 985 },
  eczema: { src: "/images/conditions/eczema.jpg", width: 736, height: 736 },
  alopecia: { src: "/images/conditions/alopecia.jpg", width: 736, height: 414 },
  vitiligo: { src: "/images/conditions/vitiligo.jpg", width: 736, height: 985 },
  pigmentation: { src: "/images/conditions/pigmentation.jpg", width: 736, height: 736 },
  infertility: { src: "/images/conditions/infertility.jpg", width: 640, height: 831 },
  inflammation: { src: "/images/conditions/inflammation.jpg", width: 735, height: 490 },
  myoma: { src: "/images/conditions/myoma.jpg", width: 563, height: 410 },
  pregnancy: { src: "/images/conditions/pregnancy.jpg", width: 736, height: 1104 },
  erosion: { src: "/images/conditions/erosion.jpg", width: 735, height: 468 },
  cyst: { src: "/images/conditions/cyst.jpg", width: 620, height: 330 },
  contraception: { src: "/images/conditions/contraception.jpg", width: 735, height: 709 },
  thyroid: { src: "/images/conditions/thyroid.jpg", width: 736, height: 900 },
  growth: { src: "/images/conditions/growth.jpg", width: 736, height: 736 },
  overweight: { src: "/images/conditions/overweight.jpg", width: 736, height: 736 },
  metabolic: { src: "/images/conditions/metabolic.jpg", width: 735, height: 735 },
  "endocrine-infertility": { src: "/images/conditions/endocrine-infertility.jpg", width: 736, height: 720 },
  diabetes: { src: "/images/conditions/diabetes.jpg", width: 600, height: 450 },
};

const withImages = (byDirection: Record<string, Condition[]>): Record<string, Condition[]> =>
  Object.fromEntries(
    Object.entries(byDirection).map(([directionId, list]) => [
      directionId,
      list.map((c) => {
        const image = conditionImages[c.id];
        return image ? { ...c, image: { ...image, alt: c.name } } : c;
      }),
    ]),
  );

const conditionsWithImages = { ru: withImages(conditions.ru), uz: withImages(conditions.uz) };

/** Conditions by direction id: the «С чем обращаются» entries that open a dialog. */
export const getConditions = (locale: Locale): Record<string, Condition[]> => conditionsWithImages[locale];

/**
 * URL slug of each condition's own page («/directions/dermatologiya/akne»), shared by both languages
 * like the direction slugs. A condition without a slug fails the build in `conditionSlug`.
 */
const slugs: Record<string, string> = {
  acne: "akne",
  psoriasis: "psoriaz",
  neurodermatitis: "neyrodermit",
  eczema: "ekzema",
  alopecia: "alopeciya",
  vitiligo: "vitiligo",
  pigmentation: "pigmentaciya",
  infertility: "besplodie",
  inflammation: "vospalitelnye-zabolevaniya",
  myoma: "mioma",
  cyst: "kista",
  pregnancy: "vedenie-beremennosti",
  contraception: "podbor-kontracepcii",
  erosion: "eroziya-sheyki-matki",
  thyroid: "shchitovidnaya-zheleza",
  growth: "zaderzhka-razvitiya",
  overweight: "izbytochnyy-ves",
  metabolic: "metabolicheskiy-sindrom",
  "endocrine-infertility": "endokrinnoe-besplodie",
  diabetes: "saharnyy-diabet",
};

/**
 * Entries that are a service, not a disease («Ведение беременности», «Подбор контрацепции»): their
 * structured data does not claim a MedicalCondition.
 */
export const serviceConditionIds = new Set(["pregnancy", "contraception"]);

export function conditionSlug(id: string): string {
  const slug = slugs[id];
  if (!slug) throw new Error(`Missing slug for condition "${id}"`);
  return slug;
}

/** A condition of a direction by its URL slug. */
export const findCondition = (locale: Locale, directionId: string, slug: string): Condition | undefined =>
  getConditions(locale)[directionId]?.find((c) => conditionSlug(c.id) === slug);
