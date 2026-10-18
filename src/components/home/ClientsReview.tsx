"use client";

import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Quote, MessageSquareQuote } from "lucide-react";
import SectionHeader from "../shared/SectionHeader";
import { resolveImageSrc } from "@/lib/images";

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

/** Fallback avatar label when a reviewer has no usable photo. */
function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default function ClientsReview({
  testimonials = [],
}: ClientsReviewProps) {
  if (testimonials.length === 0) return null;

  const settings = {
    dots: true,
    infinite: testimonials.length > 1,
    autoplay: true,
    speed: 600,
    autoplaySpeed: 6000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
  };

  return (
    <section className="border-y border-border bg-navy-50/60 py-16 lg:py-24">
      <div className="container-x">
        <SectionHeader
          icon={MessageSquareQuote}
          eyebrow="Partner Voices"
          title="Trusted by pharmacists, hospitals and distributors"
        />

        <div className="mx-auto max-w-4xl">
          <Slider {...settings}>
            {testimonials.map((item) => (
              <div key={item.id} className="px-1">
                <figure className="rounded-2xl border border-border bg-white p-8 shadow-sm sm:p-12">
                  <Quote className="h-8 w-8 text-brand-teal-400" />

                  <blockquote className="mt-6 text-lg leading-relaxed font-medium text-navy-800 sm:text-xl">
                    {item.text}
                  </blockquote>

                  <figcaption className="mt-8 flex items-center gap-4 border-t border-border pt-6">
                    {resolveImageSrc(item.image, null) ? (
                      <Image
                        src={resolveImageSrc(item.image, null)!}
                        width={56}
                        height={56}
                        alt=""
                        className="h-14 w-14 rounded-full border border-border object-cover"
                      />
                    ) : (
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-teal-100 text-sm font-bold text-brand-teal-700">
                        {initials(item.name)}
                      </span>
                    )}
                    <div>
                      <p className="font-display font-bold text-navy-800">
                        {item.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {item.role}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
