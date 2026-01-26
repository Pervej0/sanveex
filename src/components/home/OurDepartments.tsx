"use client";

import { useState, useRef } from "react";
import * as LucideIcons from "lucide-react";
import { Zap, ArrowRight } from "lucide-react";
import SectionHeader from "../shared/SectionHeader";
import Link from "next/link";

interface DepartmentData {
  id: string;
  title: string;
  description: string;
  icon: string;
  secondaryIcon?: string | null;
  color: string;
}

interface SectionData {
  title: string;
  subtitle: string;
  videoUrl: string;
  buttonText: string;
  buttonLink: string;
}

interface OurDepartmentsProps {
  departments: DepartmentData[];
  sectionData?: SectionData | null;
}

export default function OurDepartments({
  departments = [],
  sectionData,
}: OurDepartmentsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const getIcon = (name: string, className?: string) => {
    // @ts-expect-error - Dynamic lucide icon access
    const IconComponent = LucideIcons[name] || LucideIcons.HelpCircle;
    return <IconComponent className={className} />;
  };

  const bannerTitle = sectionData?.title || "Excellence in Care";
  const bannerSubtitle =
    sectionData?.subtitle || "Advancing Healthcare Through Innovation";
  const videoUrl = sectionData?.videoUrl || "/healthcare.mp4";
  const buttonText = sectionData?.buttonText || "Explore Departments";
  const buttonLink = sectionData?.buttonLink || "#";

  return (
    <section
      id="departments-section"
      ref={sectionRef}
      className="w-full py-12 md:py-24 px-4 bg-background overflow-hidden relative"
    >
      <div className="container mx-auto max-w-6xl relative z-10">
        <SectionHeader
          icon={Zap}
          eyebrow="Explore Our Expertise"
          title="Our Departments"
        />

        <div className="mb-12 md:mb-20 relative">
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <div className="relative h-[300px] md:h-[500px] bg-gradient-to-br from-[#88734C]/20 to-[#A9BBC8]/20">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src={videoUrl} type="video/mp4" />
              </video>

              <div className="absolute inset-0 bg-gradient-to-t from-[#202e44]/90 via-[#202e44]/50 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
                <h3 className="text-2xl md:text-4xl font-light text-white mb-2 md:mb-3">
                  {bannerTitle}
                </h3>
                <p className="text-sm md:text-lg text-white/90 mb-3 md:mb-4 max-w-2xl">
                  {bannerSubtitle}
                </p>
                <Link href={buttonLink}>
                  <button className="px-4 py-2 md:px-6 md:py-3 bg-primary text-white text-sm md:text-base rounded-lg flex items-center gap-2 hover:bg-[#88734C]/90 transition">
                    {buttonText}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
            <div className="absolute inset-0 border-4 border-[#A9BBC8]/30 rounded-2xl -m-2 pointer-events-none" />
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {departments.map((department) => (
            <DepartmentCard
              key={department.id}
              department={{
                ...department,
                icon: getIcon(department.icon, "w-5 h-5 md:w-7 md:h-7"),
                secondaryIcon: department.secondaryIcon
                  ? getIcon(department.secondaryIcon, "w-3 h-3 md:w-4 md:h-4")
                  : null,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface DepartmentCardProps {
  department: {
    icon: React.ReactNode;
    title: string;
    description: string;
    color: string;
    secondaryIcon: React.ReactNode;
  };
}

function DepartmentCard({ department }: DepartmentCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative bg-gray-50 rounded-xl p-4 md:p-8 h-full flex flex-col overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-md">
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${department.color}10 0%, ${department.color}05 100%)`,
          }}
        />

        <div className="relative z-10 flex flex-col flex-grow">
          <div className="mb-3 md:mb-6 relative inline-block self-start">
            <div
              className="p-2.5 md:p-4 rounded-xl relative transition-transform duration-300 group-hover:rotate-3"
              style={{ backgroundColor: `${department.color}15` }}
            >
              <div style={{ color: department.color }}>{department.icon}</div>

              {department.secondaryIcon && (
                <div
                  className={`absolute -top-1 -right-1 md:-top-2 md:-right-2 transition-transform duration-300 ${
                    isHovered ? "scale-100" : "scale-0"
                  }`}
                  style={{ color: department.color }}
                >
                  {department.secondaryIcon}
                </div>
              )}
            </div>
          </div>

          <h3
            className="text-base sm:text-lg md:text-2xl font-semibold mb-2 md:mb-3 transition-colors duration-300"
            style={{ color: isHovered ? department.color : "#202e44" }}
          >
            {department.title}
          </h3>

          <p className="text-xs sm:text-sm md:text-base text-[#202e44]/70 leading-relaxed mb-4 md:mb-6 flex-grow line-clamp-4 md:line-clamp-none">
            {department.description}
          </p>

          <div
            className="flex items-center gap-1.5 md:gap-2 font-medium text-xs md:text-sm transition-transform duration-300 mt-auto"
            style={{
              color: department.color,
              transform: isHovered ? "translateX(4px)" : "translateX(0)",
            }}
          >
            Learn more
            <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 h-1 rounded-full transition-all duration-300"
          style={{
            backgroundColor: department.color,
            width: isHovered ? "100%" : "0%",
          }}
        />

        <div
          className="hidden md:block absolute top-4 right-4 w-20 h-20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ backgroundColor: `${department.color}08` }}
        />
      </div>
    </div>
  );
}
