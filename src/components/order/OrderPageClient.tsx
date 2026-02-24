"use client";

import { OrderHero } from "./OrderHero";
import { WhyPhysical } from "./WhyPhysical";
import { WhatsInside } from "./WhatsInside";
import { LifestyleGallery } from "./LifestyleGallery";
import { Voices } from "./Voices";
import { ProductCTA } from "./ProductCTA";
import { StoryEditionSection } from "./StoryEditionSection";
import { OrderFAQ } from "./OrderFAQ";

export function OrderPageClient() {
  return (
    <>
      <OrderHero />
      <WhyPhysical />
      <WhatsInside />
      <LifestyleGallery />
      <Voices />
      <ProductCTA />
      <StoryEditionSection />
      <OrderFAQ />
    </>
  );
}
