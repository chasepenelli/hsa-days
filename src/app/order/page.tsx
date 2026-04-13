import type { Metadata } from "next";
import { OrderPageClient } from "@/components/order/OrderPageClient";

export const metadata: Metadata = {
  title: "The Guided Journal | Pre-Order",
  description:
    "Pre-order the HSA Days Guided Journal \u2014 a printed companion with guided prompts and writing space for your dog's HSA journey. $29, ships Spring 2026.",
  openGraph: {
    title: "HSA Days: The Guided Journal",
    description:
      "A printed guided journal for dog owners navigating HSA. Prompts, writing space, and room for memories. $29, ships Spring 2026.",
  },
};

export default function OrderPage() {
  return <OrderPageClient />;
}
