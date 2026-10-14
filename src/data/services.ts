import type { Service } from "./types";

const uzs = (from: number) => ({ from, currency: "UZS" as const });

// Dermatology rows: landing v2. Other directions: placeholders of realistic size until the
// clinic sends its price list (Figma «Как работаем без контента»).
export const services: Service[] = [
  { id: "derm-consult", directionId: "dermatology", name: "Консультация дерматолога", durationMin: 30, price: uzs(150_000) },
  { id: "derm-acne", directionId: "dermatology", name: "Лечение акне", durationMin: 45, price: uzs(250_000) },
  { id: "derm-papilloma", directionId: "dermatology", name: "Удаление папиллом и бородавок", durationMin: 15, price: uzs(120_000) },
  { id: "derm-nail", directionId: "dermatology", name: "Лазерная коррекция вросшего ногтя", durationMin: 40, price: uzs(600_000) },
  { id: "derm-rf", directionId: "dermatology", name: "RF-лифтинг лица", durationMin: 60, price: uzs(400_000) },

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

  { id: "endo-consult", directionId: "endocrinology", name: "Консультация эндокринолога", durationMin: 30, price: uzs(180_000) },
  { id: "endo-kids", directionId: "endocrinology", name: "Консультация детского эндокринолога", durationMin: 30, price: uzs(180_000) },
  { id: "endo-thyroid", directionId: "endocrinology", name: "Обследование щитовидной железы", durationMin: 45, price: uzs(320_000) },
  { id: "endo-weight", directionId: "endocrinology", name: "Программа снижения веса (приём)", durationMin: 45, price: uzs(250_000) },
  { id: "endo-diabetes", directionId: "endocrinology", name: "Контроль сахарного диабета 2 типа", durationMin: 30, price: uzs(200_000) },

  { id: "us-abdomen", directionId: "ultrasound", name: "УЗИ органов брюшной полости", durationMin: 30, price: uzs(150_000) },
  { id: "us-thyroid", directionId: "ultrasound", name: "УЗИ щитовидной железы", durationMin: 20, price: uzs(120_000) },
  { id: "us-pelvis", directionId: "ultrasound", name: "УЗИ органов малого таза", durationMin: 30, price: uzs(150_000) },
  { id: "us-breast", directionId: "ultrasound", name: "УЗИ молочных желёз", durationMin: 30, price: uzs(150_000) },
  { id: "us-pregnancy", directionId: "ultrasound", name: "УЗИ при беременности", durationMin: 30, price: uzs(200_000) },

  { id: "lab-cbc", directionId: "laboratory", name: "Общий анализ крови", durationMin: 10, price: uzs(35_000) },
  { id: "lab-biochem", directionId: "laboratory", name: "Биохимический анализ крови", durationMin: 10, price: uzs(180_000) },
  { id: "lab-thyroid", directionId: "laboratory", name: "Гормоны щитовидной железы (ТТГ, Т4 св.)", durationMin: 10, price: uzs(160_000) },
  { id: "lab-ferritin", directionId: "laboratory", name: "Ферритин", durationMin: 10, price: uzs(90_000) },
  { id: "lab-glucose", directionId: "laboratory", name: "Глюкоза и гликированный гемоглобин", durationMin: 10, price: uzs(110_000) },

  { id: "proc-iv", directionId: "procedures", name: "Капельница (без стоимости препарата)", durationMin: 60, price: uzs(80_000) },
  { id: "proc-im", directionId: "procedures", name: "Внутримышечная инъекция", durationMin: 10, price: uzs(50_000) },
  { id: "proc-iv-shot", directionId: "procedures", name: "Внутривенная инъекция", durationMin: 15, price: uzs(60_000) },
  { id: "proc-blood", directionId: "procedures", name: "Забор крови из вены", durationMin: 10, price: uzs(50_000) },
  { id: "proc-dressing", directionId: "procedures", name: "Перевязка", durationMin: 20, price: uzs(70_000) },
];
