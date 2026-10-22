"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import type { CheckupProgram, Clinic, Direction, Doctor, Service } from "@/data/types";
import type { HomeCopy } from "@/data/home";
import type { Locale } from "@/i18n/config";
import { submitBooking } from "@/actions/booking";
import { trackGoal } from "@/lib/analytics";
import { toMinutes } from "@/lib/dates";
import { cn, fillTemplate, formatPriceFrom } from "@/lib/format";
import { useBooking } from "@/components/booking/BookingProvider";
import { AccentTitle } from "@/components/ui/AccentTitle";
import { buttonClassName } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Select, type SelectGroup } from "@/components/ui/Select";

type BookingFormProps = {
  locale: Locale;
  directions: Direction[];
  checkups: CheckupProgram[];
  doctors: Doctor[];
  services: Service[];
  slots: string[];
  copy: HomeCopy["bookingForm"];
  address: string;
  /** Offered when the request cannot be sent. */
  phone: Clinic["phones"][number];
};

type Errors = Partial<Record<"name" | "phone" | "consent", string>>;

/** Keeps «998» + up to 9 digits and renders «+998 90 123 45 67». */
function formatPhone(digits: string) {
  const d = digits.slice(3);
  const parts = [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)].filter(Boolean);
  return ["+998", ...parts].join(" ");
}

function normalizePhone(input: string) {
  let digits = input.replace(/\D/g, "");
  if (!digits.startsWith("998")) digits = `998${digits.replace(/^998?/, "")}`;
  return digits.slice(0, 12);
}

export function BookingForm({ locale, directions, checkups, doctors, services, slots, copy, address, phone }: BookingFormProps) {
  const { selection, days, day, update, reset } = useBooking();
  const [name, setName] = useState("");
  const [phoneDigits, setPhoneDigits] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [more, setMore] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const uid = useId();
  // Spam check on the server: people take seconds to fill in the form, bots do not. Same clock as
  // the submit event's `timeStamp`.
  const mountedAt = useRef(0);
  useEffect(() => {
    mountedAt.current = performance.now();
  }, []);

  // «Записаться к врачу» / «Ближайшая запись» preselect a doctor or a time elsewhere on the page: show them.
  useEffect(() => {
    if (selection.doctorId || selection.time) setMore(true);
  }, [selection.doctorId, selection.time]);

  const direction = directions.find((d) => d.id === selection.directionId);
  const checkup = checkups.find((c) => c.id === selection.checkupId);
  const service = services.find((s) => s.id === selection.serviceId);
  const doctor = doctors.find((d) => d.id === selection.doctorId);
  const doctorOptions = direction ? doctors.filter((d) => d.directionIds.includes(direction.id)) : [];
  // A time from the hero's «Ближайшая запись» may be outside the list: show it among the chips.
  const timeChips =
    selection.time && !slots.includes(selection.time)
      ? [...slots, selection.time].sort((a, b) => toMinutes(a) - toMinutes(b))
      : slots;

  const topicDone = Boolean(direction || checkup || selection.unsure);

  const topicValue = checkup ? `checkup:${checkup.id}` : direction ? `direction:${direction.id}` : selection.unsure ? "unsure" : "";
  const topicLabel = checkup
    ? fillTemplate(copy.checkupLabel, { title: checkup.title.replaceAll("*", "") })
    : direction?.name ?? (selection.unsure ? copy.directionUnsure : copy.directionPlaceholder);
  const doctorLabel = doctor ? `${doctor.name} · ${doctor.position.split(",")[0].toLowerCase()}` : copy.anyDoctor;

  const topicGroups: SelectGroup[] = [
    { label: copy.directionsGroup, options: directions.map((d) => ({ value: `direction:${d.id}`, label: d.name })) },
    {
      label: copy.checkupGroup,
      options: checkups.map((c) => ({
        value: `checkup:${c.id}`,
        label: fillTemplate(copy.checkupLabel, { title: c.title.replaceAll("*", "") }),
        hint: c.durationLabel,
      })),
    },
    { options: [{ value: "unsure", label: copy.directionUnsure }] },
  ];
  const doctorGroups: SelectGroup[] = [
    { options: [{ value: "", label: copy.anyDoctor }] },
    { options: doctorOptions.map((d) => ({ value: d.id, label: d.name, hint: d.position })) },
  ];

  function onTopicChange(value: string) {
    const [kind, id] = value.split(":");
    if (kind === "checkup") update({ checkupId: id });
    else if (kind === "direction") update({ directionId: id });
    else if (kind === "unsure") update({ unsure: true });
  }

  function validate(): Errors {
    const next: Errors = {};
    if (!name.trim()) next.name = copy.errors.name;
    if (phoneDigits.length !== 12) next.phone = copy.errors.phone;
    if (!consent) next.consent = copy.errors.consent;
    return next;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const website = String(new FormData(e.currentTarget).get("website") ?? "");
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setStatus("sending");
    const result = await submitBooking({
      directionId: direction?.id ?? null,
      checkupId: checkup?.id ?? null,
      serviceId: service?.id ?? null,
      concernId: selection.concernId,
      doctorId: doctor?.id ?? null,
      unsure: selection.unsure,
      date: selection.time ? (day?.iso ?? null) : null,
      time: selection.time,
      name: name.trim(),
      phone: phoneDigits,
      website,
      elapsedMs: e.timeStamp - mountedAt.current,
      locale,
    }).catch(() => ({ ok: false }));
    if (!result.ok) {
      setStatus("error");
      return;
    }
    trackGoal("booking_submit");
    setStatus("sent");
  }

  function startOver() {
    reset();
    setName("");
    setPhoneDigits("");
    setConsent(false);
    setErrors({});
    setStatus("idle");
  }

  const submitLabel =
    day && selection.time ? fillTemplate(copy.submitWithSlot, { date: day.long, time: selection.time }) : copy.submit;

  if (status === "sent") {
    return (
      <FormCard>
        <div role="status" className="flex flex-col items-start gap-6">
          <AccentTitle as="p" size="h3" text={copy.success.title} />
          <p className="text-body text-graphite">{copy.success.text}</p>
          <dl className="flex w-full flex-col border-t border-line-soft text-small">
            <SuccessRow term={copy.success.when}>
              {day && selection.time ? `${day.long}, ${selection.time}` : copy.success.timeToConfirm}
            </SuccessRow>
            {doctor && <SuccessRow term={copy.success.doctor}>{doctor.name}</SuccessRow>}
            <SuccessRow term={copy.success.address}>{address}</SuccessRow>
            <SuccessRow term={copy.success.bring}>{copy.success.bringList}</SuccessRow>
          </dl>
          <button type="button" onClick={startOver} className={buttonClassName({ variant: "secondary" })}>
            {copy.success.again}
          </button>
        </div>
      </FormCard>
    );
  }

  return (
    <FormCard>
      <form noValidate onSubmit={onSubmit} className="flex flex-col gap-4" aria-label={copy.formLabel}>
        <Field label={copy.directionLabel} htmlFor={`${uid}-topic`}>
          <SelectBox id={`${uid}-topic`} label={topicLabel} muted={!topicDone} value={topicValue} groups={topicGroups} onChange={onTopicChange} />
          {service && (
            <p className="text-small text-graphite">
              {copy.serviceHint}: {service.name} · {formatPriceFrom(service.price, locale)}
            </p>
          )}
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={copy.nameLabel} htmlFor={`${uid}-name`} error={errors.name}>
            <input
              id={`${uid}-name`}
              name="name"
              autoComplete="given-name"
              value={name}
              placeholder={copy.namePlaceholder}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? `${uid}-name-error` : undefined}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
              }}
              className={inputClassName}
            />
          </Field>
          <Field label={copy.phoneLabel} htmlFor={`${uid}-phone`} error={errors.phone}>
            <input
              id={`${uid}-phone`}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={phoneDigits ? formatPhone(phoneDigits) : ""}
              placeholder={copy.phonePlaceholder}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? `${uid}-phone-error` : undefined}
              onFocus={() => !phoneDigits && setPhoneDigits("998")}
              onBlur={() => phoneDigits === "998" && setPhoneDigits("")}
              onChange={(e) => {
                setPhoneDigits(normalizePhone(e.target.value));
                if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
              }}
              className={inputClassName}
            />
          </Field>
        </div>

        <div className="flex flex-col gap-1">
          <button
            type="button"
            aria-expanded={more}
            aria-controls={`${uid}-more`}
            onClick={() => setMore((v) => !v)}
            className="group flex items-center gap-2 self-start text-label font-medium text-accent"
          >
            <span aria-hidden className="flex size-6 items-center justify-center rounded-full bg-accent-10 text-base leading-none">
              {more ? "−" : "+"}
            </span>
            {copy.moreToggle}
            <span className="text-label-sm font-normal text-graphite">· {copy.moreHint}</span>
          </button>
          <div id={`${uid}-more`} hidden={!more} className="flex flex-col gap-4 pt-3">
        {direction && (
              <Field label={copy.doctorLabel} htmlFor={`${uid}-doctor`}>
                <SelectBox
                  id={`${uid}-doctor`}
                  label={doctorLabel}
                  value={selection.doctorId ?? ""}
                  groups={doctorGroups}
                  onChange={(v) => update({ doctorId: v || null })}
                />
              </Field>
            )}

        <fieldset className="flex flex-col gap-2">
              <legend className="mb-2 text-small text-graphite">{copy.dateLabel}</legend>
              <div className="flex flex-wrap gap-1.5">
                {days.map((d) => {
                  const active = d.iso === day?.iso;
                  return (
                    <button
                      key={d.iso}
                      type="button"
                      aria-pressed={active}
                      onClick={() => update({ dateIso: d.iso })}
                      className={chipClass(active)}
                    >
                      {d.chip}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <fieldset className="flex flex-col gap-2">
              <legend className="mb-2 text-small text-graphite">{copy.timeLabel}</legend>
              <div className="flex flex-wrap gap-1.5">
                {timeChips.map((t) => {
                  const active = t === selection.time;
                  return (
                    <button
                      key={t}
                      type="button"
                      aria-pressed={active}
                      onClick={() => update({ time: active ? null : t })}
                      className={chipClass(active)}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </fieldset>

          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={consent}
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={errors.consent ? `${uid}-consent-error` : undefined}
              onChange={(e) => {
                setConsent(e.target.checked);
                if (errors.consent) setErrors((prev) => ({ ...prev, consent: undefined }));
              }}
              className="peer sr-only"
            />
            <span
              aria-hidden
              className="flex size-5.5 shrink-0 items-center justify-center rounded-checkbox border border-line-stone bg-white peer-checked:border-accent peer-checked:bg-accent peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent [&>*]:opacity-0 peer-checked:[&>*]:opacity-100"
            >
              <Icon name="check-checkbox" size={16} />
            </span>
            <span className="text-small text-graphite">{copy.consent}</span>
          </label>
          {errors.consent && (
            <p id={`${uid}-consent-error`} className="text-small font-medium text-accent">
              {errors.consent}
            </p>
          )}
        </div>

        {/* Honeypot for bots: off screen, out of the tab order and hidden from screen readers. */}
        <div aria-hidden className="sr-only">
          <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
          </label>
        </div>

        <button type="submit" disabled={status === "sending"} className="w-full rounded-full bg-accent px-6 py-3.5 text-button font-medium text-on-dark transition-colors duration-200 hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-50">
          {submitLabel}
        </button>
        {status === "error" ? (
          <p role="alert" className="text-center text-small font-medium text-accent">
            {copy.errors.send}{" "}
            <a href={`tel:${phone.e164}`} className="whitespace-nowrap underline">
              {phone.display}
            </a>
          </p>
        ) : (
          <p className="text-center text-small text-graphite">{copy.note}</p>
        )}
      </form>
    </FormCard>
  );
}

/** Compact chip for dates and times (the shared Chip is sized for the landing's large filters). */
function chipClass(active: boolean) {
  return cn(
    "rounded-full border px-3.5 py-2 text-label-sm font-medium transition-colors duration-200",
    active ? "border-transparent bg-ink text-on-dark" : "border-line-stone bg-white text-ink hover:border-ink",
  );
}

const inputClassName =
  "w-full rounded-field border border-line-stone bg-milk px-4 py-3 text-label font-medium text-ink placeholder:font-normal placeholder:text-graphite focus:border-accent focus:outline-none aria-invalid:border-accent";

function FormCard({ children }: { children: ReactNode }) {
  return <div className="w-full rounded-card bg-white p-5 text-ink sm:p-6 xl:w-135 xl:shrink-0">{children}</div>;
}

function Field({ label, htmlFor, error, children }: { label: string; htmlFor: string; error?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-small text-graphite">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="text-small font-medium text-accent">
          {error}
        </p>
      )}
    </div>
  );
}

type SelectBoxProps = {
  id: string;
  label: string;
  muted?: boolean;
  value: string;
  groups: SelectGroup[];
  onChange: (value: string) => void;
};

function SelectBox({ id, label, muted, value, groups, onChange }: SelectBoxProps) {
  return (
    <Select
      id={id}
      value={value}
      onChange={onChange}
      groups={groups}
      buttonClassName="flex w-full items-center gap-2 rounded-field border border-line-stone bg-milk px-4 py-3 transition-colors aria-expanded:border-accent focus-visible:border-accent"
    >
      <span className={cn("truncate text-label font-medium", muted ? "text-graphite" : "text-ink")}>{label}</span>
      <span className="flex-1" />
      <Icon name="chevron-down" size={18} className="transition-transform duration-200 group-aria-expanded:rotate-180" />
    </Select>
  );
}

function SuccessRow({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1 border-b border-line-soft py-3 sm:flex-row sm:gap-6">
      <dt className="text-graphite sm:w-32 sm:shrink-0">{term}</dt>
      <dd className="font-medium text-ink">{children}</dd>
    </div>
  );
}
