import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Activity, Zap } from "lucide-react";
import { Link } from "react-router-dom";

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-sky-50 via-background to-background dark:from-sky-950/20 dark:via-background dark:to-background">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute right-0 bottom-0 w-1/2 h-1/2 bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20100%20100%22%3E%3Cpath%20d%3D%22M50%200%20L100%2050%20L50%20100%20L0%2050%20Z%22%20fill%3D%22none%22%20stroke%3D%22%230ea5e9%22%20stroke-width%3D%220.5%22%2F%3E%3C%2Fsvg%3E')] bg-repeat bg-[length:50px_50px]" />
      </div>
      
      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-sky-100/80 dark:bg-sky-900/30 rounded-full border border-sky-200 dark:border-sky-800 mb-4">
            <Shield className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <span className="text-sm font-medium text-sky-700 dark:text-sky-300">ONCOVISION : AI-Powered Cancer Detection</span>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-xl md:text-2xl font-bold tracking-[0.3em] text-sky-600 dark:text-sky-400 uppercase">
              ONCOVISION
            </h2>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight text-foreground">
              Early Detection, <span className="bg-gradient-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent">Better Outcomes</span>
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Advanced AI-powered analysis for medical imaging. Get instant insights, risk assessments, and personalized recommendations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              onClick={onGetStarted}
              size="lg"
              className="bg-sky-500 hover:bg-sky-600 text-white shadow-lg hover:shadow-xl transition-all group px-8"
            >
              Start Analysis
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Link to="/learn-more">
              <Button 
                variant="outline"
                size="lg"
                className="border-foreground/20 bg-background hover:bg-muted px-8"
              >
                Learn More
                <Zap className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 max-w-3xl mx-auto">
            <div className="p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border hover:border-sky-500/50 transition-all">
              <div className="w-12 h-12 bg-sky-100 dark:bg-sky-900/30 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Activity className="w-6 h-6 text-sky-600 dark:text-sky-400" />
              </div>
              <h3 className="font-semibold mb-2">AI Analysis</h3>
              <p className="text-sm text-muted-foreground">Advanced algorithms for accurate detection</p>
            </div>
            
            <div className="p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border hover:border-cyan-500/50 transition-all">
              <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Shield className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
              </div>
              <h3 className="font-semibold mb-2">Secure & Private</h3>
              <p className="text-sm text-muted-foreground">Your data is encrypted and protected</p>
            </div>
            
            <div className="p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border hover:border-teal-500/50 transition-all">
              <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Zap className="w-6 h-6 text-teal-600 dark:text-teal-400" />
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