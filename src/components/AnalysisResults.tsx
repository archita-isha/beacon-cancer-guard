import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, FileText, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AnalysisResultsProps {
  analysis: string;
  onReset: () => void;
}

export const AnalysisResults = ({ analysis, onReset }: AnalysisResultsProps) => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Analysis Results</h2>
          <p className="text-lg text-muted-foreground">
            AI-powered insights from your medical image
          </p>
        </div>

        <div className="space-y-6">
          <Card className="p-8 space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-4">Detailed Analysis</h3>
                <div className="prose prose-slate max-w-none">
                  <p className="whitespace-pre-wrap text-foreground leading-relaxed">
                    {analysis}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-amber-900 dark:text-amber-200 mb-2">
                  Important Disclaimer
                </h4>
                <p className="text-sm text-amber-800 dark:text-amber-300">
                  This AI analysis is for informational purposes only and does not constitute medical advice. 
                  Always consult qualified healthcare professionals for proper diagnosis and treatment.
                </p>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-950 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Next Steps</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Consult a healthcare provider</li>
                    <li>• Schedule follow-up screening</li>
                    <li>• Keep records organized</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-950 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Resources</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Cancer information centers</li>
                    <li>• Support groups</li>
                    <li>• Educational materials</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          <div className="flex justify-center pt-6">
            <Button
              onClick={onReset}
              variant="outline"
              size="lg"
              className="border-primary/30 hover:border-primary hover:bg-primary/5"
            >
              Analyze Another Image
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
