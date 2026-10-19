import { ShieldCheck, FlaskConical, Truck, FileCheck2 } from "lucide-react";

const pillars = [
  {
    icon: ShieldCheck,
    tag: "01 · COMPLIANCE",
    title: "WHO-GMP Manufacturing",
    description:
      "Formulations produced under strict WHO Good Manufacturing Practice by Amulet Pharmaceuticals Ltd.",
  },
  {
    icon: FileCheck2,
    tag: "02 · AUTHORIZATION",
    title: "DGDA Registered",
    description:
      "Every single formulation holds active marketing authorization from the Directorate General of Drug Administration.",
  },
  {
    icon: FlaskConical,
    tag: "03 · TRACEABILITY",
    title: "Quality Assurance",
    description:
      "Batch-level clinical documentation, retention samples, and stability testing ensuring complete auditability.",
  },
  {
    icon: Truck,
    tag: "04 · DISTRIBUTION",
    title: "Nationwide Supply",
    description:
      "Comprehensive cold-chain and temperature-controlled distribution covering all 64 administrative districts.",
  },
];

export default function TrustBar() {
  return (
    <section className="relative z-30 -mt-10 pb-6 sm:-mt-12 lg:-mt-16">
      <div className="container-x">
        <div className="grid overflow-hidden rounded-lg border border-slate-200/90 border-t-4 border-t-brand-teal-400 bg-white shadow-xl shadow-navy-950/8 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="group relative flex flex-col justify-between p-6 transition-all duration-300 hover:bg-slate-50/70 sm:p-7"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-navy-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <pillar.icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <span className="text-[10px] font-bold tracking-[0.14em] text-brand-teal-600">
                    {pillar.tag}
                  </span>
                </div>

                <h3 className="text-base font-bold text-navy-900 group-hover:text-primary transition-colors">
                  {pillar.title}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {pillar.description}
                </p>
              </div>

              {/* Bottom Subtle Indicator */}
              <div className="mt-5 h-[2px] w-8 rounded-full bg-slate-200 group-hover:w-14 group-hover:bg-brand-teal-400 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
