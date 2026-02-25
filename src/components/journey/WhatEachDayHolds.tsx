const ITEMS = [
  {
    label: "A reflection",
    description:
      "Written for where you are. Personal, second-person \u2014 like a letter from someone who\u2019s been here.",
    color: "var(--sage)",
  },
  {
    label: "A journal prompt",
    description:
      "A single question to sit with. Write as much or as little as you want. Private and saved.",
    color: "var(--gold)",
  },
  {
    label: "A gentle activity",
    description:
      "Something small to do together. A photo walk. A paw print. Writing a letter. Never homework \u2014 always an invitation.",
    color: "var(--terracotta)",
  },
  {
    label: "A practical tip",
    description:
      "Real information, delivered gently. What to ask your vet. How to adjust their diet. When to seek a second opinion.",
    color: "var(--sage-light)",
  },
  {
    label: "A quote to carry",
    description:
      "Words for the hardest moments. From Rumi to Mary Oliver \u2014 something to hold onto for the rest of the day.",
    color: "var(--gold-light)",
  },
];

export function WhatEachDayHolds() {
  return (
    <section
      className="relative"
      style={{
        paddingTop: "clamp(56px, 8vw, 96px)",
        paddingBottom: "clamp(56px, 8vw, 96px)",
        paddingLeft: "24px",
        paddingRight: "24px",
        background: "var(--cream)",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "460px" }}>
        {/* Eyebrow + heading */}
        <div className="reveal text-center mb-8">
          <p
            className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] mb-2"
            style={{ color: "var(--text-muted)", opacity: 0.6 }}
          >
            Every day includes
          </p>
          <h2
            className="font-serif font-semibold tracking-tight"
            style={{
              fontSize: "clamp(1.4rem, 3.5vw, 1.8rem)",
              lineHeight: 1.25,
              color: "var(--text)",
            }}
          >
            Five things waiting{" "}
            <em className="italic" style={{ color: "var(--sage)" }}>
              for you
            </em>
          </h2>
        </div>

        {/* Vignette list */}
        <div className="reveal-stagger space-y-4">
          {ITEMS.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3"
              style={{
                borderLeft: `3px solid ${item.color}`,
                paddingLeft: "16px",
              }}
            >
              {/* Accent dot */}
              <div
                className="shrink-0 mt-[7px]"
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: item.color,
                }}
              />
              <div className="min-w-0">
                <span
                  className="font-serif font-semibold"
                  style={{
                    fontSize: "0.97rem",
                    color: "var(--text)",
                  }}
                >
                  {item.label}
                </span>
                <p
                  className="mt-0.5 leading-snug"
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--text-muted)",
                  }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          ))}

          {/* Closer line */}
          <p
            className="font-serif italic leading-relaxed pt-2"
            style={{
              fontSize: "0.85rem",
              color: "var(--text-muted)",
              opacity: 0.6,
            }}
          >
            Plus supplement guides, a food safety reference, and a community of
            people who understand.
          </p>
        </div>
      </div>
    </section>
  );
}
