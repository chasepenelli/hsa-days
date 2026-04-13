import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { VetDocAnalyzer } from "@/components/tools/VetDocAnalyzer";
import { AppPageShell } from "@/components/ui/AppPageShell";

export const metadata: Metadata = {
  title: "Vet Report Analysis",
  description:
    "Upload a vet report or lab results and get a plain-English explanation of what they mean.",
};

export default async function AnalyzePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let dogName = "your dog";

  if (user) {
    const { data: subscriber } = await supabase
      .from("subscribers")
      .select("dog_name")
      .eq("id", user.id)
      .single();

    if (subscriber?.dog_name) {
      dogName = subscriber.dog_name;
    }
  }

  return (
    <AppPageShell>
      <VetDocAnalyzer dogName={dogName} isAuthenticated={!!user} />
    </AppPageShell>
  );
}
