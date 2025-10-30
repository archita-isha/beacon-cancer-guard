import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Activity } from "lucide-react";
import heroImage from "@/assets/hero-medical.jpg";

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      
      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-4">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Cancer Detection</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Early Detection,
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Better Outcomes</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Advanced AI-powered analysis for medical imaging. Get instant insights, risk assessments, and personalized recommendations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              onClick={onGetStarted}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all group"
            >
              Start Analysis
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-primary/30 hover:border-primary hover:bg-primary/5"
            >
              Learn More
              <Activity className="ml-2 w-5 h-5" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 max-w-3xl mx-auto">
            <div className="p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border hover:border-primary/50 transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Activity className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">AI Analysis</h3>
              <p className="text-sm text-muted-foreground">Advanced algorithms for accurate detection</p>
            </div>
            
            <div className="p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border hover:border-accent/50 transition-all">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Secure & Private</h3>
              <p className="text-sm text-muted-foreground">Your data is encrypted and protected</p>
            </div>
            
            <div className="p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border hover:border-secondary/50 transition-all">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <ArrowRight className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-semibold mb-2">Instant Results</h3>
              <p className="text-sm text-muted-foreground">Get analysis in seconds</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
