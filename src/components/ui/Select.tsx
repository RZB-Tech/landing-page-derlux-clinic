"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/format";
import { Icon } from "./Icon";

export type SelectOption = { value: string; label: string; hint?: string };
export type SelectGroup = { label?: string; options: SelectOption[] };

type SelectProps = {
  value: string;
  onChange: (value: string) => void;
  groups: SelectGroup[];
  /** Accessible name when no <label htmlFor={id}> points at the trigger. */
  ariaLabel?: string;
  id?: string;
  /** Wrapper: the positioning context for the list (and the flex item). */
  className?: string;
  buttonClassName?: string;
  panelClassName?: string;
  /** Trigger content; style the chevron with `group-aria-expanded:` to flip it when open. */
  children: ReactNode;
};

/**
 * Select-only combobox (WAI-ARIA pattern) in the site's style, replacing the OS dropdown.
 * Focus stays on the trigger; ↑ ↓ Home End move, Enter / Space pick, Esc closes.
 */
export function Select({ value, onChange, groups, ariaLabel, id, className, buttonClassName, panelClassName, children }: SelectProps) {
  const autoId = useId();
  const buttonId = id ?? `${autoId}-button`;
  const listId = `${autoId}-list`;
  const optionId = (i: number) => `${autoId}-opt-${i}`;
  const options = groups.flatMap((g) => g.options);
  const selectedIndex = options.findIndex((o) => o.value === value);

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // On open, bring the whole list on screen (it can drop below the fold on phones).
  useEffect(() => {
    if (open) document.getElementById(`${autoId}-list`)?.scrollIntoView({ block: "nearest" });
  }, [open, autoId]);

  useEffect(() => {
    if (open) document.getElementById(`${autoId}-opt-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [open, active, autoId]);

  function openList() {
    setActive(Math.max(selectedIndex, 0));
    setOpen(true);
  }

  function pick(i: number) {
    const option = options[i];
    if (option) onChange(option.value);
    setOpen(false);
  }

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    const last = options.length - 1;
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        openList();
      }
      return;
    }
    const moves: Record<string, number> = {
      ArrowDown: Math.min(active + 1, last),
      ArrowUp: Math.max(active - 1, 0),
      Home: 0,
      End: last,
      PageDown: Math.min(active + 5, last),
      PageUp: Math.max(active - 5, 0),
    };
    if (e.key in moves) {
      e.preventDefault();
      setActive(moves[e.key]);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      pick(active);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  }

  // Index of each group's first option in the flat `options` list.
  const offsets = groups.map((_, g) => groups.slice(0, g).reduce((n, group) => n + group.options.length, 0));

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        id={buttonId}
        role="combobox"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? optionId(active) : undefined}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className={cn("group cursor-pointer text-left", buttonClassName)}
      >
        {children}
      </button>

      {open && (
        <div
          id={listId}
          role="listbox"
          aria-labelledby={buttonId}
          className={cn(
            "absolute top-full left-0 z-30 mt-2 max-h-80 w-full min-w-60 overflow-y-auto overscroll-contain rounded-field border border-line-soft bg-white p-1.5 shadow-float transition-[opacity,translate] duration-150 starting:-translate-y-1 starting:opacity-0",
            panelClassName,
          )}
        >
          {groups.map((group, g) => (
            <div key={group.label ?? g} role={group.label ? "group" : undefined} aria-label={group.label}>
              {group.label && (
                <p aria-hidden className="px-3.5 pt-3 pb-1.5 text-caption font-medium text-graphite uppercase">
                  {group.label}
                </p>
              )}
              {g > 0 && !group.label && <hr className="mx-3.5 my-1.5 border-line-soft" />}
              {group.options.map((option, j) => {
                const i = offsets[g] + j;
                const selected = option.value === value;
                return (
                  <div
                    key={option.value}
                    id={optionId(i)}
                    role="option"
                    aria-selected={selected}
                    onMouseEnter={() => setActive(i)}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => pick(i)}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-block px-3.5 py-2.5 transition-colors",
                      i === active && "bg-milk",
                    )}
                  >
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className={cn("text-label font-medium", selected ? "text-accent" : "text-ink")}>{option.label}</span>
                      {option.hint && <span className="text-small text-graphite">{option.hint}</span>}
                    </span>
                    {selected && <Icon name="check-accent" size={18} />}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
