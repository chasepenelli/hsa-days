import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhyThisExists } from "@/components/sections/WhyThisExists";
import { JourneyTimeline } from "@/components/sections/JourneyTimeline";
import { SeeInsideV2 } from "@/components/sections/SeeInsideV2";
import { EmailPreview } from "@/components/sections/EmailPreview";
import { About } from "@/components/sections/About";
import { CommunityStories } from "@/components/sections/CommunityStories";
import { Resources } from "@/components/sections/Resources";
import { PreOrder } from "@/components/sections/PreOrder";
import { SupportSection } from "@/components/sections/SupportSection";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <WhyThisExists />
      <JourneyTimeline />
      <SeeInsideV2 />
      <EmailPreview />
      <About />
      <CommunityStories />
      <Resources />
      <PreOrder />
      <SupportSection />
      <FinalCTA />
    </>
  );
}
