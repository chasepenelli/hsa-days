interface JourneyTestimonialProps {
  quote: string;
  author: string;
}

export function JourneyTestimonial({ quote, author }: JourneyTestimonialProps) {
  return (
    <div
      className="rounded-2xl px-7 py-8 sm:px-9"
      style={{
        background: "white",
        border: "1px solid var(--border)",
        boxShadow: "0 1px 6px rgba(0,0,0,0.03)",
      }}
    >
      {/* Quote mark */}
      <div
        className="font-serif text-[2rem] leading-none mb-2"
        style={{ color: "var(--gold)", opacity: 0.5 }}
        aria-hidden="true"
      >
        &ldquo;
      </div>
      <p
        className="text-[0.92rem] leading-relaxed mb-4"
        style={{ color: "var(--text)" }}
      >
        {quote}
      </p>
      <cite
        className="block text-[0.8rem] not-italic font-medium"
        style={{ color: "var(--text-muted)" }}
      >
        &mdash; {author}
      </cite>
    </div>
  );
}
