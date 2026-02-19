import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-text text-white/60 py-12 px-6 pb-[calc(48px+env(safe-area-inset-bottom))] md:pb-12">
      <div className="max-w-[1100px] mx-auto flex justify-between items-center flex-wrap gap-5 md:flex-row flex-col text-center md:text-left">
        <div className="font-serif text-[1.1rem] text-white/90">
          HSA <span className="text-gold">Days</span>
        </div>
        <div className="flex gap-6 flex-wrap justify-center">
          <Link
            href="/about"
            className="text-white/50 no-underline text-[0.85rem] hover:text-white/90 transition-colors"
          >
            Our Story
          </Link>
          <Link
            href="/#preview"
            className="text-white/50 no-underline text-[0.85rem] hover:text-white/90 transition-colors"
          >
            See Inside
          </Link>
          <Link
            href="/community"
            className="text-white/50 no-underline text-[0.85rem] hover:text-white/90 transition-colors"
          >
            Community
          </Link>
          <Link
            href="/order"
            className="text-white/50 no-underline text-[0.85rem] hover:text-white/90 transition-colors"
          >
            Pre-Order
          </Link>
          <a
            href="https://instagram.com/bradythecorgi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 no-underline text-[0.85rem] hover:text-white/90 transition-colors"
          >
            @bradythecorgi
          </a>
        </div>
        <div className="text-[0.85rem]">
          Made with love for{" "}
          <span className="text-gold">Graffiti</span>
        </div>
      </div>
    </footer>
  );
}
