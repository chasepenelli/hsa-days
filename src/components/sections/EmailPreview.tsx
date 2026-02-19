export function EmailPreview() {
  return (
    <section className="py-[100px] px-6 bg-cream md:py-[100px] py-12">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center">
          <div className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-gold mb-3">
            Your Morning Companion
          </div>
          <div className="font-serif text-[clamp(1.8rem,3.5vw,2.4rem)] font-semibold leading-[1.3] mb-5 tracking-tight">
            A quiet nudge, not a flood.
          </div>
          <p className="text-[1.05rem] text-text-muted max-w-[600px] mx-auto leading-relaxed">
            Each morning you&apos;ll get a short email with the day&apos;s quote
            and a few words. One tap opens the full day on the site.
          </p>
        </div>

        <div className="max-w-[440px] mx-auto mt-10 bg-white rounded-xl p-7 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-border">
          <div className="text-[0.75rem] text-text-muted mb-1 flex items-center gap-1.5">
            <strong className="text-text">HSA Days</strong>
            &nbsp;&middot;&nbsp;8:00 AM
          </div>
          <div className="font-semibold text-base mb-4">
            Day 1: The Diagnosis
          </div>
          <hr className="border-t border-border my-4" />
          <div className="text-[0.9rem] text-text-muted leading-relaxed">
            <div className="font-serif italic text-center text-text my-4 text-[0.95rem]">
              &ldquo;The wound is the place where the Light enters you.&rdquo;
              <br />
              <span className="text-[0.8rem] text-text-muted font-sans not-italic">
                &mdash; Rumi
              </span>
            </div>
            <p>
              If you&apos;re reading this, you probably just heard a word you
              wish you never had to learn. Today isn&apos;t about having a plan.
              Today is about giving yourself permission to feel whatever you
              feel.
            </p>
            <p className="mt-3">
              Your reflection, activity, and journal prompt are ready.
            </p>
            <div className="block text-center mt-5 px-6 py-3 bg-sage text-white rounded-lg font-semibold text-[0.9rem] no-underline font-sans">
              Continue Day 1 &rarr;
            </div>
          </div>
          <hr className="border-t border-border my-4" />
          <div className="text-center text-[0.75rem] text-[#b0a89e]">
            Your journal is waiting for you.
          </div>
        </div>
      </div>
    </section>
  );
}
