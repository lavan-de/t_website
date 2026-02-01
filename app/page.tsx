import { Header, Footer } from "@/components/layout";
import {
  HeroSection,
  FeaturesSection,
  HowItWorksSection,
  PricingSection,
  FAQSection,
  CTASection,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
