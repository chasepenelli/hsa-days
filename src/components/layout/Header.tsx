"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    // Check auth state
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setIsLoggedIn(!!user);
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav
      className={`fixed top-0 w-full z-50 bg-warm-white/92 backdrop-blur-[12px] border-b border-border transition-shadow ${
        scrolled ? "shadow-[0_2px_20px_rgba(0,0,0,0.06)]" : ""
      }`}
    >
      <div className="max-w-[1100px] mx-auto px-6 h-16 flex items-center justify-between md:px-6 px-4 md:h-16 h-14">
        <Link
          href="/"
          className="font-serif text-[1.3rem] font-semibold text-sage-dark no-underline tracking-tight"
        >
          HSA <span className="text-gold">Days</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-8 items-center">
          <Link
            href="/about"
            className="text-[0.9rem] text-text-muted no-underline font-medium hover:text-sage transition-colors"
          >
            Our Story
          </Link>
          <Link
            href="/journey"
            className="text-[0.9rem] text-text-muted no-underline font-medium hover:text-sage transition-colors"
          >
            The Journey
          </Link>
          <Link
            href="/community"
            className="text-[0.9rem] text-text-muted no-underline font-medium hover:text-sage transition-colors"
          >
            Community
          </Link>
          <Link
            href="/resources"
            className="text-[0.9rem] text-text-muted no-underline font-medium hover:text-sage transition-colors"
          >
            Resources
          </Link>
          <Link
            href="/order"
            className="text-[0.9rem] text-text-muted no-underline font-medium hover:text-sage transition-colors"
          >
            Pre-Order
          </Link>
          {isLoggedIn ? (
            <>
              <Link
                href="/days"
                className="text-[0.9rem] text-sage no-underline font-medium hover:text-sage-dark transition-colors"
              >
                My Journey
              </Link>
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
                href="/days"
                className="bg-sage text-white px-5 py-2 rounded-lg font-medium hover:bg-sage-dark transition-colors text-[0.9rem]"
              >
                Start Free
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

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col bg-warm-white border-b border-border shadow-[0_8px_20px_rgba(0,0,0,0.06)]">
          <Link
            href="/about"
            onClick={closeMenu}
            className="px-6 py-3.5 text-[0.95rem] text-text-muted no-underline font-medium border-b border-border"
          >
            Our Story
          </Link>
          <Link
            href="/journey"
            onClick={closeMenu}
            className="px-6 py-3.5 text-[0.95rem] text-text-muted no-underline font-medium border-b border-border"
          >
            The Journey
          </Link>
          <Link
            href="/community"
            onClick={closeMenu}
            className="px-6 py-3.5 text-[0.95rem] text-text-muted no-underline font-medium border-b border-border"
          >
            Community
          </Link>
          <Link
            href="/resources"
            onClick={closeMenu}
            className="px-6 py-3.5 text-[0.95rem] text-text-muted no-underline font-medium border-b border-border"
          >
            Resources
          </Link>
          <Link
            href="/order"
            onClick={closeMenu}
            className="px-6 py-3.5 text-[0.95rem] text-text-muted no-underline font-medium border-b border-border"
          >
            Pre-Order
          </Link>
          {isLoggedIn ? (
            <>
              <Link
                href="/days"
                onClick={closeMenu}
                className="px-6 py-3.5 text-[0.95rem] text-sage no-underline font-medium border-b border-border"
              >
                My Journey
              </Link>
              <form action="/api/auth/logout" method="POST" className="px-6 py-3">
                <button
                  type="submit"
                  className="w-full text-center py-3.5 text-[0.95rem] text-text-muted font-medium bg-transparent border border-border rounded-[10px] cursor-pointer"
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
                className="px-6 py-3.5 text-[0.95rem] text-text-muted no-underline font-medium border-b border-border"
              >
                Sign In
              </Link>
              <Link
                href="/days"
                onClick={closeMenu}
                className="mx-6 my-3 bg-sage text-white text-center py-3.5 rounded-[10px] font-medium text-[0.95rem]"
              >
                Start Free
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
