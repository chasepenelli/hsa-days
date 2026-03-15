import type { Metadata } from "next";
import { OrderPageClient } from "@/components/order/OrderPageClient";

export const metadata: Metadata = {
  title: "The Guided Journal | Pre-Order",
  description:
    "Pre-order the HSA Days Guided Journal. 30 days of reflections, prompts, and space for memories \u2014 printed and bound for your journey.",
  openGraph: {
    title: "HSA Days: The Guided Journal",
    description:
      "A printed companion for your 30-day journey with your dog. $29, ships Spring 2026.",
  },
};

export default function OrderPage() {
  return <OrderPageClient />;
}
