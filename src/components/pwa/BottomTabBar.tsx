"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useRef, useCallback } from "react";

interface Tab {
  label: string;
  href: string;
  icon: string;
  isActive: (pathname: string) => boolean;
}

const TABS: Tab[] = [
  {
    label: "Resources",
    href: "/resources",
    icon: "/illustrations/icons/icon-heart.png",
    isActive: (p) => p.startsWith("/resources"),
  },
  {
    label: "Track",
    href: "/track",
    icon: "/illustrations/icons/icon-paw-print.png",
    isActive: (p) => p.startsWith("/track") || p.startsWith("/tools"),
  },
  {
    label: "Community",
    href: "/community",
    icon: "/illustrations/icons/icon-community.png",
    isActive: (p) => p.startsWith("/community"),
  },
];

export function BottomTabBar() {
  const pathname = usePathname();
  const lastTapRef = useRef<{ tab: string; time: number }>({ tab: "", time: 0 });

  const handleTap = useCallback(
    (e: React.MouseEvent, tab: Tab) => {
      const active = tab.isActive(pathname);
      if (active) {
        const now = Date.now();
        const last = lastTapRef.current;
        // Scroll to top on re-tap of active tab
        if (last.tab === tab.href && now - last.time < 800) {
          // Double-tap — already scrolling from first tap
        } else {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        lastTapRef.current = { tab: tab.href, time: now };
      }
    },
    [pathname]
  );

  return (
    <nav
      aria-label="App navigation"
      className="fixed bottom-0 left-0 right-0 z-50 flex items-stretch justify-around"
      style={{
        background: "rgba(250,248,245,0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderTop: "1px solid var(--border)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {TABS.map((tab) => {
        const active = tab.isActive(pathname);
        return (
          <Link
            key={tab.label}
            href={tab.href}
            onClick={(e) => handleTap(e, tab)}
            aria-current={active ? "page" : undefined}
            className="flex flex-col items-center justify-center gap-1 py-2 px-4 no-underline transition-colors min-h-[52px] flex-1"
            style={{ color: active ? "var(--sage)" : "var(--text-muted)" }}
          >
            <div
              className="flex items-center justify-center transition-transform duration-200"
              style={{
                width: 28,
                height: 28,
                transform: active ? "scale(1.15)" : "scale(1)",
              }}
            >
              <Image
                src={tab.icon}
                alt=""
                width={24}
                height={24}
                className="transition-opacity duration-200"
                style={{
                  objectFit: "contain",
                  opacity: active ? 1 : 0.5,
                }}
              />
            </div>
            <span
              className="text-[0.7rem] font-semibold transition-colors duration-200"
              style={{
                color: active ? "var(--sage)" : "var(--text-muted)",
                opacity: active ? 1 : 0.6,
              }}
            >
              {tab.label}
            </span>
            {/* Active indicator dot */}
            <span
              className="transition-all duration-200"
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: active ? "var(--sage)" : "transparent",
                marginTop: -2,
              }}
            />
          </Link>
        );
      })}
    </nav>
  );
}
