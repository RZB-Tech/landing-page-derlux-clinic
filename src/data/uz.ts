/*
 * Uzbek (Latin) text for the content modules. Each table is keyed by the item's `id` in the
 * Russian source module, which stays the source of truth for everything that is not text.
 * TODO(clinic): have a native speaker proofread the Uzbek copy.
 */
import type { CheckupProgram, FaqItem, Promotion, Review } from "./types";

export const serviceNamesUz: Record<string, { name: string }> = {
  "derm-consult": { name: "Dermatolog maslahati" },
  "derm-acne": { name: "Akneni davolash" },
  "derm-papilloma": { name: "Papilloma va so'gallarni olib tashlash" },
  "derm-nail": { name: "Ichga o'sgan tirnoqni lazer bilan tuzatish" },
  "derm-rf": { name: "Yuz RF-lifting" },

  "laser-nail": { name: "Ichga o'sgan tirnoqni lazer bilan tuzatish" },
  "laser-pigment": { name: "Pigmentatsiyani lazer bilan olib tashlash" },
  "laser-scars": { name: "Chandiq va postakneni lazer bilan silliqlash" },
  "laser-papilloma": { name: "Papillomalarni lazer bilan olib tashlash" },
  "laser-vessels": { name: "Qon tomir yulduzchalarini olib tashlash" },

  "aest-consult": { name: "Kosmetolog maslahati" },
  "aest-rf-face": { name: "Yuz RF-lifting" },
  "aest-rf-body": { name: "Tana RF-lifting" },
  "aest-cellulite": { name: "Sellulitga qarshi apparat muolajasi" },
  "aest-striae": { name: "Stria va yoriqlarni tuzatish" },

  "gyn-consult": { name: "Ginekolog maslahati" },
  "gyn-pregnancy": { name: "Homiladorlikni olib borish (qabul)" },
  "gyn-contraception": { name: "Kontratseptsiya tanlash" },
  "gyn-smear": { name: "Flora va onkotsitologiya uchun surtma" },
  "gyn-erosion": { name: "Bachadon bo'yni eroziyasini davolash" },

  "endo-consult": { name: "Endokrinolog maslahati" },
  "endo-kids": { name: "Bolalar endokrinologi maslahati" },
  "endo-thyroid": { name: "Qalqonsimon bezni tekshirish" },
  "endo-weight": { name: "Vazn kamaytirish dasturi (qabul)" },
  "endo-diabetes": { name: "2-tur qandli diabetni nazorat qilish" },

  "us-abdomen": { name: "Qorin bo'shlig'i a'zolari UZI" },
  "us-thyroid": { name: "Qalqonsimon bez UZI" },
  "us-pelvis": { name: "Kichik chanoq a'zolari UZI" },
  "us-breast": { name: "Sut bezlari UZI" },
  "us-pregnancy": { name: "Homiladorlik paytida UZI" },

  "lab-cbc": { name: "Umumiy qon tahlili" },
  "lab-biochem": { name: "Qonning biokimyoviy tahlili" },
  "lab-thyroid": { name: "Qalqonsimon bez gormonlari (TTG, T4 erkin)" },
  "lab-ferritin": { name: "Ferritin" },
  "lab-glucose": { name: "Glyukoza va glikirlangan gemoglobin" },

  "proc-iv": { name: "Kapelnitsa (dori narxisiz)" },
  "proc-im": { name: "Mushak ichiga inyeksiya" },
  "proc-iv-shot": { name: "Tomir ichiga inyeksiya" },
  "proc-blood": { name: "Venadan qon olish" },
  "proc-dressing": { name: "Bog'lam qo'yish" },
};

export const doctorsUz: Record<
  string,
  { name: string; position: string; focus: string[]; specializations: string[]; education: string[]; category?: string }
> = {
  rakhimov: { name: "Rahimov Sarvar Samukovich", position: "Dermatolog", focus: ["Akne va postakne", "Psoriaz", "Neyrodermit va ekzema", "Alopesiya", "Vitiligo", "Pigmentatsiya", "Papilloma va temiratki", "Stria va yoriqlar"], specializations: ["Dermatolog", "Lazer dermatologiya bo'yicha mutaxassis"], category: "Oliy toifa", education: ["2001–2008 — TashMI, bakalavriat", "2008–2011 — magistratura"] },
  akbarova: { name: "Akbarova Dildora G'ayratovna", position: "Dermatolog", focus: ["Akne va postakne", "Psoriaz", "Neyrodermit va ekzema", "Alopesiya", "Vitiligo", "Pigmentatsiya", "Papilloma va temiratki", "Stria va yoriqlar"], specializations: ["Dermatolog", "Lazer dermatologiya bo'yicha mutaxassis"], education: ["2004–2011 — ToshPTI, bakalavriat", "2011–2013 — ordinatura"] },
  salomova: { name: "Salomova Shahlo Inoyatovna", position: "Ginekolog, UZI shifokori", focus: ["Bepushtlik", "Yallig'lanish kasalliklari", "Mioma va kistalar", "Homiladorlikni olib borish", "Kontratseptsiya tanlash", "Bachadon bo'yni eroziyasi", "Barcha a'zolar UZI"], specializations: ["Akusher-ginekolog shifokor", "Ginekolog-endokrinolog", "UZI shifokori", "Dermatokosmetolog"], category: "Oliy toifa", education: ["1985–1991 — SamMI, bakalavriat", "1991–1992 — internatura"] },
  khaydarova: { name: "Xaydarova Gavhar Abrarovna", position: "Endokrinolog", focus: ["Qalqonsimon bez kasalliklari", "Semizlikni davolash"], specializations: ["Endokrinolog", "Bolalar va kattalar endokrinologi"], education: ["2003–2010 — TTA, bakalavriat", "2013–2015 — RSPMTsE"] },
};

export const checkupsUz: Record<
  string,
  Pick<CheckupProgram, "title" | "audience" | "includes" | "durationLabel" | "badge">
> = {
  "healthy-skin": {
    title: "Sog'lom *teri*",
    audience: "Akne, soch to'kilishi yoki pigmentatsiya o'tmayotganlar uchun",
    includes: [
      "Dermatolog maslahati",
      "Endokrinolog maslahati",
      "Qalqonsimon bez gormonlari va jinsiy gormonlar",
      "Qon biokimyosi va ferritin",
    ],
    durationLabel: "≈ 2 soat",
  },
  "womens-health": {
    title: "Ayollar *salomatligi*",
    audience: "Yillik ko'rik va homiladorlikni rejalashtirish",
    includes: [
      "Ginekolog maslahati",
      "Kichik chanoq a'zolari UZI",
      "Sut bezlari UZI",
      "Onkotsitologiya va flora uchun surtma",
    ],
    durationLabel: "≈ 2,5 soat",
    badge: "Ommabop",
  },
  thyroid: {
    title: "Qalqonsimon *bez*",
    audience: "Charchoq, vaznning o'zgarishi va soch to'kilishida — kattalar va bolalar uchun",
    includes: ["Endokrinolog maslahati", "Qalqonsimon bez UZI", "TTG, erkin T4, AT-TPO", "Umumiy qon tahlili"],
    durationLabel: "≈ 1,5 soat",
  },
};

export const promotionsUz: Record<string, Pick<Promotion, "title" | "validUntilLabel">> = {
  "derm-first-visit": { title: "Dermatologning birinchi maslahatiga", validUntilLabel: "30-noyabrgacha" },
  "womens-checkup": { title: "«Ayollar salomatligi» Check-up dasturi", validUntilLabel: "15-dekabrgacha" },
  "rf-lifting": { title: "RF-liftingning to'rtinchi muolajasi — sovg'a", validUntilLabel: "31-dekabrgacha" },
};

export const reviewsUz: Record<string, Pick<Review, "author" | "ageLabel" | "topic" | "dateLabel" | "text">> = {
  madina: {
    author: "Madina",
    ageLabel: "27 yosh",
    topic: "Akneni davolash",
    dateLabel: "2026 yil sentabr",
    text: "Dermatolog endokrinologga yo'llanma berdi, tahlillarni shu yerning o'zida topshirdim. Uch oydan keyin terim toza.",
  },
  shakhnoza: {
    author: "Shahnoza",
    ageLabel: "31 yosh",
    topic: "Homiladorlikni olib borish",
    dateLabel: "2026 yil avgust",
    text: "Homiladorligimni Derlux'da olib bordim. Hammasini tushuntirib berishdi, UZI — navbatsiz.",
  },
  timur: {
    author: "Timur",
    ageLabel: "35 yosh",
    topic: "Papillomalarni olib tashlash",
    dateLabel: "2026 yil oktabr",
    text: "Tez, ehtiyotkorlik bilan, steril. Narxni oldindan aytishdi.",
  },
};

export const ratingSourceUz = "Google va Yandex Xaritalardagi sharhlar bo'yicha (namuna)";

export const faqUz: Record<string, Pick<FaqItem, "question" | "answer">> = {
  "booking-required": {
    question: "Oldindan yozilish kerakmi?",
    answer:
      "Tavsiya etiladi: shunda siz qulay vaqtda kerakli shifokorga kutmasdan kelasiz. Yakshanba kuni klinika faqat oldindan yozilish bilan ishlaydi.",
  },
  "tests-without-referral": {
    question: "Shifokor yo'llanmasiz tahlil topshirish mumkinmi?",
    answer:
      "Ha, tahlillarning ko'pini yo'llanmasiz topshirish mumkin. Administrator qanday tayyorgarlik ko'rishni aytadi va qulay vaqtga yozadi.",
  },
  "ultrasound-prep": {
    question: "UZIga qanday tayyorlanish kerak?",
    answer:
      "Tekshiruvga bog'liq: qorin bo'shlig'i UZI och qoringa, kichik chanoq UZI esa to'lgan qovuq bilan o'tkaziladi. Yozilgandan keyin administrator eslatma yuboradi.",
  },
  "first-visit-price": {
    question: "Birlamchi maslahat qancha turadi?",
    answer: "150 000 so'mdan — yo'nalishga bog'liq. Aniq narxni yozilishda aytamiz, joyida qo'shimcha to'lovsiz.",
  },
  "female-doctor": {
    question: "Ayol shifokorni tanlash mumkinmi?",
    answer: "Ha. Yozilishda shifokorni tanlang yoki administratorga ayting — mos mutaxassisni topamiz.",
  },
};
