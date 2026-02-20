import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { JourneyPageClient } from "@/components/journey/JourneyPageClient";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "The Journey — 30 Days of Healing | HSA Days",
  description:
    "Explore the full 30-day HSA Days journey. Five phases of healing — from the shock of diagnosis to finding meaning — with daily guidance, reflections, and community.",
  openGraph: {
    title: "The Journey — 30 Days of Healing | HSA Days",
    description:
      "Five phases. Thirty days. A companion through the hardest season with your dog.",
    type: "website",
  },
};

export default async function JourneyPage() {
  const supabase = await createClient();

  const { data: days } = await supabase
    .from("daily_content")
    .select("day_number, title, subtitle, category, quote, quote_author")
    .order("day_number", { ascending: true });

  return <JourneyPageClient days={days ?? []} />;
}
