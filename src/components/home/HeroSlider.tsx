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
import Autoplay from "embla-carousel-autoplay"

interface SlideData {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage: string;
}

const slides: SlideData[] = [
  {
    title: "Planning For Patient Support Program",
    description:
      "The bold mission of America's MEDITEX Companies is to bring an end to the burdens of disease, in all its forms.",
    buttonText: "get in touch",
    buttonLink: "#",
    backgroundImage:
      "https://images.unsplash.com/photo-1511174511562-5f7f18b874f8",
  },
  {
    title: "Growing to Meet Your Needs",
    description:
      "The bold mission of America's MEDITEX Companies is to bring an end to the burdens of disease, in all its forms.",
    buttonText: "get in touch",
    buttonLink: "#",
    backgroundImage:
      "https://images.unsplash.com/photo-1649134296132-56606326c566",
  },
  {
    title: "Medicine of the Highest Order",
    description:
      "The bold mission of America's MEDITEX Companies is to bring an end to the burdens of disease, in all its forms.",
    buttonText: "get in touch",
    buttonLink: "#",
    backgroundImage:
      "https://images.unsplash.com/photo-1721784106865-bd5e25c221f2",
  },
];

export default function HeroSlider() {
  return (
    <section className="relative w-full">
      <Carousel opts={{
    align: "start",
    loop: true,
  }}  plugins={[
        Autoplay({
          delay: 5000,
        }),
        
      ]} className="w-full">
        <CarouselContent className="-ml-0">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="pl-0">
              <div
                className={cn(
                  "relative h-[90vh] w-full flex items-center justify-center",
                  "bg-cover bg-center bg-no-repeat"
                )}
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${slide.backgroundImage})`,
                }}
              >
                <div className="container text-left">
                  <div className="content text-center max-w-2xl">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                      {slide.title.split("<br />").map((line, i) => (
                        <span key={i}>
                          {line}
                          {i < slide.title.split("<br />").length - 1 && (
                            <br />
                          )}
                        </span>
                      ))}
                    </h1>
                    <div className="text text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
                      {slide.description}
                    </div>
                    <div className="link-box">
                      <Button
                        asChild
                        size="lg"
                        className="bg-foreground-accent hover:bg-foreground-accent/90 text-white px-8 py-6 text-base font-medium rounded-md"
                      >
                        <a className="uppercase" href={slide.buttonLink}>{slide.buttonText}</a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-10 bg-white/20 hover:bg-white/30 text-white border-white/30" />
        <CarouselNext className="right-10 bg-white/20 hover:bg-white/30 text-white border-white/30" />
      </Carousel>
    </section>
  );
}