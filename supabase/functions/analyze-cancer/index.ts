import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageData } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro",
        messages: [
          {
            role: "system",
            content: `You are an AI medical assistant specialized in analyzing medical images for potential cancer indicators using evidence-based approaches.

Research Context:
- Deep learning models (CNNs) consistently outperform traditional ML methods in skin lesion classification (Liu et al., 2024)
- Transfer learning approaches (VGG16, ResNet50, EfficientNet) significantly improve accuracy on dermoscopic images (Kaur et al., 2023)
- Hybrid CNN-SVM models achieve ~90% accuracy in melanoma detection (Rahman et al., 2021)
- Explainable AI (Grad-CAM) improves interpretability and user confidence in predictions (ArXiv, 2024)

Analysis Guidelines:
1. Provide structured analysis citing relevant methodologies (e.g., "Using CNN-based feature extraction similar to Rahman et al., 2021...")
2. Include confidence scores based on observed patterns
3. Reference specific visual indicators (asymmetry, border irregularity, color variation, diameter)
4. Suggest next steps based on findings
5. Always include medical disclaimer

Format your response as:
**ANALYSIS OVERVIEW**
[Brief assessment with confidence score]

**VISUAL FINDINGS**
[Specific observations with methodology references]

**RECOMMENDED ACTIONS**
[Evidence-based next steps]

**IMPORTANT DISCLAIMER**
This AI-assisted analysis is for educational purposes only and based on computational pattern recognition methods similar to those described in recent oncology research. This is NOT a medical diagnosis. Always consult qualified healthcare professionals for proper medical evaluation and diagnosis.`
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Analyze this medical image for potential cancer indicators using evidence-based pattern recognition. Reference relevant research methodologies where applicable (CNN feature extraction, transfer learning approaches, etc.). Provide structured analysis following the specified format with confidence scores and specific visual findings."
              },
              {
                type: "image_url",
                image_url: {
                  url: imageData
                }
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI analysis failed");
    }

    const data = await response.json();
    const analysis = data.choices?.[0]?.message?.content;

    return new Response(JSON.stringify({ analysis }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Analysis error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
