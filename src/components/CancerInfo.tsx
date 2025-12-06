import { Card } from "@/components/ui/card";
import { Activity, Brain, Heart, Stethoscope, Users, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const cancerTypes = [
  {
    icon: Brain,
    name: "Brain Cancer",
    description: "Early detection through MRI and CT scans can significantly improve outcomes.",
    color: "text-purple-600",
    slug: "brain"
  },
  {
    icon: Heart,
    name: "Lung Cancer",
    description: "Regular screening for high-risk individuals can detect cancer in early stages.",
    color: "text-red-600",
    slug: "lung"
  },
  {
    icon: Activity,
    name: "Breast Cancer",
    description: "Mammography and self-examination are key to early detection.",
    color: "text-pink-600",
    slug: "breast"
  },
  {
    icon: Stethoscope,
    name: "Skin Cancer",
    description: "Visual inspection and dermoscopy help identify suspicious lesions.",
    color: "text-orange-600",
    slug: "skin"
  },
  {
    icon: Users,
    name: "Prostate Cancer",
    description: "PSA testing and digital examination aid in early detection.",
    color: "text-blue-600",
    slug: "prostate"
  },
  {
    icon: Shield,
    name: "Colon Cancer",
    description: "Colonoscopy screening can detect and prevent cancer development.",
    color: "text-green-600",
    slug: "colon"
  }
];

export const CancerInfo = () => {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Cancer Types & Detection</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn about different cancer types and the importance of early detection
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cancerTypes.map((cancer, index) => {
            const Icon = cancer.icon;
            return (
              <Link to={`/cancer/${cancer.slug}`} key={index}>
                <Card 
                  className="p-6 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group h-full"
                >
                  <div className="flex flex-col items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className={`w-7 h-7 ${cancer.color}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{cancer.name}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {cancer.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <h3 className="text-2xl font-bold mb-4">Why Early Detection Matters</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-4xl mx-auto">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">90%+</div>
                <p className="text-sm text-muted-foreground">
                  Survival rate when cancer is detected early
                </p>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent mb-2">2x</div>
                <p className="text-sm text-muted-foreground">
                  More treatment options available with early detection
                </p>
              </div>
              <div>
                <div className="text-4xl font-bold text-secondary mb-2">50%</div>
                <p className="text-sm text-muted-foreground">
                  Reduction in mortality with regular screening
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
