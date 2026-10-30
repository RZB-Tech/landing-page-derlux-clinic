import type { Locale } from "@/i18n/config";
import { translate } from "@/i18n/translate";
import { serviceNamesUz } from "./uz";
import type { Service } from "./types";

const uzs = (from: number) => ({ from, currency: "UZS" as const });

// Dermatology rows: landing v2. Other directions: placeholders of realistic size until the
// clinic sends its price list (Figma «Как работаем без контента»).
const servicesRu: Service[] = [
  { id: "derm-consult", directionId: "dermatology", name: "Консультация дерматолога", durationMin: 30, price: uzs(150_000) },
  { id: "derm-acne", directionId: "dermatology", name: "Лечение акне, угрей и постакне", durationMin: 45, price: uzs(250_000) },
  { id: "derm-papilloma", directionId: "dermatology", name: "Удаление папиллом, бородавок, мозолей и контагиозного моллюска", durationMin: 15, price: uzs(120_000) },
  { id: "derm-nail", directionId: "dermatology", name: "Лазерная коррекция вросшего ногтя", durationMin: 40, price: uzs(600_000) },
  { id: "derm-rf", directionId: "dermatology", name: "Антивозрастные процедуры (RF-лифтинг)", durationMin: 60, price: uzs(400_000) },
  // Added on the clinic's request (2026-10-30); durations and prices are placeholders.
  // TODO(clinic): confirm durations and prices.
  { id: "derm-neurodermatitis", directionId: "dermatology", name: "Лечение нейродермита", durationMin: 40, price: uzs(200_000) },
  { id: "derm-alopecia", directionId: "dermatology", name: "Лечение алопеции, выпадения волос и облысения", durationMin: 40, price: uzs(200_000) },
  { id: "derm-pigmentation", directionId: "dermatology", name: "Лечение пигментации и пятен на коже", durationMin: 40, price: uzs(200_000) },
  { id: "derm-psoriasis", directionId: "dermatology", name: "Лечение псориаза", durationMin: 40, price: uzs(200_000) },
  { id: "derm-vitiligo", directionId: "dermatology", name: "Лечение витилиго", durationMin: 40, price: uzs(200_000) },
  { id: "derm-plantar-warts", directionId: "dermatology", name: "Удаление подошвенных бородавок", durationMin: 20, price: uzs(150_000) },
  { id: "derm-condyloma", directionId: "dermatology", name: "Удаление кондилом", durationMin: 20, price: uzs(150_000) },
  { id: "derm-cellulite", directionId: "dermatology", name: "Антицеллюлитные аппаратные процедуры", durationMin: 45, price: uzs(250_000) },
  { id: "derm-striae", directionId: "dermatology", name: "Коррекция растяжек и стрий", durationMin: 45, price: uzs(380_000) },
  { id: "derm-scars", directionId: "dermatology", name: "Коррекция послеоперационных рубцов", durationMin: 45, price: uzs(380_000) },

  { id: "laser-nail", directionId: "laser", name: "Лазерная коррекция вросшего ногтя", durationMin: 40, price: uzs(600_000) },
  { id: "laser-pigment", directionId: "laser", name: "Лазерное удаление пигментации", durationMin: 30, price: uzs(350_000) },
  { id: "laser-scars", directionId: "laser", name: "Лазерная шлифовка рубцов и постакне", durationMin: 60, price: uzs(700_000) },
  { id: "laser-papilloma", directionId: "laser", name: "Лазерное удаление папиллом", durationMin: 20, price: uzs(300_000) },
  { id: "laser-vessels", directionId: "laser", name: "Удаление сосудистых звёздочек", durationMin: 30, price: uzs(450_000) },

  { id: "aest-consult", directionId: "aesthetic", name: "Консультация косметолога", durationMin: 30, price: uzs(150_000) },
  { id: "aest-rf-face", directionId: "aesthetic", name: "RF-лифтинг лица", durationMin: 60, price: uzs(400_000) },
  { id: "aest-rf-body", directionId: "aesthetic", name: "RF-лифтинг тела", durationMin: 60, price: uzs(450_000) },
  { id: "aest-cellulite", directionId: "aesthetic", name: "Антицеллюлитная аппаратная процедура", durationMin: 45, price: uzs(250_000) },
  { id: "aest-striae", directionId: "aesthetic", name: "Коррекция стрий и растяжек", durationMin: 45, price: uzs(380_000) },

  { id: "gyn-consult", directionId: "gynecology", name: "Консультация гинеколога", durationMin: 30, price: uzs(180_000) },
  { id: "gyn-pregnancy", directionId: "gynecology", name: "Ведение беременности (приём)", durationMin: 40, price: uzs(220_000) },
  { id: "gyn-contraception", directionId: "gynecology", name: "Подбор контрацепции", durationMin: 30, price: uzs(180_000) },
  { id: "gyn-smear", directionId: "gynecology", name: "Мазок на флору и онкоцитологию", durationMin: 15, price: uzs(90_000) },
  { id: "gyn-erosion", directionId: "gynecology", name: "Лечение эрозии шейки матки", durationMin: 30, price: uzs(500_000) },
  // Added on the clinic's request (2026-10-30); durations and prices are placeholders.
  // TODO(clinic): confirm durations and prices.
  { id: "gyn-infertility", directionId: "gynecology", name: "Бесплодие", durationMin: 45, price: uzs(250_000) },
  { id: "gyn-ultrasound", directionId: "gynecology", name: "УЗИ", durationMin: 30, price: uzs(150_000) },
  { id: "gyn-myoma", directionId: "gynecology", name: "Миома", durationMin: 40, price: uzs(220_000) },
  { id: "gyn-cyst", directionId: "gynecology", name: "Киста", durationMin: 40, price: uzs(220_000) },
  { id: "gyn-endometriosis", directionId: "gynecology", name: "Эндометриоз", durationMin: 40, price: uzs(220_000) },
  { id: "gyn-tashkent", directionId: "gynecology", name: "Гинеколог в Ташкенте", durationMin: 30, price: uzs(180_000) },
  { id: "gyn-pregnancy-care", directionId: "gynecology", name: "Беременность", durationMin: 40, price: uzs(220_000) },
  { id: "gyn-childbirth", directionId: "gynecology", name: "Роды", durationMin: 40, price: uzs(220_000) },

  { id: "endo-consult", directionId: "endocrinology", name: "Консультация эндокринолога", durationMin: 30, price: uzs(180_000) },
  { id: "endo-kids", directionId: "endocrinology", name: "Консультация детского эндокринолога", durationMin: 30, price: uzs(180_000) },
  { id: "endo-thyroid", directionId: "endocrinology", name: "Обследование щитовидной железы", durationMin: 45, price: uzs(320_000) },
  { id: "endo-weight", directionId: "endocrinology", name: "Программа снижения веса (приём)", durationMin: 45, price: uzs(250_000) },
  { id: "endo-diabetes", directionId: "endocrinology", name: "Контроль сахарного диабета 1 и 2 типа", durationMin: 30, price: uzs(200_000) },
  // Added on the clinic's request (2026-10-30); durations and prices are placeholders.
  // TODO(clinic): confirm durations and prices.
  { id: "endo-diabetes-care", directionId: "endocrinology", name: "Сахарный диабет", durationMin: 30, price: uzs(180_000) },
  { id: "endo-thyroid-care", directionId: "endocrinology", name: "Заболевания щитовидной железы", durationMin: 30, price: uzs(180_000) },
  { id: "endo-hypothyroidism", directionId: "endocrinology", name: "Гипотиреоз", durationMin: 30, price: uzs(180_000) },
  { id: "endo-thyrotoxicosis", directionId: "endocrinology", name: "Тиреотоксикоз", durationMin: 30, price: uzs(180_000) },
  { id: "endo-nodular-goiter", directionId: "endocrinology", name: "Узловой зоб", durationMin: 30, price: uzs(180_000) },
  { id: "endo-obesity", directionId: "endocrinology", name: "Ожирение", durationMin: 30, price: uzs(180_000) },
  { id: "endo-metabolic", directionId: "endocrinology", name: "Метаболический синдром", durationMin: 30, price: uzs(180_000) },
  { id: "endo-insulin-resistance", directionId: "endocrinology", name: "Инсулинорезистентность", durationMin: 30, price: uzs(180_000) },
  { id: "endo-prediabetes", directionId: "endocrinology", name: "Предиабет", durationMin: 30, price: uzs(180_000) },
  { id: "endo-osteoporosis", directionId: "endocrinology", name: "Остеопороз", durationMin: 30, price: uzs(180_000) },
  { id: "endo-adrenal", directionId: "endocrinology", name: "Заболевания надпочечников", durationMin: 30, price: uzs(180_000) },
  { id: "endo-cycle", directionId: "endocrinology", name: "Нарушения менструального цикла эндокринного генеза", durationMin: 30, price: uzs(180_000) },
  { id: "endo-pcos", directionId: "endocrinology", name: "Синдром поликистозных яичников (СПКЯ)", durationMin: 30, price: uzs(180_000) },
  { id: "endo-vitamin-d", directionId: "endocrinology", name: "Дефицит витамина D", durationMin: 30, price: uzs(180_000) },
  { id: "endo-dyslipidemia", directionId: "endocrinology", name: "Дислипидемия", durationMin: 30, price: uzs(180_000) },
  { id: "endo-gestational-diabetes", directionId: "endocrinology", name: "Гестационный сахарный диабет", durationMin: 30, price: uzs(180_000) },
  { id: "endo-diabetes-complications", directionId: "endocrinology", name: "Диабетические осложнения", durationMin: 30, price: uzs(180_000) },

  { id: "us-abdomen", directionId: "ultrasound", name: "УЗИ органов брюшной полости", durationMin: 30, price: uzs(150_000) },
  { id: "us-thyroid", directionId: "ultrasound", name: "УЗИ щитовидной железы", durationMin: 20, price: uzs(120_000) },
  { id: "us-pelvis", directionId: "ultrasound", name: "УЗИ органов малого таза", durationMin: 30, price: uzs(150_000) },
  { id: "us-breast", directionId: "ultrasound", name: "УЗИ молочных желёз", durationMin: 30, price: uzs(150_000) },
  { id: "us-pregnancy", directionId: "ultrasound", name: "УЗИ при беременности", durationMin: 30, price: uzs(200_000) },

  // The list of analyses is the clinic's; durations and prices are placeholders.
  // TODO(clinic): confirm the price list.
  { id: "lab-cbc", directionId: "laboratory", name: "Общий анализ крови", durationMin: 10, price: uzs(35_000) },
  { id: "lab-urine", directionId: "laboratory", name: "Общий анализ мочи", durationMin: 10, price: uzs(30_000) },
  { id: "lab-biochem", directionId: "laboratory", name: "Биохимия", durationMin: 10, price: uzs(180_000) },
  { id: "lab-microscopy", directionId: "laboratory", name: "Микроскопия", durationMin: 10, price: uzs(40_000) },
  { id: "lab-pcr", directionId: "laboratory", name: "ПЦР анализы", durationMin: 10, price: uzs(120_000) },
  { id: "lab-culture", directionId: "laboratory", name: "Бак посев", durationMin: 10, price: uzs(110_000) },
  { id: "lab-coag", directionId: "laboratory", name: "Коагулограмма", durationMin: 10, price: uzs(90_000) },
  { id: "lab-hormones", directionId: "laboratory", name: "Гормоны", durationMin: 10, price: uzs(160_000) },
  { id: "lab-torch", directionId: "laboratory", name: "ТОРЧ инфекции", durationMin: 10, price: uzs(200_000) },
  { id: "lab-express", directionId: "laboratory", name: "Экспресс тесты", durationMin: 10, price: uzs(50_000) },
  { id: "lab-elisa", directionId: "laboratory", name: "ИФА, ИХЛА", durationMin: 10, price: uzs(130_000) },

  { id: "proc-iv", directionId: "procedures", name: "Капельница (без стоимости препарата)", durationMin: 60, price: uzs(80_000) },
  { id: "proc-im", directionId: "procedures", name: "Внутримышечная инъекция", durationMin: 10, price: uzs(50_000) },
  { id: "proc-iv-shot", directionId: "procedures", name: "Внутривенная инъекция", durationMin: 15, price: uzs(60_000) },
  { id: "proc-blood", directionId: "procedures", name: "Забор крови из вены", durationMin: 10, price: uzs(50_000) },
  { id: "proc-dressing", directionId: "procedures", name: "Перевязка", durationMin: 20, price: uzs(70_000) },
];

export function getServices(locale: Locale): Service[] {
  if (locale === "ru") return servicesRu;
  return translate(servicesRu, serviceNamesUz, (s, t) => ({ ...s, ...t }));
}
