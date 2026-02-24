"use client";

import { usePathname } from "next/navigation";
import { useIsStandalone } from "@/hooks/useIsStandalone";
import { BottomTabBar } from "./BottomTabBar";

interface PWALayoutShellProps {
  header: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}

const APP_ROUTE_PREFIXES = ["/days", "/resources"];

function isAppRoute(pathname: string): boolean {
  return APP_ROUTE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export function PWALayoutShell({ header, footer, children }: PWALayoutShellProps) {
  const isStandalone = useIsStandalone();
  const pathname = usePathname();

  const showTabBar = isStandalone && isAppRoute(pathname);

  return (
    <>
      {!showTabBar && header}
      <main className={showTabBar ? "pb-[72px]" : ""}>{children}</main>
      {!showTabBar && footer}
      {showTabBar && <BottomTabBar />}
    </>
  );
}
