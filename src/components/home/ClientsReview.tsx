"use client";

import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Zap } from "lucide-react";
import SectionHeader from "../shared/SectionHeader";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  image: string;
}

interface ClientsReviewProps {
  testimonials: Testimonial[];
}

export default function ClientsReview({
  testimonials = [],
}: ClientsReviewProps) {
  const testimonialSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 600,
    autoplaySpeed: 3500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  if (testimonials.length === 0) return null;

  return (
    <section className="py-16 md:py-20 ">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <SectionHeader
            icon={Zap}
            eyebrow="Client Testimonials"
            title="What Our Clients Say"
          />

          {/* Testimonial Slider */}
          <Slider {...testimonialSettings} className="mb-10">
            {testimonials.map((item) => (
              <div key={item.id} className="text-center px-4">
                <p className="text-foreground text-lg italic max-w-3xl mx-auto">
                  &rdquo;{item.text}&rdquo;
                </p>
                <div className="flex items-center justify-center gap-4 mt-6">
                  <Image
                    src={item.image}
                    width={60}
                    height={60}
                    alt={item.name}
                    className="rounded-full border object-cover aspect-square"
                  />
                  <div className="text-left">
                    <h6 className="text-lg font-semibold">{item.name}</h6>
                    <span className="text-sm text-muted-foreground">
                      {item.role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
