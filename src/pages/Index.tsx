import { useState, useRef } from "react";
import { Hero } from "@/components/Hero";
import { ImageUpload } from "@/components/ImageUpload";
import { AnalysisResults } from "@/components/AnalysisResults";
import { CancerInfo } from "@/components/CancerInfo";
import { RiskAssessment } from "@/components/RiskAssessment";

const Index = () => {
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const uploadSectionRef = useRef<HTMLDivElement>(null);

  const scrollToUpload = () => {
    uploadSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAnalysisComplete = (result: string) => {
    setAnalysisResult(result);
  };

  const handleReset = () => {
    setAnalysisResult(null);
  };

  return (
    <div className="min-h-screen">
      <Hero onGetStarted={scrollToUpload} />
      
      <div ref={uploadSectionRef}>
        {!analysisResult ? (
          <ImageUpload onAnalysisComplete={handleAnalysisComplete} />
        ) : (
          <AnalysisResults analysis={analysisResult} onReset={handleReset} />
        )}
      </div>

      <CancerInfo />
      <RiskAssessment />
      
      <footer className="py-12 px-4 border-t border-border bg-muted/30">
        <div className="container mx-auto max-w-7xl text-center">
          <p className="text-muted-foreground mb-4">
            This platform provides AI-assisted analysis for educational purposes only.
          </p>
          <p className="text-sm text-muted-foreground">
            Always consult qualified healthcare professionals for medical advice, diagnosis, and treatment.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
