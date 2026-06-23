import Hero from "@/components/Hero";
import Stats from "@/components/sections/Stats";
import About from "@/components/sections/About";
import WhyUs from "@/components/sections/WhyUs";
import ExploreGrid from "@/components/sections/ExploreGrid";
import MomentsGallery from "@/components/sections/MomentsGallery";
import Leadership from "@/components/sections/Leadership";
import Facilities from "@/components/sections/Facilities";
import Admissions from "@/components/sections/Admissions";
import { CTABanner } from "@/components/ui";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <About />
      <WhyUs />
      <MomentsGallery />
      <ExploreGrid />
      <Leadership />
      <Facilities />
      <Admissions />
      <CTABanner
        title="Ready to begin your child's journey?"
        subtitle="Enrollment open for session 2026–27"
        ctaLabel="Apply for 2026–27"
        ctaHref="/admissions"
      />
    </>
  );
}
