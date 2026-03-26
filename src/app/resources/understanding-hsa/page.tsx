import type { Metadata } from "next";
import UnderstandingHSAHubClient from "@/components/resources/UnderstandingHSAHubClient";

export const metadata: Metadata = {
  title: "Understanding Hemangiosarcoma",
  description:
    "What hemangiosarcoma is, how it's diagnosed, treatment options with costs, breed risks, current research, and questions for your oncologist.",
};

export default function UnderstandingHSAPage() {
  return <UnderstandingHSAHubClient />;
}
