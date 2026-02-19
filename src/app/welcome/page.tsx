import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import OnboardingWizard from "./OnboardingWizard";

export const metadata = {
  title: "Welcome — HSA Days",
};

export default async function WelcomePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Check if already onboarded
  const { data: subscriber } = await supabase
    .from("subscribers")
    .select("onboarding_completed")
    .eq("id", user.id)
    .single();

  if (subscriber?.onboarding_completed) {
    redirect("/days");
  }

  return <OnboardingWizard />;
}
