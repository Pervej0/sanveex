"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { resolveImageSrc } from "@/lib/images";

const aboutItems = [
  { title: "Company Overview", href: "/about/overview" },
  { title: "Our History", href: "/about/history" },
  { title: "Leadership Team", href: "/about/leadership" },
  { title: "Mission & Values", href: "/about/mission-and-values" },
  { title: "Board Message", href: "/about/speech" },
];

const productsItems = [
  { title: "Products Overview", href: "/products/overview" },
  { title: "Medical Information", href: "/products/medical-info" },
  { title: "Quality Assurance", href: "/products/quality" },
  { title: "Safety Information", href: "/products/safety" },
];

const scienceItems = [
  { title: "R&D Overview", href: "/science/overview" },
  { title: "Research Pipeline", href: "/science/pipeline" },
  { title: "Scientific Advisory", href: "/science/advisory" },
  { title: "Publications", href: "/science/publications" },
];

const storiesItems = [
  { title: "Patient Stories", href: "/stories/patients" },
  { title: "Sustainability", href: "/stories/sustainability" },
  { title: "Community Impact", href: "/stories/community" },
  { title: "Innovation Stories", href: "/stories/innovation" },
];

// Combine ALL items into one master list for lookup
const ALL_PAGES = [
  ...aboutItems,
  ...productsItems,
  ...scienceItems,
  ...storiesItems,
];

interface GlobalPageBannerProps {
  desktopImage?: string;
  mobileImage?: string;
}

const DEFAULT_DESKTOP_BANNER = "/about-banner-desktop.webp";
const DEFAULT_MOBILE_BANNER = "/about-banner-mobile.webp";

export default function GlobalPageBanner({
  desktopImage = DEFAULT_DESKTOP_BANNER,
  mobileImage = DEFAULT_MOBILE_BANNER,
}: GlobalPageBannerProps) {
  const pathname = usePathname();

  // 1. Don't show banner on Home Page
  if (pathname === "/") return null;

  // 2. Find current page title from our data
  const activeItem = ALL_PAGES.find((item) => item.href === pathname);

  // 3. Fallback Title Logic:
  // If URL is "/science/clinical-trials", but it's not in our menu,
  // this will auto-format it to: "Clinical Trials"
  const pageTitle = activeItem
    ? activeItem.title
    : pathname
        ?.split("/")
        .pop()
        ?.replace(/-/g, " ") // replace hyphens with space
        .replace(/^\w/, (c) => c.toUpperCase()) || "Page"; // capitalize first letter

  // 4. Generate Breadcrumbs automatically
  const segments = pathname?.split("/").filter(Boolean) || [];

  const breadcrumbs = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`;

    // Check if this specific breadcrumb segment matches a known page title
    // e.g. "science" -> "Science", "mission-and-values" -> "Mission & Values"
    const match = ALL_PAGES.find((i) => i.href === href);

    // Format label: Use found title OR capitalize the segment
    const label = match
      ? match.title
      : segment.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase());

    return { label, href };
  });

  return (
    <div className="relative w-full h-[240px] md:h-[300px] flex items-center border-b-4 border-brand-teal-400 bg-navy-950 overflow-hidden">
      {/* --- BACKGROUND IMAGES --- */}
      <div className="absolute inset-0 z-0">
        {/* Mobile */}
        <div className="block md:hidden relative w-full h-full">
          <Image
            src={resolveImageSrc(mobileImage, DEFAULT_MOBILE_BANNER)!}
            alt="Banner"
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Desktop */}
        <div className="hidden md:block relative w-full h-full">
          <Image
            src={resolveImageSrc(desktopImage, DEFAULT_DESKTOP_BANNER)!}
            alt="Banner"
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Overlay for readability - sophisticated multi-layer gradient */}
        <div className="absolute inset-0 bg-navy-950/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/30" />
      </div>

      {/* Ambient subtle glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-0 z-10 h-64 w-64 rounded-full bg-brand-teal-500/15 blur-3xl"
      />

      {/* --- CONTENT --- */}
      <div className="container-x relative z-10 flex h-full flex-col justify-center pt-4">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumbs"
          className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-300/90 sm:text-sm"
        >
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.href} className="flex items-center gap-2">
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <Link
                href={crumb.href}
                className={`transition-colors ${
                  index === breadcrumbs.length - 1
                    ? "text-brand-teal-300 font-semibold pointer-events-none"
                    : "hover:text-white"
                }`}
              >
                {crumb.label}
              </Link>
            </div>
          ))}
        </nav>

        {/* Title */}
        <div className="mt-3 sm:mt-4">
          <h1 className="font-display text-3xl font-extrabold text-white tracking-tight capitalize sm:text-4xl lg:text-5xl">
            {pageTitle}
          </h1>
          <span className="mt-4 block h-[3px] w-14 rounded-full bg-brand-teal-400" />
        </div>
      </div>
    </div>
  );
}
