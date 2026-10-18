"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProductSpec } from "@/lib/product-data";

export default function ClinicalAccordion({
  sections,
}: {
  sections: ProductSpec[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (sections.length === 0) return null;

  return (
    <div className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-white">
      {sections.map((section, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={section.label}>
            <h3>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-navy-50 sm:px-6"
              >
                <span
                  className={cn(
                    "font-display text-base font-bold transition-colors sm:text-lg",
                    isOpen ? "text-primary" : "text-navy-800",
                  )}
                >
                  {section.label}
                </span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-brand-teal-500 transition-transform duration-300",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
            </h3>
            <div
              className={cn(
                "grid transition-all duration-300 ease-in-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="min-h-0 overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground sm:px-6">
                  {section.value}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
