"use client";

import { useEffect, useState, type ReactNode } from "react";

type IntroSplashShellProps = {
  durationMs: number;
  /** sessionStorage key the inline script in `IntroSplash` checks. */
  seenKey: string;
  children: ReactNode;
};

/**
 * The splash's overlay. CSS hides it after `durationMs` (`intro-splash` in globals.css), so it goes
 * away even without JS; here a click or Esc skips it, and it is removed once its fade ends.
 */
export function IntroSplashShell({ durationMs, seenKey, children }: IntroSplashShellProps) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    try {
      sessionStorage.setItem(seenKey, "1");
    } catch {
      // Storage blocked: the splash shows again on the next visit, nothing else breaks.
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDone(true);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [seenKey]);

  if (done) return null;
  return (
    <div
      aria-hidden
      className="intro-splash fixed inset-0 z-50 cursor-pointer bg-ink"
      style={{ animationDelay: `${durationMs}ms` }}
      onClick={() => setDone(true)}
      // Only the overlay's own fade: the loader's animationend bubbles up here too.
      onAnimationEnd={(e) => e.target === e.currentTarget && setDone(true)}
    >
      {children}
    </div>
  );
}
