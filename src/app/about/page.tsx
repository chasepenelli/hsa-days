import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Meet Graffiti — a corgi who changed everything. Learn why Chase built HSA Days.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-[800px] mx-auto">
        <div className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-gold-text mb-3">
          Our Story
        </div>
        <h1 className="font-serif text-[clamp(2rem,4vw,3rem)] font-semibold text-text mb-8 leading-tight">
          Meet Graffiti.
        </h1>

        {/* Image placeholder */}
        <div className="w-full aspect-video bg-gradient-to-br from-cream to-[#e8ddd0] rounded-2xl flex items-center justify-center text-text-muted border border-border mb-10 overflow-hidden">
          <div className="text-center p-5 opacity-60">
            <div className="text-[4rem] mb-3">{"\uD83D\uDC3E"}</div>
            <div>Graffiti&apos;s photo goes here</div>
          </div>
        </div>

        <div className="space-y-6 text-[1.05rem] text-text-muted leading-relaxed">
          <h2 className="font-serif text-2xl font-semibold text-text">
            A corgi who changed everything.
          </h2>

          <p>
            Graffiti isn&apos;t just a dog. She&apos;s a personality, a
            comfort, a best friend who communicates through side-eye and
            strategic cuddling. When she was diagnosed with hemangiosarcoma,
            the world didn&apos;t stop &mdash; but it felt like it should have.
          </p>

          <p>
            I built HSA Days because I needed it. I needed something that
            wasn&apos;t a clinical research paper or a Reddit thread full of
            worst-case timelines. I needed a companion &mdash; something that
            would meet me where I was each day and help me show up for Graffiti
            in the ways that mattered.
          </p>

          <p>
            When you&apos;re going through this, the internet gives you two
            things: medical information that terrifies you, and forums that
            make you feel like you&apos;re already out of time. Neither of
            those things help you get through the day. Neither of them help
            you just be with your dog.
          </p>

          <p>
            HSA Days is designed to meet you where you are &mdash; wherever
            that is. Day 1 is about giving yourself permission to feel. Day 30
            is about finding meaning in what you&apos;ve been through. The days
            in between? They&apos;re about making the most of the time you
            have, not in some bucket-list Instagram way, but in the quiet, real
            ways that actually matter.
          </p>

          <p>
            This is that thing. It&apos;s not perfect. It&apos;s not medical
            advice. It&apos;s just one person sharing what helped, what hurt,
            and what they wish they&apos;d known &mdash; so you don&apos;t
            have to figure it all out alone.
          </p>

          <div className="font-serif italic text-sage text-xl mt-10">
            &mdash; Chase &amp; Graffiti
          </div>
        </div>
      </div>
    </div>
  );
}
