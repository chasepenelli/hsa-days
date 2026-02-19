export function PreOrder() {
  const features = [
    "30 daily reflections & activities",
    "Full supplement guide",
    "Dedicated journaling space",
    "Food & nutrition reference",
  ];

  return (
    <section id="order-section" className="py-[100px] px-6 bg-cream md:py-[100px] py-12">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-gold mb-3">
          Pre-Order
        </div>
        <div className="font-serif text-[clamp(1.8rem,3.5vw,2.4rem)] font-semibold leading-[1.3] mb-5 tracking-tight">
          Hold it in your hands.
        </div>
        <p className="text-[1.05rem] text-text-muted max-w-[600px] leading-relaxed">
          The physical journal includes all 30 days, dedicated writing space,
          and the complete resource guides &mdash; designed to sit next to your
          coffee and your dog.
        </p>

        <div className="max-w-[700px] mx-auto mt-[50px] bg-white rounded-[20px] p-12 md:p-12 p-7 border border-border text-center shadow-[0_4px_30px_rgba(0,0,0,0.04)]">
          <div className="inline-block bg-terracotta/10 text-terracotta text-[0.75rem] font-semibold uppercase tracking-[0.1em] px-4 py-1.5 rounded-[20px] mb-5">
            Coming Soon
          </div>
          <h3 className="font-serif text-[1.6rem] font-semibold mb-3">
            HSA Days: The Printed Journal
          </h3>
          <p className="text-base text-text-muted max-w-[480px] mx-auto mb-7 leading-relaxed">
            Everything from the website in a beautiful printed format. Thicker
            pages for writing, lay-flat binding, and space to keep photos and
            memories.
          </p>
          <div className="flex justify-center gap-8 mb-8 flex-wrap md:flex-row flex-col md:items-center items-center md:gap-8 gap-3">
            {features.map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-[0.9rem] text-text-muted"
              >
                <div className="w-[22px] h-[22px] bg-sage/10 rounded-md flex items-center justify-center text-sage text-[0.8rem]">
                  &#x2713;
                </div>
                {feature}
              </div>
            ))}
          </div>
          {/* Shopify Buy Button placeholder */}
          <button className="inline-block px-10 py-4 bg-terracotta text-white border-none rounded-xl text-[1.05rem] font-semibold font-sans cursor-pointer transition-all hover:bg-[#c4775f] active:scale-[0.98] md:w-auto w-full md:min-h-0 min-h-12">
            Pre-Order the Journal
          </button>
          <p className="mt-4 text-[0.85rem] text-text-muted">
            Ships Spring 2026. Free digital access included with every
            pre-order.
          </p>
        </div>
      </div>
    </section>
  );
}
