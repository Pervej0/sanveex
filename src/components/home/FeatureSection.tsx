import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Pill, Microscope, Stethoscope, HeartPulse, FlaskConical, Dna } from "lucide-react";

const features = [
  {
    title: "Oncology",
    description: "Pioneering treatments for various forms of cancer, focusing on targeted therapies and immunotherapy.",
    icon: Dna,
    gradient: "from-rose-500/10 via-rose-500/5 to-transparent",
    iconGradient: "from-rose-500 to-rose-600",
    iconBg: "bg-rose-50",
  },
  {
    title: "Cardiology",
    description: "Comprehensive portfolio of medications for hypertension, heart failure, and lipid management.",
    icon: HeartPulse,
    gradient: "from-red-500/10 via-red-500/5 to-transparent",
    iconGradient: "from-red-500 to-red-600",
    iconBg: "bg-red-50",
  },
  {
    title: "Neurology",
    description: "Addressing complex neurological disorders including Alzheimer's, Parkinson's, and epilepsy.",
    icon: Microscope,
    gradient: "from-purple-500/10 via-purple-500/5 to-transparent",
    iconGradient: "from-purple-500 to-purple-600",
    iconBg: "bg-purple-50",
  },
  {
    title: "General Medicine",
    description: "Essential medicines for primary care, including antibiotics, analgesics, and anti-inflammatories.",
    icon: Pill,
    gradient: "from-blue-500/10 via-blue-500/5 to-transparent",
    iconGradient: "from-blue-500 to-blue-600",
    iconBg: "bg-blue-50",
  },
  {
    title: "Research & Development",
    description: "State-of-the-art laboratories dedicated to discovering the next generation of life-saving drugs.",
    icon: FlaskConical,
    gradient: "from-teal-500/10 via-teal-500/5 to-transparent",
    iconGradient: "from-teal-500 to-teal-600",
    iconBg: "bg-teal-50",
  },
  {
    title: "Patient Support",
    description: "Programs designed to help patients access medications and adhere to their treatment plans.",
    icon: Stethoscope,
    gradient: "from-amber-500/10 via-amber-500/5 to-transparent",
    iconGradient: "from-amber-500 to-amber-600",
    iconBg: "bg-amber-50",
  },
];

export default function FeatureSection() {
  return (
    <section className="section-padding bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
            Therapeutic Areas & Services
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed">
            We focus on areas of significant unmet medical need, leveraging our expertise to deliver innovative solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              className={`group hover-lift border-slate-200 overflow-hidden relative bg-white hover:border-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 animate-fade-in-up stagger-${(index % 6) + 1}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <CardHeader className="relative">
                <div className={`w-14 h-14 rounded-xl ${feature.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-${feature.iconBg}/20`}>
                  <div className={`bg-gradient-to-br ${feature.iconGradient} bg-clip-text text-transparent`}>
                    <feature.icon className="h-7 w-7" style={{ color: 'inherit' }} />
                  </div>
                </div>
                <CardTitle className="text-xl sm:text-2xl text-slate-900 group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <CardDescription className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

