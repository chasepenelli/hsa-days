import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import {
  DIET_FOOD_ITEMS,
  MEAL_PLAN_MAP,
  MEAL_FORM_GUIDE,
  CAUTIONS,
} from "@/lib/resources/diet";
import type { DogProfile } from "@/lib/resources/types";
import DietPageClient from "@/components/resources/DietPageClient";

export const metadata: Metadata = {
  title: "Diet & Nutrition Science | HSA Days",
  description:
    "What the research says about diet, metabolism, and cancer in dogs with HSA — including the Warburg Effect, anti-cancer foods, and a personalized meal plan generator.",
};

export default async function DietPage() {
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
    <DietPageClient
      profile={profile}
      foodItems={DIET_FOOD_ITEMS}
      mealPlanMap={MEAL_PLAN_MAP}
      mealFormGuide={MEAL_FORM_GUIDE}
      cautions={CAUTIONS}
    />
  );
}
