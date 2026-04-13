import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Health tracking, vet report analysis, and supplement tracking tools for HSA dogs.",
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
