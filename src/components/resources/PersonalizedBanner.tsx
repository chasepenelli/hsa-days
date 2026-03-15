"use client";

import type { DogProfile } from "@/lib/resources/types";

interface PersonalizedBannerProps {
  profile: DogProfile;
}

export default function PersonalizedBanner({
  profile,
}: PersonalizedBannerProps) {
  const parts: string[] = [];
  if (profile.weightLbs) parts.push(`${profile.weightLbs}lb`);
  if (profile.breed) parts.push(profile.breed);
  const detail = parts.length > 0 ? `, ${parts.join(" ")}` : "";

  return (
    <div
      className="rounded-2xl px-6 py-5 mb-8"
      style={{
        background:
          "linear-gradient(135deg, rgba(91,123,94,0.08) 0%, rgba(196,162,101,0.08) 100%)",
        border: "1px solid rgba(91,123,94,0.15)",
      }}
    >
      <p
        className="font-serif font-semibold"
        style={{ fontSize: "var(--text-h3)", color: "var(--text)" }}
      >
        Personalized for {profile.dogName}
        {detail}
      </p>
      {profile.cancerStage && (
        <p
          className="mt-1"
          style={{ fontSize: "var(--text-body-sm)", color: "var(--text-muted)" }}
        >
          Showing supplements relevant to Stage {profile.cancerStage}
        </p>
      )}
    </div>
  );
}
