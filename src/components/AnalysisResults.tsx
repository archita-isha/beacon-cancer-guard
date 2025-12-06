import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { AnalysisMetrics } from "@/utils/imageAnalysis";

interface AnalysisResultsProps {
  analysis: AnalysisMetrics;
  onReset: () => void;
}

export const AnalysisResults = ({ analysis, onReset }: AnalysisResultsProps) => {
  const isMalignant = analysis.classification === 'malignant';

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <Card className="p-8 space-y-6">
          <div className="text-center space-y-4">
            <div className={`flex items-center justify-center gap-3 ${isMalignant ? 'text-red-600' : 'text-green-600'}`}>
              {isMalignant ? <AlertCircle className="w-8 h-8" /> : <CheckCircle2 className="w-8 h-8" />}
              <h2 className="text-3xl font-bold uppercase">
                {analysis.classification}
              </h2>
            </div>
            <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-lg font-bold ${
              isMalignant 
                ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300' 
                : 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300'
            }`}>
              <span>{analysis.confidence.toFixed(1)}% confidence</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">Asymmetry Score</span>
                <span className="text-lg font-bold">{(analysis.asymmetryScore * 100).toFixed(1)}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all"
                  style={{ width: `${analysis.asymmetryScore * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">Border Irregularity</span>
                <span className="text-lg font-bold">{(analysis.borderIrregularity * 100).toFixed(1)}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all"
                  style={{ width: `${analysis.borderIrregularity * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">Color Variation</span>
                <span className="text-lg font-bold">{analysis.colorVariation}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all"
                  style={{ width: `${Math.min(analysis.colorVariation * 10, 100)}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">Diameter</span>
                <span className="text-lg font-bold">{analysis.diameter}px</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all"
                  style={{ width: `${Math.min((analysis.diameter / 1000) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t space-y-3">
            <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
              Analysis Metrics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">{analysis.details.dominantColors}</div>
                <div className="text-xs text-muted-foreground">Colors</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{(analysis.details.edgeComplexity * 100).toFixed(1)}%</div>
                <div className="text-xs text-muted-foreground">Edge</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{(analysis.details.symmetryRatio * 100).toFixed(1)}%</div>
                <div className="text-xs text-muted-foreground">Symmetry</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{(analysis.details.quantumEntanglement * 100).toFixed(1)}%</div>
                <div className="text-xs text-muted-foreground">Entanglement</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{(analysis.details.superpositionScore * 100).toFixed(1)}%</div>
                <div className="text-xs text-muted-foreground">Superposition</div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t">
            <Button onClick={onReset} className="w-full" size="lg">
              Analyze Another Image
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
};
