export function DayPreview() {
  return (
    <section id="preview" className="py-[100px] px-6 bg-cream md:py-[100px] py-12">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center">
          <div className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-gold mb-3">
            See Inside
          </div>
          <div className="font-serif text-[clamp(1.8rem,3.5vw,2.4rem)] font-semibold leading-[1.3] mb-5 tracking-tight">
            Here&apos;s what Day 1 looks like on the site.
          </div>
          <p className="text-[1.05rem] text-text-muted max-w-[600px] mx-auto leading-relaxed">
            This is the actual experience. Sign up, and this page is yours
            &mdash; with a journal that saves your thoughts as you go.
          </p>
        </div>

        <div className="max-w-[720px] mx-auto mt-[50px] bg-white rounded-[20px] overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-border md:rounded-[20px] rounded-2xl">
          {/* Browser chrome (desktop only) */}
          <div className="hidden md:flex bg-[#f0edea] px-4 py-3 items-center gap-2.5 border-b border-border">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF6058]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFC130]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27CA40]" />
            </div>
            <div className="flex-1 bg-white rounded-md px-3.5 py-1.5 text-[0.75rem] text-text-muted font-sans">
              <span className="text-sage font-medium">hsadays.com</span>/days/1
            </div>
          </div>

          {/* Progress bar */}
          <div className="px-8 py-4 bg-warm-white border-b border-border flex items-center gap-4 md:px-8 px-5">
            <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
              <div className="w-[3.3%] h-full bg-sage rounded-full" />
            </div>
            <div className="text-[0.75rem] text-text-muted whitespace-nowrap">
              Day 1 of 30
            </div>
          </div>

          {/* Day header */}
          <div className="bg-gradient-to-br from-sage to-sage-dark text-white px-9 py-7 md:px-9 px-5 md:py-7 py-5">
            <div className="text-[0.75rem] uppercase tracking-[0.12em] opacity-80 mb-1.5">
              Day 1 of 30
            </div>
            <h3 className="font-serif text-[1.6rem] font-semibold">
              The Diagnosis
            </h3>
          </div>

          {/* Day body */}
          <div className="p-9 md:p-9 p-5">
            {/* Quote */}
            <div className="mb-7">
              <div className="bg-cream rounded-xl px-7 py-6 border-l-[3px] border-gold text-center">
                <p className="font-serif italic text-[1.05rem] text-text">
                  &ldquo;The wound is the place where the Light enters
                  you.&rdquo;
                </p>
                <div className="text-[0.8rem] text-text-muted mt-2 not-italic font-sans">
                  &mdash; Rumi
                </div>
              </div>
            </div>

            {/* Reflection */}
            <div className="mb-7">
              <div className="text-[0.7rem] uppercase tracking-[0.1em] text-gold font-semibold mb-2">
                Today&apos;s Reflection
              </div>
              <p className="text-[0.95rem] text-text-muted leading-relaxed">
                If you&apos;re reading this, you probably just heard a word you
                wish you never had to learn. Hemangiosarcoma. Maybe you&apos;re
                still in shock. Maybe you&apos;ve been crying for hours. Maybe
                you feel strangely numb. All of that is okay.
              </p>
              <p className="text-[0.95rem] text-text-muted leading-relaxed mt-3">
                Today isn&apos;t about having a plan. Today is about giving
                yourself permission to feel whatever you feel &mdash; and giving
                your dog an extra long hug.
              </p>
            </div>

            {/* Journal prompt */}
            <div className="mb-7">
              <div className="bg-warm-white border-[1.5px] border-dashed border-border rounded-xl px-6 py-5">
                <div className="text-[0.75rem] font-semibold text-sage mb-2 flex items-center gap-1.5">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="w-3.5 h-3.5"
                  >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
                  </svg>
                  Your Journal
                </div>
                <div className="w-full min-h-20 border border-border rounded-lg px-4 py-3 text-[0.9rem] text-text-muted/50 bg-white md:min-h-20 min-h-[120px]">
                  What are you feeling right now? There are no wrong answers...
                </div>
              </div>
            </div>

            {/* Activity */}
            <div className="mb-7">
              <div className="text-[0.7rem] uppercase tracking-[0.1em] text-gold font-semibold mb-2">
                Today&apos;s Activity
              </div>
              <p className="text-[0.95rem] text-text-muted leading-relaxed">
                Sit on the floor with your dog. Not to do anything &mdash; just
                to be near them. Let them lean into you. Let yourself lean into
                them. That&apos;s enough for today.
              </p>
            </div>

            {/* Practical tip */}
            <div>
              <div className="text-[0.7rem] uppercase tracking-[0.1em] text-gold font-semibold mb-2">
                Practical Tip
              </div>
              <p className="text-[0.95rem] text-text-muted leading-relaxed">
                Start a notes app or journal. Write down your dog&apos;s
                diagnosis details, the vet&apos;s name, and any questions that
                come to mind. You don&apos;t have to act on them today. Just
                capture them.
              </p>
            </div>
          </div>

          {/* Day navigation */}
          <div className="px-9 py-5 border-t border-border flex justify-between items-center flex-wrap gap-3 md:px-9 px-5 md:py-5 py-4">
            <span className="text-[0.85rem] text-text-muted flex items-center gap-1.5 font-medium opacity-30">
              &larr; Previous Day
            </span>
            <button className="px-6 py-2.5 bg-sage text-white border-none rounded-lg text-[0.85rem] font-semibold font-sans cursor-pointer flex items-center gap-2 md:w-auto w-full justify-center md:min-h-0 min-h-12">
              &#x2713; Mark Day Complete
            </button>
            <span className="text-[0.85rem] text-text-muted flex items-center gap-1.5 font-medium cursor-pointer">
              Next Day &rarr;
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
