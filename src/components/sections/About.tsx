export function About() {
  return (
    <section id="about" className="py-[100px] px-6 md:py-[100px] py-12">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-gold mb-3">
          Our Story
        </div>
        <div className="font-serif text-[clamp(1.8rem,3.5vw,2.4rem)] font-semibold leading-[1.3] mb-5 tracking-tight">
          Meet Graffiti.
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-10 md:gap-[60px] mt-[50px] items-center">
          {/* Image placeholder */}
          <div className="w-full aspect-[4/5] md:aspect-[4/5] aspect-square bg-gradient-to-br from-cream to-[#e8ddd0] rounded-[20px] md:rounded-[20px] rounded-2xl flex items-center justify-center text-text-muted text-[0.9rem] border border-border overflow-hidden">
            <div className="text-center p-5 opacity-60">
              <div className="text-[3rem] mb-3">{"\uD83D\uDC3E"}</div>
              <div>Graffiti&apos;s photo goes here</div>
            </div>
          </div>

          {/* Text */}
          <div>
            <h3 className="font-serif text-[1.5rem] font-semibold mb-4">
              A corgi who changed everything.
            </h3>
            <p className="text-base text-text-muted leading-relaxed mb-4">
              Graffiti isn&apos;t just a dog. She&apos;s a personality, a
              comfort, a best friend who communicates through side-eye and
              strategic cuddling. When she was diagnosed with hemangiosarcoma,
              the world didn&apos;t stop &mdash; but it felt like it should
              have.
            </p>
            <p className="text-base text-text-muted leading-relaxed mb-4">
              I built HSA Days because I needed it. I needed something that
              wasn&apos;t a clinical research paper or a Reddit thread full of
              worst-case timelines. I needed a companion &mdash; something that
              would meet me where I was each day and help me show up for Graffiti
              in the ways that mattered.
            </p>
            <p className="text-base text-text-muted leading-relaxed mb-4">
              This is that thing. It&apos;s not perfect. It&apos;s not medical
              advice. It&apos;s just one person sharing what helped, what hurt,
              and what they wish they&apos;d known &mdash; so you don&apos;t
              have to figure it all out alone.
            </p>
            <div className="font-serif italic text-sage text-[1.1rem] mt-6">
              &mdash; Chase &amp; Graffiti
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
