"use client";

import { FileText, SquareArrowOutUpRight, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import SectionHeader from "../shared/SectionHeader";

const medicines = [
  {
    title: "ACTIMMUNE",
    genericName: "(Interferon gamma-1b)",
    website: "actimmune.com",
    img: "https://cdn.mimsprd.mims.com/drug-resources/TH/packshot/Evrysdi6001PPS0.JPG",
    link: "/single-product",
  },
  {
    title: "Aimovig",
    genericName: "(erenumab-aooe)",
    website: "aimovig.com",
    img: "https://cdn.mimsprd.mims.com/drug-resources/PH/packshot/Prolia6001PPS0.JPG",
    link: "/single-product",
  },
  {
    title: "AMJEVITA",
    genericName: "(adalimumab-atto)",
    website: "amjevita.com",
    img: "https://www.drugs.com/images/pills/custom/pill32718-2/tremfya.png",
    link: "/single-product",
  },
  {
    title: "Aranesp",
    genericName: "(darbepoetin alfa)",
    website: "aranesp.com",
    img: "https://www.drugs.com/images/pills/custom/pill32718-2/tremfya.png",
    link: "/single-product",
  },
  {
    title: "Enbrel",
    genericName: "(etanercept)",
    website: "enbrel.com",
    img: "https://cdn.mimsprd.mims.com/drug-resources/TH/packshot/Evrysdi6001PPS0.JPG",
    link: "/single-product",
  },
];

export default function BestMedicine() {
  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto max-w-6xl px-4">
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
                {/* Card */}
                <div className="bg-white rounded-lg px-4 sm:px-6 pt-6 pb-6 flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between border-b pb-2 mb-6">
                    <span className="text-sm text-gray-500 truncate max-w-[140px]">
                      {med.website}
                    </span>
                    <Link href={med.link} className="text-blue-600">
                      <SquareArrowOutUpRight className="w-5 h-5" />
                    </Link>
                  </div>

                  {/* Body */}
                  <div className="flex flex-col items-center mb-8">
                    <div className="relative w-32 sm:w-full h-24 mb-3">
                      <Image
                        src={med.img}
                        alt={med.title}
                        fill
                        className="object-contain"
                      />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-center text-gray-900">
                      {med.title}
                    </h3>

                    <p className="text-sm sm:text-base font-semibold text-center mt-1">
                      {med.genericName}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="flex flex-col gap-4 mt-auto">
                    <Link href={med.link} className="flex gap-3">
                      <FileText className="w-5 h-5 text-blue-500" />
                      <span className="text-[15px] text-blue-600 font-medium">
                        Prescribing Information
                      </span>
                    </Link>

                    <Link href={med.link} className="flex gap-3">
                      <FileText className="w-5 h-5 text-blue-500" />
                      <span className="text-[15px] text-blue-600 font-medium">
                        Medication Guide
                      </span>
                    </Link>

                    <Link href={med.link} className="flex gap-3">
                      <SquareArrowOutUpRight className="w-5 h-5 text-blue-500" />
                      <span className="text-[15px] text-blue-600 font-medium break-words">
                        For more information for healthcare professionals, visit{" "}
                        {med.website}
                      </span>
                    </Link>
                  </div>
                </div>
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
