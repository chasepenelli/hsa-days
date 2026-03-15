import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhyThisExists } from "@/components/sections/WhyThisExists";
import { JourneyTimeline } from "@/components/sections/JourneyTimeline";
import { SeeInsideV2 } from "@/components/sections/SeeInsideV2";
import { About } from "@/components/sections/About";
import { CommunityStories } from "@/components/sections/CommunityStories";
import { Resources } from "@/components/sections/Resources";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { BackToTop } from "@/components/ui/BackToTop";

export default function Home() {
  return (
    <>
      <Hero />
      <Resources />
      <WhyThisExists />
      <HowItWorks />
      <JourneyTimeline />
      <SeeInsideV2 />
      <About />
      <CommunityStories />
      <FinalCTA />
      <BackToTop />
    </>
  );
}
