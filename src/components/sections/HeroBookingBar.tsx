"use client";

import type { Direction, Doctor } from "@/data/types";
import { bookingHref } from "@/data/clinic";
import { useBooking } from "@/components/booking/BookingProvider";
import { buttonClassName } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Select, type SelectGroup } from "@/components/ui/Select";

type Copy = {
  directionLabel: string;
  doctorLabel: string;
  dateLabel: string;
  anyDoctor: string;
  submit: string;
  today: string;
};

/** Hero mini form (Figma «Booking bar»): direction · doctor · date → jumps to the full form. */
export function HeroBookingBar({ directions, doctors, copy }: { directions: Direction[]; doctors: Doctor[]; copy: Copy }) {
  const { selection, days, day, update } = useBooking();
  const direction = directions.find((d) => d.id === selection.directionId);
  const doctorOptions = direction ? doctors.filter((d) => d.directionIds.includes(direction.id)) : doctors;
  const doctor = doctors.find((d) => d.id === selection.doctorId);

  const directionGroups: SelectGroup[] = [{ options: directions.map((d) => ({ value: d.id, label: d.name })) }];
  const doctorGroups: SelectGroup[] = [
    { options: [{ value: "", label: copy.anyDoctor }] },
    { options: doctorOptions.map((d) => ({ value: d.id, label: d.name, hint: d.position })) },
  ];
  const dateGroups: SelectGroup[] = [{ options: days.map((d) => ({ value: d.iso, label: d.short })) }];

  return (
    <div className="flex w-full flex-col rounded-bar bg-white p-2 shadow-bar md:flex-row md:items-center">
      <Field
        label={copy.directionLabel}
        value={direction?.name ?? "—"}
        selected={selection.directionId ?? ""}
        groups={directionGroups}
        onChange={(v) => update({ directionId: v })}
      />
      <Divider />
      <Field
        label={copy.doctorLabel}
        value={doctor?.name ?? copy.anyDoctor}
        selected={selection.doctorId ?? ""}
        groups={doctorGroups}
        onChange={(v) => update({ doctorId: v || null })}
      />
      <Divider />
      <Field
        label={copy.dateLabel}
        value={day?.short ?? copy.today}
        selected={day?.iso ?? ""}
        groups={dateGroups}
        onChange={(v) => update({ dateIso: v, time: null })}
      />
      <a href={bookingHref} className={buttonClassName({ variant: "dark", className: "max-md:mt-2 md:shrink-0" })}>
        {copy.submit}
      </a>
    </div>
  );
}

type FieldProps = {
  label: string;
  value: string;
  selected: string;
  groups: SelectGroup[];
  onChange: (value: string) => void;
};

function Field({ label, value, selected, groups, onChange }: FieldProps) {
  return (
    <Select
      ariaLabel={label}
      value={selected}
      onChange={onChange}
      groups={groups}
      className="min-w-0 flex-1 xl:flex-auto 2xl:flex-1"
      // Like the Figma field: content may run into the side padding, clipped at the padding edge.
      buttonClassName="flex w-full flex-col items-start gap-1 overflow-hidden rounded-field px-5 py-2.5 xl:px-3.5 2xl:px-5"
    >
      <span className="text-caption font-medium whitespace-nowrap text-graphite uppercase">{label}</span>
      <span className="flex items-center gap-1.5">
        <span className="text-label font-medium whitespace-nowrap text-ink">{value}</span>
        <Icon name="chevron-down-16" size={16} className="transition-transform duration-200 group-aria-expanded:rotate-180" />
      </span>
    </Select>
  );
}

function Divider() {
  return <span aria-hidden className="mx-5 h-px bg-line-soft md:mx-0 md:h-10 md:w-px md:shrink-0" />;
}
