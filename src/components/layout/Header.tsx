"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      if (isHomepage) {
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        setScrollProgress(docH > 0 ? Math.min(window.scrollY / docH, 1) : 0);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Check auth state
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setIsLoggedIn(!!user);
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomepage]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav
      aria-label="Main navigation"
      className="fixed top-0 w-full z-50 bg-warm-white/92 backdrop-blur-[12px] border-b border-border"
      style={{
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.06)" : "0 0 0 rgba(0,0,0,0)",
        transition: "box-shadow var(--duration-normal) ease",
      }}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-sage focus:text-white focus:text-sm focus:font-semibold"
      >
        Skip to content
      </a>
      <div className="max-w-[1100px] mx-auto px-6 h-14 md:h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-[1.3rem] font-semibold text-sage-dark no-underline tracking-tight"
        >
          HSA <span className="text-gold">Days</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-8 items-center">
          {([
            { href: "/resources", label: "Resources" },
            { href: "/community", label: "Community" },
          ] as { href: string; label: string }[]).map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`text-[0.9rem] no-underline font-medium transition-colors hover:text-sage ${isActive ? "text-sage font-medium" : "text-text-muted"}`}
              >
                {item.label}
              </Link>
            );
          })}
          {isLoggedIn ? (
            <>
              <form action="/api/auth/logout" method="POST">
                <button
                  type="submit"
                  className="text-[0.85rem] text-text-muted font-medium bg-transparent border border-border px-4 py-1.5 rounded-lg cursor-pointer hover:border-sage hover:text-sage transition-colors"
                >
                  Sign Out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-[0.9rem] text-text-muted no-underline font-medium hover:text-sage transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/resources"
                className="bg-sage text-white px-5 py-2 rounded-[10px] font-medium text-[0.9rem]"
                style={{
                  boxShadow: "0 2px 10px rgba(91,123,94,0.28)",
                  transition: "background var(--duration-fast) ease, transform var(--duration-fast) var(--ease-out-expo), box-shadow var(--duration-fast) var(--ease-out-expo)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = "0 4px 16px rgba(91,123,94,0.35)";
                  e.currentTarget.style.background = "var(--sage-dark)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 10px rgba(91,123,94,0.28)";
                  e.currentTarget.style.background = "var(--sage)";
                }}
              >
                Explore
              </Link>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-[5px] p-2 w-11 h-11 bg-transparent border-none cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span
            className={`block w-[22px] h-[2px] bg-text rounded-sm transition-transform ${
              menuOpen ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block w-[22px] h-[2px] bg-text rounded-sm transition-opacity ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-[22px] h-[2px] bg-text rounded-sm transition-transform ${
              menuOpen ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Scroll progress bar — homepage only */}
      {isHomepage && scrollProgress > 0 && (
        <div
          ref={progressRef}
          className="absolute bottom-0 left-0 h-[2px]"
          style={{
            width: `${scrollProgress * 100}%`,
            background: "linear-gradient(to right, var(--sage), var(--gold))",
            transition: "width 100ms linear",
          }}
        />
      )}

      {/* Mobile menu — always mounted, animated via CSS */}
      <div
        id="mobile-menu"
        className="md:hidden flex flex-col bg-warm-white overflow-hidden"
        aria-hidden={!menuOpen}
        {...(!menuOpen ? { inert: true as unknown as boolean } : {})}
        style={{
          maxHeight: menuOpen ? "600px" : "0",
          opacity: menuOpen ? 1 : 0,
          transition: menuOpen
            ? "max-height 0.3s var(--ease-out-expo), opacity 0.25s ease"
            : "max-height 0.2s var(--ease-in-gentle), opacity 0.15s ease",
          borderBottom: menuOpen ? "1px solid var(--border)" : "1px solid transparent",
          boxShadow: menuOpen ? "0 8px 20px rgba(0,0,0,0.06)" : "none",
        }}
      >
        {([
          { href: "/resources", label: "Resources" },
          { href: "/community", label: "Community" },
        ] as { href: string; label: string }[]).map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={closeMenu}
            className="px-6 py-3.5 text-[0.95rem] no-underline font-medium border-b border-border hover:bg-cream/50 text-text-muted hover:text-text"
            style={{
              transition: "color var(--duration-fast) ease, background var(--duration-fast) ease, opacity 0.3s ease, transform 0.3s var(--ease-out-expo)",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(-8px)",
              transitionDelay: menuOpen ? `${i * 40}ms` : "0ms",
            }}
          >
            {item.label}
          </Link>
        ))}
        {isLoggedIn ? (
          <>
            <form action="/api/auth/logout" method="POST" className="px-6 py-3">
              <button
                type="submit"
                className="w-full text-center py-3.5 text-[0.95rem] text-text-muted font-medium bg-transparent border border-border rounded-[10px] cursor-pointer hover:border-sage hover:text-sage"
                style={{ transition: "all var(--duration-fast) ease" }}
              >
                Sign Out
              </button>
            </form>
          </>
        ) : (
          <>
            <Link
              href="/login"
              onClick={closeMenu}
              className="px-6 py-3.5 text-[0.95rem] text-text-muted no-underline font-medium border-b border-border hover:text-text hover:bg-cream/50"
              style={{
                transition: "color var(--duration-fast) ease, background var(--duration-fast) ease, opacity 0.3s ease, transform 0.3s var(--ease-out-expo)",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(-8px)",
                transitionDelay: menuOpen ? "240ms" : "0ms",
              }}
            >
              Sign In
            </Link>
            <Link
              href="/resources"
              onClick={closeMenu}
              className="mx-6 my-3 bg-sage text-white text-center py-3.5 rounded-[10px] font-medium text-[0.95rem] hover:bg-sage-dark"
              style={{
                transition: "background var(--duration-fast) ease, opacity 0.3s ease, transform 0.3s var(--ease-out-expo)",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(-8px)",
                transitionDelay: menuOpen ? "280ms" : "0ms",
              }}
            >
              Explore
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
