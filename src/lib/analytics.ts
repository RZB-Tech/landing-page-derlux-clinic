/**
 * Google Analytics 4 and Yandex Metrika. IDs are set in Vercel (NEXT_PUBLIC_GA_ID «G-XXXXXXX»,
 * NEXT_PUBLIC_YM_ID — the counter number); a missing or malformed ID turns that counter off.
 */
const gaId = process.env.NEXT_PUBLIC_GA_ID;
const ymId = process.env.NEXT_PUBLIC_YM_ID;

export const analyticsIds = {
  ga: gaId && /^G-[A-Z0-9]+$/.test(gaId) ? gaId : null,
  ym: ymId && /^\d+$/.test(ymId) ? Number(ymId) : null,
};

/** Conversions. Create goals with the same names in Metrika (type «JavaScript event»). */
export type Goal = "booking_submit" | "phone_click" | "telegram_click" | "route_click";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    ym?: (...args: unknown[]) => void;
  }
}

export function trackGoal(goal: Goal) {
  if (analyticsIds.ga) window.gtag?.("event", goal);
  if (analyticsIds.ym) window.ym?.(analyticsIds.ym, "reachGoal", goal);
}
