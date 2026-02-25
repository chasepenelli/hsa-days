export interface Phase {
  name: string;
  days: [number, number];
  accent: string;
  quoteBorder: string;
  closure: string;
}

const PHASES: Phase[] = [
  {
    name: "Stillness",
    days: [1, 7],
    accent: "#5B7B5E",
    quoteBorder: "#5B7B5E",
    closure: "There\u2019s no rush.",
  },
  {
    name: "Grounding",
    days: [8, 14],
    accent: "#5B7B5E",
    quoteBorder: "#5B7B5E",
    closure: "One day at a time.",
  },
  {
    name: "Deepening",
    days: [15, 25],
    accent: "#C4A265",
    quoteBorder: "#C4A265",
    closure: "You\u2019re further than you think.",
  },
  {
    name: "Integration",
    days: [26, 30],
    accent: "#D4856A",
    quoteBorder: "#D4856A",
    closure: "What a journey this has been.",
  },
];

export function getPhase(day: number): Phase {
  for (const phase of PHASES) {
    if (day >= phase.days[0] && day <= phase.days[1]) return phase;
  }
  return PHASES[0];
}

export interface Chapter {
  number: number;
  label: string;
  days: [number, number];
  dotColor: string;
}

const CHAPTERS: Chapter[] = [
  { number: 1, label: "Chapter One", days: [1, 7], dotColor: "#5B7B5E" },
  { number: 2, label: "Finding Structure", days: [8, 14], dotColor: "#5B7B5E" },
  { number: 3, label: "The Deep Middle", days: [15, 21], dotColor: "#C4A265" },
  { number: 4, label: "Coming Home", days: [22, 25], dotColor: "#C4A265" },
  { number: 5, label: "What Remains", days: [26, 30], dotColor: "#D4856A" },
];

export function getChapter(day: number): Chapter {
  for (const ch of CHAPTERS) {
    if (day >= ch.days[0] && day <= ch.days[1]) return ch;
  }
  return CHAPTERS[0];
}

export function getCompletedChapters(day: number): number {
  let count = 0;
  for (const ch of CHAPTERS) {
    if (day > ch.days[1]) count++;
    else if (day >= ch.days[0]) count++;
  }
  return count;
}

export { CHAPTERS };
