import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, AlertCircle, CheckCircle, Activity } from "lucide-react";

const cancerData: Record<string, {
  name: string;
  description: string;
  symptoms: string[];
  riskFactors: string[];
  prevention: string[];
  screening: string[];
  color: string;
}> = {
  brain: {
    name: "Brain Cancer",
    description: "Brain cancer occurs when abnormal cells form in the tissues of the brain. Brain tumors can be benign (not cancer) or malignant (cancer). Primary brain tumors start in the brain, while secondary tumors spread from other parts of the body.",
    symptoms: [
      "Persistent headaches that worsen over time",
      "Seizures or convulsions",
      "Vision problems or changes",
      "Difficulty with balance or walking",
      "Memory problems or confusion",
      "Personality or behavior changes"
    ],
    riskFactors: [
      "Family history of brain tumors",
      "Exposure to radiation",
      "Age (risk increases with age)",
      "Compromised immune system"
    ],
    prevention: [
      "Avoid unnecessary radiation exposure",
      "Protect head from injuries",
      "Maintain a healthy lifestyle",
      "Regular medical check-ups"
    ],
    screening: [
      "MRI (Magnetic Resonance Imaging)",
      "CT (Computed Tomography) scan",
      "Neurological examination",
      "Biopsy when necessary"
    ],
    color: "purple"
  },
  lung: {
    name: "Lung Cancer",
    description: "Lung cancer is one of the most common and serious types of cancer. It begins in the lungs and may spread to lymph nodes or other organs. Smoking is the leading cause, but non-smokers can also develop lung cancer.",
    symptoms: [
      "Persistent cough that doesn't go away",
      "Coughing up blood",
      "Shortness of breath",
      "Chest pain",
      "Hoarseness",
      "Unexplained weight loss"
    ],
    riskFactors: [
      "Smoking and secondhand smoke exposure",
      "Radon gas exposure",
      "Asbestos exposure",
      "Family history of lung cancer",
      "Air pollution"
    ],
    prevention: [
      "Don't smoke or quit smoking",
      "Avoid secondhand smoke",
      "Test your home for radon",
      "Avoid carcinogens at work",
      "Eat a healthy diet rich in fruits and vegetables"
    ],
    screening: [
      "Low-dose CT scan",
      "Chest X-ray",
      "Sputum cytology",
      "Bronchoscopy"
    ],
    color: "red"
  },
  breast: {
    name: "Breast Cancer",
    description: "Breast cancer forms in the cells of the breasts. It can occur in both women and men, though it's far more common in women. Significant progress in screening and treatment has led to improved survival rates.",
    symptoms: [
      "Lump in the breast or underarm",
      "Change in breast size or shape",
      "Skin dimpling or irritation",
      "Nipple discharge",
      "Redness or flaky skin",
      "Pain in breast area"
    ],
    riskFactors: [
      "Being female",
      "Increasing age",
      "Family history of breast cancer",
      "Genetic mutations (BRCA1, BRCA2)",
      "Obesity",
      "Alcohol consumption"
    ],
    prevention: [
      "Regular self-examination",
      "Maintain healthy weight",
      "Limit alcohol consumption",
      "Regular physical activity",
      "Consider genetic testing if at high risk"
    ],
    screening: [
      "Mammography",
      "Breast MRI",
      "Clinical breast exam",
      "Breast ultrasound"
    ],
    color: "pink"
  },
  skin: {
    name: "Skin Cancer",
    description: "Skin cancer is the abnormal growth of skin cells, most often developing on skin exposed to the sun. The three major types are basal cell carcinoma, squamous cell carcinoma, and melanoma.",
    symptoms: [
      "New mole or changing mole",
      "Sore that doesn't heal",
      "Shiny bump or nodule",
      "Red or scaly patch",
      "Asymmetrical lesions",
      "Borders that are irregular"
    ],
    riskFactors: [
      "Excessive sun exposure",
      "History of sunburns",
      "Fair skin",
      "Family history of skin cancer",
      "Many moles",
      "Weakened immune system"
    ],
    prevention: [
      "Use sunscreen SPF 30 or higher",
      "Avoid tanning beds",
      "Wear protective clothing",
      "Seek shade during peak sun hours",
      "Regular skin self-examinations"
    ],
    screening: [
      "Visual skin examination",
      "Dermoscopy",
      "Skin biopsy",
      "Total body photography"
    ],
    color: "orange"
  },
  prostate: {
    name: "Prostate Cancer",
    description: "Prostate cancer occurs in the prostate gland in men. It's one of the most common types of cancer in men. Many prostate cancers grow slowly and are confined to the prostate gland, where they may not cause serious harm.",
    symptoms: [
      "Difficulty urinating",
      "Decreased force in urine stream",
      "Blood in urine or semen",
      "Bone pain",
      "Erectile dysfunction",
      "Discomfort in pelvic area"
    ],
    riskFactors: [
      "Older age",
      "Family history",
      "Obesity",
      "Race (more common in Black men)"
    ],
    prevention: [
      "Healthy diet rich in vegetables",
      "Regular exercise",
      "Maintain healthy weight",
      "Discuss screening with doctor"
    ],
    screening: [
      "PSA (Prostate-Specific Antigen) test",
      "Digital rectal exam",
      "MRI",
      "Prostate biopsy"
    ],
    color: "blue"
  },
  colon: {
    name: "Colon Cancer",
    description: "Colon cancer, also called colorectal cancer, develops in the colon or rectum. It typically begins as small, benign clumps of cells called polyps that form on the inside of the colon. Over time, some polyps can become cancers.",
    symptoms: [
      "Change in bowel habits",
      "Blood in stool",
      "Persistent abdominal discomfort",
      "Weakness or fatigue",
      "Unexplained weight loss",
      "Feeling that bowel doesn't empty completely"
    ],
    riskFactors: [
      "Age over 50",
      "Personal history of polyps",
      "Inflammatory bowel disease",
      "Family history",
      "Low-fiber, high-fat diet",
      "Sedentary lifestyle"
    ],
    prevention: [
      "Regular screening colonoscopies",
      "High-fiber diet",
      "Regular exercise",
      "Limit red meat and processed foods",
      "Don't smoke",
      "Limit alcohol"
    ],
    screening: [
      "Colonoscopy",
      "Stool DNA test",
      "CT colonography",
      "Flexible sigmoidoscopy"
    ],
    color: "green"
  }
};

const CancerTypePage = () => {
  const { type } = useParams<{ type: string }>();
  const cancer = type ? cancerData[type] : null;

  if (!cancer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Cancer type not found</h1>
          <Link to="/">
            <Button>Go Back Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const colorClasses: Record<string, string> = {
    purple: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
    red: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
    pink: "bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300",
    orange: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
    blue: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    green: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Home
          </Button>
        </Link>

        <div className={`inline-block px-4 py-2 rounded-full mb-4 ${colorClasses[cancer.color]}`}>
          {cancer.name}
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-6">{cancer.name}</h1>
        <p className="text-lg text-muted-foreground mb-12 max-w-3xl">{cancer.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 dark:bg-red-950 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="text-xl font-semibold">Symptoms</h2>
            </div>
            <ul className="space-y-2">
              {cancer.symptoms.map((symptom, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                  {symptom}
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-950 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
              </div>
              <h2 className="text-xl font-semibold">Risk Factors</h2>
            </div>
            <ul className="space-y-2">
              {cancer.riskFactors.map((factor, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                  {factor}
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-950 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold">Prevention</h2>
            </div>
            <ul className="space-y-2">
              {cancer.prevention.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-950 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold">Screening Methods</h2>
            </div>
            <ul className="space-y-2">
              {cancer.screening.map((method, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  {method}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 text-center">
          <h3 className="text-2xl font-bold mb-4">Need an Analysis?</h3>
          <p className="text-muted-foreground mb-6">
            Use our AI-powered detection system for preliminary screening
          </p>
          <Link to="/">
            <Button size="lg">
              Start Analysis
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
};

export default CancerTypePage;
