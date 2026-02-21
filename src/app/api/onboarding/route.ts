import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const petName = formData.get("pet_name") as string | null;
  const diagnosisDate = formData.get("diagnosis_date") as string | null;
  const cancerStage = formData.get("cancer_stage") as string | null;
  const photo = formData.get("photo") as File | null;

  if (!petName || petName.trim().length === 0) {
    return NextResponse.json(
      { error: "Pet name is required" },
      { status: 400 }
    );
  }

  let petPhotoPath: string | null = null;

  // Upload photo if provided
  if (photo && photo.size > 0) {
    const ext = photo.name.split(".").pop()?.toLowerCase() || "jpg";
    const filePath = `${user.id}/profile.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("pet-photos")
      .upload(filePath, photo, {
        upsert: true,
        contentType: photo.type,
      });

    if (uploadError) {
      console.error("Photo upload failed:", uploadError.message);
      return NextResponse.json(
        { error: "Photo upload failed" },
        { status: 500 }
      );
    }

    petPhotoPath = filePath;
  }

  // Update subscriber record
  const updateData: Record<string, unknown> = {
    dog_name: petName.trim(),
    onboarding_completed: true,
  };

  if (diagnosisDate) {
    updateData.diagnosis_date = diagnosisDate;
  }

  if (cancerStage) {
    updateData.cancer_stage = cancerStage;
  }

  if (petPhotoPath) {
    updateData.pet_photo_path = petPhotoPath;
  }

  const selectedPillsRaw = formData.get("selected_pills") as string | null;
  if (selectedPillsRaw) {
    try {
      updateData.selected_pills = JSON.parse(selectedPillsRaw);
    } catch { /* ignore malformed */ }
  }

  const avatarColor = formData.get("avatar_color") as string | null;
  if (avatarColor && ["sage", "gold", "terracotta"].includes(avatarColor)) {
    updateData.avatar_color = avatarColor;
  }

  const { error: updateError } = await supabase
    .from("subscribers")
    .update(updateData)
    .eq("id", user.id);

  if (updateError) {
    console.error("Failed to update subscriber:", updateError.message);
    return NextResponse.json(
      { error: "Failed to save onboarding data" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
