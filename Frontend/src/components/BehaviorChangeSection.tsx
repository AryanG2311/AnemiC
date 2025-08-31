import { Card, CardContent } from "@/components/ui/card";
import { TrendingDown, TrendingUp, Frown, Smile, Zap, Battery, BookOpen, Heart } from "lucide-react";

const factCards = [
  {
    front: "Did you know?",
    back: "Anaemia affects 40% of adolescent girls in India",
    icon: Heart,
    gradient: "bg-gradient-primary"
  },
  {
    front: "Impact Alert",
    back: "Lack of iron = tiredness + poor focus in school",
    icon: BookOpen,
    gradient: "bg-gradient-secondary"
  },
  {
    front: "Quick Recovery",
    back: "With proper treatment, energy levels can improve in 2-4 weeks",
    icon: Zap,
    gradient: "bg-gradient-accent"
  },
  {
    front: "Prevention Tip",
    back: "Eating vitamin C foods with iron-rich meals boosts absorption by 3x",
    icon: TrendingUp,
    gradient: "bg-gradient-success"
  }
];

const BehaviorChangeSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-muted/30 via-background to-muted/50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-gradient-accent text-white px-4 py-2 rounded-full mb-6">
            <TrendingUp className="w-5 h-5" />
            <span className="font-medium">Choose Your Path</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-foreground">
            Your <span className="bg-gradient-secondary bg-clip-text text-transparent">Health Journey</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See the difference between taking action and ignoring the signs
          </p>
        </div>

        {/* Split-screen Comparison */}
        <div className="grid md:grid-cols-2 gap-8 mb-20 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {/* If you skip treatment */}
          <Card className="relative overflow-hidden border-2 border-warning/30 hover-glow">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200" />
            <CardContent className="relative p-8 text-center">
              <div className="grayscale mb-6">
                <div className="w-20 h-20 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingDown className="w-10 h-10 text-warning" />
                </div>
                <Frown className="w-16 h-16 text-gray-500 mx-auto" />
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-gray-700">If You Skip Treatment</h3>
              
              <div className="space-y-4 text-left">
                <div className="flex items-center gap-3 text-gray-600">
                  <Battery className="w-5 h-5 text-warning" />
                  <span>Constant tiredness and weakness</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <BookOpen className="w-5 h-5 text-warning" />
                  <span>Poor concentration in studies</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Heart className="w-5 h-5 text-warning" />
                  <span>Weakened immune system</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <TrendingDown className="w-5 h-5 text-warning" />
                  <span>Declining academic performance</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* If you follow treatment */}
          <Card className="relative overflow-hidden border-2 border-success/30 hover-glow">
            <div className="absolute inset-0 bg-gradient-success opacity-10" />
            <CardContent className="relative p-8 text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-gradient-success rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
                <Smile className="w-16 h-16 text-success mx-auto" />
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-success">If You Follow Treatment</h3>
              
              <div className="space-y-4 text-left">
                <div className="flex items-center gap-3 text-foreground">
                  <Zap className="w-5 h-5 text-success" />
                  <span>High energy levels all day</span>
                </div>
                <div className="flex items-center gap-3 text-foreground">
                  <BookOpen className="w-5 h-5 text-success" />
                  <span>Better focus and memory</span>
                </div>
                <div className="flex items-center gap-3 text-foreground">
                  <Heart className="w-5 h-5 text-success" />
                  <span>Strong immune system</span>
                </div>
                <div className="flex items-center gap-3 text-foreground">
                  <TrendingUp className="w-5 h-5 text-success" />
                  <span>Improved academic performance</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Fun Fact Cards */}
        <div className="text-center mb-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-3xl font-bold mb-4 text-foreground">
            Amazing <span className="bg-gradient-accent bg-clip-text text-transparent">Facts</span>
          </h3>
          <p className="text-muted-foreground">Hover over the cards to reveal surprising facts!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          {factCards.map((card, index) => (
            <div key={index} className="group perspective-1000">
              <div className="relative w-full h-48 transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
                {/* Front */}
                <Card className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden cursor-pointer">
                  <CardContent className={`${card.gradient} h-full flex flex-col items-center justify-center text-white p-6`}>
                    <card.icon className="w-12 h-12 mb-4 animate-pulse" />
                    <h4 className="text-xl font-bold text-center">{card.front}</h4>
                  </CardContent>
                </Card>

                {/* Back */}
                <Card className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl overflow-hidden cursor-pointer">
                  <CardContent className="bg-white h-full flex items-center justify-center p-6 border-2 border-primary/20">
                    <p className="text-center text-foreground font-medium text-lg leading-relaxed">
                      {card.back}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default BehaviorChangeSection;