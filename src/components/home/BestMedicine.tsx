"use client";

import { Zap } from "lucide-react";
import ProductCard from "../products/ProductCard";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import SectionHeader from "../shared/SectionHeader";
import { Product } from "@/generated/prisma/client";

type Props = {
  medicines: Product[];
};

export default function BestMedicine({ medicines }: Props) {
  return (
    <section className="bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <SectionHeader
          icon={Zap}
          eyebrow="Explore Our Medicines"
          title="Our Best Medicines"
        />

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="relative"
        >
          <CarouselContent className="-ml-4">
            {medicines.map((med, index) => (
              <CarouselItem
                key={index}
                className="
                  pl-4
                  basis-full
                  sm:basis-1/2
                  lg:basis-1/3
                  xl:basis-1/4
                "
              >
                <ProductCard product={med} />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation */}
          <CarouselPrevious className="-left-12 hidden md:flex" />
          <CarouselNext className="-right-12 hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
}
