import { ShieldCheck, FlaskConical, Truck, FileCheck2 } from "lucide-react";

const pillars = [
  {
    icon: ShieldCheck,
    title: "WHO-GMP Manufacturing",
    description:
      "Products are manufactured by Amulet Pharmaceuticals Ltd. under WHO Good Manufacturing Practice.",
  },
  {
    icon: FileCheck2,
    title: "DGDA Registered",
    description:
      "Every molecule in our portfolio holds a valid marketing authorisation issued by the DGDA.",
  },
  {
    icon: FlaskConical,
    title: "Quality Assurance",
    description:
      "Batch-level documentation, stability studies and retention samples for full traceability.",
  },
  {
    icon: Truck,
    title: "Nationwide Distribution",
    description:
      "A cold-chain-aware network reaching pharmacies, hospitals and clinics across all 64 districts.",
  },
];

export default function TrustBar() {
  return (
    <section className="border-b border-border bg-white">
      <div className="container-x">
        <div className="grid divide-border sm:grid-cols-2 sm:divide-x lg:grid-cols-4">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="flex gap-4 border-b border-border px-0 py-8 last:border-b-0 sm:border-b-0 sm:px-6 sm:first:pl-0 lg:py-10"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-primary">
                <pillar.icon className="h-5 w-5" strokeWidth={1.9} />
              </span>
              <div>
                <h3 className="text-sm font-bold text-navy-800">
                  {pillar.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
