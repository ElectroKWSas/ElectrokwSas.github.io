import SEO from "@/components/common/SEO";
import { SITE } from "@/config/site";
import Hero from "@/components/home/Hero";
import AboutPreview from "@/components/home/AboutPreview";
import Benefits from "@/components/home/Benefits";
import FeaturedServices from "@/components/home/FeaturedServices";
import CategoriesGrid from "@/components/home/CategoriesGrid";
import PromoBanner from "@/components/home/PromoBanner";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FaqSection from "@/components/home/FaqSection";
import CtaSection from "@/components/home/CtaSection";

export default function Home() {
  return (
    <>
      <SEO
        title={`${SITE.name} — Una solución para cada ocasión`}
        description={SITE.description}
        canonicalPath="/"
      />
      <Hero />
      <AboutPreview />
      <Benefits />
      <FeaturedServices />
      <CategoriesGrid />
      <PromoBanner />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
