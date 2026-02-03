import { Header, Footer } from "@/components/layout";
import {
  HeroSection,
  PropertiesSection,
  ServicesSection,
  AboutSection,
  ContactSection,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-neutral-950 via-stone-900/30 to-neutral-950">
        <HeroSection />
        <PropertiesSection />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
