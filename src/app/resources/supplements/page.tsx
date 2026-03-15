import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { SUPPLEMENTS, SUPPLEMENT_CATEGORIES, STARTER_SUPPLEMENTS } from "@/lib/resources/supplements";
import { personalizeSupplements } from "@/lib/resources/personalize";
import type { DogProfile } from "@/lib/resources/types";
import SupplementsPageClient from "@/components/resources/SupplementsPageClient";

export const metadata: Metadata = {
  title: "Supplement Guide",
  description:
    "Research-backed supplements for HSA dogs — dosages personalized to your dog's weight, organized by category.",
};

export default async function SupplementsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile: DogProfile | null = null;
  let userActiveSlugs: string[] = [];

  if (user) {
    const { data } = await supabase
      .from("subscribers")
      .select("dog_name, breed, weight_lbs, cancer_stage")
      .eq("id", user.id)
      .single();

    if (data?.dog_name) {
      profile = {
        dogName: data.dog_name,
        breed: data.breed ?? null,
        weightLbs: data.weight_lbs ?? null,
        cancerStage: data.cancer_stage ?? null,
      };
    }

    // Fetch user's active supplement tracking
    const { data: userSupps } = await supabase
      .from("subscriber_supplements")
      .select("supplement_slug")
      .eq("subscriber_id", user.id)
      .is("stopped_at", null);
    userActiveSlugs = userSupps?.map((d) => d.supplement_slug) ?? [];
  }

  // Aggregate counts (anonymous, for all visitors)
  const { data: usageCounts } = await supabase.rpc("get_supplement_usage_counts");
  const usageCountMap: Record<string, number> = {};
  if (usageCounts) {
    for (const row of usageCounts) {
      usageCountMap[row.supplement_slug] = Number(row.active_count);
    }
  }

  const supplements = profile
    ? personalizeSupplements(SUPPLEMENTS, profile)
    : SUPPLEMENTS;

  return (
    <SupplementsPageClient
      profile={profile}
      supplements={supplements}
      starterSupplements={STARTER_SUPPLEMENTS}
      supplementCategories={SUPPLEMENT_CATEGORIES}
      usageCounts={usageCountMap}
      userActiveSlugs={userActiveSlugs}
      isAuthenticated={!!user}
    />
  );
}
