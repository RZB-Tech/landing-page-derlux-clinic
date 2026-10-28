"use client";

import { useRef, useState } from "react";
import type { Condition } from "@/data/types";
import { useBooking } from "@/components/booking/BookingProvider";
import { buttonClassName, ButtonContent } from "@/components/ui/Button";
import { cn } from "@/lib/format";
import { Icon } from "@/components/ui/Icon";

export type ConditionCopy = {
  more: string;
  causes: string;
  symptoms: string;
  diagnostics: string;
  treatment: string;
  risks: string;
  note: string;
  cta: string;
  close: string;
};

type ConditionListProps = {
  directionId: string;
  conditions: Condition[];
  copy: ConditionCopy;
};

/** «С чем обращаются»: each condition opens a centered dialog with signs, treatment and risks. */
export function ConditionList({
  directionId,
  conditions,
  copy,
}: ConditionListProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const { update } = useBooking();
  const condition = conditions.find((c) => c.id === openId);

  const open = (id: string) => {
    setOpenId(id);
    // The dialog's content renders with the state; show it on the next frame.
    requestAnimationFrame(() => dialogRef.current?.showModal());
  };
  const close = () => dialogRef.current?.close();

  return (
    <>
      <ul className="grid grid-cols-1 gap-x-8 gap-y-1 md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
        {conditions.map((c) => (
          <li key={c.id}>
            <button
              type="button"
              onClick={() => open(c.id)}
              aria-haspopup="dialog"
              className="group flex w-full cursor-pointer items-start gap-3 rounded-tile py-2 text-left text-body text-ink transition-colors hover:text-accent"
            >
              <Icon name="check-accent" size={20} className="mt-0.5 shrink-0" />
              <span className="min-w-0">{c.name}</span>
              <span className="sr-only">{copy.more}</span>
              <Icon
                name="info-accent"
                size={18}
                className="mt-1 shrink-0 opacity-60 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-labelledby="condition-dialog-title"
        onClose={() => setOpenId(null)}
        onClick={(e) => e.target === dialogRef.current && close()}
        className="dialog-in m-auto max-h-[92dvh] w-[min(56rem,calc(100%-1.5rem))] overflow-hidden rounded-[32px] bg-milk p-0 text-ink backdrop:bg-ink/60 backdrop:backdrop-blur-sm"
      >
        {condition && (
          <div className="relative flex max-h-[92dvh] flex-col gap-6 overflow-y-auto p-6 md:p-10">
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

            <h3
              id="condition-dialog-title"
              className="pr-12 font-display text-display-h3 leading-tight font-medium md:text-display-h2-m"
            >
              {condition.name}
            </h3>
            <p className="text-small leading-relaxed text-graphite">
              {condition.about}
            </p>

            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
              <Block title={copy.causes} items={condition.causes} />
              <Block title={copy.symptoms} items={condition.symptoms} />
              <Block title={copy.diagnostics} items={condition.diagnostics} />
              <Block title={copy.treatment} items={condition.treatment} />
              <Block title={copy.risks} items={condition.risks} wide />
            </div>

            <p className="text-caption text-graphite">{copy.note}</p>
            <a
              href="#booking"
              onClick={() => {
                update({ directionId });
                close();
              }}
              className={buttonClassName({
                variant: "primary",
                className: "self-start",
              })}
            >
              <ButtonContent variant="primary" arrow>
                {copy.cta}
              </ButtonContent>
            </a>
          </div>
        )}
      </dialog>
    </>
  );
}

function Block({
  title,
  items,
  wide,
}: {
  title: string;
  items: string[];
  wide?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2.5 rounded-card bg-white p-4 md:p-5",
        wide && "md:col-span-2",
      )}
    >
      <p className="text-caption font-medium text-graphite uppercase">
        {title}
      </p>
      <ul className="flex flex-col gap-1.5">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2.5 text-small leading-snug text-ink"
          >
            <Icon name="check-accent" size={16} className="mt-0.5 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
