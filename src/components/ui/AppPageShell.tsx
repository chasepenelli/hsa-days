"use client";

import { useIsStandalone } from "@/hooks/useIsStandalone";

interface AppPageShellProps {
  children: React.ReactNode;
  maxWidth?: string;
}

export function AppPageShell({
  children,
  maxWidth = "600px",
}: AppPageShellProps) {
  const isStandalone = useIsStandalone();

  return (
    <div
      className="px-6"
      style={{
        paddingTop: isStandalone ? "24px" : "clamp(100px, 14vw, 140px)",
        paddingBottom: "clamp(60px, 8vw, 100px)",
      }}
    >
      <div style={{ maxWidth, marginLeft: "auto", marginRight: "auto" }}>
        {children}
      </div>
    </div>
  );
}
