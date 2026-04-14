import { Hero } from "@/components/sections/Hero";
import { Triage } from "@/components/sections/Triage";
import { WhyThisExists } from "@/components/sections/WhyThisExists";
import { About } from "@/components/sections/About";
import { CommunityStories } from "@/components/sections/CommunityStories";
import { Resources } from "@/components/sections/Resources";
import { Tools } from "@/components/sections/Tools";
import { AppPreview } from "@/components/sections/AppPreview";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { BackToTop } from "@/components/ui/BackToTop";

export default function Home() {
  return (
    <>
      <Hero />
      <Triage />
      <WhyThisExists />
      <Resources />
      <Tools />
      <AppPreview />
      <About />
      <CommunityStories />
      <FinalCTA />
      <BackToTop />
    </>
  );
}
