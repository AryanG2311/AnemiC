import HeroSection from "@/components/HeroSection";
import EyeScanSection from "@/components/EyeScanSection";
import ChatBot from "@/components/ChatBot";
import BehaviorChangeSection from "@/components/BehaviorChangeSection";
import ResourcesSection from "@/components/ResourcesSection";
import TeamSection from "@/components/TeamSection";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <EyeScanSection />
      <BehaviorChangeSection />
      <ResourcesSection />
      <TeamSection />
      <ChatBot />
    </main>
  );
};

export default Index;