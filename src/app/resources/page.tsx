import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { SUPPLEMENTS, SUPPLEMENT_CATEGORIES } from "@/lib/resources/supplements";
import { FOOD_ITEMS, DIET_PRINCIPLES } from "@/lib/resources/food";
import { ROOM_SECTIONS } from "@/lib/resources/home";
import { getWeightBracket, getWeightBracketLabel, getDosageForWeight } from "@/lib/resources/personalize";
import ResourcesHubClient from "@/components/resources/ResourcesHubClient";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Practical guides for HSA dog owners — supplements, nutrition, house-proofing, disease education, emergency preparedness, and financial help.",
};

// Map supplement category keys to display labels and colors
const CATEGORY_DISPLAY: Record<string, { label: string; color: string }> = {
  blood_support: { label: "Blood Support", color: "#D4856A" },
  anti_cancer: { label: "Anti-Cancer", color: "#5B7B5E" },
  immune_support: { label: "Immune", color: "#C4A265" },
  liver_organ: { label: "Liver", color: "#5B7B5E" },
  quality_of_life: { label: "Quality of Life", color: "#C4A265" },
};

export default async function ResourcesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile = {
    dogName: null as string | null,
    breed: null as string | null,
    weightLbs: null as number | null,
    cancerStage: null as string | null,
    weightBracketLabel: null as string | null,
  };

  if (user) {
    const { data } = await supabase
      .from("subscribers")
      .select("dog_name, breed, weight_lbs, cancer_stage")
      .eq("id", user.id)
      .single();
    if (data) {
      profile.dogName = data.dog_name ?? null;
      profile.breed = data.breed ?? null;
      profile.weightLbs = data.weight_lbs ?? null;
      profile.cancerStage = data.cancer_stage ?? null;
      if (profile.weightLbs) {
        profile.weightBracketLabel = getWeightBracketLabel(
          getWeightBracket(profile.weightLbs)
        );
      }
    }
  }

  // Top 4 supplements by priority
  const topSupplements = [...SUPPLEMENTS]
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 4)
    .map((s) => {
      const catDisplay = CATEGORY_DISPLAY[s.category] ?? {
        label: s.category,
        color: "#6B6B6B",
      };
      const doseInfo = profile.weightLbs
        ? getDosageForWeight(s.dosage, profile.weightLbs)
        : null;
      return {
        name: s.name,
        category: catDisplay.label,
        categoryColor: catDisplay.color,
        dose: doseInfo?.dose ?? null,
      };
    });

  // Food counts
  const foodCounts = {
    recommended: FOOD_ITEMS.filter((f) => f.category === "recommended").length,
    avoid: FOOD_ITEMS.filter((f) => f.category === "avoid").length,
    appetite: FOOD_ITEMS.filter((f) => f.category === "appetite").length,
  };

  // Count total references across all diet principles
  const referenceCount = DIET_PRINCIPLES.reduce(
    (acc, p) => acc + p.references.length,
    0
  );

  // Room sections for house-proofing
  const roomSections = ROOM_SECTIONS.map((r) => ({
    title: r.title,
    checklistCount: r.checklist.length,
  }));

  const totalChecklist = ROOM_SECTIONS.reduce(
    (acc, r) => acc + r.checklist.length,
    0
  );
  const totalProducts = ROOM_SECTIONS.reduce(
    (acc, r) => acc + r.products.length,
    0
  );
  const quickWinTip = ROOM_SECTIONS[0].checklist[0].text;

  return (
    <ResourcesHubClient
      profile={profile}
      supplementCount={SUPPLEMENTS.length}
      categoryCount={SUPPLEMENT_CATEGORIES.length}
      topSupplements={topSupplements}
      foodCounts={foodCounts}
      principleCount={DIET_PRINCIPLES.length}
      referenceCount={referenceCount}
      roomSections={roomSections}
      totalChecklist={totalChecklist}
      totalProducts={totalProducts}
      quickWinTip={quickWinTip}
    />
  );
}
