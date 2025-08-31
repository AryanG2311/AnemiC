import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Download, Heart, Utensils, MapPin, Phone, Globe, FileText } from "lucide-react";

const resources = [
  {
    title: "Government Iron Supplement Program",
    description: "Free iron-folic acid tablets for adolescent girls through RKSK program",
    link: "https://nhm.gov.in/",
    icon: Heart,
    type: "Government",
    gradient: "bg-gradient-primary"
  },
  {
    title: "Anemia Mukt Bharat Initiative",
    description: "National program to reduce anemia prevalence by 3% per year",
    link: "https://anemiamuktbharat.info/",
    icon: Globe,
    type: "National Program", 
    gradient: "bg-gradient-secondary"
  },
  {
    title: "WHO Iron Deficiency Guide",
    description: "Global guidelines for iron deficiency anemia prevention and treatment",
    link: "https://www.who.int/",
    icon: FileText,
    type: "International",
    gradient: "bg-gradient-accent"
  },
  {
    title: "Local Health Centers",
    description: "Find nearby PHCs and CHCs providing free anemia screening and treatment",
    link: "#",
    icon: MapPin,
    type: "Local Services",
    gradient: "bg-gradient-success"
  }
];

const ResourcesSection = () => {
  const downloadDietGuide = () => {
    // Simulate PDF download
    const link = document.createElement('a');
    link.href = '/api/download/iron-rich-diet-guide.pdf'; // Placeholder URL
    link.download = 'Iron-Rich-Diet-Tips.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-background via-primary/5 to-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-gradient-success text-white px-4 py-2 rounded-full mb-6">
            <Utensils className="w-5 h-5" />
            <span className="font-medium">Get Help & Resources</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-foreground">
            Free <span className="bg-gradient-primary bg-clip-text text-transparent">Resources</span> & Support
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Access government programs, local health centers, and expert guidance for anaemia prevention and treatment
          </p>
        </div>

        {/* Resource Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {resources.map((resource, index) => (
            <Card key={index} className="glass-card border-2 border-primary/20 hover-glow hover-lift transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 ${resource.gradient} rounded-xl flex items-center justify-center`}>
                    <resource.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                    {resource.type}
                  </span>
                </div>
                <CardTitle className="text-xl font-bold text-foreground">
                  {resource.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {resource.description}
                </p>
                <Button 
                  className="w-full bg-gradient-primary hover:bg-gradient-accent text-white rounded-xl"
                  onClick={() => window.open(resource.link, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Diet Guide Download */}
        <div className="max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Card className="glass-card border-2 border-secondary/30 hover-glow text-center">
            <CardContent className="p-8">
              <div className="bg-gradient-secondary w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Utensils className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                Iron-Rich Diet Guide
              </h3>
              
              <p className="text-muted-foreground mb-6 text-lg">
                Download our comprehensive guide with meal plans, recipes, and tips to boost your iron levels naturally
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div className="bg-muted/50 p-3 rounded-xl">
                  <div className="font-semibold text-foreground">50+ Recipes</div>
                  <div className="text-muted-foreground">Iron-rich meals</div>
                </div>
                <div className="bg-muted/50 p-3 rounded-xl">
                  <div className="font-semibold text-foreground">7-Day Plan</div>
                  <div className="text-muted-foreground">Meal planning</div>
                </div>
              </div>
              
              <Button 
                onClick={downloadDietGuide}
                size="lg"
                className="bg-gradient-secondary hover:bg-gradient-primary text-white font-semibold px-8 py-3 rounded-2xl hover-lift"
              >
                <Download className="w-5 h-5 mr-3" />
                Download Free PDF Guide
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Contact */}
        <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <Card className="inline-block glass-card border-2 border-warning/30 bg-gradient-to-r from-warning/10 to-secondary/10">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Phone className="w-8 h-8 text-warning" />
                <div className="text-left">
                  <div className="font-semibold text-foreground">Need Immediate Help?</div>
                  <div className="text-muted-foreground">Call National Health Helpline: <span className="font-bold text-warning">104</span></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;