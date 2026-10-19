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
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-slate-200/90 bg-white shadow-2xs transition-all duration-300 hover:border-brand-teal-400 hover:shadow-xl hover:shadow-navy-950/6">
      {actions && (
        <div className="absolute right-3 top-3 z-20 flex items-center gap-2">
          {actions}
        </div>
      )}

      {/* Media & Artwork preview */}
      <Link
        href={`/products/${product.slug}`}
        className={`relative block overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100/60 p-3 sm:p-5 ${
          compact ? "h-32 sm:h-44" : "h-36 sm:h-56"
        }`}
      >
        <div className="relative h-full w-full">
          <Image
            src={product.image}
            alt={`${product.name} packaging — ${product.genericName ?? ""}`.trim()}
            fill
            sizes="(min-width: 1280px) 360px, (min-width: 640px) 45vw, 50vw"
            className="object-contain p-1.5 sm:p-2 transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>

        {/* Category tag */}
        {product.categoryName && (
          <span className="absolute left-2 top-2 sm:left-3.5 sm:top-3.5 rounded-sm bg-navy-900/90 px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
            {product.categoryName}
          </span>
        )}

        {/* Strength chip */}
        {product.strength && (
          <span className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 rounded-md border border-slate-200 bg-white/95 px-1.5 sm:px-2.5 py-0.5 text-[10px] sm:text-[11px] font-bold text-navy-900 shadow-2xs backdrop-blur-md">
            {product.strength}
          </span>
        )}
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col p-3 sm:p-5 sm:p-6">
        <div className="flex items-baseline justify-between gap-1.5 sm:gap-2">
          <h3 className="text-xs sm:text-lg sm:text-xl font-bold tracking-tight text-navy-900 group-hover:text-primary transition-colors leading-snug line-clamp-1 sm:line-clamp-none">
            <Link href={`/products/${product.slug}`}>
              {product.name}
            </Link>
          </h3>
          {product.brandBangla && (
            <span className="hidden sm:inline-block shrink-0 text-xs font-medium text-slate-500">
              {product.brandBangla}
            </span>
          )}
        </div>

        {product.genericName && (
          <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-sm font-semibold text-brand-teal-600 truncate">
            {product.genericName}
          </p>
        )}

        {product.description && !compact && (
          <p className="hidden sm:block mt-2.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {product.description}
          </p>
        )}

        {/* Specifications & Packaging */}
        <dl className="mt-2.5 sm:mt-4 flex flex-wrap items-center gap-x-2.5 sm:gap-x-4 gap-y-1 sm:gap-y-2 border-t border-slate-100 pt-2 sm:pt-3.5 text-[10.5px] sm:text-xs text-muted-foreground">
          {product.dosageForm && (
            <div className="flex items-center gap-1 sm:gap-1.5">
              <Pill className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-brand-teal-500" />
              <dt className="sr-only">Dosage form</dt>
              <dd className="font-semibold text-navy-900">{product.dosageForm}</dd>
            </div>
          )}
          {product.packSize && (
            <div className="flex items-center gap-1 sm:gap-1.5">
              <Package className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-brand-teal-500" />
              <dt className="sr-only">Pack size</dt>
              <dd className="font-semibold text-navy-900">{product.packSize}</dd>
            </div>
          )}
        </dl>

        {/* Footer info & CTA */}
        <div className="mt-3 sm:mt-5 flex items-center justify-between gap-1.5 sm:gap-3 border-t border-slate-100 pt-2.5 sm:pt-3.5">
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
            <ShieldCheck className="h-3.5 w-3.5 text-brand-teal-500" />
            <span>WHO-GMP · DGDA</span>
          </div>

          <Link
            href={`/products/${product.slug}`}
            className="inline-flex w-full sm:w-auto items-center justify-center gap-1 sm:gap-1.5 rounded-md bg-navy-50 px-2 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-white"
          >
            <span>Clinical Details</span>
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
