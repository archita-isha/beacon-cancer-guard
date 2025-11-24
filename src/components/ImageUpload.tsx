import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, X, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { analyzeImage, AnalysisMetrics } from "@/utils/imageAnalysis";

interface ImageUploadProps {
  onAnalysisComplete: (result: AnalysisMetrics) => void;
}

export const ImageUpload = ({ onAnalysisComplete }: ImageUploadProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    try {
      const metrics = await analyzeImage(selectedImage);
      
      onAnalysisComplete(metrics);
      toast({
        title: "Analysis Complete",
        description: "Classical pattern recognition complete",
      });
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Upload Medical Image</h2>
          <p className="text-lg text-muted-foreground">
            Upload X-rays, MRI scans, CT scans, or skin lesion images for AI analysis
          </p>
        </div>

        <Card className="p-8 space-y-6">
          {!selectedImage ? (
            <div className="border-2 border-dashed border-border rounded-xl p-12 text-center hover:border-primary/50 transition-colors">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer flex flex-col items-center gap-4"
              >
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                  <Upload className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-semibold mb-2">Click to upload or drag and drop</p>
                  <p className="text-sm text-muted-foreground">
                    PNG, JPG, JPEG (MAX. 10MB)
                  </p>
                </div>
              </label>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative rounded-lg overflow-hidden border border-border">
                <img
                  src={selectedImage}
                  alt="Selected medical image"
                  className="w-full h-auto max-h-[500px] object-contain bg-muted"
                />
                <button
                  onClick={clearImage}
                  className="absolute top-4 right-4 p-2 bg-destructive text-white rounded-full hover:bg-destructive/90 transition-colors"
                  disabled={isAnalyzing}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full bg-primary hover:bg-primary/90 text-white"
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Analyze Image'
                )}
              </Button>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
};
