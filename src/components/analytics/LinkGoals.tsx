"use client";

import { useEffect } from "react";
import { trackGoal } from "@/lib/analytics";

type LinkGoalsProps = { telegramUrl: string; routeUrl: string };

/** Reports clicks on phone, Telegram and route links anywhere on the page (one delegated listener). */
export function LinkGoals({ telegramUrl, routeUrl }: LinkGoalsProps) {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const href = (e.target as Element | null)?.closest("a")?.getAttribute("href");
      if (!href) return;
      if (href.startsWith("tel:")) trackGoal("phone_click");
      else if (href === telegramUrl) trackGoal("telegram_click");
      else if (href === routeUrl) trackGoal("route_click");
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [telegramUrl, routeUrl]);

  return null;
}
