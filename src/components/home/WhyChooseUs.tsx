"use client";

import type React from "react";
import { useRef } from "react";
import {
  Pen,
  PaintBucket,
  Home,
  Ruler,
  PenTool,
  Building2,
  CheckCircle,
  Sparkles,
  Star,
  ArrowRight,
  Zap,
} from "lucide-react";
import SectionHeader from "../shared/SectionHeader";

export default function AboutUsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      icon: <Pen className="w-6 h-6" />,
      secondaryIcon: (
        <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-[#A9BBC8]" />
      ),
      title: "Importing Innovation",
      description:
        "Bringing cutting-edge medical technologies from around the world to enhance healthcare solutions and patient outcomes.",
      position: "left",
    },
    {
      icon: <Home className="w-6 h-6" />,
      secondaryIcon: (
        <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-[#A9BBC8]" />
      ),
      title: "Delivering Quality",
      description:
        "Ensuring the highest standards in every product and service we provide, prioritizing patient safety and satisfaction.",
      position: "left",
    },
    {
      icon: <PenTool className="w-6 h-6" />,
      secondaryIcon: (
        <Star className="w-4 h-4 absolute -top-1 -right-1 text-[#A9BBC8]" />
      ),
      title: "Improving Healthcare",
      description:
        "Committed to advancing medical care through innovative solutions that empower healthcare professionals and improve patient lives.",
      position: "left",
    },
    {
      icon: <PaintBucket className="w-6 h-6" />,
      secondaryIcon: (
        <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-[#A9BBC8]" />
      ),
      title: "Customized Solutions",
      description:
        "Tailoring medical products and solutions to meet the specific needs of healthcare providers and institutions.",
      position: "right",
    },
    {
      icon: <Ruler className="w-6 h-6" />,
      secondaryIcon: (
        <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-[#A9BBC8]" />
      ),
      title: "Regulatory Compliance",
      description:
        "Adhering strictly to international medical standards and regulations to ensure safety, reliability, and trust.",
      position: "right",
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      secondaryIcon: (
        <Star className="w-4 h-4 absolute -top-1 -right-1 text-[#A9BBC8]" />
      ),
      title: "Healthcare Partnerships",
      description:
        "Building strong, long-term partnerships with hospitals, clinics, and distributors to drive sustainable healthcare growth.",
      position: "right",
    },
  ];

  return (
    <section
      id="about-section"
      ref={sectionRef}
      className="w-full py-12 md:py-24 px-4 bg-background overflow-hidden relative"
    >
      <div className="container mx-auto max-w-6xl relative z-10">
        <SectionHeader
          icon={Zap}
          eyebrow="About Our Company"
          title="About Us"
        />

        <p className="text-center text-[#202e44]/80 max-w-3xl mx-auto mb-16 leading-relaxed">
          The company has reliably catered to over 2 million healthcare
          professionals and laboratories, delivering temperature controlled,
          premium quality products. By 2027, it is projected to generate a
          profit of $264 million and is strategically advancing plans to
          establish domestic production of critical biotechnology products,
          reinforcing the nation’s healthcare infrastructure.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Left */}
          <div className="space-y-4 md:space-y-16">
            {services
              .filter((s) => s.position === "left")
              .map((service, index) => (
                <ServiceItem key={index} {...service} />
              ))}
          </div>

          {/* Center Image */}
          <div className="flex justify-center items-center order-first md:order-none mb-8 md:mb-0">
            <div className="relative w-full max-w-xs">
              <div className="rounded-md overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1747582411588-f9b4acabe995?q=80&w=3027&auto=format&fit=crop"
                  alt="Modern Healthcare"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 border border-primary rounded-md -m-3 -z-10" />
            </div>
          </div>

          {/* Right */}
          <div className="space-y-4 md:space-y-16">
            {services
              .filter((s) => s.position === "right")
              .map((service, index) => (
                <ServiceItem key={index} {...service} />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface ServiceItemProps {
  icon: React.ReactNode;
  secondaryIcon?: React.ReactNode;
  title: string;
  description: string;
}

function ServiceItem({
  icon,
  secondaryIcon,
  title,
  description,
}: ServiceItemProps) {
  return (
    <div className="flex flex-col group transition-transform duration-200 hover:-translate-y-1">
      <div className="flex items-center gap-3 mb-3">
        <div className="text-primary bg-primary/10 p-3 rounded-lg relative group-hover:bg-primary/20 transition-colors">
          {icon}
          {secondaryIcon}
        </div>
        <h3 className="text-xl font-medium text-[#202e44] group-hover:text-primary transition-colors">
          {title}
        </h3>
      </div>

      <p className="text-sm text-[#202e44]/80 leading-relaxed pl-12">
        {description}
      </p>

      <div className="mt-3 pl-12 flex items-center text-primary text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="flex items-center gap-1">
          Learn more <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
}
