import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Supplement Guide",
};

export default function SupplementsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-[800px] mx-auto">
        <div className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-gold mb-3">
          Resources
        </div>
        <h1 className="font-serif text-[clamp(2rem,4vw,2.8rem)] font-semibold text-text mb-4">
          {"\uD83D\uDC8A"} Supplement Guide
        </h1>
        <p className="text-[1.05rem] text-text-muted leading-relaxed mb-10">
          Research-backed supplements organized by category. Always discuss any
          supplements with your veterinarian before starting.
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
