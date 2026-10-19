"use client";

import * as LucideIcons from "lucide-react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
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
  return <IconComponent className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.9} />;
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
  const mid = Math.ceil(highlights.length / 2);
  const leftNodes = highlights.slice(0, mid);
  const rightNodes = highlights.slice(mid);

  const renderNode = (
    entry: WhyChooseUsEntry,
    index: number,
    side: "left" | "right",
  ) => {
    const number = String(index + 1).padStart(2, "0");
    const isLeft = side === "left";

    return (
      <li key={entry.id} className="relative flex h-full items-center lg:gap-0">
        {/* Connector toward the centre image (desktop only) */}
        {isLeft ? null : (
          <span
            aria-hidden
            className="hidden h-px w-12 shrink-0 bg-brand-teal-400 lg:block xl:w-16"
          />
        )}
        <div
          className={cn(
            "relative flex w-full flex-col sm:flex-row justify-between gap-2.5 sm:gap-4 rounded-xl sm:rounded-md border border-border bg-white p-3 sm:p-5 transition-colors hover:border-brand-teal-400 h-full",
            isLeft && "lg:flex-row-reverse lg:text-right",
          )}
        >
          <div className={cn("flex items-center justify-between sm:justify-start gap-2", isLeft && "lg:justify-end")}>
            <span className="flex h-8 w-8 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-navy-50 text-primary ring-2 sm:ring-4 ring-navy-50/60">
              {getIcon(entry.icon)}
            </span>
            <span className="text-[10px] sm:hidden font-bold tracking-[0.14em] text-brand-teal-600">
              {number}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <span className="hidden sm:inline-block text-[11px] font-bold tracking-[0.18em] text-brand-teal-600">
              {number}
            </span>
            <h3 className="mt-0.5 text-xs sm:text-base font-bold text-navy-800 leading-snug line-clamp-2 min-h-[32px] sm:min-h-0">
              {entry.title}
            </h3>
            <p className="mt-1 sm:mt-1.5 text-[11px] sm:text-sm leading-relaxed text-muted-foreground line-clamp-3 sm:line-clamp-none">
              {entry.description}
            </p>
          </div>
        </div>
        {isLeft ? (
          <span
            aria-hidden
            className="hidden h-px w-12 shrink-0 bg-brand-teal-400 lg:block xl:w-16"
          />
        ) : null}
      </li>
    );
  };

  return (
    <section id="about" className="overflow-hidden bg-white section-y">
      <div className="container-x">
        {/* Intro */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow justify-center text-brand-teal-600">
            <span aria-hidden className="h-px w-8 bg-brand-teal-500" />
            {eyebrow}
            <span aria-hidden className="h-px w-8 bg-brand-teal-500" />
          </span>

          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-[2.5rem]">
            {title}
          </h2>

          <div className="mt-6 space-y-4">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-[15px] leading-relaxed text-muted-foreground sm:text-base"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Infographic: image at the centre, information around it */}
        <div className="mt-14 grid items-center gap-10 lg:mt-20 lg:grid-cols-[1fr_auto_1fr] lg:gap-0">
          {/* Centre image */}
          <div className="relative mx-auto lg:order-2 lg:mx-0 lg:px-8 xl:px-12">
            <div className="relative mx-auto aspect-square w-[min(84vw,22rem)] sm:w-[26rem] lg:w-[23rem] xl:w-[27rem]">
              {/* Offset brand frame */}
              <span
                aria-hidden
                className="absolute -bottom-4 -right-4 h-full w-full rounded-md border-2 border-brand-teal-400 sm:-bottom-5 sm:-right-5"
              />
              <span
                aria-hidden
                className="absolute -left-4 -top-4 h-24 w-24 rounded-tl-md border-l-4 border-t-4 border-primary sm:-left-5 sm:-top-5 sm:h-28 sm:w-28"
              />
              <div className="relative h-full w-full overflow-hidden rounded-md bg-navy-50 shadow-xl">
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(min-width: 1280px) 432px, (min-width: 1024px) 368px, (min-width: 640px) 416px, 84vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Left information (2-col on small devices) */}
          {leftNodes.length > 0 && (
            <ul className="mt-6 grid grid-cols-2 gap-2.5 sm:gap-4 lg:order-1 lg:mt-0 lg:flex lg:flex-col lg:gap-8">
              {leftNodes.map((entry, i) => renderNode(entry, i, "left"))}
            </ul>
          )}

          {/* Right information (2-col on small devices) */}
          {rightNodes.length > 0 && (
            <ul className="mt-4 sm:mt-0 grid grid-cols-2 gap-2.5 sm:gap-4 lg:order-3 lg:flex lg:flex-col lg:gap-8">
              {rightNodes.map((entry, i) =>
                renderNode(entry, mid + i, "right"),
              )}
            </ul>
          )}
        </div>

        {/* Key figures band (white bg, dark borders, improvised corporate design) */}
        <dl className="mt-14 sm:mt-16 lg:mt-20 grid grid-cols-2 lg:grid-cols-4 overflow-hidden rounded-xl border border-slate-300 bg-white shadow-sm border-t-4 border-t-brand-teal-400">
          {[
            {
              icon: LucideIcons.ShieldCheck,
              value: "WHO-GMP",
              label: "Certified Manufacturing",
              subtext: "Amulet Pharma Gazipur Plant",
            },
            {
              icon: LucideIcons.FileCheck2,
              value: "DGDA",
              label: "Approved Formulations",
              subtext: "Active Mfg. Licenses 418 & 287",
            },
            {
              icon: LucideIcons.MapPin,
              value: "64",
              label: "Districts Covered",
              subtext: "Nationwide cold-chain distribution",
            },
            {
              icon: LucideIcons.QrCode,
              value: "100%",
              label: "Batch Traceability",
              subtext: "End-to-end serialized monitoring",
            },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={cn(
                "group relative flex flex-col items-center justify-center p-5 sm:p-7 lg:p-8 text-center transition-all duration-300 hover:bg-slate-50/80",
                i % 2 === 0 ? "border-r border-slate-200" : "",
                i < 2 ? "border-b border-slate-200 lg:border-b-0" : "",
                i < 3 ? "lg:border-r lg:border-slate-200" : "lg:border-r-0",
              )}
            >
              <span className="mb-3 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-lg bg-navy-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <stat.icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.8} />
              </span>
              <dd className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-950 tracking-tight transition-colors group-hover:text-primary">
                {stat.value}
              </dd>
              <dt className="mt-1.5 text-[10.5px] sm:text-xs font-bold uppercase tracking-[0.12em] text-brand-teal-700">
                {stat.label}
              </dt>
              <p className="mt-1 text-[11px] text-muted-foreground hidden sm:block">
                {stat.subtext}
              </p>
            </div>
          ))}
        </dl>

        <div className="mt-8 sm:mt-10 flex flex-row items-center justify-center gap-1.5 sm:gap-2.5">
          <Link
            href="/about/overview"
            className="inline-flex h-10 sm:h-12 items-center justify-center gap-1.5 sm:gap-2 rounded-md bg-primary px-3 sm:px-6 text-xs sm:text-sm font-semibold text-white transition-colors hover:bg-navy-700 shrink-0"
          >
            <span>About our company</span>
            <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Link>
          <Link
            href="/products/quality"
            className="inline-flex h-10 sm:h-12 items-center justify-center gap-1.5 sm:gap-2 rounded-md border border-border px-3 sm:px-6 text-xs sm:text-sm font-semibold text-navy-800 transition-colors hover:border-brand-teal-400 hover:text-primary shrink-0"
          >
            <span>Our quality standards</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
