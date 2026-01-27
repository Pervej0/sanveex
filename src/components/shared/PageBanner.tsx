"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

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

export default function GlobalPageBanner({
  desktopImage = "/banners/default-desktop.jpg",
  mobileImage = "/banners/default-mobile.jpg",
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
    <div className="relative w-full h-[300px] md:h-[400px] flex items-center">
      {/* --- BACKGROUND IMAGES --- */}
      <div className="absolute inset-0 z-0">
        {/* Mobile */}
        <div className="block md:hidden relative w-full h-full">
          <Image
            src={mobileImage}
            alt="Banner"
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Desktop */}
        <div className="hidden md:block relative w-full h-full">
          <Image
            src={desktopImage}
            alt="Banner"
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Overlay for readability - sophisticated gradient */}
        <div className="absolute inset-0 bg-black/40 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
      </div>

      {/* --- CONTENT --- */}
      <div className="container mx-auto max-w-6xl px-4 relative z-10 h-full flex flex-col justify-center">
        {/* Breadcrumbs */}
        <div className="absolute top-8 md:top-12 left-4 flex items-center gap-2 text-xs md:text-sm text-gray-200 font-medium mb-6">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.href} className="flex items-center gap-2">
              <ChevronRight className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
              <Link
                href={crumb.href}
                className={`transition-colors ${
                  index === breadcrumbs.length - 1
                    ? "text-white font-bold pointer-events-none"
                    : "hover:text-white"
                }`}
              >
                {crumb.label}
              </Link>
            </div>
          ))}
        </div>

        {/* Title */}
        <div className="mt-10 border-l-[6px] border-white pl-6 md:pl-8 py-1">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight drop-shadow-md capitalize">
            {pageTitle}
          </h1>
        </div>
      </div>
    </div>
  );
}
