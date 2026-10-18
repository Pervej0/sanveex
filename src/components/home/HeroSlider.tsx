"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, FileCheck2, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { resolveImageSrc } from "@/lib/images";

interface SlideData {
  id?: string;
  title: string;
  subtitle?: string | null;
  description: string;
  buttonText?: string | null;
  buttonLink?: string | null;
  secondaryButtonText?: string | null;
  secondaryButtonLink?: string | null;
  backgroundImage: string;
  isActive?: boolean;
}

interface HeroSliderProps {
  slides: SlideData[];
}

const AUTOPLAY_MS = 7000;

export default function HeroSlider({ slides = [] }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const total = slides.length;

  const goTo = useCallback(
    (index: number) => setCurrent(((index % total) + total) % total),
    [total],
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (isPaused || total <= 1) return;
    const timer = setInterval(() => setCurrent((p) => (p + 1) % total), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [isPaused, total]);

  if (total === 0) return null;

  const activeSlide = slides[current];

  return (
    <section
      className="relative isolate w-full overflow-hidden bg-navy-900"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured highlights"
    >
      <div className="relative h-[560px] w-full sm:h-[600px] lg:h-[680px]">
        {slides.map((slide, index) => {
          const isActive = index === current;

          return (
            <div
              key={slide.id ?? index}
              aria-hidden={!isActive}
              className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
                isActive ? "z-10 opacity-100" : "z-0 opacity-0"
              }`}
            >
              {/* Slow ken-burns on the active frame only */}
              <div
                className={`absolute inset-0 transition-transform duration-[9000ms] ease-out ${
                  isActive ? "scale-[1.08]" : "scale-100"
                }`}
              >
                <Image
                  src={resolveImageSrc(slide.backgroundImage, "/hero1.jpeg")!}
                  alt=""
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover"
                />
              </div>

              {/* Legibility scrims */}
              <div className="absolute inset-0 bg-navy-900/45" />
              <div className="absolute inset-0 bg-gradient-to-r from-navy-900/92 via-navy-900/60 to-navy-900/10" />
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy-900/85 to-transparent" />
            </div>
          );
        })}

        {/* ---------------- Content ---------------- */}
        <div className="relative z-20 flex h-full items-center">
          <div className="container-x w-full">
            <div className="max-w-3xl">
              {activeSlide.subtitle && (
                <p className="eyebrow animate-in fade-in slide-in-from-bottom-3 rounded-full border border-brand-teal-300/30 bg-brand-teal-400/10 px-4 py-2 text-brand-teal-200 backdrop-blur-sm duration-700">
                  {activeSlide.subtitle}
                </p>
              )}

              <h1
                key={`title-${current}`}
                className="mt-6 animate-in fade-in slide-in-from-bottom-4 text-3xl font-extrabold leading-[1.08] text-white duration-700 sm:text-4xl lg:text-[3.5rem]"
              >
                {activeSlide.title}
              </h1>

              <p
                key={`desc-${current}`}
                className="mt-6 max-w-2xl animate-in fade-in slide-in-from-bottom-5 text-base leading-relaxed text-navy-100 duration-700 sm:text-lg"
              >
                {activeSlide.description}
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                {activeSlide.buttonText && (
                  <Link
                    href={activeSlide.buttonLink || "#"}
                    className="inline-flex items-center gap-2 rounded-lg bg-brand-teal-400 px-7 py-3.5 text-sm font-bold text-navy-900 shadow-lg transition-all hover:-translate-y-0.5 hover:bg-brand-teal-300"
                  >
                    {activeSlide.buttonText}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}

                {activeSlide.secondaryButtonText && (
                  <Link
                    href={activeSlide.secondaryButtonLink || "#"}
                    className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white/15"
                  >
                    {activeSlide.secondaryButtonText}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </div>

              {/* Trust Badges */}
              <div className="mt-8 flex flex-wrap items-center gap-3 text-xs font-semibold text-white/80">
                <span className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 backdrop-blur-md">
                  <ShieldCheck className="h-3.5 w-3.5 text-brand-teal-300" />
                  WHO-GMP Certified Partner
                </span>
                <span className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 backdrop-blur-md">
                  <FileCheck2 className="h-3.5 w-3.5 text-brand-teal-300" />
                  DGDA Registered
                </span>
                <span className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 backdrop-blur-md">
                  <Truck className="h-3.5 w-3.5 text-brand-teal-300" />
                  Nationwide 64 Districts
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------- Controls ---------------- */}
        {total > 1 && (
          <>
            <div className="absolute bottom-8 right-5 z-30 hidden items-center gap-4 sm:flex lg:right-10">
              <span className="font-display text-sm font-bold tabular-nums text-white/70">
                {String(current + 1).padStart(2, "0")}
                <span className="mx-1 text-white/30">/</span>
                {String(total).padStart(2, "0")}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous slide"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-sm transition-all hover:bg-white/15"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next slide"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-sm transition-all hover:bg-white/15"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Progress rail */}
            <div className="absolute bottom-0 left-0 right-0 z-30 flex gap-1.5">
              {slides.map((slide, index) => (
                <button
                  key={slide.id ?? index}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-1.5 flex-1 transition-colors ${
                    index === current
                      ? "bg-brand-teal-400"
                      : "bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
