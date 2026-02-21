import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { SUPPLEMENTS, SUPPLEMENT_CATEGORIES } from "@/lib/resources/supplements";
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
  }

  const supplements = profile
    ? personalizeSupplements(SUPPLEMENTS, profile)
    : SUPPLEMENTS;

  return (
    <SupplementsPageClient
      profile={profile}
      supplements={supplements}
      categories={SUPPLEMENT_CATEGORIES}
    />
  );
}
