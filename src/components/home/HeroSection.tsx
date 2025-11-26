"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight, Activity, ShieldCheck, Globe, Sparkles } from "lucide-react";

export default function HeroSection() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  const slides = [
    {
      id: 1,
      title: "Advancing Global Health",
      subtitle: "Innovative Pharmaceutical Solutions",
      description:
        "We are committed to discovering and developing medicines that make a meaningful difference in patients' lives worldwide.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2070",
      cta: "Explore Our Research",
    },
    {
      id: 2,
      title: "Quality You Can Trust",
      subtitle: "World-Class Manufacturing",
      description:
        "Our state-of-the-art facilities ensure the highest standards of safety, efficacy, and quality in every product we manufacture.",
      image: "https://images.unsplash.com/photo-1581093458791-9f302e683800?auto=format&fit=crop&q=80&w=2070",
      cta: "View Products",
    },
    {
      id: 3,
      title: "Partners in Care",
      subtitle: "Healthcare Professional Support",
      description:
        "Collaborating with healthcare providers to deliver better outcomes through education, support, and reliable supply chains.",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=2080",
      cta: "Partner With Us",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id} className="relative h-[500px] sm:h-[600px] md:h-[650px] lg:h-[700px]">
              {/* Background Image with Overlay */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-slate-950/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                <div className="max-w-3xl space-y-6 sm:space-y-8 animate-fade-in-up">
                  <div className="inline-flex items-center gap-2 rounded-full glass-card px-4 py-2 text-sm font-medium text-white border border-white/30 backdrop-blur-xl">
                    <Sparkles className="h-4 w-4 text-accent" />
                    <span>{slide.subtitle}</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl">
                    {slide.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button size="lg" className="text-base h-12 px-8 gap-2 shadow-xl shadow-primary/30 bg-gradient-primary hover:opacity-90 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/40 hover:scale-105">
                      {slide.cta}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="text-base h-12 px-8 glass-card text-white border-white/30 hover:bg-white hover:text-slate-900 hover:border-white transition-all duration-300"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 md:bottom-12 md:right-12 flex gap-2 z-20">
          <CarouselPrevious className="static translate-y-0 glass-card border-white/30 text-white hover:bg-white hover:text-slate-900 transition-all duration-300" />
          <CarouselNext className="static translate-y-0 glass-card border-white/30 text-white hover:bg-white hover:text-slate-900 transition-all duration-300" />
        </div>
      </Carousel>

      {/* Stats/Features Banner */}
      <div className="relative z-20 -mt-12 sm:-mt-16 md:-mt-20 lg:-mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div className="glass-card rounded-2xl p-6 lg:p-8 border border-white/20 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10 group">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 text-blue-400 group-hover:from-blue-500/30 group-hover:to-blue-600/30 transition-all duration-300">
                  <Globe className="h-7 w-7 sm:h-8 sm:w-8" />
                </div>
                <div>
                  <h3 className="font-bold text-lg sm:text-xl text-slate-900 mb-1">Global Reach</h3>
                  <p className="text-slate-600 text-sm sm:text-base">Serving patients in over 50 countries worldwide.</p>
                </div>
              </div>
            </div>
            <div className="glass-card rounded-2xl p-6 lg:p-8 border border-white/20 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10 group">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-teal-500/20 to-teal-600/20 text-teal-500 group-hover:from-teal-500/30 group-hover:to-teal-600/30 transition-all duration-300">
                  <ShieldCheck className="h-7 w-7 sm:h-8 sm:w-8" />
                </div>
                <div>
                  <h3 className="font-bold text-lg sm:text-xl text-slate-900 mb-1">Quality Assured</h3>
                  <p className="text-slate-600 text-sm sm:text-base">FDA and EMA approved manufacturing facilities.</p>
                </div>
              </div>
            </div>
            <div className="glass-card rounded-2xl p-6 lg:p-8 border border-white/20 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10 group">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 text-amber-600 group-hover:from-amber-500/30 group-hover:to-amber-600/30 transition-all duration-300">
                  <Activity className="h-7 w-7 sm:h-8 sm:w-8" />
                </div>
                <div>
                  <h3 className="font-bold text-lg sm:text-xl text-slate-900 mb-1">R&D Focused</h3>
                  <p className="text-slate-600 text-sm sm:text-base">Investing 20% of revenue back into research.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

