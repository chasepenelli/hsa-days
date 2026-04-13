import Link from "next/link";

export function Footer() {
  return (
    <footer
      className="text-white/60 px-6 pb-[calc(48px+env(safe-area-inset-bottom))] md:pb-12"
      style={{ background: "var(--sage-dark)" }}
    >
      {/* Gold gradient rule */}
      <div
        className="max-w-[1100px] mx-auto"
        style={{
          height: "1px",
          background:
            "linear-gradient(to right, transparent, var(--gold), transparent)",
          opacity: 0.3,
        }}
      />

      <div className="max-w-[1100px] mx-auto pt-10 pb-2">
        {/* Top row: logo + tagline left, links right */}
        <div className="flex justify-between items-start flex-wrap gap-8 md:flex-row flex-col items-center md:items-start text-center md:text-left mb-10">
          <div>
            <div className="font-serif text-[1.3rem] text-white/90 mb-2">
              HSA <span className="text-gold">Days</span>
            </div>
            <p
              className="font-serif italic text-[0.88rem] leading-relaxed"
              style={{ color: "rgba(255,255,255,0.65)", maxWidth: 280 }}
            >
              The most complete resource for families
              navigating hemangiosarcoma with love.
            </p>
          </div>
          <div className="flex gap-6 flex-wrap justify-center md:justify-end">
            <Link
              href="/about"
              className="text-white/90 no-underline text-[0.85rem] hover:text-white/90 transition-colors"
            >
              Our Story
            </Link>
            <Link
              href="/community"
              className="text-white/90 no-underline text-[0.85rem] hover:text-white/90 transition-colors"
            >
              Community
            </Link>
            <Link
              href="/resources"
              className="text-white/90 no-underline text-[0.85rem] hover:text-white/90 transition-colors"
            >
              Resources
            </Link>
            <Link
              href="/resources/understanding-hsa"
              className="text-white/90 no-underline text-[0.85rem] hover:text-white/90 transition-colors"
            >
              Understanding HSA
            </Link>
            <Link
              href="/resources/emergency"
              className="text-white/90 no-underline text-[0.85rem] hover:text-white/90 transition-colors"
            >
              Emergency Guide
            </Link>
            <Link
              href="/resources/financial-help"
              className="text-white/90 no-underline text-[0.85rem] hover:text-white/90 transition-colors"
            >
              Financial Help
            </Link>
            <Link
              href="/order"
              className="text-white/90 no-underline text-[0.85rem] hover:text-white/90 transition-colors"
            >
              Pre-Order
            </Link>
            <Link
              href="/#support"
              className="text-white/90 no-underline text-[0.85rem] hover:text-white/90 transition-colors"
            >
              Support
            </Link>
            <Link
              href="/resources/install"
              className="text-white/90 no-underline text-[0.85rem] hover:text-white/90 transition-colors"
            >
              Install App
            </Link>
            <a
              href="https://instagram.com/bradythecorgi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/90 no-underline text-[0.85rem] hover:text-white/90 transition-colors"
            >
              @bradythecorgi
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div
          className="pt-6 text-center text-[0.82rem]"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.8)",
          }}
        >
          Made with love for{" "}
          <span className="text-gold">Graffiti</span>
        </div>
      </div>
    </footer>
  );
}
