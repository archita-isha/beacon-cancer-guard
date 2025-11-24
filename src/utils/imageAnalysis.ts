export interface AnalysisMetrics {
  asymmetryScore: number;
  borderIrregularity: number;
  colorVariation: number;
  diameter: number;
  overallRisk: 'low' | 'moderate' | 'high';
  classification: 'benign' | 'malignant';
  confidence: number;
  details: {
    dominantColors: number;
    edgeComplexity: number;
    symmetryRatio: number;
  };
}

export const analyzeImage = async (imageData: string): Promise<AnalysisMetrics> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      const imageDataObj = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageDataObj.data;
      
      // Calculate metrics
      const asymmetryScore = calculateAsymmetry(pixels, canvas.width, canvas.height);
      const borderIrregularity = calculateBorderIrregularity(pixels, canvas.width, canvas.height);
      const colorVariation = calculateColorVariation(pixels);
      const diameter = Math.max(canvas.width, canvas.height);
      
      const details = {
        dominantColors: countDominantColors(pixels),
        edgeComplexity: calculateEdgeComplexity(pixels, canvas.width, canvas.height),
        symmetryRatio: calculateSymmetryRatio(pixels, canvas.width, canvas.height)
      };
      
      // Determine overall risk
      let riskScore = 0;
      if (asymmetryScore > 0.3) riskScore++;
      if (borderIrregularity > 0.4) riskScore++;
      if (colorVariation > 3) riskScore++;
      if (diameter > 600) riskScore++;
      
      const overallRisk = riskScore >= 3 ? 'high' : riskScore >= 2 ? 'moderate' : 'low';
      
      // Classification based on combined metrics
      const classificationScore = (asymmetryScore * 0.3) + (borderIrregularity * 0.3) + 
                                  (colorVariation / 10 * 0.2) + (details.edgeComplexity * 0.2);
      
      const classification = classificationScore > 0.35 ? 'malignant' : 'benign';
      const confidence = Math.min(Math.abs(classificationScore - 0.35) * 200, 99);
      
      resolve({
        asymmetryScore,
        borderIrregularity,
        colorVariation,
        diameter,
        overallRisk,
        classification,
        confidence,
        details
      });
    };
    
    img.src = imageData;
  });
};

const calculateAsymmetry = (pixels: Uint8ClampedArray, width: number, height: number): number => {
  const midX = Math.floor(width / 2);
  const midY = Math.floor(height / 2);
  
  let leftSum = 0, rightSum = 0, topSum = 0, bottomSum = 0;
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const brightness = (pixels[idx] + pixels[idx + 1] + pixels[idx + 2]) / 3;
      
      if (x < midX) leftSum += brightness;
      else rightSum += brightness;
      
      if (y < midY) topSum += brightness;
      else bottomSum += brightness;
    }
  }
  
  const horizontalDiff = Math.abs(leftSum - rightSum) / Math.max(leftSum, rightSum);
  const verticalDiff = Math.abs(topSum - bottomSum) / Math.max(topSum, bottomSum);
  
  return (horizontalDiff + verticalDiff) / 2;
};

const calculateBorderIrregularity = (pixels: Uint8ClampedArray, width: number, height: number): number => {
  let edgeChanges = 0;
  const threshold = 30;
  
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = (y * width + x) * 4;
      const current = (pixels[idx] + pixels[idx + 1] + pixels[idx + 2]) / 3;
      
      const right = ((pixels[idx + 4] + pixels[idx + 5] + pixels[idx + 6]) / 3);
      const bottom = ((pixels[((y + 1) * width + x) * 4] + pixels[((y + 1) * width + x) * 4 + 1] + pixels[((y + 1) * width + x) * 4 + 2]) / 3);
      
      if (Math.abs(current - right) > threshold || Math.abs(current - bottom) > threshold) {
        edgeChanges++;
      }
    }
  }
  
  return edgeChanges / (width * height);
};

const calculateColorVariation = (pixels: Uint8ClampedArray): number => {
  const colorBuckets = new Set<string>();
  const bucketSize = 32;
  
  for (let i = 0; i < pixels.length; i += 40) {
    const r = Math.floor(pixels[i] / bucketSize);
    const g = Math.floor(pixels[i + 1] / bucketSize);
    const b = Math.floor(pixels[i + 2] / bucketSize);
    colorBuckets.add(`${r},${g},${b}`);
  }
  
  return colorBuckets.size;
};

const countDominantColors = (pixels: Uint8ClampedArray): number => {
  const colorMap = new Map<string, number>();
  
  for (let i = 0; i < pixels.length; i += 40) {
    const r = Math.floor(pixels[i] / 32);
    const g = Math.floor(pixels[i + 1] / 32);
    const b = Math.floor(pixels[i + 2] / 32);
    const key = `${r},${g},${b}`;
    colorMap.set(key, (colorMap.get(key) || 0) + 1);
  }
  
  return Array.from(colorMap.values()).filter(count => count > 10).length;
};

const calculateEdgeComplexity = (pixels: Uint8ClampedArray, width: number, height: number): number => {
  let complexity = 0;
  
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = (y * width + x) * 4;
      const center = (pixels[idx] + pixels[idx + 1] + pixels[idx + 2]) / 3;
      
      let neighbors = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;
          const nIdx = ((y + dy) * width + (x + dx)) * 4;
          const neighbor = (pixels[nIdx] + pixels[nIdx + 1] + pixels[nIdx + 2]) / 3;
          neighbors += Math.abs(center - neighbor);
        }
      }
      complexity += neighbors;
    }
  }
  
  return complexity / (width * height * 8 * 255);
};

const calculateSymmetryRatio = (pixels: Uint8ClampedArray, width: number, height: number): number => {
  const midX = Math.floor(width / 2);
  let matchingPixels = 0;
  let totalPixels = 0;
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < midX; x++) {
      const leftIdx = (y * width + x) * 4;
      const rightIdx = (y * width + (width - 1 - x)) * 4;
      
      const leftBrightness = (pixels[leftIdx] + pixels[leftIdx + 1] + pixels[leftIdx + 2]) / 3;
      const rightBrightness = (pixels[rightIdx] + pixels[rightIdx + 1] + pixels[rightIdx + 2]) / 3;
      
      if (Math.abs(leftBrightness - rightBrightness) < 20) {
        matchingPixels++;
      }
      totalPixels++;
    }
  }
  
  return matchingPixels / totalPixels;
};
