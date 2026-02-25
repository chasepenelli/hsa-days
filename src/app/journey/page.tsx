import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { JourneyPageClient } from "@/components/journey/JourneyPageClient";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "The Journey — 30 Days of Healing | HSA Days",
  description:
    "A free 30-day companion for the hardest season with your dog. Daily reflections, journaling prompts, and practical guidance — starting from the moment of diagnosis.",
  openGraph: {
    title: "The Journey — 30 Days of Healing | HSA Days",
    description:
      "Your dog was just diagnosed. There's a path through this. A free 30-day companion that walks beside you — one day at a time.",
    type: "website",
  },
};

export default async function JourneyPage() {
  const supabase = await createClient();

  const { data: day1 } = await supabase
    .from("daily_content")
    .select(
      "day_number, title, subtitle, category, quote, quote_author, reflection_intro, journal_prompt"
    )
    .eq("day_number", 1)
    .single();

  return <JourneyPageClient day1={day1} />;
}
