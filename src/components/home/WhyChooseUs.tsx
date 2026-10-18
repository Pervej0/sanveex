"use client";

import * as LucideIcons from "lucide-react";
import { ArrowRight, BadgeCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { company } from "@/lib/company";
import { resolveImageSrc } from "@/lib/images";

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

function getIcon(name: string) {
  // @ts-expect-error - Dynamic lucide icon access
  const IconComponent = LucideIcons[name] || LucideIcons.BadgeCheck;
  return <IconComponent className="h-5 w-5" strokeWidth={1.9} />;
}

export default function AboutSection({
  entries = [],
  sectionData,
}: WhyChooseUsProps) {
  const eyebrow = sectionData?.eyebrow || "Who We Are";
  const title =
    sectionData?.title ||
    "A Bangladeshi pharmaceutical company built on quality and trust";
  const image = resolveImageSrc(sectionData?.image, "/about.jpeg")!;
  const paragraphs = sectionData?.description
    ? sectionData.description.split("\n").filter((p) => p.trim() !== "")
    : [
        "Sanveex Global Health markets and distributes a growing portfolio of quality-assured medicines across Bangladesh. We work in close partnership with Amulet Pharmaceuticals Ltd., a WHO-GMP compliant manufacturer, to bring reliable, affordable therapies to clinicians and patients.",
        "From regulatory approval and medical affairs to warehousing and nationwide distribution, every step of our value chain is documented, auditable and aligned with the standards set by the Directorate General of Drug Administration (DGDA).",
      ];

  const highlights = entries.slice(0, 4);

  return (
    <section id="about" className="bg-white py-16 lg:py-28">
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Media */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-xl sm:aspect-[4/3] lg:aspect-[4/5]">
              <Image
                src={image}
                alt={title}
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/50 via-transparent to-transparent" />
            </div>

            {/* Floating credential card */}
            <div className="absolute -bottom-6 left-4 right-4 rounded-xl border border-border bg-white p-5 shadow-lg sm:left-6 sm:right-auto sm:w-72">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-teal-100 text-brand-teal-700">
                  <BadgeCheck className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-bold text-navy-800">
                    {company.regulatory.qualityStandard}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Mfg. Licence No. {company.regulatory.mfgLicence}
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative accent */}
            <div className="absolute -left-4 -top-4 -z-10 hidden h-28 w-28 rounded-2xl bg-brand-teal-100 lg:block" />
          </div>

          {/* Copy */}
          <div className="order-1 lg:order-2">
            <span className="eyebrow rounded-full bg-brand-teal-100 px-3.5 py-1.5 text-brand-teal-700">
              {eyebrow}
            </span>

            <h2 className="mt-5 text-3xl sm:text-4xl lg:text-[2.5rem] lg:leading-[1.15]">
              {title}
            </h2>

            <div className="mt-6 space-y-4">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-[15px] leading-relaxed text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Stats */}
            <dl className="mt-9 grid grid-cols-2 gap-x-6 gap-y-6 border-y border-border py-7 sm:grid-cols-4">
              {company.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-display text-2xl font-extrabold text-primary sm:text-3xl">
                      {stat.value}
                    </span>
                    <span className="mt-1 block text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            {/* Value props */}
            {highlights.length > 0 && (
              <ul className="mt-8 grid gap-5 sm:grid-cols-2">
                {highlights.map((entry) => (
                  <li key={entry.id} className="flex gap-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-primary">
                      {getIcon(entry.icon)}
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-navy-800">
                        {entry.title}
                      </span>
                      <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                        {entry.description}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/about/overview"
                className="inline-flex h-12 items-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-white transition-colors hover:bg-navy-700"
              >
                About our company
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/products/quality"
                className="inline-flex h-12 items-center gap-2 rounded-lg border border-border px-6 text-sm font-semibold text-navy-800 transition-colors hover:border-navy-200 hover:text-primary"
              >
                Our quality standards
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
