"use server";

import { checkups } from "@/data/checkups";
import { directions } from "@/data/directions";
import { doctors } from "@/data/doctors";
import { bookingForm, bookingSlots, concerns } from "@/data/home";
import { services } from "@/data/services";
import { formatPriceFrom } from "@/lib/format";
import { escapeTelegramHtml, sendTelegramMessage } from "@/lib/telegram";

/** What the booking form sends: ids from `src/data/` and the patient's contacts. */
export type BookingRequest = {
  directionId: string | null;
  checkupId: string | null;
  serviceId: string | null;
  concernId: string | null;
  doctorId: string | null;
  unsure: boolean;
  /** ISO date, sent only together with `time`. */
  date: string | null;
  time: string | null;
  name: string;
  /** «998» + 9 digits. */
  phone: string;
  /** Honeypot: hidden from people, filled in by bots. */
  website: string;
  /** Time from the form's mount to the submit. */
  elapsedMs: number;
};

export type BookingResult = { ok: boolean };

// A person needs longer than this to fill in a name and a phone number.
const MIN_FILL_MS = 3000;

const text = (value: unknown, max: number) => (typeof value === "string" ? value.trim().slice(0, max) : "");
const byId = <T extends { id: string }>(items: T[], id: unknown) => items.find((item) => item.id === id);

/** «2026-10-16» → «чт, 16 октября», or null for anything that is not a real date. */
function formatDay(iso: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== iso) return null;
  return new Intl.DateTimeFormat("ru-RU", { weekday: "short", day: "numeric", month: "long", timeZone: "UTC" }).format(date);
}

/**
 * Sends a booking request to the clinic's Telegram chat. Reachable by any POST, so it checks the
 * input again and takes names, prices and doctors from `src/data/` by id, never from the client.
 */
export async function submitBooking(request: BookingRequest): Promise<BookingResult> {
  const name = text(request?.name, 80);
  const phone = text(request?.phone, 12);
  if (!name || !/^998\d{9}$/.test(phone)) return { ok: false };

  // Bots get a success reply so they do not retry, and nothing is sent.
  const elapsed = Number(request.elapsedMs);
  if (text(request.website, 200) || !Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) {
    console.warn("Booking: dropped as spam");
    return { ok: true };
  }

  const checkup = byId(checkups, request.checkupId);
  const direction = checkup ? undefined : byId(directions, request.directionId);
  const concern = byId(concerns, request.concernId);
  const service = byId(services, request.serviceId);
  const doctor = byId(doctors, request.doctorId);
  const day = typeof request.date === "string" ? formatDay(request.date) : null;
  const time = bookingSlots.find((slot) => slot === request.time);

  const topic = checkup
    ? `Check-up «${checkup.title.replaceAll("*", "")}»`
    : (direction?.name ?? (request.unsure ? bookingForm.directionUnsure : "не выбрано"));
  const rows: [string, string | undefined][] = [
    ["Имя", name],
    ["Телефон", `+${phone}`],
    ["Направление", topic],
    ["Беспокоит", concern && concern.directionId === direction?.id ? concern.label : undefined],
    ["Услуга", service && `${service.name} · ${formatPriceFrom(service.price)}`],
    ["Врач", checkup || request.unsure ? undefined : (doctor?.name ?? "любой")],
    ["Когда", day && time ? `${day}, ${time}` : "время подберёт администратор"],
  ];
  const message = [
    "<b>Новая запись с сайта</b>",
    "",
    ...rows
      .filter((row): row is [string, string] => Boolean(row[1]))
      .map(([label, value]) => `<b>${label}:</b> ${escapeTelegramHtml(value)}`),
  ].join("\n");

  return { ok: await sendTelegramMessage(message) };
}
