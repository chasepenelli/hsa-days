import Link from "next/link";

interface JourneyCTAProps {
  variant: "inline" | "full";
}

export function JourneyCTA({ variant }: JourneyCTAProps) {
  if (variant === "inline") {
    return (
      <div
        style={{
          paddingTop: "clamp(20px, 3vw, 32px)",
          paddingBottom: "clamp(20px, 3vw, 32px)",
          paddingLeft: "24px",
          paddingRight: "24px",
          background: "var(--warm-white)",
        }}
      >
        <div
          className="max-w-[560px] mx-auto rounded-2xl px-8 py-7 text-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(91,123,94,0.05) 0%, rgba(196,162,101,0.05) 100%)",
            border: "1px solid rgba(91,123,94,0.12)",
          }}
        >
          {/* Ornament */}
          <div
            className="flex items-center justify-center gap-3 mb-5"
            aria-hidden="true"
          >
            <div
              style={{
                width: "40px",
                height: "1px",
                background:
                  "linear-gradient(to right, transparent, rgba(196,162,101,0.5))",
              }}
            />
            <div
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "var(--gold)",
                opacity: 0.5,
              }}
            />
            <div
              style={{
                width: "40px",
                height: "1px",
                background:
                  "linear-gradient(to left, transparent, rgba(196,162,101,0.5))",
              }}
            />
          </div>

          <p
            className="font-serif text-[1.05rem] font-semibold mb-2"
            style={{ color: "var(--text)" }}
          >
            Ready to begin?
          </p>
          <p
            className="text-[0.88rem] leading-relaxed mb-5"
            style={{ color: "var(--text-muted)", maxWidth: "360px", margin: "0 auto 20px" }}
          >
            Day 1 meets you exactly where you are. No pressure, no timeline
            &mdash; just a place to start.
          </p>
          <Link
            href="/days"
            className="inline-flex items-center gap-2 px-6 py-2.5 text-white text-[0.88rem] font-semibold rounded-[14px] transition-all hover:opacity-90 hover:-translate-y-[1px] hover:shadow-[0_4px_12px_rgba(91,123,94,0.3)]"
            style={{ background: "var(--sage)" }}
          >
            Start Your Journey
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              width={15}
              height={15}
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    );
  }

  // ─── Full CTA ───
  return (
    <section
      className="relative overflow-hidden"
      style={{
        paddingTop: "clamp(64px, 9vw, 112px)",
        paddingBottom: "clamp(64px, 9vw, 112px)",
        paddingLeft: "24px",
        paddingRight: "24px",
        background:
          "linear-gradient(155deg, var(--sage-dark) 0%, var(--sage) 60%, var(--sage-light) 100%)",
      }}
    >
      {/* Subtle radial glow */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(255,255,255,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Subtle paw watermark — right side */}
      <div
        className="absolute top-1/2 right-[8%] -translate-y-1/2 pointer-events-none"
        aria-hidden="true"
        style={{ opacity: 0.05 }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="white"
          width={200}
          height={200}
        >
          <circle cx="35" cy="20" r="10" />
          <circle cx="65" cy="20" r="10" />
          <circle cx="20" cy="42" r="9" />
          <circle cx="80" cy="42" r="9" />
          <ellipse cx="50" cy="65" rx="22" ry="20" />
        </svg>
      </div>

      {/* Left decorative rule */}
      <div
        className="absolute top-1/2 left-[8%] -translate-y-1/2 pointer-events-none hidden lg:block"
        aria-hidden="true"
        style={{
          width: "1px",
          height: "80px",
          background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.2), transparent)",
        }}
      />

      <div className="max-w-[520px] mx-auto text-center relative z-10">
        <div
          className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] mb-5"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          Your Journey Starts Here
        </div>

        <h2
          className="font-serif font-semibold tracking-tight mb-4"
          style={{
            fontSize: "clamp(1.9rem, 4.5vw, 2.6rem)",
            lineHeight: 1.2,
            color: "white",
          }}
        >
          Day 1 is ready{" "}
          <em className="italic" style={{ opacity: 0.85 }}>
            when you are.
          </em>
        </h2>

        {/* Ornamental rule */}
        <div
          className="flex items-center justify-center gap-3 mb-5"
          aria-hidden="true"
        >
          <div
            style={{
              width: "40px",
              height: "1px",
              background: "rgba(255,255,255,0.25)",
            }}
          />
          <div
            style={{
              width: "4px",
              height: "4px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.4)",
            }}
          />
          <div
            style={{
              width: "40px",
              height: "1px",
              background: "rgba(255,255,255,0.25)",
            }}
          />
        </div>

        <p
          className="text-[1rem] leading-relaxed mb-9"
          style={{ color: "rgba(255,255,255,0.72)", maxWidth: "400px", margin: "0 auto 36px" }}
        >
          Thirty days of guidance, reflection, and community &mdash; built for
          the hardest moments and the quiet ones in between.
        </p>

        <Link
          href="/days"
          className="inline-flex items-center gap-2.5 px-8 py-3.5 text-[0.95rem] font-semibold rounded-[14px] transition-all hover:opacity-95 hover:-translate-y-[2px] hover:shadow-[0_8px_28px_rgba(0,0,0,0.2)]"
          style={{
            background: "white",
            color: "var(--sage-dark)",
          }}
        >
          Start Free
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            width={15}
            height={15}
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>

        <p
          className="mt-4 text-[0.78rem]"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          No credit card required &mdash; free to begin
        </p>
      </div>
    </section>
  );
}
