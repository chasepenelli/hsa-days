import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Practical guides for HSA dog owners — supplements, food & nutrition, and house-proofing.",
};

export default function ResourcesPage() {
  const resources = [
    {
      icon: "\uD83D\uDC8A",
      title: "Supplement Guide",
      description:
        "Research-backed supplements organized by category — what they do, suggested dosages by weight, and what to discuss with your vet.",
      href: "/resources/supplements",
      borderColor: "border-l-sage",
    },
    {
      icon: "\uD83E\uDD6A",
      title: "Food & Nutrition",
      description:
        "What to feed, what to avoid, and how to adjust their diet. Including homemade options, commercial foods, and appetite-boosting tips.",
      href: "/resources/food",
      borderColor: "border-l-gold",
    },
    {
      icon: "\uD83C\uDFE0",
      title: "House-Proofing",
      description:
        "Small changes that make a big difference. Non-slip surfaces, ramp guides, temperature management, and comfort setups for recovery.",
      href: "/resources/home",
      borderColor: "border-l-terracotta",
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-gold mb-3">
          Resources
        </div>
        <h1 className="font-serif text-[clamp(2rem,4vw,2.8rem)] font-semibold text-text mb-4">
          Everything in one place.
        </h1>
        <p className="text-[1.05rem] text-text-muted max-w-[600px] leading-relaxed mb-10">
          Practical guides researched and organized so you don&apos;t have to
          dig through the internet at your worst moment.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resources.map((resource, i) => (
            <Link
              key={i}
              href={resource.href}
              className={`block bg-white border border-border border-l-[3px] ${resource.borderColor} rounded-2xl px-7 py-9 no-underline transition-all hover:-translate-y-[3px] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]`}
            >
              <h3 className="font-serif text-[1.2rem] font-semibold mb-3 text-text">
                {resource.icon} {resource.title}
              </h3>
              <p className="text-[0.95rem] text-text-muted leading-relaxed">
                {resource.description}
              </p>
              <div className="mt-4 text-sage font-medium text-sm">
                Read guide &rarr;
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
