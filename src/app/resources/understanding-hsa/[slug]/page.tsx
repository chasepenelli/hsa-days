import type { Metadata } from "next";
import { notFound } from "next/navigation";
import UnderstandingHSASubPageClient from "@/components/resources/UnderstandingHSASubPageClient";
import {
  KEY_FACTS,
  TUMOR_LOCATIONS,
  EPISODIC_WEAKNESS_WARNING,
  STAGING_INFO,
  DIAGNOSTIC_TESTS,
  TREATMENT_PATHS,
  BREED_RISKS,
  RESEARCH_BREAKTHROUGHS,
  CLINICAL_TRIALS,
  ONCOLOGIST_QUESTIONS,
} from "@/lib/resources/understanding-hsa";

const SLUGS = {
  "the-disease": {
    title: "The Disease",
    description: "What hemangiosarcoma is, where it grows, and key facts.",
  },
  diagnosis: {
    title: "Diagnosis & Staging",
    description: "How HSA is staged and the diagnostic tests involved.",
  },
  treatment: {
    title: "Treatment Options",
    description: "Surgery, chemotherapy, immunotherapy, and supportive care options.",
  },
  "breed-risks": {
    title: "Breed Risks",
    description: "Which dog breeds are most susceptible to HSA.",
  },
  research: {
    title: "Research & Hope",
    description: "Current research breakthroughs and active clinical trials.",
  },
  "vet-questions": {
    title: "Questions for Your Vet",
    description: "The 10 questions to ask your oncologist.",
  },
} as const;

type SlugKey = keyof typeof SLUGS;

export function generateStaticParams() {
  return Object.keys(SLUGS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const info = SLUGS[slug as SlugKey];
  if (!info) return { title: "Not Found" };
  return { title: info.title, description: info.description };
}

export default async function UnderstandingHSASubPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!(slug in SLUGS)) notFound();

  const dataMap: Record<SlugKey, Record<string, unknown>> = {
    "the-disease": {
      keyFacts: KEY_FACTS,
      tumorLocations: TUMOR_LOCATIONS,
      episodicWeaknessWarning: EPISODIC_WEAKNESS_WARNING,
    },
    diagnosis: {
      stagingInfo: STAGING_INFO,
      diagnosticTests: DIAGNOSTIC_TESTS,
    },
    treatment: {
      treatmentPaths: TREATMENT_PATHS,
    },
    "breed-risks": {
      breedRisks: BREED_RISKS,
    },
    research: {
      researchBreakthroughs: RESEARCH_BREAKTHROUGHS,
      clinicalTrials: CLINICAL_TRIALS,
    },
    "vet-questions": {
      oncologistQuestions: ONCOLOGIST_QUESTIONS,
    },
  };

  const info = SLUGS[slug as SlugKey];
  return (
    <UnderstandingHSASubPageClient
      slug={slug}
      title={info.title}
      data={dataMap[slug as SlugKey]}
    />
  );
}
