"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

// --- MOCK DATA ---
const sidebarLinks = [
  { title: "Press Releases", href: "/blog" },
  { title: "Company Statements", href: "/statements" },
  { title: "Corporate Fact Sheet", href: "/fact-sheet" },
  { title: "Media Asset Library", href: "/media-assets" },
  { title: "B-roll and Images", href: "/b-roll" },
  { title: "Sanveex Stories", href: "/stories" },
  { title: "Events and Presentations", href: "/events" },
  { title: "Products", href: "/products" },
  { title: "Pipeline", href: "/pipeline" },
];

const newsItems = [
  {
    id: 1,
    type: "PRESS RELEASE",
    date: "01.07.2026",
    title:
      "SANVEEX TO PRESENT AT THE 44TH ANNUAL J.P. MORGAN HEALTHCARE CONFERENCE",
    slug: "jpm-conference",
  },
  {
    id: 2,
    type: "PRESS RELEASE",
    date: "01.06.2026",
    title:
      "SANVEEX ACQUIRES DARK BLUE THERAPEUTICS, BOLSTERING ONCOLOGY PIPELINE",
    slug: "acquisition",
  },
  {
    id: 3,
    type: "PRESS RELEASE",
    date: "12.19.2025",
    title:
      "SANVEEX TAKES ACTION WITH THE U.S. GOVERNMENT TO LOWER THE COST OF MEDICINES FOR AMERICAN PATIENTS",
    slug: "pricing-action",
  },
  {
    id: 4,
    type: "PRESS RELEASE",
    date: "12.11.2025",
    title: "NEW CLINICAL DATA SHOWS PROMISE FOR RARE DISEASE THERAPY",
    slug: "clinical-data",
  },
  {
    id: 5,
    type: "PRESS RELEASE",
    date: "11.30.2025",
    title: "SANVEEX NAMED ONE OF THE WORLD'S MOST INNOVATIVE COMPANIES",
    slug: "award",
  },
];

export default function NewsroomPage() {
  return (
    <div className="min-h-screen ">
      {/* 2. Main Container */}
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* --- LEFT COLUMN: Main Content (8 cols) --- */}
          <div className="lg:col-span-8 bg-white p-8 border border-gray-200">
            {/* Header Text */}
            <div className="mb-12">
              <p className="text-gray-600 text:sm md:text-lg mb-1">
                For all media inquiries, please contact
              </p>
              <a
                href="mailto:media@sanveex.com"
                className="text-[#0085CA] text-lg hover:underline"
              >
                mediarelations@sanveex.com
              </a>
            </div>

            {/* Page Title with Blue Vertical Bar */}
            <div className="flex items-center mb-12">
              <div className="w-1.5 h-10 bg-[#0085CA] mr-4"></div>
              <h1 className="text-2xl md:text-4xl font-bold text-[#0085CA]">
                Latest Press Releases
              </h1>
            </div>

            {/* News List */}
            <div className="space-y-10">
              {newsItems.map((item) => (
                <div
                  key={item.id}
                  className="group border-t border-gray-200 pt-6"
                >
                  {/* Meta Row (Type | Date | Arrow) */}
                  <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                    <div className="flex items-center gap-2">
                      <span>{item.type}</span>
                      <span className="text-gray-300">|</span>
                      <span>{item.date}</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-[#0085CA] transform transition-transform group-hover:translate-x-2" />
                  </div>

                  {/* Title Link */}
                  <Link
                    href={`/newsroom/press-releases/${item.slug}`}
                    className="block"
                  >
                    <h2 className="text-lg md:text-2xl font-bold text-[#0085CA] uppercase leading-tight group-hover:text-[#005f9e] transition-colors">
                      {item.title}
                    </h2>
                  </Link>
                </div>
              ))}
            </div>

            {/* Pagination / View More */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <button className="text-[#0085CA] font-bold uppercase tracking-wider flex items-center gap-2 hover:underline">
                View Archive <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* --- RIGHT COLUMN: Sidebar (4 cols) --- */}
          <aside className="lg:col-span-4">
            <div className="bg-white p-8 border border-gray-200">
              {/* Sidebar Header */}
              <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4">
                <h3 className="text-[#0085CA] font-bold uppercase tracking-widest text-sm">
                  Newsroom
                </h3>
                <ArrowRight className="w-4 h-4 text-[#0085CA]" />
              </div>

              {/* Sidebar Links */}
              <ul className="space-y-4">
                {sidebarLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center justify-between text-[#0085CA] hover:text-[#005f9e] transition-colors"
                    >
                      <span className="text-base font-normal">
                        {link.title}
                      </span>
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Extra Download Box (Like 'Amgen Fact Sheet' in screenshot 1) */}
              <div className="mt-12 border-t border-gray-200 pt-6">
                <h4 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">
                  Downloads
                </h4>
                <Link
                  href="#"
                  className="flex items-center justify-between text-[#0085CA] hover:underline"
                >
                  <span>Corporate Fact Sheet</span>
                  <span className="border border-[#0085CA] rounded px-1 text-[10px] font-bold">
                    PDF
                  </span>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
