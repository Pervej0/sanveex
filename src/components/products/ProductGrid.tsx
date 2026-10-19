"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import ProductCard from "./ProductCard";
import { cn } from "@/lib/utils";
import type { PublicProduct, PublicCategory } from "@/lib/products";

export default function ProductGrid({
  products,
  categories,
}: {
  products: PublicProduct[];
  categories: PublicCategory[];
}) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "all" || product.categorySlug === activeCategory;

      if (!matchesCategory) return false;
      if (!q) return true;

      return [product.name, product.genericName, product.description, product.therapeuticClass]
        .filter(Boolean)
        .some((field) => String(field).toLowerCase().includes(q));
    });
  }, [products, query, activeCategory]);

  const availableCategories = categories.filter((category) =>
    products.some((p) => p.categorySlug === category.slug),
  );

  return (
    <div>
      {/* Toolbar */}
      <div className="mb-8 flex flex-col gap-4 rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
          <SlidersHorizontal className="h-4 w-4 shrink-0 text-muted-foreground" />
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={cn(
              "shrink-0 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all",
              activeCategory === "all"
                ? "bg-primary text-white shadow-sm ring-2 ring-brand-teal-400/40"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200/80 hover:text-navy-900",
            )}
          >
            All products
          </button>
          {availableCategories.map((category) => (
            <button
              key={category.slug}
              type="button"
              onClick={() => setActiveCategory(category.slug)}
              className={cn(
                "shrink-0 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all",
                activeCategory === category.slug
                  ? "bg-primary text-white shadow-sm ring-2 ring-brand-teal-400/40"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200/80 hover:text-navy-900",
              )}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="relative lg:w-80">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by brand or generic name…"
            aria-label="Search products"
            className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50/50 pl-9 pr-9 text-sm text-slate-800 outline-none transition-all placeholder:text-muted-foreground focus:border-brand-teal-400 focus:bg-white focus:ring-2 focus:ring-brand-teal-400/20"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground transition-colors hover:text-navy-800"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      {filtered.length > 0 ? (
        <>
          <p className="mb-5 text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-navy-800">
              {filtered.length}
            </span>{" "}
            of {products.length} products
          </p>
          <div className="grid grid-cols-2 gap-2.5 sm:gap-6 lg:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      ) : (
        <div className="rounded-xl border-2 border-dashed border-border bg-muted/20 py-20 text-center">
          <p className="font-semibold text-navy-800">No products found</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try a different brand name, generic name or therapeutic area.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActiveCategory("all");
            }}
            className="mt-4 text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
