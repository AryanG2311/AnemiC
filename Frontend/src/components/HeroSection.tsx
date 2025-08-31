import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-bg.jpg";
import { Camera, Sparkles, Heart, ArrowRight } from "lucide-react";

const HeroSection = () => {
  const scrollToScan = () => {
    document.getElementById('eye-scan-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-hero flex items-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
          <Heart className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="absolute top-32 right-20 animate-float" style={{ animationDelay: '1s' }}>
        <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="absolute bottom-32 left-20 animate-float" style={{ animationDelay: '2s' }}>
        <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
          <Camera className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-8 animate-fade-in-up">
            <Sparkles className="w-4 h-4" />
            <span className="font-medium text-sm">AI-Powered Health Screening</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in-up text-shadow-lg" style={{ animationDelay: '0.2s' }}>
            Check Your{' '}
            <span className="bg-gradient-to-r from-white to-accent-glow bg-clip-text text-transparent">
              Anaemia Risk
            </span>{' '}
            in Seconds
          </h1>

          {/* Subtext */}
          <p className="text-xl md:text-2xl lg:text-3xl mb-8 text-white/90 max-w-3xl mx-auto animate-fade-in-up text-shadow" style={{ animationDelay: '0.4s' }}>
            AI-powered screening + teen-friendly awareness + behaviour change nudges
          </p>

          {/* CTA Button */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <Button 
              onClick={scrollToScan}
              size="lg" 
              className="bg-gradient-primary hover:bg-gradient-accent text-white font-semibold px-8 py-6 text-lg rounded-2xl shadow-2xl hover-lift animate-pulse-glow transition-all duration-300 group"
            >
              <Camera className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
              Scan Your Eye Now
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <div className="glass-card p-4 min-w-32">
              <div className="text-3xl font-bold text-accent-glow">40%</div>
              <div className="text-sm text-white/70">Teen Girls Affected</div>
            </div>
            <div className="glass-card p-4 min-w-32">
              <div className="text-3xl font-bold text-secondary-glow">95%</div>
              <div className="text-sm text-white/70">Accuracy Rate</div>
            </div>
            <div className="glass-card p-4 min-w-32">
              <div className="text-3xl font-bold text-success-glow">5sec</div>
              <div className="text-sm text-white/70">Quick Screening</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/80 to-transparent" />
    </section>
  );
};

export default HeroSection;