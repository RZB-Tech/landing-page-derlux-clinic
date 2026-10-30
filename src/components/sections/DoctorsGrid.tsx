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
  /** The doctor's own page: the card links there, a plain click opens the dialog instead. */
  href: string;
  name: string;
  position: string;
  photo: ImageData;
  /** «Стаж 12 лет», «Высшая категория» — only what the clinic has given. */
  facts: string[];
  /** Several allowed: «Дерматолог», «Специалист по лазерной дерматологии». */
  specializations: string[];
  /** One line per stage of training. */
  education: string[];
  focus: string[];
  documents: ImageData[];
  directions: string[];
};

type DoctorsGridProps = {
  doctors: DoctorView[];
  copy: {
    cta: string;
    details: string;
    close: string;
    specializationTitle: string;
    educationTitle: string;
    focusTitle: string;
    directionsTitle: string;
    documentsTitle: string;
    documentsSoon: string;
    previous: string;
    next: string;
  };
};

/**
 * Doctor cards; a click opens a native modal <dialog> with the details (Esc and backdrop close it). Each card
 * is a link to the doctor's page, so search engines reach it and Ctrl/middle click opens it in a tab.
 */
export function DoctorsGrid({ doctors, copy }: DoctorsGridProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previewRef = useRef<HTMLDialogElement>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const { update } = useBooking();
  const doctor = doctors.find((d) => d.id === openId);
  const documents = doctor?.documents ?? [];
  const previewDoc = previewIndex === null ? undefined : documents[previewIndex];

  // A second modal on top of the doctor's dialog: a scan at full size, with arrows between the scans.
  const openPreview = (index: number) => {
    setPreviewIndex(index);
    requestAnimationFrame(() => {
      if (!previewRef.current?.open) previewRef.current?.showModal();
    });
  };
  const step = (delta: number) =>
    setPreviewIndex((i) => (i === null ? i : (i + delta + documents.length) % documents.length));

  const open = (id: string) => {
    setOpenId(id);
    // The dialog's content renders with the state; show it on the next frame.
    requestAnimationFrame(() => dialogRef.current?.showModal());
  };
  const close = () => dialogRef.current?.close();

  return (
    <>
      <ul className="snap-row md:mx-0 md:gap-6 md:px-0 md:scroll-px-0">
        {doctors.map((d, i) => (
          <Reveal as="li" key={d.id} delay={i * 120} className="w-64 md:w-[calc((100%-4.5rem)/4)] md:min-w-56">
            <a
              href={d.href}
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                e.preventDefault();
                open(d.id);
              }}
              aria-haspopup="dialog"
              className="group relative block aspect-3/4 w-full overflow-hidden rounded-[36px] bg-sand text-left text-on-dark"
            >
              <Image
                src={d.photo.src}
                alt={d.photo.alt}
                fill
                sizes="(min-width: 1440px) 300px, (min-width: 768px) 25vw, 256px"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <span aria-hidden className="absolute inset-0 bg-linear-to-t from-ink/85 via-ink/10 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-3 p-5">
                <span className="flex min-w-0 flex-col gap-1">
                  <span className="font-display text-display-h3 leading-tight">{d.name}</span>
                  <span className="text-small opacity-85">{d.position}</span>
                </span>
                <span className="flex shrink-0 items-center gap-2 rounded-full bg-milk py-2.5 pr-3 pl-4 text-label-sm font-medium text-ink transition-all duration-300 group-hover:bg-white group-hover:pr-4">
                  {copy.details}
                  <Icon name="arrow-right-ink" size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </span>
            </a>
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

            {(doctor.specializations.length > 0 || doctor.education.length > 0) && (
              <div className="grid gap-6 md:grid-cols-2">
                {doctor.specializations.length > 0 && (
                  <DialogBlock title={copy.specializationTitle}>
                    <ul className="flex flex-col gap-1.5 text-body text-ink">
                      {doctor.specializations.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </DialogBlock>
                )}
                {doctor.education.length > 0 && (
                  <DialogBlock title={copy.educationTitle}>
                    <ul className="flex flex-col gap-1.5 text-body text-ink">
                      {doctor.education.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </DialogBlock>
                )}
              </div>
            )}

            {/* Row 2: album of diplomas and licences. */}
            <DialogBlock title={copy.documentsTitle}>
              <ul className="no-scrollbar -mx-6 flex gap-3 overflow-x-auto px-6 md:mx-0 md:px-0">
                {doctor.documents.length > 0
                  ? doctor.documents.map((doc, i) => (
                      <li key={doc.src} className="shrink-0">
                        <button
                          type="button"
                          onClick={() => openPreview(i)}
                          aria-haspopup="dialog"
                          className="group relative block aspect-3/4 w-20 cursor-zoom-in overflow-hidden rounded-field bg-white md:w-24"
                        >
                          <Image
                            src={doc.src}
                            alt={doc.alt}
                            fill
                            sizes="128px"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </button>
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

      <dialog
        ref={previewRef}
        aria-label={copy.documentsTitle}
        onClose={() => setPreviewIndex(null)}
        onClick={(e) => e.target === previewRef.current && previewRef.current?.close()}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") step(-1);
          if (e.key === "ArrowRight") step(1);
        }}
        className="dialog-in m-auto max-h-dvh w-full max-w-none bg-transparent p-0 text-on-dark backdrop:bg-ink/85 backdrop:backdrop-blur-sm"
      >
        {previewDoc && (
          <div className="relative flex h-dvh items-center justify-center p-4 md:p-10">
            <Image
              src={previewDoc.src}
              alt={previewDoc.alt}
              width={previewDoc.width}
              height={previewDoc.height}
              sizes="(min-width: 1024px) 70vw, 100vw"
              className="h-auto max-h-full w-auto max-w-full rounded-field bg-white object-contain shadow-float"
            />
            <button
              type="button"
              onClick={() => previewRef.current?.close()}
              aria-label={copy.close}
              className="absolute top-4 right-4 flex size-11 items-center justify-center rounded-full bg-white text-ink shadow-bar transition-transform duration-200 hover:rotate-90 md:top-6 md:right-6"
            >
              <span aria-hidden className="text-2xl leading-none">
                ×
              </span>
            </button>
            {documents.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label={copy.previous}
                  className="absolute top-1/2 left-3 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-bar md:left-6"
                >
                  <span aria-hidden className="text-2xl leading-none">
                    ‹
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label={copy.next}
                  className="absolute top-1/2 right-3 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-bar md:right-6"
                >
                  <span aria-hidden className="text-2xl leading-none">
                    ›
                  </span>
                </button>
                <p className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-ink/70 px-4 py-1.5 text-label-sm md:bottom-6">
                  {(previewIndex ?? 0) + 1} / {documents.length}
                </p>
              </>
            )}
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
