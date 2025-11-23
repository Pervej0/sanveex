import { Brain, Award, Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: FeatureItem[] = [
  {
    icon: <Brain className="h-12 w-12" />,
    title: "Importing Innovation",
    description:
      "Sanveex Global Health imports advanced biotechnology products from Turkey and Italy and delivers them to Bangladesh",
  },
  {
    icon: <Award className="h-12 w-12" />,
    title: "Delivering Quality",
    description:
      "We deliver high-quality, reliable health solutions that meet international standards, stored carefully at 2–8°C and 15–25°C to maintain their effectiveness",
  },
  {
    icon: <Stethoscope className="h-12 w-12" />,
    title: "Improving Healthcare",
    description:
      "Our mission is to make innovative healthcare accessible, helping improve the well-being of individuals and communities across the country.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="why_choose_us py-16 md:py-20 lg:py-24 bg-background">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative"
            >
              <div className="why_choose_us_details h-full p-8 bg-card border border-border rounded-lg hover:shadow-lg transition-all duration-300 hover:border-foreground-accent/20 hover:-translate-y-1">
                {/* Icon */}
                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-foreground-accent/10 text-foreground-accent group-hover:bg-foreground-accent group-hover:text-white transition-all duration-300">
                  {feature.icon}
                </div>

                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-bold text-foreground-accent mb-4 group-hover:text-foreground-accent transition-colors">
                  {feature.title}
                </h2>

                {/* Description */}
                <p className="text-base md:text-lg text-foreground-secondary leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}