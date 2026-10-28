"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import type { CheckupProgram, Clinic, Direction, Doctor, Service } from "@/data/types";
import type { HomeCopy } from "@/data/home";
import type { Locale } from "@/i18n/config";
import { submitBooking } from "@/actions/booking";
import { trackGoal } from "@/lib/analytics";
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
  copy: HomeCopy["bookingForm"];
  address: string;
  /** Offered when the request cannot be sent. */
  phone: Clinic["phones"][number];
};

type Errors = Partial<Record<"name" | "phone", string>>;

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

export function BookingForm({ locale, directions, checkups, doctors, services, copy, address, phone }: BookingFormProps) {
  const { selection, update, reset } = useBooking();
  const [name, setName] = useState("");
  const [phoneDigits, setPhoneDigits] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const uid = useId();
  // Spam check on the server: people take seconds to fill in the form, bots do not. Same clock as
  // the submit event's `timeStamp`.
  const mountedAt = useRef(0);
  useEffect(() => {
    mountedAt.current = performance.now();
  }, []);

  const direction = directions.find((d) => d.id === selection.directionId);
  const checkup = checkups.find((c) => c.id === selection.checkupId);
  const service = services.find((s) => s.id === selection.serviceId);
  const doctor = doctors.find((d) => d.id === selection.doctorId);
  const topicDone = Boolean(direction || checkup || selection.unsure);

  const topicValue = checkup ? `checkup:${checkup.id}` : direction ? `direction:${direction.id}` : selection.unsure ? "unsure" : "";
  const topicLabel = checkup
    ? fillTemplate(copy.checkupLabel, { title: checkup.title.replaceAll("*", "") })
    : direction?.name ?? (selection.unsure ? copy.directionUnsure : copy.directionPlaceholder);

  const topicGroups: SelectGroup[] = [
    { label: copy.directionsGroup, options: directions.map((d) => ({ value: `direction:${d.id}`, label: d.name })) },
    { options: [{ value: "unsure", label: copy.directionUnsure }] },
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
      date: null,
      time: null,
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
    setErrors({});
    setStatus("idle");
  }

  if (status === "sent") {
    return (
      <FormCard>
        <div role="status" className="flex flex-col items-start gap-6">
          <AccentTitle as="p" size="h3" text={copy.success.title} />
          <p className="text-body text-graphite">{copy.success.text}</p>
          <dl className="flex w-full flex-col border-t border-line-soft text-small">
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
          {doctor && (
            <p className="text-small text-graphite">
              {copy.doctorLabel}: {doctor.name}
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

        {/* Honeypot for bots: off screen, out of the tab order and hidden from screen readers. */}
        <div aria-hidden className="sr-only">
          <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
          </label>
        </div>

        <button type="submit" disabled={status === "sending"} className="w-full rounded-full bg-accent px-6 py-3.5 text-button font-medium text-on-dark transition-colors duration-200 hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-50">
          {copy.submit}
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
