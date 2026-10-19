"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  FileCheck2,
  CheckCircle2,
} from "lucide-react";
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
      className="relative isolate w-full overflow-hidden bg-navy-950 text-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured highlights"
    >
      <div className="relative min-h-[640px] sm:min-h-[680px] lg:min-h-[720px] xl:min-h-[760px] w-full flex flex-col justify-between">
        {/* Background Imagery with Smooth Transitions */}
        {slides.map((slide, index) => {
          const isActive = index === current;
          return (
            <div
              key={slide.id ?? index}
              aria-hidden={!isActive}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "z-10 opacity-100" : "z-0 opacity-0 pointer-events-none"
              }`}
            >
              <Image
                src={resolveImageSrc(slide.backgroundImage, "/hero1.jpeg")!}
                alt=""
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover object-center"
              />
              {/* Premium Multi-layer Scrim for pristine text contrast */}
              <div className="absolute inset-0 bg-navy-950/50" />
              <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/20" />
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy-950/90 to-transparent" />
            </div>
          );
        })}

        {/* Ambient Subtle Radial Glow for corporate depth */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 top-0 z-10 h-[500px] w-[500px] rounded-full bg-brand-teal-500/10 blur-[120px]"
        />

        {/* Main Content Area */}
        <div className="relative z-20 flex-1 flex items-center pt-16 pb-28 sm:pb-32 lg:pb-36">
          <div className="container-x w-full">
            <div className="max-w-2xl lg:max-w-3xl">
              {/* Slide Category / Subtitle Pill */}
              {activeSlide.subtitle && (
                <div
                  key={`sub-${current}`}
                  className="inline-flex items-center gap-2.5 rounded-full border border-brand-teal-400/30 bg-brand-teal-950/60 px-3.5 py-1.5 backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-500"
                >
                  <span className="h-2 w-2 rounded-full bg-brand-teal-400 animate-pulse" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-teal-300">
                    {activeSlide.subtitle}
                  </span>
                </div>
              )}

              {/* Slide Title */}
              <h1
                key={`title-${current}`}
                className="mt-5 font-display text-3xl font-extrabold leading-[1.12] tracking-tight text-white animate-in fade-in slide-in-from-bottom-3 duration-600 sm:text-5xl lg:text-[3.65rem]"
              >
                {activeSlide.title}
              </h1>

              {/* Slide Description */}
              <p
                key={`desc-${current}`}
                className="mt-5 max-w-xl text-base leading-relaxed text-slate-200/90 animate-in fade-in slide-in-from-bottom-4 duration-700 sm:text-lg"
              >
                {activeSlide.description}
              </p>

              {/* Action Buttons (side by side on small devices, adjusted sizing) */}
              <div className="mt-6 sm:mt-8 flex flex-row items-center gap-2 sm:gap-4">
                {activeSlide.buttonText && (
                  <Link
                    href={activeSlide.buttonLink || "#"}
                    className="inline-flex h-9 sm:h-12 items-center justify-center gap-1 sm:gap-2 rounded-md bg-brand-teal-400 px-3 sm:px-7 text-xs sm:text-sm font-bold text-navy-950 shadow-md shadow-brand-teal-500/20 transition-all hover:bg-brand-teal-300 hover:shadow-lg shrink-0"
                  >
                    <span>{activeSlide.buttonText}</span>
                    <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Link>
                )}

                {activeSlide.secondaryButtonText && (
                  <Link
                    href={activeSlide.secondaryButtonLink || "#"}
                    className="inline-flex h-9 sm:h-12 items-center justify-center gap-1 sm:gap-2 rounded-md border border-white/30 bg-white/5 px-3 sm:px-6 text-xs sm:text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/60 hover:bg-white/15 shrink-0"
                  >
                    <span>{activeSlide.secondaryButtonText}</span>
                  </Link>
                )}
              </div>

              {/* Corporate Trust Credentials Strip */}
              <div className="mt-8 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs font-medium text-slate-300/85">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-brand-teal-400" />
                  <span>WHO-GMP Facility</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FileCheck2 className="h-4 w-4 text-brand-teal-400" />
                  <span>DGDA Authorized</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-brand-teal-400" />
                  <span>Batch Documented</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Controls Bar (Always docked cleanly without overlapping CTAs) */}
        {total > 1 && (
          <div className="relative z-30 pb-24 sm:pb-28 lg:pb-32">
            <div className="container-x flex items-center justify-between gap-4 pr-16 sm:pr-0">
              {/* Pagination & Time Indicator */}
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="font-display text-sm font-bold tabular-nums text-white">
                  {String(current + 1).padStart(2, "0")}
                </span>

                <div className="flex items-center gap-2">
                  {slides.map((slide, index) => (
                    <button
                      key={slide.id ?? index}
                      type="button"
                      onClick={() => goTo(index)}
                      aria-label={`Go to slide ${index + 1}`}
                      className="group relative h-5 w-8 sm:w-12 py-1"
                    >
                      <span className="block h-[3px] w-full overflow-hidden rounded-full bg-white/20 transition-colors group-hover:bg-white/40">
                        {index === current && (
                          <span
                            key={`bar-${current}`}
                            className="block h-full bg-brand-teal-400"
                            style={{
                              animation: `progress ${AUTOPLAY_MS}ms linear forwards`,
                              animationPlayState: isPaused ? "paused" : "running",
                            }}
                          />
                        )}
                        {index < current && (
                          <span className="block h-full w-full bg-white/70" />
                        )}
                      </span>
                    </button>
                  ))}
                </div>

                <span className="font-display text-sm font-bold tabular-nums text-white/50">
                  {String(total).padStart(2, "0")}
                </span>
              </div>

              {/* Prev / Next Navigation Arrows */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous slide"
                  className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-md border border-white/25 bg-navy-900/60 text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white hover:text-navy-950"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next slide"
                  className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-md border border-white/25 bg-navy-900/60 text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white hover:text-navy-950"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
