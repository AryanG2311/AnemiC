import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Award, Users, Code, Heart } from "lucide-react";
import teamPhoto from "@/assets/team-photo.jpg";

const teamMembers = [
  {
    name: "Priya Sharma",
    role: "AI/ML Developer",
    expertise: "Computer Vision & CNN Models",
    image: teamPhoto,
    social: {
      github: "https://github.com/priyasharma",
      linkedin: "https://linkedin.com/in/priyasharma",
      email: "priya@anaemicheck.com"
    }
  },
  {
    name: "Rahul Patel", 
    role: "Full-Stack Developer",
    expertise: "React & Backend APIs",
    image: teamPhoto,
    social: {
      github: "https://github.com/rahulpatel",
      linkedin: "https://linkedin.com/in/rahulpatel",
      email: "rahul@anaemicheck.com"
    }
  },
  {
    name: "Ananya Singh",
    role: "UI/UX Designer",
    expertise: "User Experience & Health Tech Design",
    image: teamPhoto,
    social: {
      github: "https://github.com/ananyasingh", 
      linkedin: "https://linkedin.com/in/ananyasingh",
      email: "ananya@anaemicheck.com"
    }
  },
  {
    name: "Arjun Kumar",
    role: "Health Research Lead", 
    expertise: "Medical Research & Data Analysis",
    image: teamPhoto,
    social: {
      github: "https://github.com/arjunkumar",
      linkedin: "https://linkedin.com/in/arjunkumar", 
      email: "arjun@anaemicheck.com"
    }
  }
];

const stats = [
  { icon: Code, label: "Lines of Code", value: "15,000+" },
  { icon: Users, label: "Hours Invested", value: "200+" },
  { icon: Heart, label: "Passion Level", value: "∞" },
  { icon: Award, label: "Goal", value: "Top 3" }
];

const TeamSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-muted/20 via-background to-accent/5">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-gradient-accent text-white px-4 py-2 rounded-full mb-6">
            <Users className="w-5 h-5" />
            <span className="font-medium">Meet Our Team</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-foreground">
            Built by <span className="bg-gradient-accent bg-clip-text text-transparent">Young Innovators</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A passionate team of students combining technology and healthcare to make anaemia screening accessible to every teenager
          </p>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {stats.map((stat, index) => (
            <Card key={index} className="glass-card border-2 border-primary/20 hover-glow text-center">
              <CardContent className="p-6">
                <div className="bg-gradient-primary w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          {teamMembers.map((member, index) => (
            <Card key={index} className="glass-card border-2 border-accent/20 hover-lift hover-glow transition-all duration-300 overflow-hidden">
              <CardContent className="p-0">
                {/* Profile Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Social Links Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 transition-opacity duration-300 hover:opacity-100">
                    <Button size="sm" className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 p-2 h-auto">
                      <Github className="w-4 h-4" />
                    </Button>
                    <Button size="sm" className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 p-2 h-auto">
                      <Linkedin className="w-4 h-4" />
                    </Button>
                    <Button size="sm" className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 p-2 h-auto">
                      <Mail className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Member Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                  <div className="text-primary font-semibold mb-2">{member.role}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{member.expertise}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Hackathon Badge */}
        <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <Card className="inline-block glass-card border-2 border-secondary/30 bg-gradient-to-r from-secondary/10 to-accent/10 overflow-hidden">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="bg-gradient-secondary w-16 h-16 rounded-full flex items-center justify-center">
                  <Award className="w-8 h-8 text-white" />
                </div>
                
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Built for Impact
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Created during a 48-hour hackathon to address adolescent anaemia in India
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      #HealthTech
                    </span>
                    <span className="bg-secondary/20 text-secondary px-3 py-1 rounded-full text-sm font-medium">
                      #AI4Good
                    </span>
                    <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-medium">
                      #Innovation
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;