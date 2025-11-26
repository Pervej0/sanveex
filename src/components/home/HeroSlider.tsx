"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight } from "lucide-react";

interface SlideData {
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage: string;
}

const slides: SlideData[] = [
  {
    title: "Advancing Global Healthcare",
    subtitle: "Innovative Solutions for Tomorrow",
    description:
      "Delivering cutting-edge pharmaceutical solutions that improve patient outcomes across the world with evidence-based research and development.",
    buttonText: "Explore Products",
    buttonLink: "#",
    backgroundImage:
      "https://images.unsplash.com/photo-1576091160550-112173f7f869?w=1920&h=1080&fit=crop",
  },
  {
    title: "Excellence in Medical Research",
    subtitle: "Pioneering Clinical Innovation",
    description:
      "Our commitment to groundbreaking research ensures patients receive the most effective treatments available in modern medicine.",
    buttonText: "Learn More",
    buttonLink: "#",
    backgroundImage:
      "https://images.unsplash.com/photo-1576091160550-2173a36f4e77?w=1920&h=1080&fit=crop",
  },
  {
    title: "Patient-Centered Care",
    subtitle: "Health at the Heart of Everything",
    description:
      "We prioritize patient safety and well-being in every decision, ensuring our products meet the highest international standards.",
    buttonText: "Discover Services",
    buttonLink: "#",
    backgroundImage:
      "https://images.unsplash.com/photo-1579154204601-01d5f6f3f51a?w=1920&h=1080&fit=crop",
  },
];

export default function HeroSlider() {
  return (
    <section className="relative w-full">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 6000,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent className="-ml-0">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="pl-0">
              <div
                className={cn(
                  "relative h-[80vh] w-full flex items-center justify-center",
                  "bg-cover bg-center bg-no-repeat",
                )}
                style={{
                  backgroundImage: `linear-gradient(135deg, rgba(15, 31, 62, 0.75) 0%, rgba(6, 201, 168, 0.15) 100%), url(${slide.backgroundImage})`,
                }}
              >
                <div className="container">
                  <div className="max-w-2xl text-left">
                    <span className="text-accent font-semibold text-sm tracking-wider uppercase">
                      {slide.subtitle}
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight mt-2">
                      {slide.title}
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
                      {slide.description}
                    </p>
                    <Button
                      asChild
                      size="lg"
                      className="bg-accent hover:bg-accent/90 text-primary font-semibold px-8 rounded-lg group"
                    >
                      <a
                        href={slide.buttonLink}
                        className="flex items-center gap-2"
                      >
                        {slide.buttonText}
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-6 md:left-10 bg-white/10 hover:bg-white/20 text-white border-white/20 rounded-full" />
        <CarouselNext className="right-6 md:right-10 bg-white/10 hover:bg-white/20 text-white border-white/20 rounded-full" />
      </Carousel>
    </section>
  );
}
