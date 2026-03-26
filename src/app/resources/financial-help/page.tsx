import type { Metadata } from "next";
import FinancialHelpPageClient from "@/components/resources/FinancialHelpPageClient";
import {
  FINANCIAL_INTRO,
  FINANCIAL_ORGS,
  APPLICATION_TIPS,
} from "@/lib/resources/financial-assistance";

export const metadata: Metadata = {
  title: "Financial Help",
  description:
    "Grants, financing, and assistance programs to help cover HSA treatment costs. Apply to multiple organizations simultaneously.",
};

export default function FinancialHelpPage() {
  return (
    <FinancialHelpPageClient
      intro={FINANCIAL_INTRO}
      orgs={FINANCIAL_ORGS}
      tips={APPLICATION_TIPS}
    />
  );
}
