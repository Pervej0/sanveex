import HeroSection from "../components/home/HeroSection";
import FeatureSection from "../components/home/FeatureSection";
import TrustSection from "../components/home/TrustSection";
import ContactSection from "../components/home/ContactSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeatureSection />
      <TrustSection />
      <ContactSection />
    </div>
  );
}

