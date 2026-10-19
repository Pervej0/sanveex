"use client";

import { useState } from "react";
import Image from "next/image";
import { Quote } from "lucide-react";
import SectionHeader from "../shared/SectionHeader";
import { resolveImageSrc } from "@/lib/images";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  image: string;
}

interface ClientsReviewProps {
  testimonials: Testimonial[];
}

/** Fallback avatar initials when a reviewer has no usable photo. */
function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default function ClientsReview({
  testimonials = [],
}: ClientsReviewProps) {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  if (testimonials.length === 0) return null;

  return (
    <section className="bg-slate-50/70 py-16 lg:py-24 border-t border-slate-200/80">
      <div className="container-x">
        <SectionHeader
          align="center"
          eyebrow="Partner Voices"
          title="What clinicians &amp; partners say"
          description="Feedback from healthcare providers, pharmacies, and institutional supply partners."
        />

        <div
          className={`mx-auto ${
            testimonials.length === 1
              ? "max-w-2xl"
              : testimonials.length === 2
              ? "grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl"
              : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl"
          }`}
        >
          {testimonials.map((item) => {
            const imageSrc = resolveImageSrc(item.image, null);
            const showImage = imageSrc && !failedImages[item.id];

            return (
              <figure
                key={item.id}
                className="flex flex-col justify-between rounded-xl border border-slate-200/90 bg-white p-7 sm:p-8 shadow-xs transition-shadow hover:shadow-md"
              >
                <div>
                  <Quote className="h-5 w-5 text-brand-teal-500/80" />
                  <blockquote className="mt-4 text-sm sm:text-[15px] leading-relaxed text-slate-700">
                    &ldquo;{item.text}&rdquo;
                  </blockquote>
                </div>

                <figcaption className="mt-6 flex items-center gap-3.5 border-t border-slate-100 pt-5">
                  {showImage ? (
                    <Image
                      src={imageSrc!}
                      width={44}
                      height={44}
                      alt={item.name}
                      onError={() =>
                        setFailedImages((prev) => ({ ...prev, [item.id]: true }))
                      }
                      className="h-11 w-11 rounded-full border border-slate-200 object-cover"
                    />
                  ) : (
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-navy-50 text-xs font-bold text-navy-800">
                      {initials(item.name)}
                    </span>
                  )}
                  <div>
                    <p className="font-bold text-navy-900 text-sm">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.role}</p>
                  </div>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
