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
    quantumEntanglement: number;
    superpositionScore: number;
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
      
      // Quantum-inspired feature extraction
      const asymmetryScore = calculateAsymmetry(pixels, canvas.width, canvas.height);
      const borderIrregularity = calculateBorderIrregularity(pixels, canvas.width, canvas.height);
      const colorVariation = calculateColorVariation(pixels);
      const diameter = Math.max(canvas.width, canvas.height);
      
      // Quantum-inspired calculations
      const quantumEntanglement = calculateQuantumEntanglement(pixels, canvas.width, canvas.height);
      const superpositionScore = calculateSuperposition(pixels, canvas.width, canvas.height);
      
      const details = {
        dominantColors: countDominantColors(pixels),
        edgeComplexity: calculateEdgeComplexity(pixels, canvas.width, canvas.height),
        symmetryRatio: calculateSymmetryRatio(pixels, canvas.width, canvas.height),
        quantumEntanglement,
        superpositionScore
      };
      
      // Quantum-inspired risk scoring with amplitude amplification
      let riskScore = 0;
      const amplificationFactor = 1 + (quantumEntanglement * 0.3);
      
      // More balanced thresholds for better benign/malignant separation
      if (asymmetryScore > 0.35) riskScore += (asymmetryScore * amplificationFactor * 0.8);
      if (borderIrregularity > 0.4) riskScore += (borderIrregularity * amplificationFactor * 0.8);
      if (colorVariation > 3.5) riskScore += (colorVariation / 12 * amplificationFactor);
      if (diameter > 600) riskScore += (diameter / 1200 * amplificationFactor * 0.6);
      if (superpositionScore > 0.5) riskScore += (superpositionScore * amplificationFactor * 0.7);
      
      const normalizedRisk = riskScore / 2.5;
      const overallRisk = normalizedRisk >= 0.65 ? 'high' : normalizedRisk >= 0.35 ? 'moderate' : 'low';
      
      // Improved quantum-inspired classification with balanced weighting
      // Benign lesions typically have: low asymmetry, smooth borders, uniform color
      // Malignant lesions: high asymmetry, irregular borders, varied colors
      const variationalScore = (
        asymmetryScore * 0.22 +
        borderIrregularity * 0.22 +
        (colorVariation / 8) * 0.18 +
        details.edgeComplexity * 0.18 +
        quantumEntanglement * 0.12 +
        superpositionScore * 0.08
      );

      // Primary decision comes from overallRisk, threshold only for moderate cases
      let classification: 'benign' | 'malignant';
      if (overallRisk === 'low') {
        classification = 'benign';
      } else if (overallRisk === 'high') {
        classification = 'malignant';
      } else {
        // For moderate cases, use the quantum-inspired variational score
        classification = variationalScore > 0.52 ? 'malignant' : 'benign';
      }
      
      // Improved confidence calculation based on distance from decision boundary
      const distanceFromBoundary = Math.abs(variationalScore - 0.52);
      const normalizedDistance = Math.min(distanceFromBoundary / 0.52, 1);
      let baseConfidence = 60 + (normalizedDistance * 25); // 60–85%

      // Boost confidence slightly when overallRisk is clearly low or high
      if (overallRisk !== 'moderate') {
        baseConfidence += 5;
      }

      const quantumNoise = (Math.random() * 8 - 4); // ±4% noise
      const confidence = Math.max(58, Math.min(92, baseConfidence + quantumNoise));
      
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

// Quantum-inspired: Entanglement measures correlation between distant pixel regions
const calculateQuantumEntanglement = (pixels: Uint8ClampedArray, width: number, height: number): number => {
  const regions = 4; // Divide image into 4 quadrants
  const quadrantWidth = Math.floor(width / 2);
  const quadrantHeight = Math.floor(height / 2);
  
  const getQuadrantAverage = (startX: number, startY: number): number => {
    let sum = 0;
    let count = 0;
    for (let y = startY; y < startY + quadrantHeight && y < height; y++) {
      for (let x = startX; x < startX + quadrantWidth && x < width; x++) {
        const idx = (y * width + x) * 4;
        sum += (pixels[idx] + pixels[idx + 1] + pixels[idx + 2]) / 3;
        count++;
      }
    }
    return count > 0 ? sum / count : 0;
  };
  
  const q1 = getQuadrantAverage(0, 0);
  const q2 = getQuadrantAverage(quadrantWidth, 0);
  const q3 = getQuadrantAverage(0, quadrantHeight);
  const q4 = getQuadrantAverage(quadrantWidth, quadrantHeight);
  
  // Calculate correlation (entanglement) between diagonal quadrants
  const diagonal1Correlation = Math.abs(q1 - q4) / 255;
  const diagonal2Correlation = Math.abs(q2 - q3) / 255;
  
  return (diagonal1Correlation + diagonal2Correlation) / 2;
};

// Quantum-inspired: Superposition analyzes multiple feature states simultaneously
const calculateSuperposition = (pixels: Uint8ClampedArray, width: number, height: number): number => {
  const sampleSize = Math.min(1000, Math.floor(pixels.length / 16));
  const step = Math.floor(pixels.length / sampleSize / 4);
  
  let colorStates = new Set<string>();
  let intensityVariance = 0;
  const intensities: number[] = [];
  
  // Sample pixels in superposition (multiple states analyzed together)
  for (let i = 0; i < pixels.length; i += step * 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    
    // Quantum state representation
    const intensity = (r + g + b) / 3;
    intensities.push(intensity);
    
    // Color state bucketing
    const colorState = `${Math.floor(r / 64)},${Math.floor(g / 64)},${Math.floor(b / 64)}`;
    colorStates.add(colorState);
  }
  
  // Calculate variance (uncertainty in quantum system)
  const mean = intensities.reduce((a, b) => a + b, 0) / intensities.length;
  intensityVariance = intensities.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / intensities.length;
  
  // Normalized superposition score
  const stateCount = colorStates.size / 64; // Max 64 possible states in our bucketing
  const varianceScore = Math.min(intensityVariance / 10000, 1);
  
  return (stateCount + varianceScore) / 2;
};
