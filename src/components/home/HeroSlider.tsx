"use client";

import { useState, useEffect } from "react";
import { Play, Pause, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

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
  {
    subtitle: "Excellence in Healthcare",
    title: "Medicine of the Highest Order",
    description:
      "Committed to quality, safety, and efficacy in every product we develop, ensuring the best outcomes for patients worldwide.",
    buttonText: "Explore Products",
    buttonLink: "#products",
    secondaryButtonText: "Quality Standards",
    secondaryButtonLink: "#quality",
    backgroundImage:
      "https://images.unsplash.com/photo-1721784106865-bd5e25c221f2?q=80&w=2000",
  },
];

export default function HeroSlider() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [autoplayPlugin] = useState(() =>
    Autoplay({ delay: 6000, stopOnInteraction: false }),
  );

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    // Set initial value
    handleSelect();

    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  const toggleAutoplay = () => {
    if (isPlaying) {
      autoplayPlugin.stop();
    } else {
      autoplayPlugin.play();
    }
    setIsPlaying(!isPlaying);
  };

  const goToSlide = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <section className="relative w-full h-screen min-h-[600px] max-h-[900px] overflow-hidden bg-black">
      <Carousel
        setApi={setApi}
        plugins={[autoplayPlugin]}
        className="w-full h-full"
        opts={{
          loop: true,
          duration: 30,
        }}
      >
        <CarouselContent className="h-full ml-0">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="h-full pl-0 relative">
              {/* Background Image - Directly as img element for better control */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={slide.backgroundImage}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  loading="eager"
                  height={900}
                  width={1600}
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20" />
              </div>

              {/* Content Container */}
              <div className="relative h-full flex items-center z-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
                  <div className="max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl">
                    <div className="space-y-4 sm:space-y-6 md:space-y-8 pt-10">
                      {/* Subtitle */}
                      {slide.subtitle && (
                        <div className="inline-block px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full border border-primary/30">
                          <p className="text-sm font-semibold text-primary">
                            {slide.subtitle}
                          </p>
                        </div>
                      )}

                      {/* Title */}
                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight sm:leading-tight md:leading-tight">
                        <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                          {slide.title}
                        </span>
                      </h1>

                      {/* Description */}
                      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 leading-relaxed max-w-xl sm:max-w-2xl md:max-w-3xl">
                        {slide.description}
                      </p>

                      {/* CTA Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
                        {/* Primary Button */}
                        <a
                          href={slide.buttonLink}
                          className="group inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-primary hover:bg-primary/90 text-white font-semibold text-sm sm:text-base rounded-lg transition-all duration-300 hover:shadow-2xl hover:shadow-primary/30 hover:scale-[1.02]"
                        >
                          <span>{slide.buttonText}</span>
                          <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
                        </a>

                        {/* Secondary Button */}
                        {slide.secondaryButtonText && (
                          <a
                            href={slide.secondaryButtonLink}
                            className="group inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold text-sm sm:text-base rounded-lg transition-all duration-300 hover:border-white/40 hover:scale-[1.02]"
                          >
                            <span>{slide.secondaryButtonText}</span>
                            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 opacity-70 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Desktop Navigation */}
        <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-30 hidden md:flex items-center gap-4">
          <CarouselPrevious className="relative static translate-y-0 h-12 w-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:border-white/40 transition-all hover:scale-105" />

          {/* Slide Indicators */}
          <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="relative overflow-hidden"
                aria-label={`Go to slide ${index + 1}`}
              >
                <div
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    index === current
                      ? "w-12 bg-white"
                      : "w-2 bg-white/40 hover:bg-white/60"
                  }`}
                />
                {index === current && isPlaying && (
                  <div
                    className="absolute top-0 left-0 h-full bg-white/40 rounded-full"
                    style={{
                      animation: "slideProgress 6s linear forwards",
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          <CarouselNext className="relative static translate-y-0 h-12 w-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:border-white/40 transition-all hover:scale-105" />

          {/* Play/Pause Button */}
          <button
            onClick={toggleAutoplay}
            className="h-12 w-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:border-white/40 transition-all hover:scale-105"
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden absolute bottom-6 left-0 right-0 z-30 flex flex-col items-center gap-4 px-4">
          {/* Slide Indicators */}
          <div className="flex items-center gap-2 px-4 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === current ? "w-8 bg-white" : "w-2 bg-white/40"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center justify-center gap-3 w-full max-w-xs">
            <CarouselPrevious className="relative static translate-y-0 h-10 w-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white active:bg-white/20 flex-1" />

            <button
              onClick={toggleAutoplay}
              className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white active:bg-white/20"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </button>

            <CarouselNext className="relative static translate-y-0 h-10 w-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white active:bg-white/20 flex-1" />
          </div>
        </div>
      </Carousel>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none z-20" />

      <style jsx global>{`
        @keyframes slideProgress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }

        /* Ensure image covers full area */
        .carousel-root {
          width: 100% !important;
          height: 100% !important;
        }

        .embla__container {
          height: 100% !important;
        }

        .embla__slide {
          height: 100% !important;
          flex: 0 0 100% !important;
          min-width: 100% !important;
        }

        /* Fix any overflow issues */
        * {
          box-sizing: border-box;
        }
      `}</style>
    </section>
  );
}
