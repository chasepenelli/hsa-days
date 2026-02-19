/* ── Share Card Constants & Types ─────────────────────── */

export const CARD_SIZES = {
  instagram: { width: 1080, height: 1080, label: "Instagram" },
  twitter: { width: 1200, height: 630, label: "Twitter / OG" },
} as const;

export type CardSize = keyof typeof CARD_SIZES;

export type CardTemplate = "daily" | "milestone" | "quote" | "memory";

export const CARD_COLORS = {
  warmWhite: "#FAF8F5",
  cream: "#F5F0EA",
  creamDeep: "#EDE8E0",
  sage: "#5B7B5E",
  sageLight: "#7A9A7D",
  sageDark: "#3E5740",
  gold: "#C4A265",
  goldLight: "#D4B87A",
  text: "#2D2D2D",
  textMuted: "#6B6B6B",
  border: "#E8E4DF",
  borderStrong: "#D8D2CA",
  white: "#FFFFFF",
} as const;

export const CARD_FONTS = {
  serif: "'Lora', Georgia, serif",
  sans: "'Inter', -apple-system, sans-serif",
} as const;

/** Milestone days that get a special card template */
export const MILESTONE_DAYS = [7, 14, 21, 30] as const;

export function getMilestoneMessage(day: number): string | null {
  switch (day) {
    case 7:
      return "One week. You\u2019re doing this.";
    case 14:
      return "Two weeks of showing up. That takes real strength.";
    case 21:
      return "Three weeks. Your dog is lucky to have you.";
    case 30:
      return "You made it. Thirty days of love, presence, and courage.";
    default:
      return null;
  }
}

export function isMilestoneDay(day: number): boolean {
  return (MILESTONE_DAYS as readonly number[]).includes(day);
}

/** Paper texture as inline SVG data URI */
export const PAPER_TEXTURE_URI =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E";

export interface ShareCardData {
  dayNumber: number;
  title: string;
  category: string;
  quote: string;
  quoteAuthor: string;
  dogName?: string;
  journalExcerpt?: string;
  photoUrl?: string;
}
