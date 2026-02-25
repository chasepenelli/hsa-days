"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatedDayCard } from "./AnimatedDayCard";
import { ChapterBreak } from "./ChapterBreak";
import { JourneyLine } from "./JourneyLine";
import { getWeek } from "@/lib/day-utils";

interface DayContent {
  day_number: number;
  title: string;
  subtitle: string;
  category: string;
  quote: string;
  quote_author: string;
}

interface DayProgress {
  day_number: number;
  started_at: string;
  completed_at: string | null;
}

const MILESTONES: Record<number, string> = {
  7: "One week. You\u2019re doing this.",
  14: "Two weeks of showing up. That takes real strength.",
  21: "Three weeks. Your dog is lucky to have you.",
  30: "You made it. Thirty days of love, presence, and courage.",
};

const WEEK_CONFIG: Record<
  number,
  { title: string; subtitle: string; epigraph: string }
> = {
  1: {
    title: "Chapter One",
    subtitle: "The Beginning",
    epigraph: "You start with survival.",
  },
  2: {
    title: "Chapter Two",
    subtitle: "Finding Structure",
    epigraph: "Structure becomes your anchor.",
  },
  3: {
    title: "Chapter Three",
    subtitle: "The Deep Middle",
    epigraph: "The hardest part is also the deepest.",
  },
  4: {
    title: "Chapter Four",
    subtitle: "Coming Home",
    epigraph: "You begin to see what this has taught you.",
  },
  5: {
    title: "The Final Days",
    subtitle: "What Remains",
    epigraph: "Love doesn\u2019t end. It transforms.",
  },
};

const CATEGORY_COLORS: Record<string, string> = {
  Reflection: "bg-sage/10 text-sage-dark",
  Understanding: "bg-gold/10 text-[#8B6B3A]",
  Activity: "bg-terracotta/10 text-terracotta",
  Practical: "bg-sage-dark/10 text-sage-dark",
  Connection: "bg-gold-light/10 text-[#8B6B3A]",
};

/** Map chapter number to left-accent color for completed cards */
const CHAPTER_ACCENT: Record<number, string> = {
  1: "#D4856A",   // terracotta
  2: "#C4A265",   // gold
  3: "#7A9A7D",   // sage-light
  4: "#5B7B5E",   // sage
  5: "#3E5740",   // sage-dark
};

/** Milestone paw-print days */
const PAW_MILESTONES = [7, 14, 21];
const PAW_DELAYS = ["0s", "4s", "9s"];

interface DaysTimelineClientProps {
  days: DayContent[];
  progressMap: Record<number, DayProgress>;
  journalMap: Record<number, string>;
  completedCount: number;
  currentDay: number;
}

export function DaysTimelineClient({
  days,
  progressMap,
  journalMap,
  completedCount,
  currentDay,
}: DaysTimelineClientProps) {
  let lastWeek = 0;

  return (
    <div className="max-w-[600px] mx-auto px-5">
      <div className="relative paper-texture journey-timeline ml-3 pl-12">
        {/* Journey line overlay */}
        <JourneyLine completedCount={completedCount} totalDays={30} />

        {/* Floating paw prints at milestone positions */}
        {PAW_MILESTONES.map((milestoneDay, idx) => (
          <div
            key={milestoneDay}
            className="journey-paw-milestone"
            style={{
              animationDelay: PAW_DELAYS[idx],
            }}
            aria-hidden="true"
          >
            <Image
              src="/illustrations/icons/icon-paw-print.png"
              alt=""
              width={14}
              height={14}
              className="grayscale"
              style={{ opacity: 0.055 }}
            />
          </div>
        ))}

        {days.map((day) => {
          const dayProgress = progressMap[day.day_number];
          const isCompleted = !!dayProgress?.completed_at;
          const isStarted = !!dayProgress?.started_at;
          const isCurrent = day.day_number === currentDay;
          const isFuture = day.day_number > currentDay;
          const isMilestone = day.day_number in MILESTONES;
          const week = getWeek(day.day_number);
          const showWeekDivider = week !== lastWeek;
          lastWeek = week;

          const weekInfo = showWeekDivider ? WEEK_CONFIG[week] : null;
          const journalSnippet = journalMap[day.day_number];
          const categoryColor =
            CATEGORY_COLORS[day.category] || "bg-sage/10 text-sage-dark";
          const chapterAccent = CHAPTER_ACCENT[week] || "#5B7B5E";

          // Week-local index for stagger delay
          const weekStart =
            week === 1
              ? 1
              : week === 2
                ? 8
                : week === 3
                  ? 15
                  : week === 4
                    ? 22
                    : 26;
          const weekLocalIdx = day.day_number - weekStart;

          // Determine thread dot style
          const dotSize = isCompleted
            ? isMilestone
              ? 20
              : 16
            : isCurrent
              ? 22
              : 12;

          // Future opacity: cards 10+ days ahead are dimmer
          const futureOpacity =
            isFuture && day.day_number > currentDay + 10 ? 0.35 : 0.55;

          return (
            <div
              key={day.day_number}
              data-chapter={week}
            >
              {/* Chapter break */}
              {weekInfo && (
                <>
                  {/* Chapter diamond on the line */}
                  <div
                    className="journey-chapter-diamond"
                    style={{
                      "--diamond-color": CHAPTER_ACCENT[week],
                    } as React.CSSProperties}
                    aria-hidden="true"
                  />
                  <ChapterBreak
                    chapter={week}
                    title={weekInfo.title}
                    subtitle={weekInfo.subtitle}
                    epigraph={weekInfo.epigraph}
                    isFirst={day.day_number === 1}
                  />
                </>
              )}

              {/* Day entry */}
              <AnimatedDayCard delay={weekLocalIdx * 55}>
                <div
                  className="day-card-wrapper relative pb-4"
                  id={isCurrent ? "current-day" : undefined}
                >
                  {/* Thread dot */}
                  <div
                    className={`journey-thread-dot ${
                      isCurrent ? "journey-thread-dot--current" : ""
                    }`}
                    style={{
                      width: `${dotSize}px`,
                      height: `${dotSize}px`,
                      marginLeft: `-${dotSize / 2 + 1}px`,
                      background: isCompleted
                        ? isMilestone
                          ? "var(--gold)"
                          : chapterAccent
                        : isCurrent
                          ? "white"
                          : "var(--cream)",
                      border: isCompleted
                        ? "none"
                        : isCurrent
                          ? "2px solid var(--sage)"
                          : "1.5px solid var(--border-strong)",
                    }}
                  >
                    {isCompleted && (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth={3}
                        className="w-2.5 h-2.5"
                      >
                        <path d="M5 12l5 5L19 7" />
                      </svg>
                    )}
                    {isCurrent && (
                      <div
                        className="w-[7px] h-[7px] rounded-full"
                        style={{ background: "var(--sage)" }}
                      />
                    )}
                  </div>

                  {/* Card content */}
                  {isCurrent ? (
                    /* Current day card */
                    <Link
                      href={`/days/${day.day_number}`}
                      className="block no-underline"
                    >
                      <div
                        className="card-shimmer rounded-2xl p-6 transition-all duration-300 hover:-translate-y-[2px] journey-current-card"
                        style={{
                          background: "white",
                          border: "2px solid rgba(91,123,94,0.22)",
                          boxShadow:
                            "0 4px 28px rgba(91,123,94,0.10), 0 1px 4px rgba(0,0,0,0.04), 0 0 0 1px rgba(91,123,94,0.06)",
                        }}
                      >
                        <div className="flex items-center gap-2 mb-4">
                          <span
                            className={`text-[0.62rem] font-semibold uppercase tracking-[0.1em] px-2 py-0.5 rounded-full ${categoryColor}`}
                          >
                            {day.category}
                          </span>
                          <span
                            className="text-[0.62rem] font-medium"
                            style={{
                              color: "var(--text-muted)",
                              opacity: 0.5,
                            }}
                          >
                            Day {day.day_number}
                          </span>
                        </div>

                        <h3 className="font-serif text-[1.15rem] font-semibold text-text mb-1.5 leading-snug">
                          {day.title}
                        </h3>
                        <p
                          className="text-[0.9rem] leading-relaxed mb-3"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {day.subtitle}
                        </p>

                        {day.quote && (
                          <p
                            className="font-serif text-[0.82rem] italic line-clamp-1 mb-5"
                            style={{
                              color: "var(--text-muted)",
                              opacity: 0.65,
                            }}
                          >
                            &ldquo;{day.quote}&rdquo;
                          </p>
                        )}

                        <span
                          className="inline-flex items-center gap-2 px-5 py-2.5 text-white text-[0.85rem] font-semibold rounded-xl transition-all"
                          style={{ background: "var(--sage)" }}
                        >
                          {isStarted
                            ? `Continue Day ${day.day_number}`
                            : `Begin Day ${day.day_number}`}
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2.5}
                            className="w-4 h-4"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </Link>
                  ) : isCompleted ? (
                    /* Completed day card */
                    <Link
                      href={`/days/${day.day_number}`}
                      className="group block no-underline"
                    >
                      <div
                        className="rounded-xl px-5 py-4 transition-all duration-250 group-hover:-translate-y-[1px]"
                        style={{
                          background: "white",
                          border: "1px solid var(--border)",
                          borderLeftWidth: "3px",
                          borderLeftColor: isMilestone
                            ? "var(--gold)"
                            : chapterAccent,
                          boxShadow: "0 1px 6px rgba(0,0,0,0.03)",
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span
                                className={`text-[0.6rem] font-semibold uppercase tracking-[0.08em] px-1.5 py-0.5 rounded-full ${categoryColor}`}
                              >
                                {day.category}
                              </span>
                              <span
                                className="text-[0.6rem] font-medium"
                                style={{
                                  color: "var(--text-muted)",
                                  opacity: 0.4,
                                }}
                              >
                                Day {day.day_number}
                              </span>
                            </div>

                            <h3 className="font-serif text-[0.98rem] font-semibold text-text transition-colors group-hover:text-sage">
                              {day.title}
                            </h3>

                            {day.quote && !journalSnippet && (
                              <p
                                className="font-serif text-[0.76rem] italic line-clamp-1 mt-1"
                                style={{
                                  color: "var(--text-muted)",
                                  opacity: 0.55,
                                }}
                              >
                                &ldquo;{day.quote}&rdquo;
                              </p>
                            )}

                            {journalSnippet && (
                              <div
                                className="mt-2 pt-2"
                                style={{
                                  borderTop: "1px solid var(--border)",
                                }}
                              >
                                <p
                                  className="font-serif text-[0.78rem] italic line-clamp-2 leading-relaxed"
                                  style={{
                                    color: "var(--text-muted)",
                                    opacity: 0.8,
                                  }}
                                >
                                  {journalSnippet}
                                </p>
                              </div>
                            )}
                          </div>

                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                            style={{
                              background: "rgba(91,123,94,0.1)",
                            }}
                          >
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2.5}
                              className="w-3 h-3 text-sage"
                            >
                              <path d="M5 12l5 5L19 7" />
                            </svg>
                          </div>
                        </div>

                        {isMilestone && (
                          <div
                            className="mt-3 pt-3 flex items-center gap-2 text-[0.78rem] italic"
                            style={{
                              color: "var(--gold)",
                              borderTop:
                                "1px solid rgba(196,162,101,0.2)",
                            }}
                          >
                            <svg
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-3 h-3 shrink-0"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                            {MILESTONES[day.day_number]}
                          </div>
                        )}
                      </div>
                    </Link>
                  ) : (
                    /* Future day card */
                    <Link
                      href={`/days/${day.day_number}`}
                      className="group block no-underline"
                    >
                      <div
                        className="rounded-xl px-5 py-3.5 transition-all duration-250 group-hover:opacity-75!"
                        style={{
                          background: "rgba(245,240,234,0.5)",
                          border: "1px dashed var(--border)",
                          opacity: futureOpacity,
                        }}
                      >
                        <div className="flex items-center gap-2 mb-0.5">
                          <span
                            className={`text-[0.58rem] font-semibold uppercase tracking-[0.08em] px-1.5 py-0.5 rounded-full opacity-70 ${categoryColor}`}
                          >
                            {day.category}
                          </span>
                          <span
                            className="text-[0.58rem]"
                            style={{
                              color: "var(--text-muted)",
                              opacity: 0.35,
                            }}
                          >
                            Day {day.day_number}
                          </span>
                        </div>
                        <h3
                          className="font-serif text-[0.95rem] leading-snug"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {day.title}
                        </h3>
                      </div>
                    </Link>
                  )}
                </div>
              </AnimatedDayCard>
            </div>
          );
        })}
      </div>

      {/* End of journal mark */}
      <div className="text-center mt-12 mb-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div
            className="h-px flex-1"
            style={{ background: "var(--border)", maxWidth: "60px" }}
          />
          <div
            className="w-1 h-1 rounded-full"
            style={{ background: "var(--border-strong)" }}
          />
          <div
            className="h-px flex-1"
            style={{ background: "var(--border)", maxWidth: "60px" }}
          />
        </div>
        <p
          className="text-[0.8rem] italic"
          style={{ color: "var(--text-muted)", opacity: 0.5 }}
        >
          {completedCount === 30
            ? "The end of this chapter. Not the end of the story."
            : "Your story continues, one day at a time."}
        </p>
      </div>
    </div>
  );
}
