const CATEGORY_COLORS: Record<
  string,
  { bg: string; text: string }
> = {
  Reflection:   { bg: "rgba(91,123,94,0.09)",   text: "var(--sage-dark)" },
  Understanding:{ bg: "rgba(196,162,101,0.10)",  text: "#8B6B3A" },
  Activity:     { bg: "rgba(212,133,106,0.10)",  text: "var(--terracotta)" },
  Practical:    { bg: "rgba(62,87,64,0.09)",     text: "var(--sage-dark)" },
  Connection:   { bg: "rgba(212,188,122,0.12)",  text: "#8B6B3A" },
};

const MILESTONES: Record<number, string> = {
  7: "One week. You\u2019re doing this.",
  14: "Two weeks of showing up. That takes real strength.",
  21: "Three weeks. Your dog is lucky to have you.",
  30: "You made it. Thirty days of love, presence, and courage.",
};

interface DayPreviewCardProps {
  dayNumber: number;
  title: string;
  subtitle: string;
  category: string;
  quote: string | null;
  quoteAuthor: string | null;
  phaseColor?: string;
  phaseDotColor?: string;
  phaseBgColor?: string;
  phaseBorderColor?: string;
}

export function DayPreviewCard({
  dayNumber,
  title,
  subtitle,
  category,
  quote,
  quoteAuthor,
  phaseColor,
  phaseDotColor,
  phaseBgColor = "rgba(91,123,94,0.05)",
  phaseBorderColor = "rgba(91,123,94,0.2)",
}: DayPreviewCardProps) {
  const categoryStyle =
    CATEGORY_COLORS[category] ?? { bg: "rgba(91,123,94,0.09)", text: "var(--sage-dark)" };
  const milestone = MILESTONES[dayNumber];
  const dotColor = phaseDotColor ?? "var(--sage)";
  const accentColor = phaseColor ?? "var(--sage)";

  return (
    <div>
      <div
        className="group rounded-[14px] px-5 py-4 transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_6px_20px_rgba(0,0,0,0.06)]"
        style={{
          background: "rgba(255,255,255,0.85)",
          border: "1px solid var(--border)",
          backdropFilter: "blur(4px)",
        }}
      >
        <div className="flex items-start gap-4">
          {/* Day number badge — phase-colored */}
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-serif text-[0.82rem] font-semibold transition-transform duration-200 group-hover:scale-105"
            style={{
              background: phaseBgColor,
              color: accentColor,
              border: `1px solid ${phaseBorderColor}`,
            }}
          >
            {dayNumber}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 pt-[1px]">
            {/* Category pill */}
            <div className="flex items-center gap-2 mb-1.5">
              <span
                className="text-[0.6rem] font-semibold uppercase tracking-[0.08em] px-2 py-0.5 rounded-full"
                style={{
                  background: categoryStyle.bg,
                  color: categoryStyle.text,
                }}
              >
                {category}
              </span>
            </div>

            <h4
              className="font-serif text-[0.96rem] font-semibold leading-snug mb-1"
              style={{ color: "var(--text)" }}
            >
              {title}
            </h4>
            <p
              className="text-[0.82rem] leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              {subtitle}
            </p>

            {/* Quote — shown only if not null, subtly styled */}
            {quote && (
              <p
                className="font-serif text-[0.77rem] italic line-clamp-1 mt-2 pl-2"
                style={{
                  color: "var(--text-muted)",
                  opacity: 0.55,
                  borderLeft: `2px solid ${dotColor}`,
                }}
              >
                &ldquo;{quote}&rdquo;
                {quoteAuthor && (
                  <span className="not-italic opacity-70">
                    {" "}&mdash; {quoteAuthor}
                  </span>
                )}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Milestone callout */}
      {milestone && (
        <div
          className="mt-2 mx-2 rounded-[10px] px-4 py-3 flex items-center gap-2.5"
          style={{
            background:
              "linear-gradient(135deg, rgba(196,162,101,0.08) 0%, rgba(196,162,101,0.04) 100%)",
            border: "1px solid rgba(196,162,101,0.2)",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            width={13}
            height={13}
            className="shrink-0"
            style={{ color: "var(--gold)" }}
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <p
            className="font-serif text-[0.82rem] italic"
            style={{ color: "var(--gold)" }}
          >
            {milestone}
          </p>
        </div>
      )}
    </div>
  );
}
