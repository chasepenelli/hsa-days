import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { DIET_PRINCIPLES, FOOD_ITEMS, FOOD_CATEGORIES } from "@/lib/resources/food";
import type { DogProfile } from "@/lib/resources/types";
import FoodPageClient from "@/components/resources/FoodPageClient";

export const metadata: Metadata = {
  title: "Food & Nutrition Guide",
  description:
    "What to feed, what to avoid, and how to keep their appetite up during HSA treatment.",
};

export default async function FoodPage() {
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

  return (
    <FoodPageClient
      profile={profile}
      dietPrinciples={DIET_PRINCIPLES}
      foodItems={FOOD_ITEMS}
      foodCategories={[...FOOD_CATEGORIES]}
    />
  );
}
