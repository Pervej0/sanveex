/* eslint-disable react-hooks/immutability */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const medicines = [
  {
    title: "Risdiplam Powder for Oral Solution",
    department: "Anesthesiology",
    img: "https://cdn.mimsprd.mims.com/drug-resources/TH/packshot/Evrysdi6001PPS0.JPG",
    link: "/single-product",
  },
  {
    title: "Denosumab injection",
    department: "Anesthesiology",
    img: "https://cdn.mimsprd.mims.com/drug-resources/PH/packshot/Prolia6001PPS0.JPG",
    link: "/single-product",
  },
  {
    title: "Ofev 100 mg soft capsules",
    department: "Anesthesiology",
    img: "https://www.drugs.com/images/pills/custom/pill32718-2/tremfya.png",
    link: "/single-product",
  },
  {
    title: "Ofev 100 mg soft capsules",
    department: "Anesthesiology",
    img: "https://www.drugs.com/images/pills/custom/pill32718-2/tremfya.png",
    link: "/single-product",
  },
  {
    title: "Ofev 100 mg soft capsules",
    department: "Anesthesiology",
    img: "https://www.drugs.com/images/pills/custom/pill32718-2/tremfya.png",
    link: "/single-product",
  },
];

export default function BestMedicine() {
  let sliderRef: Slider | null;

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
    arrows: false, // we will use custom arrows
  };

  return (
    <section className="bg-gray-50 py-8 relative">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800">
            BEST{" "}
            <span className="text-foreground-accent uppercase">Medicine</span>{" "}
            FOR YOU
          </h2>
        </div>
        {/* Custom Navigation Top Right */}
        <div className="flex justify-end mb-4 space-x-2">
          <button
            onClick={() => sliderRef?.slickPrev()}
            className="p-2 bg-foreground-accent hover:bg-foreground-accent/90 rounded-full shadow transition"
          >
            <ChevronLeftIcon className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={() => sliderRef?.slickNext()}
            className="p-2 bg-foreground-accent rounded-full shadow hover:bg-foreground-accent/90 transition"
          >
            <ChevronRightIcon className="w-6 h-6 text-white" />
          </button>
        </div>
        {/* Slider */}
        <Slider ref={(slider: any) => (sliderRef = slider)} {...settings}>
          {medicines.map((med, index) => (
            <div key={index} className="p-2">
              <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition flex flex-col min-h-[440px]">
                <div className="relative w-full h-64 mb-4 flex-shrink-0">
                  <Image
                    src={med.img}
                    alt={med.title}
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
                <div className="flex-1 pb-8 px-4 flex flex-col justify-between">
                  <div>
                    <h5 className="text-lg font-semibold text-gray-800 mb-1">
                      <Link
                        href={med.link}
                        className="hover:text-foreground-accent"
                      >
                        {med.title}
                      </Link>
                    </h5>
                    <span className="text-sm text-gray-500">
                      {med.department}
                    </span>
                  </div>
                  <div className="mt-4">
                    <Link
                      href={med.link}
                      className="bg-foreground-accent text-white px-4 py-2 rounded-md hover:bg-foreground-accent/90 transition"
                    >
                      Product Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
        {/* View All */}
        {medicines.length > 10 && (
          <div className="text-center mt-8">
            <Link
              href="/products"
              className="text-foreground-accent font-semibold hover:underline"
            >
              SEE ALL MEDICINE
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
