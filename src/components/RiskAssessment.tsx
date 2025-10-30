import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";

interface Question {
  id: string;
  question: string;
  options: { value: string; label: string; risk: number }[];
}

const questions: Question[] = [
  {
    id: "age",
    question: "What is your age group?",
    options: [
      { value: "under-40", label: "Under 40", risk: 1 },
      { value: "40-50", label: "40-50", risk: 2 },
      { value: "50-60", label: "50-60", risk: 3 },
      { value: "over-60", label: "Over 60", risk: 4 }
    ]
  },
  {
    id: "family-history",
    question: "Do you have a family history of cancer?",
    options: [
      { value: "no", label: "No", risk: 0 },
      { value: "distant", label: "Distant relatives", risk: 2 },
      { value: "immediate", label: "Immediate family", risk: 4 }
    ]
  },
  {
    id: "lifestyle",
    question: "Do you smoke or use tobacco products?",
    options: [
      { value: "never", label: "Never", risk: 0 },
      { value: "former", label: "Former smoker", risk: 2 },
      { value: "current", label: "Current smoker", risk: 5 }
    ]
  },
  {
    id: "screening",
    question: "How often do you get cancer screenings?",
    options: [
      { value: "regular", label: "Regularly as recommended", risk: 0 },
      { value: "occasional", label: "Occasionally", risk: 2 },
      { value: "never", label: "Never", risk: 4 }
    ]
  }
];

export const RiskAssessment = () => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const calculateRisk = () => {
    let totalRisk = 0;
    questions.forEach(q => {
      const answer = answers[q.id];
      if (answer) {
        const option = q.options.find(opt => opt.value === answer);
        if (option) totalRisk += option.risk;
      }
    });
    return Math.min((totalRisk / 17) * 100, 100);
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length === questions.length) {
      setShowResults(true);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
  };

  const riskScore = calculateRisk();
  const isComplete = Object.keys(answers).length === questions.length;

  const getRiskLevel = () => {
    if (riskScore < 30) return { level: "Low", color: "text-green-600", icon: CheckCircle };
    if (riskScore < 60) return { level: "Moderate", color: "text-yellow-600", icon: Info };
    return { level: "High", color: "text-red-600", icon: AlertTriangle };
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Cancer Risk Assessment</h2>
          <p className="text-lg text-muted-foreground">
            Answer a few questions to understand your risk factors
          </p>
        </div>

        {!showResults ? (
          <Card className="p-8">
            <div className="space-y-8">
              {questions.map((q, index) => (
                <div key={q.id} className="space-y-4">
                  <Label className="text-lg font-semibold">
                    {index + 1}. {q.question}
                  </Label>
                  <RadioGroup
                    value={answers[q.id] || ""}
                    onValueChange={(value) => handleAnswerChange(q.id, value)}
                  >
                    {q.options.map((option) => (
                      <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <RadioGroupItem value={option.value} id={`${q.id}-${option.value}`} />
                        <Label
                          htmlFor={`${q.id}-${option.value}`}
                          className="flex-1 cursor-pointer"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ))}

              <Button
                onClick={handleSubmit}
                disabled={!isComplete}
                className="w-full bg-primary hover:bg-primary/90 text-white"
                size="lg"
              >
                Calculate Risk
              </Button>
            </div>
          </Card>
        ) : (
          <div className="space-y-6">
            <Card className="p-8">
              <div className="text-center space-y-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary/10 to-accent/10">
                  {(() => {
                    const { icon: Icon, color } = getRiskLevel();
                    return <Icon className={`w-10 h-10 ${color}`} />;
                  })()}
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold mb-2">Your Risk Level</h3>
                  <div className={`text-4xl font-bold ${getRiskLevel().color} mb-4`}>
                    {getRiskLevel().level}
                  </div>
                  <div className="max-w-md mx-auto space-y-2">
                    <Progress value={riskScore} className="h-3" />
                    <p className="text-sm text-muted-foreground">
                      Risk Score: {riskScore.toFixed(0)}%
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" />
                Recommendations
              </h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Schedule regular cancer screenings appropriate for your age</li>
                <li>• Maintain a healthy lifestyle with balanced diet and exercise</li>
                <li>• Avoid tobacco products and limit alcohol consumption</li>
                <li>• Stay informed about your family medical history</li>
                <li>• Consult with healthcare providers about personalized screening</li>
              </ul>
            </Card>

            <div className="flex justify-center">
              <Button
                onClick={handleReset}
                variant="outline"
                size="lg"
                className="border-primary/30 hover:border-primary hover:bg-primary/5"
              >
                Take Assessment Again
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
