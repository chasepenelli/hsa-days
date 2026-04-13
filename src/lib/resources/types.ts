export type WeightBracket = "under25" | "25to50" | "50to75" | "over75";

export interface DosageByWeight {
  under25: string;
  "25to50": string;
  "50to75": string;
  over75: string;
}

export type StageEmphasis = "all" | "early" | "advanced" | "palliative";

export type EvidenceLevel = "studied-in-hsa" | "veterinary-use" | "emerging";

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
  evidenceLevel: EvidenceLevel;
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

// ── Diet Page Types ───────────────────────────────────────────────────────────

export type DietStyle = "low-carb" | "keto" | "balanced-fresh";

export interface MealPlanTemplate {
  title: string;
  dailyProtein: string;
  dailyVeg: string;
  dailyFat: string;
  weeklyRotation: string[];
  macros: { protein: number; fat: number; carbs: number };
  supplementPairings: string[];
  calorieNote: string;
}

export type MealPlanMap = Record<DietStyle, Record<WeightBracket, MealPlanTemplate>>;

export interface MealFormOption {
  label: string;
  icon: string;
  verdict: "recommended" | "good" | "avoid";
  verdictLabel: string;
  note: string;
}

export interface DietCaution {
  severity: "never" | "care";
  title: string;
  note: string;
}

// ── Diet v2 Types ──────────────────────────────────────────────────────────────

export type EvidenceTier = "strong" | "moderate" | "emerging";

export type SupplementPriority = "first" | "second" | "context";

export interface DietSupplement {
  slug: string;
  name: string;
  tagline: string;
  priority: SupplementPriority;  // first = start here; second = add next; context = situational
  evidenceTier: EvidenceTier;
  evidenceNote: string;     // 1 sentence explaining why this tier
  whatItDoes: string;       // 2-3 sentences, mechanistic
  whyHSA: string;           // 1-2 sentences, why specifically relevant to HSA
  dosing: {                 // weight-based dosing
    under25: string;
    "25to50": string;
    "50to75": string;
    over75: string;
  };
  keyStudy: string;         // 1 sentence citation
  sourcingNote: string;     // what to look for when buying
  cautions?: string;        // optional caution note
}

export interface ResearchSpotlight {
  institution: string;
  title: string;
  summary: string;         // 2-3 sentences
  relevance: string;       // 1 sentence on why it matters for diet
  status: string;          // e.g. "Active 2024–2025" or "Published 2022"
}

export interface DietSource {
  title: string;
  url: string;
  type: "clinical" | "review" | "organization" | "integrative";
  year: number;
}

// ── Health Log types ──

export type GumColor = "pink" | "pale" | "white" | "blue";

export interface SymptomLog {
  id: string;
  subscriber_id: string;
  logged_at: string;
  energy: number | null;
  appetite: number | null;
  gum_color: GumColor | null;
  mobility: number | null;
  comfort: number | null;
  notes: string | null;
  created_at: string;
}

export type HealthLogEntryType = "symptom_checkin" | "medication" | "meal" | "vet_visit" | "weight" | "note";

export interface HealthLogEntry {
  id: string;
  subscriber_id: string;
  logged_at: string;
  entry_type: HealthLogEntryType;
  title: string;
  notes: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface WeightLog {
  id: string;
  subscriber_id: string;
  logged_at: string;
  weight_lbs: number;
  notes: string | null;
  created_at: string;
}

export interface DocumentAnalysis {
  id: string;
  subscriber_id: string;
  file_name: string | null;
  input_type: "image" | "pdf" | "text";
  analysis_json: {
    summary: string;
    key_findings: string[];
    flagged_concerns: string[];
    suggested_questions: string[];
    disclaimer: string;
  } | null;
  created_at: string;
}
