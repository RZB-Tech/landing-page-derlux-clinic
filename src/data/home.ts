import type { Locale, Localized } from "@/i18n/config";
import { getClinic } from "./clinic";
import type { NearestSlot, SectionHeading, WorkingHours } from "./types";

// Copy of the home page (Figma «5. Лендинг», «Derlux — Главная · 1440 · v2»), in each language.
// Everything that is not text (images, links, slots, hours) is shared and sits at the bottom.
// TODO(clinic): have a native speaker proofread the Uzbek copy.

const ru = {
  // Search snippet and link preview. The title leads with what patients search for
  // («дерматолог Ташкент»), not with the brand.
  homeMeta: {
    title: "Дерматолог, гинеколог, эндокринолог в Ташкенте — Derlux Clinic",
    description:
      "Дерматология, гинекология, эндокринология, УЗИ и анализы в одной клинике. Цены известны заранее, онлайн-запись за минуту. Ташкент, ул. Садыка Азимова, 46.",
    ogImageAlt: "Derlux Clinic — дерматолог, гинеколог и эндокринолог в Ташкенте",
  },

  headerCopy: {
    cta: "Записаться",
    nav: "Основная навигация",
    mobileNav: "Мобильная навигация",
    menuOpen: "Открыть меню",
    menuClose: "Закрыть меню",
    logoLabel: "Derlux Clinic — наверх",
    languageLabel: "Язык",
  },

  hero: {
    title: "Здоровая *кожа* начинается с правильного диагноза",
    lead: "Дерматолог, гинеколог и эндокринолог — рядом. Анализы и УЗИ — здесь же.",
    primaryCta: "Записаться на приём",
    secondaryCta: { label: "Подобрать врача", href: "#doctors" },
    badge: "Стерильность по стандартам",
    socialsLabel: "Мы в соцсетях",
    imageAlt: "Пациентка с чистой, здоровой кожей",
    bookingBar: {
      directionLabel: "Направление",
      doctorLabel: "Врач",
      dateLabel: "Дата",
      anyDoctor: "Любой врач",
      submit: "Найти время",
      today: "Сегодня",
    },
  },

  nearestSlotCopy: {
    caption: "Ближайшая запись",
    cta: "Записаться на это время",
    /** Holds the card's size in the prerendered HTML, hidden until the time is known. */
    placeholder: "Сегодня, 15:30",
    note: "Дерматолог · консультация 30 мин",
  },

  directionsSection: {
    caption: "Направления",
    title: "Восемь направлений — *одна* клиника",
    link: { label: "Все услуги и цены", href: "#prices" },
  } satisfies SectionHeading,
  directionsCopy: { more: "Подробнее" },

  concernsSection: {
    caption: "С чего начать",
    title: "Что вас *беспокоит*?",
    lead: "Выберите — подскажем врача и анализы.",
  },

  concerns: [
    { id: "acne", label: "Акне и постакне", directionId: "dermatology" },
    { id: "pigmentation", label: "Пигментация", directionId: "laser" },
    { id: "hair-loss", label: "Выпадение волос", directionId: "dermatology" },
    { id: "papillomas", label: "Папилломы и бородавки", directionId: "dermatology" },
    { id: "striae", label: "Растяжки и целлюлит", directionId: "aesthetic" },
    { id: "cycle", label: "Нарушение цикла", directionId: "gynecology" },
    { id: "pregnancy-planning", label: "Планирование беременности", directionId: "gynecology" },
    { id: "myoma", label: "Миома и киста", directionId: "gynecology" },
  ],

  whyCard: {
    caption: "Почему Derlux",
    title: "Кожа, гормоны и женское здоровье — *в одной клинике*",
    text: "Причина проблем с кожей часто в гормонах. Поэтому врачи работают вместе, а анализы и УЗИ — здесь же.",
    specialists: ["Дерматолог", "Эндокринолог", "Гинеколог"],
    specialistsLabel: "Врачи работают вместе",
    cta: { label: "Пройти Check-up", href: "#checkup" },
  },

  advantages: [
    { id: "sterility", title: "Стерильность — стандарт", icon: "shield" as const },
    { id: "specialists", title: "Опытные специалисты", icon: "users" as const },
    { id: "protocols", title: "Работа по протоколам", icon: "check" as const },
    { id: "care", title: "Бережное отношение", icon: "heart" as const },
  ],

  pricesSection: {
    caption: "Услуги",
    title: "Наши *услуги*",
    lead: "Основные услуги клиники по направлениям.",
  } satisfies SectionHeading,
  pricesCopy: { cta: "Записаться", durationUnit: "мин", tabsLabel: "Направления" },

  // The page of one direction («/directions/…»).
  directionPage: {
    metaTitle: "{name} в Ташкенте",
    metaDescription: "{description} Цены известны заранее, онлайн-запись за минуту. Ташкент, {address}.",
    breadcrumbLabel: "Навигация по страницам",
    breadcrumbHome: "Главная",
    breadcrumbDirections: "Направления",
    caption: "Направление",
    detailsCaption: "О направлении",
    priceLabel: "Стоимость",
    specialistLabel: "Специалист",
    cta: "Записаться на приём",
    servicesCaption: "Услуги и цены",
    servicesTitle: "Что входит и *сколько стоит*",
    servicesNote: "Точную цену врач назовёт на приёме.",
    doctorsCaption: "Врачи",
    doctorsTitle: "Приём ведут *врачи*",
    doctorCta: "Записаться к врачу",
    othersCaption: "Другие направления",
    othersTitle: "Что ещё *мы лечим*",
  },

  doctorsSection: {
    caption: "Врачи",
    title: "Врачи, которые *слушают*",
    link: { label: "Все врачи", href: "#doctors" },
  } satisfies SectionHeading,
  doctorsCopy: {
    cta: "Записаться к врачу",
    experience: "Стаж",
    details: "О враче",
    close: "Закрыть",
    specializationTitle: "Специализация",
    educationTitle: "Образование",
    focusTitle: "С чем обращаются",
    directionsTitle: "Направления",
    servicesTitle: "Услуги и цены",
    documentsTitle: "Дипломы и лицензии",
    documentsSoon: "Скоро появятся",
    previous: "Предыдущий документ",
    next: "Следующий документ",
  },

  checkupSection: {
    caption: "Check-up программы",
    title: "Всё обследование — *за один визит*",
    lead: "Врачи, анализы и УЗИ — в один день.",
  } satisfies SectionHeading,
  checkupCopy: { cta: "Записаться на Check-up" },

  promotionsSection: {
    caption: "Акции",
    title: "Предложения *месяца*",
    link: { label: "Все акции", href: "#promotions" },
  } satisfies SectionHeading,
  promotionsCopy: { cta: "Записаться" },

  reviewsSection: {
    caption: "Отзывы",
    title: "Что говорят *пациенты*",
  } satisfies SectionHeading,

  bookingSection: {
    caption: "Онлайн-запись",
    title: "Запишитесь за *минуту* — без звонков",
    lead: "Администратор перезвонит и подтвердит запись.",
    steps: ["Направление или услуга", "Врач", "Имя и телефон"],
    telegramLabel: "Telegram",
  },

  bookingForm: {
    formLabel: "Онлайн-запись",
    moreToggle: "Выбрать врача",
    moreHint: "необязательно",
    directionLabel: "Направление",
    directionPlaceholder: "Выберите направление",
    directionUnsure: "Не знаю — подскажите",
    checkupGroup: "Check-up программы",
    checkupLabel: "Check-up «{title}»",
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
  },

  faqSection: {
    caption: "FAQ",
    title: "Частые *вопросы*",
    lead: "Не нашли ответ? Позвоните или напишите в Telegram — ответим в рабочее время.",
    cta: "Задать вопрос",
  },

  contactsSection: {
    caption: "Контакты",
    title: "Как нас *найти*",
    routeCta: "Построить маршрут",
    telegramCta: "Telegram",
    mapLabel: "Derlux Clinic",
    mapTitle: "{label} на Яндекс Картах — {street}",
    mapActivate: "Нажмите, чтобы управлять картой",
  },

  footerCopy: { cta: "Записаться", nav: "Навигация в подвале" },
};

export type HomeCopy = typeof ru;

const uz: HomeCopy = {
  homeMeta: {
    title: "Toshkentda dermatolog, ginekolog, endokrinolog — Derlux Clinic",
    description:
      "Dermatologiya, ginekologiya, endokrinologiya, UZI va tahlillar — bitta klinikada. Narxlar oldindan ma'lum, onlayn yozilish bir daqiqada. Toshkent, Sodiq Azimov ko'chasi, 46.",
    ogImageAlt: "Derlux Clinic — Toshkentda dermatolog, ginekolog va endokrinolog",
  },

  headerCopy: {
    cta: "Yozilish",
    nav: "Asosiy navigatsiya",
    mobileNav: "Mobil navigatsiya",
    menuOpen: "Menyuni ochish",
    menuClose: "Menyuni yopish",
    logoLabel: "Derlux Clinic — yuqoriga",
    languageLabel: "Til",
  },

  hero: {
    title: "*Teri* salomatligi to'g'ri tashxisdan boshlanadi",
    lead: "Dermatolog, ginekolog va endokrinolog — yonma-yon. Tahlillar va UZI ham shu yerda.",
    primaryCta: "Qabulga yozilish",
    secondaryCta: { label: "Shifokor tanlash", href: "#doctors" },
    badge: "Standartlar bo'yicha sterillik",
    socialsLabel: "Ijtimoiy tarmoqlarda",
    imageAlt: "Toza, sog'lom teriga ega bemor",
    bookingBar: {
      directionLabel: "Yo'nalish",
      doctorLabel: "Shifokor",
      dateLabel: "Sana",
      anyDoctor: "Istalgan shifokor",
      submit: "Vaqt topish",
      today: "Bugun",
    },
  },

  nearestSlotCopy: {
    caption: "Eng yaqin qabul",
    cta: "Shu vaqtga yozilish",
    placeholder: "Bugun, 15:30",
    note: "Dermatolog · 30 daqiqalik maslahat",
  },

  directionsSection: {
    caption: "Yo'nalishlar",
    title: "Sakkiz yo'nalish — *bitta* klinika",
    link: { label: "Barcha xizmat va narxlar", href: "#prices" },
  },
  directionsCopy: { more: "Batafsil" },

  concernsSection: {
    caption: "Nimadan boshlash kerak",
    title: "Sizni nima *bezovta qiladi*?",
    lead: "Tanlang — shifokor va tahlillarni tavsiya qilamiz.",
  },

  concerns: [
    { id: "acne", label: "Akne va postakne", directionId: "dermatology" },
    { id: "pigmentation", label: "Pigmentatsiya", directionId: "laser" },
    { id: "hair-loss", label: "Soch to'kilishi", directionId: "dermatology" },
    { id: "papillomas", label: "Papilloma va so'gallar", directionId: "dermatology" },
    { id: "striae", label: "Strialar va sellulit", directionId: "aesthetic" },
    { id: "cycle", label: "Hayz sikli buzilishi", directionId: "gynecology" },
    { id: "pregnancy-planning", label: "Homiladorlikni rejalashtirish", directionId: "gynecology" },
    { id: "myoma", label: "Mioma va kista", directionId: "gynecology" },
  ],

  whyCard: {
    caption: "Nega Derlux",
    title: "Teri, gormonlar va ayollar salomatligi — *bitta klinikada*",
    text: "Teri muammolarining sababi ko'pincha gormonlarda. Shuning uchun shifokorlar birgalikda ishlaydi, tahlillar va UZI esa shu yerning o'zida.",
    specialists: ["Dermatolog", "Endokrinolog", "Ginekolog"],
    specialistsLabel: "Shifokorlar birgalikda ishlaydi",
    cta: { label: "Check-up'dan o'tish", href: "#checkup" },
  },

  advantages: [
    { id: "sterility", title: "Sterillik — standart", icon: "shield" },
    { id: "specialists", title: "Tajribali mutaxassislar", icon: "users" },
    { id: "protocols", title: "Protokollar bo'yicha ish", icon: "check" },
    { id: "care", title: "Ehtiyotkor munosabat", icon: "heart" },
  ],

  pricesSection: {
    caption: "Xizmatlar",
    title: "Bizning *xizmatlar*",
    lead: "Klinikaning yo'nalishlar bo'yicha asosiy xizmatlari.",
  },
  pricesCopy: { cta: "Yozilish", durationUnit: "daq", tabsLabel: "Yo'nalishlar" },

  directionPage: {
    metaTitle: "{name} Toshkentda",
    metaDescription: "{description} Narxlar oldindan ma'lum, onlayn yozilish bir daqiqada. Toshkent, {address}.",
    breadcrumbLabel: "Sahifa yo'li",
    breadcrumbHome: "Bosh sahifa",
    breadcrumbDirections: "Yo'nalishlar",
    caption: "Yo'nalish",
    detailsCaption: "Yo'nalish haqida",
    priceLabel: "Narxi",
    specialistLabel: "Mutaxassis",
    cta: "Qabulga yozilish",
    servicesCaption: "Xizmatlar va narxlar",
    servicesTitle: "Nimalar kiradi va *qancha turadi*",
    servicesNote: "Aniq narxni shifokor qabulda aytadi.",
    doctorsCaption: "Shifokorlar",
    doctorsTitle: "Qabulni *shifokorlar* olib boradi",
    doctorCta: "Shifokorga yozilish",
    othersCaption: "Boshqa yo'nalishlar",
    othersTitle: "Yana *nimalarni* davolaymiz",
  },

  doctorsSection: {
    caption: "Shifokorlar",
    title: "Tinglaydigan *shifokorlar*",
    link: { label: "Barcha shifokorlar", href: "#doctors" },
  },
  doctorsCopy: {
    cta: "Shifokorga yozilish",
    experience: "Tajriba",
    details: "Shifokor haqida",
    close: "Yopish",
    specializationTitle: "Mutaxassislik",
    educationTitle: "Ma'lumoti",
    focusTitle: "Nima bilan murojaat qilinadi",
    directionsTitle: "Yo'nalishlar",
    servicesTitle: "Xizmatlar va narxlar",
    documentsTitle: "Diplomlar va litsenziyalar",
    documentsSoon: "Tez orada qo'shiladi",
    previous: "Oldingi hujjat",
    next: "Keyingi hujjat",
  },

  checkupSection: {
    caption: "Check-up dasturlari",
    title: "Butun tekshiruv — *bir tashrifda*",
    lead: "Shifokorlar, tahlillar va UZI — bir kunda.",
  },
  checkupCopy: { cta: "Check-up'ga yozilish" },

  promotionsSection: {
    caption: "Aksiyalar",
    title: "Oyning *takliflari*",
    link: { label: "Barcha aksiyalar", href: "#promotions" },
  },
  promotionsCopy: { cta: "Yozilish" },

  reviewsSection: {
    caption: "Sharhlar",
    title: "Bemorlar *nima deydi*",
  },

  bookingSection: {
    caption: "Onlayn yozilish",
    title: "Bir *daqiqada* yoziling — qo'ng'iroqsiz",
    lead: "Administrator qo'ng'iroq qilib, yozilishni tasdiqlaydi.",
    steps: ["Yo'nalish yoki xizmat", "Shifokor", "Ism va telefon"],
    telegramLabel: "Telegram",
  },

  bookingForm: {
    formLabel: "Onlayn yozilish",
    moreToggle: "Shifokorni tanlash",
    moreHint: "ixtiyoriy",
    directionLabel: "Yo'nalish",
    directionPlaceholder: "Yo'nalishni tanlang",
    directionUnsure: "Bilmayman — maslahat bering",
    checkupGroup: "Check-up dasturlari",
    checkupLabel: "Check-up «{title}»",
    directionsGroup: "Yo'nalishlar",
    doctorLabel: "Shifokor",
    anyDoctor: "Istalgan shifokor",
    dateLabel: "Sana",
    timeLabel: "Bo'sh vaqt",
    nameLabel: "Ism",
    namePlaceholder: "Sizga qanday murojaat qilaylik",
    phoneLabel: "Telefon",
    phonePlaceholder: "+998 __ ___ __ __",
    consent: "Shaxsiy ma'lumotlarimni qayta ishlashga roziman",
    submit: "Yozilish",
    submitWithSlot: "{date}, {time} ga yozilish",
    note: "Administrator yozilishni tasdiqlash uchun 15 daqiqa ichida qo'ng'iroq qiladi.",
    serviceHint: "Xizmat",
    errors: {
      name: "Sizga qanday murojaat qilishni yozing",
      phone: "Raqamni tekshiring: +998 va 9 ta raqam",
      consent: "Qayta qo'ng'iroq qilishimiz uchun rozilik kerak",
      slot: "Sana va vaqtni tanlang — yoki so'rov qoldiring, administrator vaqtni tanlab beradi",
      send: "So'rovni yuborib bo'lmadi. Qayta urinib ko'ring yoki qo'ng'iroq qiling:",
    },
    success: {
      title: "So'rov *qabul qilindi*",
      text: "Administrator 15 daqiqa ichida qo'ng'iroq qilib, yozilishni tasdiqlaydi.",
      when: "Qachon",
      doctor: "Shifokor",
      address: "Manzil",
      bring: "Olib kelish kerak",
      bringList: "pasport, avvalgi tahlil natijalari va shifokor xulosalari (bo'lsa)",
      timeToConfirm: "vaqtni administrator aniqlaydi",
      again: "Yangi yozilish",
    },
  },

  faqSection: {
    caption: "FAQ",
    title: "Ko'p beriladigan *savollar*",
    lead: "Javob topolmadingizmi? Qo'ng'iroq qiling yoki Telegramga yozing — ish vaqtida javob beramiz.",
    cta: "Savol berish",
  },

  contactsSection: {
    caption: "Aloqa",
    title: "Bizni *qanday topish* mumkin",
    routeCta: "Marshrut tuzish",
    telegramCta: "Telegram",
    mapLabel: "Derlux Clinic",
    mapTitle: "{label} Yandex Xaritalarda — {street}",
    mapActivate: "Xaritani boshqarish uchun bosing",
  },

  footerCopy: { cta: "Yozilish", nav: "Pastki navigatsiya" },
};

const copy: Localized<HomeCopy> = { ru, uz };

export const getHome = (locale: Locale): HomeCopy => copy[locale];

// Not text, the same in every language.

export const heroImage = { src: "/images/hero-green2.png", width: 948, height: 1659 };

// Mock of the scheduling API: the nearest free slot is the first one 3 hours from now.
export const nearestSlot: NearestSlot = {
  leadHours: 3,
  directionId: "dermatology",
};

// Splash on entering the site (not in Figma): the clinic's reception, sent by the clinic on
// 2026-10-15. Decorative, so no alt text. TODO(clinic): the original file — this copy came
// through Telegram at 1280×720 and is soft on large screens.
export const introSplash = {
  image: { src: "/images/clinic-reception.png", width: 1672, height: 941 },
  durationMs: 2000,
};

// Free slots per working day (mock of the scheduling API).
export const bookingSlots = ["9:30", "11:00", "12:30", "15:30", "17:00", "18:30"];
// Any time on this grid can be booked: the hero's «Ближайшая запись» picks one outside the list.
const hours = getClinic("ru").openingHours[0];
export const bookingHours: WorkingHours = {
  opens: hours.opens,
  closes: hours.closes,
  stepMinutes: 30,
};
export const bookingDaysAhead = 6;
