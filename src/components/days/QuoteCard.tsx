interface QuoteCardProps {
  quote: string;
  author: string;
}

export function QuoteCard({ quote, author }: QuoteCardProps) {
  return (
    <div
      className="relative rounded-2xl px-8 py-7 text-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, var(--cream) 0%, rgba(245,240,234,0.6) 100%)",
        border: "1px solid var(--border)",
        borderLeft: "3px solid var(--gold)",
      }}
    >
      {/* Opening quote mark — decorative */}
      <div
        className="absolute top-3 left-5 font-serif text-[3.5rem] leading-none select-none pointer-events-none"
        style={{ color: "var(--gold)", opacity: 0.15, fontStyle: "normal" }}
        aria-hidden="true"
      >
        &ldquo;
      </div>

      <p
        className="font-serif italic text-[1.08rem] leading-[1.75] relative z-10"
        style={{ color: "var(--text)" }}
      >
        &ldquo;{quote}&rdquo;
      </p>

      {author && (
        <div
          className="mt-4 text-[0.82rem] font-sans not-italic relative z-10"
          style={{ color: "var(--text-muted)" }}
        >
          <span style={{ color: "var(--gold)", opacity: 0.7, marginRight: "4px" }}>
            &mdash;
          </span>
          {author}
        </div>
      )}
    </div>
  );
}
