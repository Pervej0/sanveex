import Link from "next/link";
import { ArrowRight, PackageSearch, ShieldCheck, Sparkles } from "lucide-react";
import ProductCard from "../products/ProductCard";
import SectionHeader from "../shared/SectionHeader";
import type { PublicProduct } from "@/lib/products";

type Props = {
  products: PublicProduct[];
  /** Total products in the catalogue (may exceed the number rendered). */
  totalCount?: number;
};

export default function ProductShowcase({ products, totalCount }: Props) {
  if (products.length === 0) return null;

  const total = totalCount ?? products.length;

  return (
    <section id="products" className="relative bg-slate-50/70 border-y border-slate-200/80 section-y">
      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            align="left"
            icon={PackageSearch}
            eyebrow="Therapeutic Portfolio"
            title="Quality-assured medicines, formulated for clinical efficacy"
            description="Every Sanveex formulation is produced under strict WHO-GMP conditions by Amulet Pharmaceuticals Ltd. and authorized by the Directorate General of Drug Administration (DGDA), Bangladesh."
          />

          <div className="mb-12 hidden shrink-0 flex-col items-end gap-2.5 lg:flex">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-primary shadow-xs transition-colors hover:border-brand-teal-400 hover:text-brand-teal-700"
            >
              <span>Explore Full Catalogue</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-brand-teal-700">
              <ShieldCheck className="h-3.5 w-3.5 text-brand-teal-500" />
              100% DGDA &amp; WHO-GMP Authorized
            </span>
          </div>
        </div>

        {/* Product Cards Grid (2-col on small devices) */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-6 lg:grid-cols-3">
          {products.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 lg:hidden">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-navy-700"
          >
            Explore Full Product Catalogue
            <ArrowRight className="h-4 w-4" />
          </Link>
          <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-brand-teal-500" />
            WHO-GMP Certified Manufacturing
          </span>
        </div>
      </div>
    </section>
  );
}
