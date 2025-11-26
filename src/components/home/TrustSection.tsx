import { Award, Users, Globe2, TrendingUp } from "lucide-react";

const stats = [
  { label: "Years of Experience", value: "25+", icon: TrendingUp, color: "from-blue-500 to-blue-600" },
  { label: "Countries Served", value: "50+", icon: Globe2, color: "from-teal-500 to-teal-600" },
  { label: "Products Developed", value: "100+", icon: Award, color: "from-purple-500 to-purple-600" },
  { label: "Happy Patients", value: "1M+", icon: Users, color: "from-amber-500 to-amber-600" },
];

const partners = [
  "Pfizer", "Novartis", "Roche", "Merck", "Sanofi", "GSK"
];

export default function TrustSection() {
  return (
    <section className="section-padding bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className={`text-center group hover-lift animate-fade-in-up stagger-${index + 1}`}
            >
              <div className="mb-4 inline-flex items-center justify-center">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className={`text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-br ${stat.color} bg-clip-text text-transparent mb-2`}>
                {stat.value}
              </div>
              <div className="text-slate-600 font-medium text-sm sm:text-base">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Partners/Certifications */}
        <div className="text-center">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-8 sm:mb-12">
            Trusted by Industry Leaders
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 md:gap-16">
            {partners.map((partner) => (
              <div 
                key={partner} 
                className="text-xl sm:text-2xl font-bold text-slate-300 hover:text-primary transition-all duration-300 cursor-default hover:scale-110"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

