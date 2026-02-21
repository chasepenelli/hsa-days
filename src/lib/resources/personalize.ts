import type {
  WeightBracket,
  DosageByWeight,
  StageEmphasis,
  Supplement,
  DogProfile,
} from "./types";

const WEIGHT_BRACKET_LABELS: Record<WeightBracket, string> = {
  under25: "Under 25 lbs",
  "25to50": "25-50 lbs",
  "50to75": "50-75 lbs",
  over75: "Over 75 lbs",
};

export function getWeightBracket(weightLbs: number): WeightBracket {
  if (weightLbs < 25) return "under25";
  if (weightLbs <= 50) return "25to50";
  if (weightLbs <= 75) return "50to75";
  return "over75";
}

export function getWeightBracketLabel(bracket: WeightBracket): string {
  return WEIGHT_BRACKET_LABELS[bracket];
}

export function getDosageForWeight(
  dosage: DosageByWeight,
  weightLbs: number | null
): { dose: string; bracket: WeightBracket; label: string } | null {
  if (!weightLbs) return null;
  const bracket = getWeightBracket(weightLbs);
  return {
    dose: dosage[bracket],
    bracket,
    label: WEIGHT_BRACKET_LABELS[bracket],
  };
}

export function getStageEmphases(
  cancerStage: string | null
): StageEmphasis[] {
  if (!cancerStage) return ["all"];

  const stage = cancerStage.trim().toUpperCase();
  if (stage === "I" || stage === "II") return ["all", "early"];
  if (stage === "III" || stage === "IV") return ["all", "advanced"];
  // "I'm not sure" or anything else
  return ["all"];
}

export function personalizeSupplements(
  supplements: Supplement[],
  profile: DogProfile
): Supplement[] {
  const validEmphases = getStageEmphases(profile.cancerStage);

  return supplements
    .filter((s) => validEmphases.includes(s.stageEmphasis))
    .sort((a, b) => {
      // Stage-specific supplements first, then by priority
      const aSpecific = a.stageEmphasis !== "all" ? 0 : 1;
      const bSpecific = b.stageEmphasis !== "all" ? 0 : 1;
      if (aSpecific !== bSpecific) return aSpecific - bSpecific;
      return a.priority - b.priority;
    });
}

export function getBreedNote(
  breedNotes: Record<string, string> | undefined,
  breed: string | null
): string | null {
  if (!breedNotes || !breed) return null;
  const breedLower = breed.toLowerCase();

  for (const [key, note] of Object.entries(breedNotes)) {
    if (breedLower.includes(key.toLowerCase())) {
      return note;
    }
  }
  return null;
}

export const ALL_WEIGHT_BRACKETS: {
  key: WeightBracket;
  label: string;
}[] = [
  { key: "under25", label: "Under 25 lbs" },
  { key: "25to50", label: "25-50 lbs" },
  { key: "50to75", label: "50-75 lbs" },
  { key: "over75", label: "Over 75 lbs" },
];
