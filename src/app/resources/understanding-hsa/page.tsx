import type { Metadata } from "next";
import UnderstandingHSAPageClient from "@/components/resources/UnderstandingHSAPageClient";
import {
  HSA_BASICS,
  KEY_FACTS,
  TUMOR_LOCATIONS,
  STAGING_INFO,
  DIAGNOSTIC_TESTS,
  TREATMENT_PATHS,
  BREED_RISKS,
  ONCOLOGIST_QUESTIONS,
  EPISODIC_WEAKNESS_WARNING,
  CLINICAL_TRIALS,
  RESEARCH_BREAKTHROUGHS,
} from "@/lib/resources/understanding-hsa";

export const metadata: Metadata = {
  title: "Understanding Hemangiosarcoma",
  description:
    "What hemangiosarcoma is, how it's diagnosed, treatment options with costs, breed risks, current research, and questions for your oncologist.",
};

export default function UnderstandingHSAPage() {
  return (
    <UnderstandingHSAPageClient
      basics={HSA_BASICS}
      keyFacts={KEY_FACTS}
      tumorLocations={TUMOR_LOCATIONS}
      stagingInfo={STAGING_INFO}
      diagnosticTests={DIAGNOSTIC_TESTS}
      treatmentPaths={TREATMENT_PATHS}
      breedRisks={BREED_RISKS}
      oncologistQuestions={ONCOLOGIST_QUESTIONS}
      episodicWeaknessWarning={EPISODIC_WEAKNESS_WARNING}
      clinicalTrials={CLINICAL_TRIALS}
      researchBreakthroughs={RESEARCH_BREAKTHROUGHS}
    />
  );
}
