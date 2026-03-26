import type { Metadata } from "next";
import EmergencyPageClient from "@/components/resources/EmergencyPageClient";
import {
  EMERGENCY_INTRO,
  GUM_COLORS,
  EMERGENCY_SCENARIOS,
  EMERGENCY_KIT,
  VET_CONVERSATIONS,
  DAILY_MONITORING,
} from "@/lib/resources/emergency";

export const metadata: Metadata = {
  title: "Emergency Preparedness",
  description:
    "Know the signs of an HSA emergency, have a plan before you need one. Gum color guide, emergency kit checklist, and what to do during a crisis.",
};

export default function EmergencyPage() {
  return (
    <EmergencyPageClient
      intro={EMERGENCY_INTRO}
      gumColors={GUM_COLORS}
      emergencyScenarios={EMERGENCY_SCENARIOS}
      emergencyKit={EMERGENCY_KIT}
      vetConversations={VET_CONVERSATIONS}
      dailyMonitoring={DAILY_MONITORING}
    />
  );
}
