import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { TrackPageClient } from "@/components/track/TrackPageClient";

export const metadata: Metadata = {
  title: "Health Tracker",
  description:
    "Track your dog's daily symptoms, medications, meals, and vet visits.",
};

export default async function TrackPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let dogName = "your dog";
  let initialLogs: unknown[] = [];
  let initialEntries: unknown[] = [];

  if (user) {
    // Fetch profile for dog name
    const { data: subscriber } = await supabase
      .from("subscribers")
      .select("dog_name")
      .eq("id", user.id)
      .single();

    if (subscriber?.dog_name) {
      dogName = subscriber.dog_name;
    }

    // Fetch recent symptom logs (last 7 for sparklines)
    const { data: logs } = await supabase
      .from("symptom_logs")
      .select("*")
      .eq("subscriber_id", user.id)
      .order("logged_at", { ascending: false })
      .limit(7);

    if (logs) initialLogs = logs;

    // Fetch recent health log entries
    const { data: entries } = await supabase
      .from("health_log_entries")
      .select("*")
      .eq("subscriber_id", user.id)
      .order("logged_at", { ascending: false })
      .limit(50);

    if (entries) initialEntries = entries;
  }

  return (
    <TrackPageClient
      dogName={dogName}
      isAuthenticated={!!user}
      initialLogs={initialLogs as never[]}
      initialEntries={initialEntries as never[]}
    />
  );
}
