/** Shared day/chapter utilities for the 30-day journal */

export function getWeek(dayNumber: number): number {
  if (dayNumber <= 7) return 1;
  if (dayNumber <= 14) return 2;
  if (dayNumber <= 21) return 3;
  if (dayNumber <= 25) return 4;
  return 5;
}

/** Days that end a chapter — completing these triggers a chapter transition note */
const CHAPTER_END_DAYS = [7, 14, 21, 25];

export function isChapterEnd(dayNumber: number): boolean {
  return CHAPTER_END_DAYS.includes(dayNumber);
}
