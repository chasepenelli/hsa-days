"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface Tab {
  label: string;
  href: string;
  icon: string;
  isActive: (pathname: string) => boolean;
}

const TABS: Tab[] = [
  {
    label: "Today",
    href: "/days/today",
    icon: "/illustrations/icons/icon-paw-print.png",
    isActive: (p) => /^\/days\/\d+/.test(p) || p === "/days/today",
  },
  {
    label: "Journal",
    href: "/days",
    icon: "/illustrations/icons/icon-journal.png",
    isActive: (p) => p === "/days",
  },
  {
    label: "Care",
    href: "/resources",
    icon: "/illustrations/icons/icon-heart.png",
    isActive: (p) => p.startsWith("/resources"),
  },
];

export function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav
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
            className="flex flex-col items-center justify-center gap-1 py-2 px-4 no-underline transition-colors min-h-[52px] flex-1"
            style={{ color: active ? "var(--sage)" : "var(--text-muted)" }}
          >
            <Image
              src={tab.icon}
              alt=""
              width={active ? 26 : 22}
              height={active ? 26 : 22}
              className="transition-all duration-200"
              style={{
                objectFit: "contain",
                opacity: active ? 1 : 0.45,
              }}
            />
            <span
              className="text-[0.62rem] font-semibold transition-colors duration-200"
              style={{
                color: active ? "var(--sage)" : "var(--text-muted)",
                opacity: active ? 1 : 0.55,
              }}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
