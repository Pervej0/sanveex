"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn, Eye, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductGalleryViewerProps {
  primaryImage: string;
  gallery: string[];
  productName: string;
  genericName?: string | null;
}

export default function ProductGalleryViewer({
  primaryImage,
  gallery = [],
  productName,
  genericName,
}: ProductGalleryViewerProps) {
  // Combine primary and gallery into unique list
  const allImages = Array.from(new Set([primaryImage, ...gallery].filter(Boolean)));
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentImage = allImages[selectedIndex] || primaryImage;

  const getImageLabel = (src: string, index: number) => {
    if (src === primaryImage) return "Product Pack";
    if (src.includes("label")) return "Carton Layout";
    if (src.includes(".jpeg") || src.includes(".webp")) return `Label View ${index + 1}`;
    return `Artwork ${index + 1}`;
  };

  return (
    <div>
      {/* Main Image Stage */}
      <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-slate-200/90 bg-gradient-to-br from-slate-50 via-white to-navy-50/30 p-6 shadow-md transition-all duration-300 hover:shadow-xl">
        <Image
          src={currentImage}
          alt={`${productName} — ${genericName ?? "Pharmaceutical formulation"}`}
          fill
          priority
          sizes="(min-width: 1024px) 580px, 100vw"
          className="object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Floating badge */}
        <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-navy-800 shadow-sm ring-1 ring-black/5 backdrop-blur-md">
          <Sparkles className="h-3 w-3 text-brand-teal-500" />
          <span>{getImageLabel(currentImage, selectedIndex)}</span>
        </div>

        {/* Zoom trigger */}
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-navy-800 shadow-md ring-1 ring-black/5 backdrop-blur-md transition-all hover:bg-primary hover:text-white"
          aria-label="Enlarge image"
        >
          <ZoomIn className="h-4 w-4" />
        </button>
      </div>

      {/* Thumbnails rail */}
      {allImages.length > 1 && (
        <div className="mt-4 flex flex-wrap gap-3">
          {allImages.map((src, index) => {
            const isSelected = selectedIndex === index;
            return (
              <button
                key={src}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={cn(
                  "group relative h-20 w-24 overflow-hidden rounded-xl border bg-white p-1 text-left transition-all duration-200",
                  isSelected
                    ? "border-primary ring-2 ring-primary/20 shadow-sm"
                    : "border-slate-200 hover:border-brand-teal-400 opacity-75 hover:opacity-100",
                )}
              >
                <div className="relative h-full w-full">
                  <Image
                    src={src}
                    alt={`${productName} thumbnail ${index + 1}`}
                    fill
                    sizes="96px"
                    className="object-contain p-1"
                  />
                </div>
                <span className="sr-only">{getImageLabel(src, index)}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Full screen modal for examining label details */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/80 p-4 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative max-h-[90vh] max-w-5xl overflow-hidden rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-lg font-bold text-navy-800">{productName}</h3>
                <p className="text-xs text-muted-foreground">
                  Official Approved Carton Artwork &amp; Packaging Specification
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-navy-800 hover:bg-slate-200"
              >
                Close ✕
              </button>
            </div>
            <div className="relative h-[65vh] w-[80vw] max-w-4xl">
              <Image
                src={currentImage}
                alt={productName}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
