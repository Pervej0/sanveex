"use client";

import * as LucideIcons from "lucide-react";
import { ArrowRight, Activity } from "lucide-react";
import SectionHeader from "../shared/SectionHeader";
import Link from "next/link";
import DepartmentCard from "./DepartmentCard";

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
  const getIcon = (name: string, className?: string) => {
    // @ts-expect-error - Dynamic lucide icon access
    const IconComponent = LucideIcons[name] || LucideIcons.Activity;
    return <IconComponent className={className} strokeWidth={1.9} />;
  };

  if (departments.length === 0) return null;

  const bannerTitle = sectionData?.title || "Excellence in Care";
  const bannerSubtitle =
    sectionData?.subtitle || "Advancing Healthcare Through Innovation";
  const videoUrl = sectionData?.videoUrl || "/healthcare.mp4";
  const buttonText = sectionData?.buttonText || "Explore therapeutic areas";
  const buttonLink = sectionData?.buttonLink || "/products/overview";

  return (
    <section id="therapeutic-areas" className="bg-white py-16 lg:py-24">
      <div className="container-x">
        <SectionHeader
          icon={Activity}
          eyebrow="Therapeutic Areas"
          title="Focused where the clinical need is greatest"
          description="Our portfolio is organised around the therapeutic areas our medical and commercial teams know best."
        />

        {/* Corporate film */}
        <div className="relative mb-12 overflow-hidden rounded-2xl shadow-lg lg:mb-16">
          <div className="relative h-[280px] bg-navy-900 sm:h-[380px] lg:h-[460px]">
            <video
              autoPlay
              loop
              muted
              playsInline
              poster="/hero1.jpeg"
              className="h-full w-full object-cover"
            >
              <source src={videoUrl} type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/95 via-navy-900/45 to-navy-900/10" />

            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-12">
              <div className="max-w-2xl">
                <h3 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                  {bannerTitle}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-navy-100 sm:text-base">
                  {bannerSubtitle}
                </p>
                <Link
                  href={buttonLink}
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-teal-400 px-6 py-3 text-sm font-bold text-navy-900 transition-all hover:-translate-y-0.5 hover:bg-brand-teal-300"
                >
                  {buttonText}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Areas grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((department: any) => (
            <DepartmentCard
              key={department.id}
              department={{
                ...department,
                icon: getIcon(department.icon, "w-5 h-5"),
                secondaryIcon: department.secondaryIcon
                  ? getIcon(department.secondaryIcon, "w-3.5 h-3.5")
                  : null,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
