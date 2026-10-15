/**
 * Brand colours for places CSS tokens cannot reach: viewport theme colour, the web manifest and
 * generated images (Open Graph, apple-icon). Keep in sync with `@theme` in `src/app/globals.css`.
 */
export const brandColors = {
  white: "#ffffff",
  milk: "#f6f2ec", // bg/milk
  sand: "#ece4d8", // bg/sand
  ink: "#1c1b19", // text/ink
  graphite: "#5f5a53", // text/graphite
  onDark: "#f6f2ec", // text/on-dark
  accent: "#1e4a42", // brand/accent
  logoTeal: "#0e4854", // logo-teal
  logoGold: "#dbb086", // logo-gold
} as const;
