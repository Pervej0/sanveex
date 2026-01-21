"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { FileText, SquareArrowOutUpRight } from "lucide-react";

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

export default function ProductsSection() {
  return (
    <section className="">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {medicines.map((med, index) => (
          <div key={index} className="h-full">
            {/* Card Container */}
            <div className="group bg-white h-full flex flex-col pt-6 pb-8 px-4">
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
      </div>
    </section>
  );
}
