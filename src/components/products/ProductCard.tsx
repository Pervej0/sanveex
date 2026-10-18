import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText, Package, Pill, ShieldCheck } from "lucide-react";
import type { PublicProduct } from "@/lib/products";

export interface ProductCardProps {
  product: PublicProduct;
  actions?: React.ReactNode;
  /** Compact variant used inside carousels. */
  compact?: boolean;
}

export default function ProductCard({
  product,
  actions,
  compact = false,
}: ProductCardProps) {
  const hasPrescribingInfo = product.links.length > 0;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-teal-300 hover:shadow-xl hover:shadow-navy-900/5">
      {actions && (
        <div className="absolute right-3 top-3 z-20 flex items-center gap-2">
          {actions}
        </div>
      )}

      {/* Media & Artwork preview */}
      <Link
        href={`/products/${product.slug}`}
        className={`relative block overflow-hidden bg-gradient-to-br from-slate-50 via-white to-navy-50/40 p-4 transition-colors group-hover:from-white group-hover:to-brand-teal-50/30 ${
          compact ? "h-48" : "h-56"
        }`}
      >
        <div className="relative h-full w-full">
          <Image
            src={product.image}
            alt={`${product.name} packaging — ${product.genericName ?? ""}`.trim()}
            fill
            sizes="(min-width: 1280px) 360px, (min-width: 640px) 45vw, 90vw"
            className="object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>

        {/* Category tag */}
        {product.categoryName && (
          <span className="absolute left-3.5 top-3.5 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary shadow-xs ring-1 ring-black/5 backdrop-blur-md">
            {product.categoryName}
          </span>
        )}

        {/* Strength chip */}
        {product.strength && (
          <span className="absolute bottom-3 right-3.5 rounded-md border border-navy-100 bg-white/95 px-2.5 py-0.5 text-[11px] font-bold text-navy-800 shadow-2xs backdrop-blur-md">
            {product.strength}
          </span>
        )}
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-xl font-extrabold tracking-tight text-navy-800">
            <Link
              href={`/products/${product.slug}`}
              className="transition-colors group-hover:text-primary"
            >
              {product.name}
            </Link>
          </h3>
          {product.brandBangla && (
            <span className="shrink-0 text-xs font-semibold text-muted-foreground/80">
              {product.brandBangla}
            </span>
          )}
        </div>

        {product.genericName && (
          <p className="mt-1 text-sm font-semibold text-brand-teal-600">
            {product.genericName}
          </p>
        )}

        {product.description && !compact && (
          <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {product.description}
          </p>
        )}

        {/* Specifications & Packaging */}
        <dl className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border/80 pt-3.5 text-xs text-muted-foreground">
          {product.dosageForm && (
            <div className="flex items-center gap-1.5">
              <Pill className="h-3.5 w-3.5 text-brand-teal-500" />
              <dt className="sr-only">Dosage form</dt>
              <dd className="font-medium text-navy-800">{product.dosageForm}</dd>
            </div>
          )}
          {product.packSize && (
            <div className="flex items-center gap-1.5">
              <Package className="h-3.5 w-3.5 text-brand-teal-500" />
              <dt className="sr-only">Pack size</dt>
              <dd className="font-medium text-navy-800">{product.packSize}</dd>
            </div>
          )}
        </dl>

        {/* Footer info & CTA */}
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-border/60 pt-3">
          <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500">
            <ShieldCheck className="h-3.5 w-3.5 text-brand-teal-500" />
            <span>WHO-GMP · DGDA</span>
          </div>

          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center gap-1.5 rounded-lg bg-navy-50 px-3 py-1.5 text-xs font-bold text-primary transition-all group-hover:bg-primary group-hover:text-white"
          >
            Clinical Details
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
