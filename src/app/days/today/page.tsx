import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function TodayPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Find the highest completed day
  const { data: progress } = await supabase
    .from("user_day_progress")
    .select("day_number")
    .eq("subscriber_id", user.id)
    .not("completed_at", "is", null)
    .order("day_number", { ascending: false })
    .limit(1);

  const lastCompleted = progress?.[0]?.day_number ?? 0;
  const nextDay = Math.min(lastCompleted + 1, 30);

  redirect(`/days/${nextDay}`);
}
