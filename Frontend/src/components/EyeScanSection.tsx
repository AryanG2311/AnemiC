import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Upload, CheckCircle, AlertTriangle, Sparkles, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ScanResult {
  risk: 'low' | 'high';
  confidence: number;
  message: string;
}

const EyeScanSection = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const { toast } = useToast();

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setResult(null);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScan = async () => {
    if (!selectedImage) {
      toast({
        title: "No Image Selected",
        description: "Please select an eye image first",
        variant: "destructive",
      });
      return;
    }

    setIsScanning(true);
    
    // Simulate API call to CNN model
    try {
      // Mock API endpoint - replace with actual endpoint
      const formData = new FormData();
      formData.append('eye_image', selectedImage);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock result - replace with actual API response
      const mockResult: ScanResult = {
        risk: Math.random() > 0.5 ? 'low' : 'high',
        confidence: Math.round((Math.random() * 0.3 + 0.7) * 100),
        message: Math.random() > 0.5 
          ? "Low Risk - Your eye analysis shows healthy indicators" 
          : "Possible Anaemia Risk - Consider getting tested by a healthcare professional"
      };
      
      setResult(mockResult);
      
      toast({
        title: "Scan Complete!",
        description: "Your results are ready",
      });
      
    } catch (error) {
      toast({
        title: "Scan Failed",
        description: "Please try again or check your connection",
        variant: "destructive",
      });
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <section id="eye-scan-section" className="py-20 bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-gradient-primary text-white px-4 py-2 rounded-full mb-6">
            <Eye className="w-5 h-5" />
            <span className="font-medium">AI-Powered Screening</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-foreground">
            Eye <span className="bg-gradient-primary bg-clip-text text-transparent">Scan Tool</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload a close-up photo of your eye and our AI will analyze it for signs of anaemia in seconds
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Upload Section */}
            <Card className="glass-card border-2 border-primary/20 hover-glow animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-center">Upload Eye Photo</h3>
                
                {!previewUrl ? (
                  <div className="border-2 border-dashed border-primary/30 rounded-2xl p-8 text-center hover:border-primary/60 transition-colors">
                    <div className="bg-gradient-primary w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Upload className="w-10 h-10 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Select Eye Image</h4>
                    <p className="text-muted-foreground mb-4">
                      Choose a clear, well-lit photo of your eye
                    </p>
                    <label htmlFor="eye-image" className="cursor-pointer">
                      <Button className="bg-gradient-primary hover:bg-gradient-accent text-white rounded-xl">
                        <Camera className="w-5 h-5 mr-2" />
                        Choose File
                      </Button>
                      <input
                        id="eye-image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageSelect}
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative rounded-2xl overflow-hidden">
                      <img
                        src={previewUrl}
                        alt="Selected eye"
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                    
                    <div className="flex gap-3">
                      <Button
                        onClick={handleScan}
                        disabled={isScanning}
                        className="flex-1 bg-gradient-primary hover:bg-gradient-accent text-white rounded-xl py-6"
                      >
                        {isScanning ? (
                          <>
                            <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Eye className="w-5 h-5 mr-2" />
                            Start Scan
                          </>
                        )}
                      </Button>
                      
                      <label htmlFor="eye-image-new" className="cursor-pointer">
                        <Button variant="outline" className="border-primary/30 rounded-xl py-6">
                          <Camera className="w-5 h-5" />
                        </Button>
                        <input
                          id="eye-image-new"
                          type="file"
                          accept="image/*"
                          onChange={handleImageSelect}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="glass-card border-2 border-accent/20 hover-glow animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-center">Scan Results</h3>
                
                {!result ? (
                  <div className="text-center py-12">
                    <div className="bg-gradient-accent w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                      <Sparkles className="w-10 h-10 text-white" />
                    </div>
                    <p className="text-muted-foreground">
                      Upload an eye photo to see your anaemia screening results
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Result Badge */}
                    <div className="text-center">
                      <div className={`inline-flex items-center gap-3 px-6 py-4 rounded-2xl ${
                        result.risk === 'low' 
                          ? 'bg-gradient-success' 
                          : 'bg-gradient-warning'
                      }`}>
                        {result.risk === 'low' ? (
                          <CheckCircle className="w-8 h-8 text-white" />
                        ) : (
                          <AlertTriangle className="w-8 h-8 text-white" />
                        )}
                        <span className="text-xl font-bold text-white">
                          {result.risk === 'low' ? 'Low Risk' : 'Possible Risk'}
                        </span>
                      </div>
                    </div>

                    {/* Confidence Score */}
                    <div className="text-center">
                      <div className="text-3xl font-bold text-foreground mb-2">
                        {result.confidence}%
                      </div>
                      <div className="text-sm text-muted-foreground">Confidence Score</div>
                    </div>

                    {/* Message */}
                    <div className="bg-muted/50 p-4 rounded-xl">
                      <p className="text-center text-foreground">
                        {result.message}
                      </p>
                    </div>

                    {/* Action Button */}
                    {result.risk === 'high' && (
                      <Button className="w-full bg-gradient-secondary hover:bg-gradient-warning text-white rounded-xl py-3">
                        Find Healthcare Centers Near You
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EyeScanSection;