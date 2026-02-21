export type WeightBracket = "under25" | "25to50" | "50to75" | "over75";

export interface DosageByWeight {
  under25: string;
  "25to50": string;
  "50to75": string;
  over75: string;
}

export type StageEmphasis = "all" | "early" | "advanced" | "palliative";

export interface Supplement {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  dosage: DosageByWeight;
  frequency: string;
  stageEmphasis: StageEmphasis;
  vetDiscussionPoints: string[];
  warnings?: string[];
  breedNotes?: Record<string, string>;
  sources?: string[];
  priority: number;
}

export interface SupplementCategory {
  key: string;
  label: string;
  description: string;
  accentColor: string;
}

export interface FoodItem {
  name: string;
  description: string;
  category: "recommended" | "avoid" | "appetite";
  stageEmphasis?: StageEmphasis;
  breedNotes?: Record<string, string>;
  icon: string;
  tip?: string;
}

export interface ClinicalReference {
  authors: string;
  title: string;
  journal: string;
  year: number;
  pmid?: string;
  summary: string;
}

export interface DietPrinciple {
  title: string;
  description: string;
  details: string[];
  icon: string;
  deepDive: string[];
  references: ClinicalReference[];
}

export interface SupplementTracking {
  supplementSlug: string;
  startedAt: string;
  stoppedAt: string | null;
}

export interface DogProfile {
  dogName: string;
  breed: string | null;
  weightLbs: number | null;
  cancerStage: string | null;
}
