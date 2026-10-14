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
  /** schema.org openingHours, e.g. "Mo-Sa 09:00-19:00". */
  openingHours: string[];
  hoursShort: string;
  telegramUrl: string;
  license: { number: string | null; label: string };
  disclaimer: string;
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
  experienceYears: number;
  category: string;
  languages: string[];
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

export type NearestSlot = {
  dayLabel: string;
  time: string;
  directionId: Id;
  note: string;
};

export type SectionHeading = {
  caption: string;
  title: string;
  lead?: string;
  link?: Link;
};
