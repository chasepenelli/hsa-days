import { SignupForm } from "@/components/forms/SignupForm";

export function Hero() {
  return (
    <section
      className="relative overflow-hidden flex items-center justify-center"
      style={{
        minHeight: "100svh",
        paddingTop: "clamp(100px, 14vw, 140px)",
        paddingBottom: "clamp(60px, 8vw, 100px)",
        paddingLeft: "24px",
        paddingRight: "24px",
      }}
    >
      {/* Background — warm radial gradients that feel like morning light */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            "radial-gradient(ellipse 80% 60% at 65% 15%, rgba(91,123,94,0.07) 0%, transparent 70%)",
            "radial-gradient(ellipse 60% 50% at 20% 85%, rgba(196,162,101,0.06) 0%, transparent 65%)",
            "radial-gradient(ellipse 40% 40% at 80% 80%, rgba(212,133,106,0.04) 0%, transparent 60%)",
          ].join(", "),
        }}
        aria-hidden="true"
      />

      {/* Fine paper grain — very subtle */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
        aria-hidden="true"
      />

      <div className="max-w-[680px] text-center relative z-10">

        {/* Eyebrow pill */}
        <div
          className="inline-flex items-center gap-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.1em] px-4 py-1.5 rounded-full mb-8"
          style={{
            background: "rgba(91,123,94,0.09)",
            color: "var(--sage-dark)",
            border: "1px solid rgba(91,123,94,0.15)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-breathe"
            style={{ background: "var(--sage)" }}
          />
          Free &middot; Interactive &middot; 30 Days
        </div>

        {/* Main heading */}
        <h1
          className="font-serif font-semibold tracking-tight leading-[1.18] mb-6"
          style={{ fontSize: "clamp(2.2rem, 5.5vw, 3.6rem)", color: "var(--text)" }}
        >
          Your dog was just diagnosed.
          <br />
          <em
            className="italic"
            style={{ color: "var(--sage)" }}
          >
            You&apos;re not alone in this.
          </em>
        </h1>

        {/* Subheading */}
        <p
          className="leading-relaxed mx-auto mb-10"
          style={{
            fontSize: "clamp(1rem, 2.2vw, 1.15rem)",
            color: "var(--text-muted)",
            maxWidth: "560px",
          }}
        >
          HSA Days is a free 30-day companion for dog owners navigating a
          hemangiosarcoma diagnosis. Daily reflections, a private journal,
          practical guides, and a community that understands.
        </p>

        {/* Signup form */}
        <div className="mb-5">
          <SignupForm />
        </div>

        {/* Trust line */}
        <p
          className="text-[0.84rem] mb-1"
          style={{ color: "var(--text-muted)" }}
        >
          Free forever &middot; No passwords &middot; Start immediately
        </p>
        <p
          className="text-[0.78rem] italic"
          style={{ color: "var(--text-muted)", opacity: 0.6 }}
        >
          Built by a dog dad who needed this. Read by hundreds of HSA families.
        </p>

        {/* Decorative bottom flourish */}
        <div
          className="flex items-center justify-center gap-3 mt-14"
          style={{ color: "var(--border-strong)" }}
        >
          <div
            className="h-px"
            style={{
              flex: 1,
              maxWidth: "60px",
              background: "linear-gradient(to right, transparent, var(--border-strong))",
            }}
          />
          <div
            className="w-1 h-1 rounded-full rotate-45"
            style={{ background: "var(--gold)", opacity: 0.5 }}
          />
          <div
            className="h-px"
            style={{
              flex: 1,
              maxWidth: "60px",
              background: "linear-gradient(to left, transparent, var(--border-strong))",
            }}
          />
        </div>
      </div>
    </section>
  );
}
