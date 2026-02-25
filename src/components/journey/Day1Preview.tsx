interface Day1Data {
  day_number: number;
  title: string;
  subtitle: string | null;
  category: string;
  quote: string | null;
  quote_author: string | null;
  reflection_intro: string | null;
  journal_prompt: string | null;
}

interface Day1PreviewProps {
  day1: Day1Data;
}

export function Day1Preview({ day1 }: Day1PreviewProps) {
  return (
    <div
      className="preview-fade-bottom paper-texture relative rounded-2xl mx-4 sm:mx-auto overflow-hidden"
      style={{
        maxWidth: "560px",
        background: "white",
        border: "1px solid var(--border)",
        boxShadow: "0 2px 20px rgba(0,0,0,0.04), 0 1px 4px rgba(0,0,0,0.03)",
      }}
    >
      <div className="relative z-10 px-6 py-8 sm:px-8 sm:py-10">
        {/* Label */}
        <div
          className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] mb-4"
          style={{ color: "var(--gold)" }}
        >
          Day {day1.day_number} of 30 &middot; {day1.category}
        </div>

        {/* Title & subtitle */}
        <h3
          className="font-serif font-semibold text-[1.5rem] sm:text-[1.7rem] tracking-tight mb-1"
          style={{ color: "var(--text)", lineHeight: 1.2 }}
        >
          {day1.title}
        </h3>
        {day1.subtitle && (
          <p
            className="text-[0.92rem] italic mb-6"
            style={{ color: "var(--text-muted)" }}
          >
            {day1.subtitle}
          </p>
        )}

        {/* Gold accent rule */}
        <div
          className="mb-6"
          style={{
            width: "40px",
            height: "2px",
            background: "var(--gold)",
            opacity: 0.6,
            borderRadius: "1px",
          }}
        />

        {/* Quote */}
        {day1.quote && (
          <blockquote className="mb-6">
            <p
              className="font-serif italic text-[1.05rem] leading-relaxed"
              style={{ color: "var(--sage-dark)" }}
            >
              &ldquo;{day1.quote}&rdquo;
            </p>
            {day1.quote_author && (
              <cite
                className="block mt-1.5 text-[0.78rem] not-italic"
                style={{ color: "var(--text-muted)" }}
              >
                &mdash; {day1.quote_author}
              </cite>
            )}
          </blockquote>
        )}

        {/* Ornamental divider */}
        <div className="chapter-ornament mb-6" aria-hidden="true">
          <svg viewBox="0 0 8 8" width={6} height={6} fill="var(--border-strong)">
            <circle cx="4" cy="4" r="2.5" />
          </svg>
        </div>

        {/* Reflection intro */}
        {day1.reflection_intro && (
          <p
            className="text-[0.92rem] leading-relaxed mb-6"
            style={{ color: "var(--text)" }}
          >
            {day1.reflection_intro}
          </p>
        )}

        {/* Journal prompt */}
        {day1.journal_prompt && (
          <div
            className="journal-lined rounded-xl px-5 py-4"
            style={{
              background: "rgba(245,240,234,0.6)",
              border: "1px solid var(--border)",
            }}
          >
            <div
              className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] mb-2"
              style={{ color: "var(--gold)", opacity: 0.8 }}
            >
              Journal Prompt
            </div>
            <p
              className="font-serif italic text-[0.92rem] leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              {day1.journal_prompt}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
