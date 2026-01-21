"use client";
import { useState, useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface SlideData {
  title: string;
  subtitle?: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  backgroundImage: string;
}

const slides: SlideData[] = [
  {
    subtitle: "Patient-Centered Care",
    title: "Planning For Patient Support Program",
    description:
      "The bold mission of America's MEDITEX Companies is to bring an end to the burdens of disease, in all its forms.",
    buttonText: "Get In Touch",
    buttonLink: "#contact",
    secondaryButtonText: "Learn More",
    secondaryButtonLink: "#about",
    backgroundImage:
      "https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?q=80&w=2000",
  },
  {
    subtitle: "Innovation & Growth",
    title: "Growing to Meet Your Needs",
    description:
      "Advancing healthcare through cutting-edge research and development, delivering breakthrough treatments that transform lives.",
    buttonText: "Our Research",
    buttonLink: "#science",
    secondaryButtonText: "View Pipeline",
    secondaryButtonLink: "#pipeline",
    backgroundImage:
      "https://images.unsplash.com/photo-1649134296132-56606326c566?q=80&w=2000",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [current, isPlaying]);

  return (
    <div className="relative w-full h-[600px] md:h-screen md:min-h-[600px] md:max-h-[900px] overflow-hidden bg-black">
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => {
          const isActive = index === current;

          return (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              {/* Background Image */}
              <div
                className={`absolute inset-0 transition-transform duration-[10000ms] ease-out ${
                  isActive ? "scale-110" : "scale-100"
                }`}
              >
                <Image
                  src={slide.backgroundImage}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  height={900}
                  width={1600}
                  priority={isActive}
                />

                {/* Gradients */}
                <div className="absolute inset-0 bg-black/40 sm:bg-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent sm:via-black/50" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent sm:from-black/60" />
              </div>

              {/* Content */}
              <div className="relative h-full flex items-center z-20">
                <div className="container mx-auto max-w-6xl px-6 sm:px-8">
                  <div className="max-w-4xl pt-10 sm:pt-0">
                    {/* Subtitle */}
                    {slide.subtitle && (
                      <div
                        className={`mb-4 sm:mb-6 transition-all duration-1000 delay-100 ${
                          isActive
                            ? "opacity-100 translate-y-0 blur-0"
                            : "opacity-0 translate-y-12 blur-sm"
                        }`}
                      >
                        <div className="inline-flex items-center gap-2">
                          <div className="w-8 sm:w-12 h-[2px] bg-gradient-to-r from-primary to-transparent" />
                          <Badge
                            variant="outline"
                            className="border-primary/40 bg-primary/10 text-primary text-xs sm:text-sm md:text-base font-semibold tracking-wider uppercase"
                          >
                            {slide.subtitle}
                          </Badge>
                        </div>
                      </div>
                    )}

                    {/* Title */}
                    <h1
                      className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight transition-all duration-1000 delay-200 ${
                        isActive
                          ? "opacity-100 translate-y-0 blur-0"
                          : "opacity-0 translate-y-12 blur-sm"
                      }`}
                    >
                      {slide.title}
                    </h1>

                    {/* Description */}
                    <p
                      className={`text-sm sm:text-base md:text-xl text-gray-300 mb-8 sm:mb-12 leading-relaxed max-w-xl sm:max-w-2xl transition-all duration-1000 delay-300 ${
                        isActive
                          ? "opacity-100 translate-y-0 blur-0"
                          : "opacity-0 translate-y-12 blur-sm"
                      }`}
                    >
                      {slide.description}
                    </p>

                    {/* BUTTONS SECTION - FIXED */}
                    <div
                      className={`flex flex-row flex-wrap gap-3 sm:gap-4 transition-all duration-1000 delay-500 ${
                        isActive
                          ? "opacity-100 translate-y-0 blur-0"
                          : "opacity-0 translate-y-12 blur-sm"
                      }`}
                    >
                      {/* Primary Button */}
                      <Button
                        asChild
                        size="lg"
                        // MOBILE: h-10 px-5 text-sm (Compact)
                        // DESKTOP: md:h-14 md:px-8 md:text-lg (Large & Prominent)
                        className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold 
                                   h-10 px-5 text-sm w-auto 
                                   md:h-14 md:px-8 md:text-lg"
                      >
                        <a href={slide.buttonLink}>
                          <span>{slide.buttonText}</span>
                          <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                        </a>
                      </Button>

                      {/* Secondary Button */}
                      {slide.secondaryButtonText && (
                        <Button
                          asChild
                          variant="outline"
                          size="lg"
                          // MOBILE: h-10 px-5 text-sm (Compact)
                          // DESKTOP: md:h-14 md:px-8 md:text-lg (Large & Prominent)
                          className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 font-semibold 
                                     h-10 px-5 text-sm w-auto 
                                     md:h-14 md:px-8 md:text-lg"
                        >
                          <a href={slide.secondaryButtonLink}>
                            <span>{slide.secondaryButtonText}</span>
                            <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows - Desktop Only */}
      <div className="hidden md:block">
        <Button
          onClick={prevSlide}
          variant="ghost"
          size="icon"
          className="absolute left-8 top-1/2 -translate-y-1/2 z-30 w-14 h-14 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-full hover:bg-white/20 hover:scale-105 transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <Button
          onClick={nextSlide}
          variant="ghost"
          size="icon"
          className="absolute right-8 top-1/2 -translate-y-1/2 z-30 w-14 h-14 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-full hover:bg-white/20 hover:scale-105 transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-30 w-full px-6 flex justify-center">
        <div className="flex items-center gap-2 sm:gap-3 bg-black/30 backdrop-blur-md px-4 py-3 rounded-full border border-white/10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="relative group py-2"
              aria-label={`Go to slide ${index + 1}`}
            >
              <div
                className={`h-1 rounded-full transition-all duration-500 ${
                  index === current
                    ? "w-8 sm:w-16 bg-white"
                    : "w-4 sm:w-12 bg-white/30 group-hover:bg-white/50"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
