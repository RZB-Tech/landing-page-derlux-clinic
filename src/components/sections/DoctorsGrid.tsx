"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Image as ImageData } from "@/data/types";
import { cn } from "@/lib/format";
import { useBooking } from "@/components/booking/BookingProvider";
import { Reveal } from "@/components/motion/Reveal";
import { buttonClassName } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export type DoctorView = {
  id: string;
  name: string;
  position: string;
  photo: ImageData;
  /** «Стаж 12 лет», «Высшая категория» — only what the clinic has given. */
  facts: string[];
  focus: string[];
  documents: ImageData[];
  directions: string[];
  services: { id: string; name: string; price: string }[];
};

type DoctorsGridProps = {
  doctors: DoctorView[];
  copy: {
    cta: string;
    details: string;
    close: string;
    focusTitle: string;
    directionsTitle: string;
    servicesTitle: string;
    documentsTitle: string;
    documentsSoon: string;
  };
};

/** Doctor cards; a click opens a native modal <dialog> with the details (Esc and backdrop close it). */
export function DoctorsGrid({ doctors, copy }: DoctorsGridProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const { update } = useBooking();
  const doctor = doctors.find((d) => d.id === openId);

  const open = (id: string) => {
    setOpenId(id);
    // The dialog's content renders with the state; show it on the next frame.
    requestAnimationFrame(() => dialogRef.current?.showModal());
  };
  const close = () => dialogRef.current?.close();

  return (
    <>
      <ul className="snap-row md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0">
        {doctors.map((d, i) => (
          <Reveal as="li" key={d.id} delay={i * 120} className="w-72 md:w-auto">
            <button
              type="button"
              onClick={() => open(d.id)}
              aria-haspopup="dialog"
              className="group relative block aspect-3/4 w-full overflow-hidden rounded-[36px] bg-sand text-left text-on-dark"
            >
              <Image
                src={d.photo.src}
                alt={d.photo.alt}
                fill
                sizes="(min-width: 1440px) 411px, (min-width: 768px) 30vw, 288px"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <span aria-hidden className="absolute inset-0 bg-linear-to-t from-ink/85 via-ink/10 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 md:p-6">
                <span className="flex min-w-0 flex-col gap-1">
                  <span className="font-display text-display-h3 leading-tight">{d.name}</span>
                  <span className="text-small opacity-85">{d.position}</span>
                </span>
                <span className="flex shrink-0 items-center gap-2 rounded-full bg-milk py-2.5 pr-3 pl-4 text-label-sm font-medium text-ink transition-all duration-300 group-hover:bg-white group-hover:pr-4">
                  {copy.details}
                  <Icon name="arrow-right-ink" size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </span>
            </button>
          </Reveal>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-labelledby="doctor-dialog-title"
        onClose={() => setOpenId(null)}
        onClick={(e) => e.target === dialogRef.current && close()}
        className="dialog-in m-auto max-h-[92dvh] w-[min(50rem,calc(100%-1.5rem))] overflow-hidden rounded-[32px] bg-milk p-0 text-ink backdrop:bg-ink/60 backdrop:backdrop-blur-sm"
      >
        {doctor && (
          <div className="relative flex max-h-[92dvh] flex-col gap-7 overflow-y-auto p-6 md:p-10">
            <button
              type="button"
              onClick={close}
              aria-label={copy.close}
              className="absolute top-4 right-4 z-10 flex size-11 items-center justify-center rounded-full bg-white text-ink shadow-bar transition-transform duration-200 hover:rotate-90"
            >
              <span aria-hidden className="text-2xl leading-none">
                ×
              </span>
            </button>

            {/* Row 1: photo + name, position and directions beside it. */}
            <div className="flex items-start gap-5 pr-12 md:gap-8">
              <div className="relative aspect-4/5 w-24 shrink-0 overflow-hidden rounded-tile shadow-bar md:w-32">
                <Image
                  src={doctor.photo.src}
                  alt={doctor.photo.alt}
                  fill
                  sizes="128px"
                  className="object-cover object-top"
                />
              </div>
              <div className="flex min-w-0 flex-col gap-2 md:gap-3">
                <h3 id="doctor-dialog-title" className="font-display text-display-h3 leading-tight font-medium md:text-display-h2-m">
                  {doctor.name}
                </h3>
                <p className="text-body text-accent">{doctor.position}</p>
                {doctor.facts.length > 0 && <p className="text-small text-graphite">{doctor.facts.join(" · ")}</p>}
                <ul className="mt-1 flex flex-wrap gap-2">
                  {doctor.directions.map((name) => (
                    <li key={name} className="rounded-full bg-accent px-4 py-2 text-label-sm font-medium text-on-dark">
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Row 2: album of diplomas and licences. */}
            <DialogBlock title={copy.documentsTitle}>
              <ul className="no-scrollbar -mx-6 flex gap-3 overflow-x-auto px-6 md:mx-0 md:px-0">
                {doctor.documents.length > 0
                  ? doctor.documents.map((doc) => (
                      <li key={doc.src} className="relative aspect-3/4 w-20 shrink-0 overflow-hidden rounded-field bg-white md:w-24">
                        <Image src={doc.src} alt={doc.alt} fill sizes="128px" className="object-cover" />
                      </li>
                    ))
                  : [0, 1, 2, 3].map((i) => (
                      <li
                        key={i}
                        className="flex aspect-3/4 w-20 shrink-0 flex-col items-center justify-center gap-1 rounded-field border border-dashed border-line-stone bg-white/60 md:w-24"
                      >
                        <Icon name="shield-accent-20" size={20} className="opacity-40" />
                        {i === 0 && <span className="px-1 text-center text-caption text-graphite">{copy.documentsSoon}</span>}
                      </li>
                    ))}
              </ul>
            </DialogBlock>

            <div className="flex flex-col gap-6">
              <DialogBlock title={copy.focusTitle}>
                <ul className="flex flex-wrap gap-2">
                  {doctor.focus.map((item) => (
                    <li key={item} className="rounded-full border border-line-stone bg-white px-3.5 py-2 text-label-sm text-ink">
                      {item}
                    </li>
                  ))}
                </ul>
              </DialogBlock>

              <DialogBlock title={copy.servicesTitle}>
                <ul className="flex flex-col rounded-tile bg-white px-4">
                  {doctor.services.map((s) => (
                    <li key={s.id} className="flex items-baseline justify-between gap-4 border-b border-line-soft py-2.5 last:border-b-0">
                      <span className="text-small text-ink">{s.name}</span>
                      <span className="text-small font-semibold whitespace-nowrap text-ink">{s.price}</span>
                    </li>
                  ))}
                </ul>
              </DialogBlock>

              <a
                href="#booking"
                onClick={() => {
                  update({ doctorId: doctor.id });
                  close();
                }}
                className={cn(buttonClassName({ variant: "primary", className: "self-start max-sm:w-full" }))}
              >
                {copy.cta}
                <Icon name="arrow-right-on-dark" size={20} />
              </a>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}

function DialogBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-caption font-medium text-graphite uppercase">{title}</p>
      {children}
    </div>
  );
}
