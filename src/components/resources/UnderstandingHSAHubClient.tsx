"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const CARDS = [
  {
    slug: "the-disease",
    title: "The Disease",
    eyebrow: "Learn",
    description:
      "What hemangiosarcoma is, where it grows, key facts every owner should know, and the early warning sign most people miss.",
    color: "var(--terracotta)",
    illustration: "/illustrations/resources/hsa-hub-the-disease.png",
  },
  {
    slug: "diagnosis",
    title: "Diagnosis & Staging",
    eyebrow: "Understand",
    description:
      "How HSA is staged, the diagnostic tests your vet will run, and what each one tells you.",
    color: "var(--gold)",
    illustration: "/illustrations/resources/hsa-hub-diagnosis.png",
  },
  {
    slug: "treatment",
    title: "Treatment Options",
    eyebrow: "Decide",
    description:
      "Surgery, chemotherapy, immunotherapy, and supportive care — with survival times and cost ranges for each.",
    color: "var(--sage)",
    illustration: "/illustrations/resources/hsa-hub-treatment.png",
  },
  {
    slug: "breed-risks",
    title: "Breed Risks",
    eyebrow: "Know",
    description:
      "Which breeds are most susceptible, specific risk percentages, and what screening looks like.",
    color: "var(--sage)",
    illustration: "/illustrations/resources/hsa-hub-breed-risks.png",
  },
  {
    slug: "research",
    title: "Research & Hope",
    eyebrow: "Discover",
    description:
      "Breakthroughs in early detection, new treatments in clinical trials, and why there is more reason for hope than ever.",
    color: "var(--gold)",
    illustration: "/illustrations/resources/hsa-hub-research.png",
  },
  {
    slug: "vet-questions",
    title: "Questions for Your Vet",
    eyebrow: "Prepare",
    description:
      "The 10 most important questions to ask your oncologist — printable and ready for your next appointment.",
    color: "var(--terracotta)",
    illustration: "/illustrations/resources/hsa-hub-vet-questions.png",
  },
];

export default function UnderstandingHSAHubClient() {
  const sectionRef = useScrollReveal();

  return (
    <div
      ref={sectionRef as React.RefObject<HTMLDivElement>}
      className="min-h-screen pb-20"
      style={{ background: "var(--warm-white)" }}
    >
      {/* Hero */}
      <section
        className="pt-24 pb-10 px-6"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="max-w-[1100px] mx-auto">
          {/* Back link */}
          <Link
            href="/resources"
            className="inline-flex items-center gap-1.5 no-underline mb-6"
            style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Resources
          </Link>

          {/* Hero illustration */}
          <div className="w-full mb-6 overflow-hidden rounded-2xl reveal">
            <Image
              src="/illustrations/resources/hsa-hub-hero.png"
              alt=""
              width={1100}
              height={200}
              className="w-full object-cover"
              style={{ maxHeight: 200, mixBlendMode: "multiply" }}
              priority
            />
          </div>

          {/* Gold eyebrow */}
          <p
            className="font-medium tracking-widest uppercase mb-3 reveal"
            style={{ fontSize: "0.68rem", color: "var(--gold)" }}
          >
            RESOURCE
          </p>

          {/* Title */}
          <h1
            className="font-serif font-semibold mb-3 reveal"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              color: "var(--text)",
              lineHeight: 1.2,
            }}
          >
            Understanding Hemangiosarcoma
          </h1>

          {/* Subtitle */}
          <p
            className="font-serif mb-5 reveal"
            style={{ fontSize: "1.1rem", color: "var(--text-muted)", lineHeight: 1.4 }}
          >
            What it is, what it means, and what comes next
          </p>

          {/* Intro */}
          <p
            className="leading-relaxed reveal"
            style={{ fontSize: "1rem", color: "var(--text)", maxWidth: 720 }}
          >
            Hemangiosarcoma (HSA) is a cancer that grows from the cells lining blood vessels. The
            name tells you what it is: hemangio means blood vessels, and sarcoma means a cancer of
            soft tissue. It is aggressive, it spreads quickly, and it is almost exclusively a
            disease of dogs. Most owners learn about it in an emergency room after their dog
            collapses from internal bleeding — and suddenly they need to understand a disease they
            have never heard of. This page is the starting point.
          </p>
        </div>
      </section>

      {/* Card grid */}
      <div className="px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {CARDS.map((card) => (
              <Link
                key={card.slug}
                href={`/resources/understanding-hsa/${card.slug}`}
                className="group block no-underline reveal"
                style={{ transition: "transform 200ms ease, box-shadow 200ms ease" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 32px rgba(0,0,0,0.09)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  className="rounded-2xl overflow-hidden h-full flex flex-col"
                  style={{
                    background: "white",
                    border: "1px solid var(--border)",
                  }}
                >
                  {/* Top color strip */}
                  <div
                    style={{
                      height: 4,
                      background: card.color,
                      borderRadius: "16px 16px 0 0",
                    }}
                  />

                  <div className="p-6 flex flex-col flex-1">
                    {/* Illustration */}
                    <div className="flex justify-center mb-4">
                      <Image
                        src={card.illustration}
                        alt=""
                        width={120}
                        height={120}
                        style={{ objectFit: "contain", mixBlendMode: "multiply" }}
                      />
                    </div>

                    {/* Eyebrow */}
                    <p
                      className="font-semibold uppercase tracking-widest mb-2"
                      style={{ fontSize: "0.65rem", color: card.color }}
                    >
                      {card.eyebrow}
                    </p>

                    {/* Title */}
                    <h2
                      className="font-serif font-semibold mb-2"
                      style={{ fontSize: "1.1rem", color: "var(--text)", lineHeight: 1.3 }}
                    >
                      {card.title}
                    </h2>

                    {/* Description */}
                    <p
                      className="leading-relaxed mb-4 flex-1"
                      style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}
                    >
                      {card.description}
                    </p>

                    {/* CTA */}
                    <span
                      className="text-[0.88rem] font-semibold"
                      style={{ color: card.color }}
                    >
                      Explore &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Closing */}
          <div
            className="reveal mt-16 pt-8 text-center"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 no-underline font-medium"
              style={{ fontSize: "1rem", color: "var(--sage)" }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Back to all resources
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
