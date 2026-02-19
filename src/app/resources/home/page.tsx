import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "House-Proofing Guide",
};

export default function HouseProofingPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-[800px] mx-auto">
        <div className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-gold mb-3">
          Resources
        </div>
        <h1 className="font-serif text-[clamp(2rem,4vw,2.8rem)] font-semibold text-text mb-4">
          {"\uD83C\uDFE0"} House-Proofing
        </h1>
        <p className="text-[1.05rem] text-text-muted leading-relaxed mb-10">
          Small changes that make a big difference for your dog&apos;s comfort
          and safety at home.
        </p>

        <div className="bg-cream rounded-2xl p-8 text-center text-text-muted">
          <p className="text-lg">Content coming soon.</p>
          <p className="text-sm mt-2">
            This guide will be populated from the resources database.
          </p>
        </div>
      </div>
    </div>
  );
}
