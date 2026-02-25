const ROMAN = ["I", "II", "III", "IV", "V"] as const;

interface ChapterBreakProps {
  chapter: number;
  title: string;
  subtitle: string;
  epigraph: string;
  isFirst: boolean;
}

export function ChapterBreak({
  chapter,
  title,
  subtitle,
  epigraph,
  isFirst,
}: ChapterBreakProps) {
  return (
    <div
      className={`text-center ${isFirst ? "mb-10" : "mt-16 mb-10"}`}
      data-chapter-break={chapter}
    >
      {/* Decorative chapter ornament */}
      <div className="flex items-center justify-center gap-3 mb-5">
        <div
          className="flex-1 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, var(--border-strong))",
            maxWidth: "80px",
          }}
        />
        <div
          className="w-1.5 h-1.5 rounded-full rotate-45"
          style={{ background: "var(--gold)", opacity: 0.7 }}
        />
        <div
          className="flex-1 h-px"
          style={{
            background:
              "linear-gradient(to left, transparent, var(--border-strong))",
            maxWidth: "80px",
          }}
        />
      </div>

      {/* Roman numeral */}
      <div
        className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] mb-1.5"
        style={{ color: "var(--gold)" }}
      >
        {ROMAN[chapter - 1]}
      </div>

      <div
        className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] mb-1"
        style={{ color: "var(--gold)" }}
      >
        {title}
      </div>
      <div className="font-serif text-[1.2rem] font-semibold text-text mb-2">
        {subtitle}
      </div>
      <p
        className="text-[0.88rem] italic mx-auto max-w-[260px] leading-relaxed"
        style={{ color: "var(--text-muted)" }}
      >
        &ldquo;{epigraph}&rdquo;
      </p>

      {/* Bottom ornament */}
      <div className="flex items-center justify-center gap-3 mt-5">
        <div
          className="flex-1 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, var(--border))",
            maxWidth: "40px",
          }}
        />
        <div
          className="w-1 h-1 rounded-full"
          style={{ background: "var(--border-strong)" }}
        />
        <div
          className="flex-1 h-px"
          style={{
            background:
              "linear-gradient(to left, transparent, var(--border))",
            maxWidth: "40px",
          }}
        />
      </div>
    </div>
  );
}
