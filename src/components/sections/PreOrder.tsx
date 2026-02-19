"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const features = [
  "30 daily reflections & activities",
  "Full supplement guide",
  "Dedicated journaling space",
  "Food & nutrition reference",
];

export function PreOrder() {
  const ref = useScrollReveal();

  return (
    <section
      id="order-section"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative overflow-hidden"
      style={{
        paddingTop: "clamp(80px, 10vw, 120px)",
        paddingBottom: "clamp(80px, 10vw, 120px)",
        paddingLeft: "24px",
        paddingRight: "24px",
        background: "var(--warm-white)",
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          top: "30%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "500px",
          height: "300px",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(212,133,106,0.07) 0%, transparent 70%)",
          animationName: "ambientGlow",
          animationDuration: "10s",
          animationTimingFunction: "ease-in-out",
          animationIterationCount: "infinite",
          animationDelay: "3s",
        }}
      />

      <div className="max-w-[1100px] mx-auto">
        <div className="mb-14">
          <div
            className="reveal text-[0.68rem] font-semibold uppercase tracking-[0.14em] mb-4"
            style={{ color: "var(--gold)" }}
          >
            Pre-Order
          </div>
          <h2
            className="reveal font-serif font-semibold tracking-tight mb-4"
            style={{
              fontSize: "clamp(1.9rem, 4vw, 2.6rem)",
              lineHeight: 1.25,
              transitionDelay: "0.08s",
            }}
          >
            Hold it{" "}
            <em className="italic" style={{ color: "var(--sage)" }}>
              in your hands.
            </em>
          </h2>
          <p
            className="reveal text-[1.05rem] leading-relaxed"
            style={{
              color: "var(--text-muted)",
              maxWidth: "560px",
              transitionDelay: "0.16s",
            }}
          >
            The physical journal includes all 30 days, dedicated writing space,
            and the complete resource guides — designed to sit next to your
            coffee and your dog.
          </p>
        </div>

        <div
          className="reveal-scale max-w-[680px] mx-auto rounded-[24px] p-12 md:p-12 p-7 text-center"
          style={{
            background: "white",
            border: "1px solid var(--border)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.06)",
            transitionDelay: "0.24s",
          }}
        >
          <div
            className="inline-block text-[0.72rem] font-semibold uppercase tracking-[0.12em] px-4 py-1.5 rounded-full mb-6"
            style={{
              background: "rgba(212,133,106,0.1)",
              color: "var(--terracotta)",
              border: "1px solid rgba(212,133,106,0.2)",
            }}
          >
            Coming Soon
          </div>

          <h3
            className="font-serif text-[1.7rem] font-semibold mb-3"
            style={{ color: "var(--text)" }}
          >
            HSA Days: The Printed Journal
          </h3>
          <p
            className="text-base leading-relaxed mx-auto mb-8"
            style={{ color: "var(--text-muted)", maxWidth: "460px" }}
          >
            Everything from the website in a beautiful printed format. Thicker
            pages for writing, lay-flat binding, and space to keep photos and
            memories.
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 gap-3 mb-8 text-left max-w-[400px] mx-auto">
            {features.map((feature, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div
                  className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 text-[0.7rem]"
                  style={{
                    background: "rgba(91,123,94,0.1)",
                    color: "var(--sage)",
                  }}
                >
                  ✓
                </div>
                <span
                  className="text-[0.88rem]"
                  style={{ color: "var(--text-muted)" }}
                >
                  {feature}
                </span>
              </div>
            ))}
          </div>

          <button
            className="inline-block px-10 py-4 text-white border-none rounded-xl text-[1.05rem] font-semibold font-sans cursor-pointer transition-all hover:-translate-y-0.5 active:scale-[0.98] md:w-auto w-full"
            style={{
              background: "var(--terracotta)",
              boxShadow: "0 4px 20px rgba(212,133,106,0.3)",
              minHeight: "52px",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#c4775f";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 6px 24px rgba(212,133,106,0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "var(--terracotta)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 4px 20px rgba(212,133,106,0.3)";
            }}
          >
            Pre-Order the Journal
          </button>
          <p
            className="mt-4 text-[0.84rem]"
            style={{ color: "var(--text-muted)" }}
          >
            Ships Spring 2026. Free digital access included with every pre-order.
          </p>
        </div>
      </div>
    </section>
  );
}
