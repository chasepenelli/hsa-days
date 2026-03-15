import type { Metadata } from "next";
import { ROOM_SECTIONS } from "@/lib/resources/home";
import HouseProofingPageClient from "@/components/resources/HouseProofingPageClient";

export const metadata: Metadata = {
  title: "House-Proofing Guide",
  description:
    "Room-by-room guide to making your home safe and comfortable for a dog with cancer. Checklists, tips, and practical adjustments.",
};

export default function HouseProofingPage() {
  return <HouseProofingPageClient rooms={ROOM_SECTIONS} />;
}
