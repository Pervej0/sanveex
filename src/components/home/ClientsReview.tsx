"use client";

import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    text: `When I began looking for the "best" center for Max I chose Medicol. 
           You are the best. Many thanks to you and your warm, concerned staff...`,
    name: "Reta Schmidt",
    role: "Patient",
    img: "https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small_2x/Basic_Ui__28186_29.jpg",
  },
  {
    text: `Three and a half months ago, my family lost someone that meant the world to us.
           We made many trips to Medicol. He adored two employees and they were great to him.`,
    name: "Katlynn Pouros",
    role: "Patient’s Family",
    img: "https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small_2x/Basic_Ui__28186_29.jpg",
  },
];

const clientLogos = [
  "/assets/image/client/client-hm-1.jpg",
  "/assets/image/client/client-hm-2.jpg",
  "/assets/image/client/client-hm-3.jpg",
  "/assets/image/client/client-hm-4.jpg",
  "/assets/image/client/client-hm-5.jpg",
];

export default function ClientsReview() {
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

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-primary">
            WHAT <span className="text-primary">CLIENTS SAY</span>
          </h2>

          {/* Testimonial Slider */}
          <Slider {...testimonialSettings} className="mb-10">
            {testimonials.map((item, i) => (
              <div key={i} className="text-center px-4">
                <p className="text-foreground text-lg italic max-w-3xl mx-auto">
                  &rdquo;{item.text}&rdquo;
                </p>
                <div className="flex items-center justify-center gap-4 mt-6">
                  <Image
                    src={item.img}
                    width={60}
                    height={60}
                    alt={item.name}
                    className="rounded-full border"
                  />
                  <div>
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
