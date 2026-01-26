"use client";

import type React from "react";
import { useRef } from "react";
import * as LucideIcons from "lucide-react";
import { ArrowRight, Zap } from "lucide-react";
import SectionHeader from "../shared/SectionHeader";
import Image from "next/image";

interface WhyChooseUsEntry {
  id: string;
  title: string;
  description: string;
  icon: string;
  secondaryIcon?: string | null;
  position: string;
}

interface AboutSectionData {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
}

interface WhyChooseUsProps {
  entries: WhyChooseUsEntry[];
  sectionData?: AboutSectionData | null;
}

export default function AboutSection({
  entries = [],
  sectionData,
}: WhyChooseUsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Default values if no data exists
  const eyebrow = sectionData?.eyebrow || "About Our Company";
  const title = sectionData?.title || "About Us";
  const image = sectionData?.image || "/about.jpeg";
  const descriptionParagraphs = sectionData?.description
    ? sectionData.description.split("\n").filter((p) => p.trim() !== "")
    : [""];

  const getIcon = (name: string, className: string = "w-6 h-6") => {
    // @ts-expect-error - Dynamic lucide icon access
    const IconComponent = LucideIcons[name] || LucideIcons.HelpCircle;
    return <IconComponent className={className} />;
  };

  const getSecondaryIcon = (name?: string | null) => {
    if (!name) return null;
    // @ts-expect-error - Dynamic lucide icon access
    const IconComponent = LucideIcons[name];
    if (!IconComponent) return null;

    return (
      <IconComponent className="w-4 h-4 absolute -top-1 -right-1 text-[#A9BBC8]" />
    );
  };

  return (
    <section
      id="about-section"
      ref={sectionRef}
      className="w-full py-12 md:py-24 px-4 bg-background overflow-hidden relative"
    >
      <div className="container mx-auto max-w-6xl relative z-10">
        <SectionHeader icon={Zap} eyebrow={eyebrow} title={title} />

        <div className="max-w-4xl mx-auto mb-16 text-center text-[#202e44]/80 leading-relaxed space-y-6">
          {descriptionParagraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Left */}
          <div className="space-y-4 md:space-y-16">
            {entries
              .filter((s) => s.position === "left")
              .map((service) => (
                <ServiceItem
                  key={service.id}
                  title={service.title}
                  description={service.description}
                  icon={getIcon(service.icon)}
                  secondaryIcon={getSecondaryIcon(service.secondaryIcon)}
                />
              ))}
          </div>

          {/* Center Image */}
          <div className="flex justify-center items-center order-first md:order-none mb-8 md:mb-0">
            <div className="relative w-full max-w-xs">
              <div className="rounded-md overflow-hidden shadow-xl">
                <Image
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
                  height={400}
                  width={300}
                />
              </div>
              <div className="absolute inset-0 border border-primary rounded-md -m-3 -z-10" />
            </div>
          </div>

          {/* Right */}
          <div className="space-y-4 md:space-y-16">
            {entries
              .filter((s) => s.position === "right")
              .map((service) => (
                <ServiceItem
                  key={service.id}
                  title={service.title}
                  description={service.description}
                  icon={getIcon(service.icon)}
                  secondaryIcon={getSecondaryIcon(service.secondaryIcon)}
                />
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
