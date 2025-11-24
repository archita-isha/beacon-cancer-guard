import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, AlertTriangle } from "lucide-react";
import { AnalysisMetrics } from "@/utils/imageAnalysis";

interface AnalysisResultsProps {
  analysis: AnalysisMetrics;
  onReset: () => void;
}

export const AnalysisResults = ({ analysis, onReset }: AnalysisResultsProps) => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-600';
      case 'moderate': return 'text-yellow-600';
      default: return 'text-green-600';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'high': return <AlertCircle className="w-6 h-6" />;
      case 'moderate': return <AlertTriangle className="w-6 h-6" />;
      default: return <CheckCircle2 className="w-6 h-6" />;
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <Card className="p-8 space-y-6">
          <div className="text-center space-y-4">
            <div className={`flex items-center justify-center gap-3 ${getRiskColor(analysis.overallRisk)}`}>
              {getRiskIcon(analysis.overallRisk)}
              <h2 className="text-2xl font-bold uppercase">
                {analysis.overallRisk} Risk
              </h2>
            </div>
            <div className="pt-4 border-t">
              <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-lg font-bold ${
                analysis.classification === 'malignant' 
                  ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300' 
                  : 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300'
              }`}>
                <span className="uppercase">{analysis.classification}</span>
                <span className="text-sm font-normal opacity-75">({analysis.confidence.toFixed(1)}% confidence)</span>
              </div>
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
              Technical Details
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">{analysis.details.dominantColors}</div>
                <div className="text-xs text-muted-foreground">Colors</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{(analysis.details.edgeComplexity * 100).toFixed(1)}%</div>
                <div className="text-xs text-muted-foreground">Edge Complexity</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{(analysis.details.symmetryRatio * 100).toFixed(1)}%</div>
                <div className="text-xs text-muted-foreground">Symmetry</div>
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
