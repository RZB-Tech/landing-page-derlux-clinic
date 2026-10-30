/*
 * Content types. Shapes mirror what a CMS / clinic API would return, so the mock modules in
 * this folder can be swapped for real requests without touching components.
 *
 * Rich titles use `*word*` to mark the italic accent word of a Cormorant heading
 * («Здоровая *кожа* начинается с причины»).
 */

export type Id = string;

export type Image = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Link = {
  label: string;
  href: string;
};

export type Money = {
  /** Lower bound in UZS («от 150 000 сум»). */
  from: number;
  currency: "UZS";
};

export type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

export type SocialLink = {
  network: "instagram" | "facebook" | "telegram" | "youtube";
  /** Text next to the icon: the network's name or the account's handle. */
  label: string;
  /** null until the clinic sends the link; the item is then shown without a link. */
  url: string | null;
};

export type Clinic = {
  name: string;
  legalName: string;
  description: string;
  foundedYear: number;
  phones: { display: string; e164: string; primary?: boolean }[];
  email: string;
  address: {
    city: string;
    district: string;
    street: string;
    /** Single-line form for small spaces. */
    short: string;
    /** City name alone, for structured data («Ташкент»). */
    locality: string;
    postalCode: string | null;
    country: "UZ";
  };
  geo: { lat: number; lng: number };
  map: {
    /** Yandex map widget for the iframe. */
    embedUrl: string;
    /** The clinic's place on Yandex Maps. */
    url: string;
    /** Opens a route to the clinic from the visitor's location. */
    routeUrl: string;
  };
  hours: { label: string; value: string }[];
  /** Regular hours for structured data (schema.org OpeningHoursSpecification). */
  openingHours: { days: DayOfWeek[]; opens: string; closes: string }[];
  hoursShort: string;
  telegramUrl: string;
  /** Social links in the row under the hero. */
  socials: SocialLink[];
  /** The clinic's own profiles elsewhere (Google Business, Yandex, 2GIS, Instagram) — schema.org sameAs. */
  profiles: string[];
  license: { number: string | null; label: string };
  disclaimer: string;
};

/** A titled list on a direction's page («С чем *обращаются*»: conditions, procedures). */
export type DirectionSection = {
  title: string;
  items: string[];
};

export type Direction = {
  id: Id;
  slug: string;
  name: string;
  /** Short name for tabs and selects («Лазер», «Процедурный»). */
  shortName: string;
  summary: string;
  description: string;
  priceFrom: Money;
  image: Image;
  /** Specialist title used in booking hints («Дерматолог»). */
  specialist: string;
  /** Lists on the direction's own page; the clinic's wording (vish-list, 2026-10). */
  sections?: DirectionSection[];
};

export type Service = {
  id: Id;
  directionId: Id;
  name: string;
  durationMin: number;
  price: Money;
};

export type Concern = {
  id: Id;
  label: string;
  directionId: Id;
};

export type Doctor = {
  id: Id;
  name: string;
  position: string;
  directionIds: Id[];
  /** Specializations: a doctor can have several («Дерматолог», «Специалист по лазерной дерматологии»). */
  specializations?: string[];
  /** One line per stage: «2001–2008 — ТашМИ, бакалавриат». */
  education?: string[];
  experienceYears?: number;
  /** «Высшая категория», … */
  category?: string;
  languages?: string[];
  /** What patients come with — chips in the doctor's dialog (clinic's wish list, 2026-10-22). */
  focus: string[];
  /** Scans of diplomas and licences. TODO(clinic): the clinic sends them separately. */
  documents?: Image[];
  photo: Image;
};

export type CheckupProgram = {
  id: Id;
  /** e.g. «Здоровая *кожа*» — rendered in quotes. */
  title: string;
  audience: string;
  includes: string[];
  durationLabel: string;
  price: Money;
  featured?: boolean;
  badge?: string;
};

export type Promotion = {
  id: Id;
  value: string;
  title: string;
  validUntil: string;
  validUntilLabel: string;
  directionId?: Id;
  checkupId?: Id;
  featured?: boolean;
};

export type Review = {
  id: Id;
  author: string;
  age: number;
  ageLabel: string;
  topic: string;
  dateLabel: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
};

export type RatingSummary = {
  value: number;
  valueLabel: string;
  source: string;
};

export type FaqItem = {
  id: Id;
  question: string;
  answer: string;
};

export type Advantage = {
  id: Id;
  title: string;
  icon: "shield" | "users" | "check" | "heart";
};

/** «Ближайшая запись» in the hero (mock of the scheduling API): the first slot `leadHours` from now. */
export type NearestSlot = {
  leadHours: number;
  directionId: Id;
};

/** Booking slot grid on the clinic's clock (Пн–Сб). */
export type WorkingHours = {
  /** «09:00» */
  opens: string;
  /** «19:00» */
  closes: string;
  /** Visit length and slot step, in minutes. */
  stepMinutes: number;
};

export type SectionHeading = {
  caption: string;
  title: string;
  lead?: string;
  link?: Link;
};

/** What a patient may want to know about a condition: a dialog opens from the direction page's list. */
export type Condition = {
  id: Id;
  name: string;
  /** Two sentences: what it is. */
  about: string;
  /** Causes and risk factors (for a service such as pregnancy care: what needs extra attention). */
  causes: string[];
  symptoms: string[];
  /** What the doctor checks at the appointment. */
  diagnostics: string[];
  treatment: string[];
  /** What can happen without treatment. */
  risks: string[];
  /** A photo in the dialog, shared by both languages (`conditionImages` in `conditions.ts`). */
  image?: Image;
};
