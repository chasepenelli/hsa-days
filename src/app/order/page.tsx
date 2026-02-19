import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pre-Order",
  description:
    "Pre-order the printed HSA Days journal. 30 days of reflections, activities, and guides in a beautiful physical format.",
};

export default function OrderPage() {
  const features = [
    "30 daily reflections & activities",
    "Full supplement guide",
    "Dedicated journaling space",
    "Food & nutrition reference",
    "House-proofing checklist",
    "Lay-flat binding for writing",
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-[700px] mx-auto text-center">
        <div className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-gold mb-3">
          Pre-Order
        </div>
        <h1 className="font-serif text-[clamp(2rem,4vw,2.8rem)] font-semibold text-text mb-4">
          Hold it in your hands.
        </h1>
        <p className="text-[1.05rem] text-text-muted max-w-[600px] mx-auto leading-relaxed mb-10">
          The physical journal includes all 30 days, dedicated writing space,
          and the complete resource guides &mdash; designed to sit next to your
          coffee and your dog.
        </p>

        <div className="bg-white rounded-[20px] p-12 md:p-12 p-7 border border-border shadow-[0_4px_30px_rgba(0,0,0,0.04)]">
          <div className="inline-block bg-terracotta/10 text-terracotta text-[0.75rem] font-semibold uppercase tracking-[0.1em] px-4 py-1.5 rounded-[20px] mb-6">
            Coming Soon
          </div>

          {/* Book mockup placeholder */}
          <div className="w-48 h-60 mx-auto mb-8 bg-gradient-to-br from-sage/20 to-sage/5 rounded-lg border border-border flex items-center justify-center">
            <div className="text-center opacity-60">
              <div className="text-3xl mb-2">{"\uD83D\uDCD7"}</div>
              <div className="text-xs text-text-muted">Book preview</div>
            </div>
          </div>

          <h2 className="font-serif text-2xl font-semibold mb-3">
            HSA Days: The Printed Journal
          </h2>
          <p className="text-base text-text-muted max-w-[480px] mx-auto mb-8 leading-relaxed">
            Everything from the website in a beautiful printed format. Thicker
            pages for writing, lay-flat binding, and space to keep photos and
            memories.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-sm mx-auto mb-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-[0.9rem] text-text-muted"
              >
                <div className="w-[22px] h-[22px] bg-sage/10 rounded-md flex items-center justify-center text-sage text-[0.8rem] shrink-0">
                  &#x2713;
                </div>
                {feature}
              </div>
            ))}
          </div>

          {/* Shopify Buy Button will go here */}
          <button className="px-10 py-4 bg-terracotta text-white border-none rounded-xl text-[1.05rem] font-semibold font-sans cursor-pointer transition-all hover:bg-[#c4775f] active:scale-[0.98] md:w-auto w-full min-h-12">
            Pre-Order the Journal
          </button>

          <p className="mt-4 text-[0.85rem] text-text-muted">
            Ships Spring 2026. Free digital access included with every
            pre-order.
          </p>
        </div>
      </div>
    </div>
  );
}
