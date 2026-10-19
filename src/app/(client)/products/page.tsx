import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ShieldCheck, FileCheck2, Award, Truck } from "lucide-react";
import ProductListing from "@/components/products/ProductListing";
import { company } from "@/lib/company";

export const metadata: Metadata = {
  title: "Pharmaceutical Products & Portfolio",
  description:
    "Explore Sanveex Global Health's portfolio of quality-assured, WHO-GMP manufactured and DGDA-registered medicines across Respiratory, Allergy, Bone and Nutritional Health.",
};

const trustPillars = [
  {
    icon: ShieldCheck,
    title: "WHO-GMP Compliance",
    desc: "Manufactured by Amulet Pharmaceuticals Ltd.",
  },
  {
    icon: FileCheck2,
    title: "DGDA Authorised",
    desc: "100% registered formulations",
  },
  {
    icon: Truck,
    title: "Nationwide Supply",
    desc: "Cold-chain distribution across 64 districts",
  },
  {
    icon: Award,
    title: "Clinical Assurance",
    desc: "Batch-traceable release documentation",
  },
];

export default function ProductsPage() {
  return (
    <div className="bg-background">
      {/* ================= Hero / Banner ================= */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 py-16 text-white lg:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(86,174,184,0.18),rgba(255,255,255,0))]" />
        <div className="container-x relative z-10">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumbs"
            className="mb-6 flex items-center gap-2 text-xs font-medium text-navy-200"
          >
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-navy-400" />
            <span className="text-brand-teal-300">Products &amp; Portfolio</span>
          </nav>

          <div className="max-w-3xl">
            <span className="eyebrow mb-4 text-xs text-brand-teal-300">
              Commercial Portfolio · Bangladesh
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Quality-Assured Pharmaceutical Formulations
            </h1>
            <p className="mt-5 text-base leading-relaxed text-navy-100 sm:text-lg">
              Sanveex Global Health brings evidence-based, DGDA-registered medicines to clinicians,
              hospitals, and pharmacies nationwide. Every batch is manufactured under WHO-GMP conditions
              by Amulet Pharmaceuticals Ltd.
            </p>
          </div>

          {/* Quick trust strip */}
          <div className="mt-12 grid grid-cols-2 gap-4 border-t border-white/10 pt-8 sm:grid-cols-4">
            {trustPillars.map((pillar) => (
              <div key={pillar.title} className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-brand-teal-300 backdrop-blur">
                  <pillar.icon className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white">{pillar.title}</h2>
                  <p className="mt-0.5 text-xs text-navy-200">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Product Catalogue ================= */}
      <section className="py-12 lg:py-20">
        <div className="container-x">
          <ProductListing />
        </div>
      </section>

      {/* ================= Regulatory & Contact CTA ================= */}
      <section className="border-t border-border bg-navy-50/60 py-12 lg:py-16">
        <div className="container-x">
          <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-navy-200/80 bg-white p-8 shadow-sm md:flex-row md:items-center lg:p-10">
            <div className="max-w-2xl">
              <span className="eyebrow mb-2 text-brand-teal-600">
                Medical &amp; Commercial Inquiries
              </span>
              <h2 className="text-2xl font-bold text-navy-800 sm:text-3xl">
                Need prescribing info or distribution partnership?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Our medical affairs and commercial distribution teams provide complete
                batch certificates of analysis (COA), DGDA dossiers, and supply schedules.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-semibold text-white shadow-sm transition-all hover:bg-navy-700"
              >
                Inquire with Commercial Team
              </Link>
              <a
                href={`tel:${company.contact.phoneHref}`}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-white px-5 text-sm font-semibold text-navy-800 transition-colors hover:border-navy-200"
              >
                {company.contact.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
