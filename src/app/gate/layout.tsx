import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preview Access",
};

export default function GateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
