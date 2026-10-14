"use client";

import { useState, type ReactNode } from "react";

type YandexMapProps = {
  src: string;
  title: string;
  activateLabel: string;
  /** Drawn under the iframe; visible until the map paints. */
  placeholder: ReactNode;
};

/**
 * Yandex map widget. A transparent cover keeps page scrolling (wheel, touch swipe) from being
 * captured by the map until the visitor clicks it; leaving the map with the mouse restores the cover.
 */
export function YandexMap({ src, title, activateLabel, placeholder }: YandexMapProps) {
  const [active, setActive] = useState(false);

  return (
    <div
      onMouseLeave={() => setActive(false)}
      className="relative h-90 overflow-hidden rounded-card bg-map-street md:h-110 xl:h-auto xl:min-h-154.5 xl:flex-1"
    >
      {placeholder}
      <iframe src={src} title={title} loading="lazy" allowFullScreen className="absolute inset-0 size-full border-0" />
      {!active && (
        <button
          type="button"
          aria-label={activateLabel}
          onClick={() => setActive(true)}
          className="absolute inset-0 cursor-pointer"
        />
      )}
    </div>
  );
}
