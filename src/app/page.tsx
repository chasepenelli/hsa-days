import { Hero } from "@/components/sections/Hero";
import { WhyThisExists } from "@/components/sections/WhyThisExists";
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
      <About />
      <CommunityStories />
      <FinalCTA />
      <BackToTop />
    </>
  );
}
