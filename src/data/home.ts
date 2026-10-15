import { clinic } from "./clinic";
import type { Advantage, Concern, NearestSlot, SectionHeading, WorkingHours } from "./types";

// Copy of the home page (Figma «5. Лендинг», «Derlux — Главная · 1440 · v2»).

// Search snippet and link preview. The title leads with what patients search for
// («дерматолог Ташкент»), not with the brand.
export const homeMeta = {
  title: "Дерматолог, гинеколог, эндокринолог в Ташкенте — Derlux Clinic",
  description:
    "Дерматология, гинекология, эндокринология, УЗИ и анализы в одной клинике. Цены известны заранее, онлайн-запись за минуту. Ташкент, ул. Садыка Азимова, 46.",
  ogImageAlt: "Derlux Clinic — дерматолог, гинеколог и эндокринолог в Ташкенте",
};

export const headerCopy = {
  cta: "Записаться",
  nav: "Основная навигация",
  mobileNav: "Мобильная навигация",
  menuOpen: "Открыть меню",
  menuClose: "Закрыть меню",
};

export const hero = {
  title: "Здоровая *кожа* начинается с причины",
  lead: "Дерматолог, гинеколог и эндокринолог — рядом. Анализы и УЗИ — здесь же.",
  primaryCta: "Записаться на приём",
  secondaryCta: { label: "Подобрать врача", href: "#doctors" },
  badge: "Стерильность по стандартам",
  socialsLabel: "Мы в соцсетях",
  image: { src: "/images/hero.jpg", alt: "Пациентка с чистой, здоровой кожей", width: 520, height: 700 },
  bookingBar: {
    directionLabel: "Направление",
    doctorLabel: "Врач",
    dateLabel: "Дата",
    anyDoctor: "Любой врач",
    submit: "Найти время",
  },
};

// Mock of the scheduling API: the nearest free slot is the first one 3 hours from now.
export const nearestSlot: NearestSlot = {
  leadHours: 3,
  directionId: "dermatology",
  note: "Дерматолог · консультация 30 мин",
};
export const nearestSlotCopy = {
  caption: "Ближайшая запись",
  cta: "Записаться на это время",
  /** Holds the card's size in the prerendered HTML, hidden until the time is known. */
  placeholder: "Сегодня, 15:30",
};

export const directionsSection: SectionHeading = {
  caption: "Направления",
  title: "Восемь направлений — *одна* клиника",
  link: { label: "Все услуги и цены", href: "#prices" },
};

export const concernsSection = {
  caption: "С чего начать",
  title: "Что вас *беспокоит*?",
  lead: "Выберите — подскажем врача и анализы.",
};

export const concerns: Concern[] = [
  { id: "acne", label: "Акне и постакне", directionId: "dermatology" },
  { id: "pigmentation", label: "Пигментация", directionId: "laser" },
  { id: "hair-loss", label: "Выпадение волос", directionId: "dermatology" },
  { id: "papillomas", label: "Папилломы и бородавки", directionId: "dermatology" },
  { id: "striae", label: "Растяжки и целлюлит", directionId: "aesthetic" },
  { id: "cycle", label: "Нарушение цикла", directionId: "gynecology" },
  { id: "pregnancy-planning", label: "Планирование беременности", directionId: "gynecology" },
  { id: "myoma", label: "Миома и киста", directionId: "gynecology" },
];

export const whyCard = {
  caption: "Почему Derlux",
  title: "Кожа, гормоны и женское здоровье — *в одной клинике*",
  text: "Причина проблем с кожей часто в гормонах. Поэтому врачи работают вместе, а анализы и УЗИ — здесь же.",
  specialists: ["Дерматолог", "Эндокринолог", "Гинеколог"],
  cta: { label: "Пройти Check-up", href: "#checkup" },
};

export const advantages: Advantage[] = [
  { id: "sterility", title: "Стерильность — стандарт", icon: "shield" },
  { id: "specialists", title: "Опытные специалисты", icon: "users" },
  { id: "protocols", title: "Работа по протоколам", icon: "check" },
  { id: "care", title: "Бережное отношение", icon: "heart" },
];

export const pricesSection: SectionHeading = {
  caption: "Услуги и цены",
  title: "Цены известны *заранее*",
  lead: "Точную стоимость врач назовёт на консультации.",
  link: { label: "Весь прайс", href: "#prices" },
};
export const pricesCopy = { cta: "Записаться", durationUnit: "мин", priceFrom: "от", currency: "сум" };

export const doctorsSection: SectionHeading = {
  caption: "Врачи",
  title: "Врачи, которые *слушают*",
  link: { label: "Все врачи", href: "#doctors" },
};
export const doctorsCopy = { cta: "Записаться к врачу", experience: "Стаж" };

export const checkupSection: SectionHeading = {
  caption: "Check-up программы",
  title: "Всё обследование — *за один визит*",
  lead: "Врачи, анализы и УЗИ — в один день.",
};
export const checkupCopy = { cta: "Записаться на Check-up" };

export const promotionsSection: SectionHeading = {
  caption: "Акции",
  title: "Предложения *месяца*",
  link: { label: "Все акции", href: "#promotions" },
};
export const promotionsCopy = { cta: "Записаться" };

export const reviewsSection: SectionHeading = {
  caption: "Отзывы",
  title: "Что говорят *пациенты*",
};

export const bookingSection = {
  caption: "Онлайн-запись",
  title: "Запишитесь за *минуту* — без звонков",
  lead: "Администратор перезвонит и подтвердит запись.",
  steps: ["Направление или услуга", "Врач", "Дата и время", "Имя и телефон"],
  telegramLabel: "Telegram",
};

export const bookingForm = {
  stepLabel: "Шаг {step} из {total} · {name}",
  directionLabel: "Направление",
  directionPlaceholder: "Выберите направление",
  directionUnsure: "Не знаю — подскажите",
  checkupGroup: "Check-up программы",
  directionsGroup: "Направления",
  doctorLabel: "Врач",
  anyDoctor: "Любой врач",
  dateLabel: "Дата",
  timeLabel: "Свободное время",
  nameLabel: "Имя",
  namePlaceholder: "Как к вам обращаться",
  phoneLabel: "Телефон",
  phonePlaceholder: "+998 __ ___ __ __",
  consent: "Согласен(-на) на обработку персональных данных",
  submit: "Записаться",
  submitWithSlot: "Записаться на {date}, {time}",
  note: "Администратор перезвонит в течение 15 минут, чтобы подтвердить запись.",
  serviceHint: "Услуга",
  errors: {
    name: "Напишите, как к вам обращаться",
    phone: "Проверьте номер: +998 и 9 цифр",
    consent: "Нужно согласие, чтобы мы могли перезвонить",
    slot: "Выберите дату и время — или оставьте заявку, администратор подберёт время",
    send: "Не удалось отправить заявку. Попробуйте ещё раз или позвоните:",
  },
  success: {
    title: "Заявка *принята*",
    text: "Администратор перезвонит в течение 15 минут и подтвердит запись.",
    when: "Когда",
    doctor: "Врач",
    address: "Адрес",
    bring: "Взять с собой",
    bringList: "паспорт, результаты прошлых анализов и заключения врачей, если есть",
    timeToConfirm: "время уточнит администратор",
    again: "Новая запись",
  },
};

// Free slots per working day (mock of the scheduling API).
export const bookingSlots = ["9:30", "11:00", "12:30", "15:30", "17:00", "18:30"];
// Any time on this grid can be booked: the hero's «Ближайшая запись» picks one outside the list.
export const bookingHours: WorkingHours = {
  opens: clinic.openingHours[0].opens,
  closes: clinic.openingHours[0].closes,
  stepMinutes: 30,
};
export const bookingDaysAhead = 6;

export const faqSection = {
  caption: "FAQ",
  title: "Частые *вопросы*",
  lead: "Не нашли ответ? Позвоните или напишите в Telegram — ответим в рабочее время.",
  cta: "Задать вопрос",
};

export const contactsSection = {
  caption: "Контакты",
  title: "Как нас *найти*",
  routeCta: "Построить маршрут",
  telegramCta: "Telegram",
  mapLabel: "Derlux Clinic",
  mapActivate: "Нажмите, чтобы управлять картой",
};

export const footerCopy = { cta: "Записаться" };
