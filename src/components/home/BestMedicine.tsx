/* eslint-disable react-hooks/immutability */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  FileText,
  SquareArrowOutUpRight,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SectionHeader from "../shared/SectionHeader";

// Updated mock data to fit the new design fields
const medicines = [
  {
    title: "ACTIMMUNE",
    genericName: "(Interferon gamma-1b)",
    website: "actimmune.com",
    img: "https://cdn.mimsprd.mims.com/drug-resources/TH/packshot/Evrysdi6001PPS0.JPG", // Placeholder image
    link: "/single-product",
  },
  {
    title: "Aimovig",
    genericName: "(erenumab-aooe)",
    website: "aimovig.com",
    img: "https://cdn.mimsprd.mims.com/drug-resources/PH/packshot/Prolia6001PPS0.JPG", // Placeholder image
    link: "/single-product",
  },
  {
    title: "AMJEVITA",
    genericName: "(adalimumab-atto)",
    website: "amjevita.com",
    img: "https://www.drugs.com/images/pills/custom/pill32718-2/tremfya.png", // Placeholder image
    link: "/single-product",
  },
  {
    title: "Aranesp",
    genericName: "(darbepoetin alfa)",
    website: "aranesp.com",
    img: "https://www.drugs.com/images/pills/custom/pill32718-2/tremfya.png", // Placeholder image
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
  let sliderRef: Slider | null;

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 4, // Requirement: 4 items on large devices
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    showDots: false,
    responsive: [
      {
        breakpoint: 1280, // Large Laptop
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024, // Laptop/Tablet Landscape
        settings: {
          slidesToShow: 2, // Requirement: 2 items on smaller devices
        },
      },
      {
        breakpoint: 768, // Tablet Portrait
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640, // Mobile
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="bg-gray-50 py-12 relative">
      <div className="container mx-auto max-w-6xl px-4">
        <SectionHeader
          icon={Zap}
          eyebrow="Explore Our Medicines"
          title="Our Best Medicines"
        />

        {/* Custom Navigation Top Right */}
        <div className="flex justify-end mb-6 space-x-2">
          <button
            onClick={() => sliderRef?.slickPrev()}
            className="p-2 bg-primary hover:bg-primary-dark rounded-lg shadow transition text-white"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => sliderRef?.slickNext()}
            className="p-2 bg-primary hover:bg-primary-dark  rounded-lg shadow transition text-white"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Slider */}
        <Slider
          ref={(slider: any) => (sliderRef = slider)}
          {...settings}
          className="-mx-3"
        >
          {medicines.map((med, index) => (
            <div key={index} className="px-3 h-full">
              {/* Card Container */}
              <div className="group bg-white h-full flex flex-col pt-6 pb-8 px-6">
                {/* 1. Header: Website URL & Ext Link */}
                <div className="flex items-center justify-between border-b border-gray-300 pb-2 mb-6">
                  <span className="text-gray-500 text-sm font-medium">
                    {med.website}
                  </span>
                  <div className="flex items-center">
                    <span className="text-gray-300 text-lg font-light mr-2">
                      |
                    </span>
                    <Link
                      href={med.link}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <SquareArrowOutUpRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>

                {/* 2. Body: Logo & Generic Name */}
                <div className="flex-grow flex flex-col items-center justify-start mb-8 min-h-[160px]">
                  {/* Image/Logo */}
                  <div className="relative w-full h-24 mb-3">
                    <Image
                      src={med.img}
                      alt={med.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                  {/* Title (Brand Name) */}
                  <h3 className="text-2xl font-bold text-gray-900 text-center">
                    {med.title}
                  </h3>
                  {/* Generic Name */}
                  <p className="text-black font-semibold text-center mt-1">
                    {med.genericName}
                  </p>
                </div>

                {/* 3. Footer: List of Links */}
                <div className="flex flex-col gap-4 mt-auto">
                  {/* Link 1: Prescribing Info (PDF Style) */}
                  <Link
                    href={med.link}
                    className="flex items-start gap-3 group/link"
                  >
                    <FileText className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-[15px] leading-snug text-blue-600 font-medium group-hover/link:underline">
                      Prescribing Information
                    </span>
                  </Link>

                  {/* Link 2: Medication Guide (PDF Style) */}
                  <Link
                    href={med.link}
                    className="flex items-start gap-3 group/link"
                  >
                    <FileText className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-[15px] leading-snug text-blue-600 font-medium group-hover/link:underline">
                      Medication Guide
                    </span>
                  </Link>

                  {/* Link 3: External Info (External Link Style) */}
                  <Link
                    href={med.link}
                    className="flex items-start gap-3 group/link"
                  >
                    <SquareArrowOutUpRight className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-[15px] leading-snug text-blue-600 font-medium group-hover/link:underline">
                      For more information for healthcare professionals, visit{" "}
                      {med.website}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
