"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Clock,
  User,
  CalendarDays,
  ChevronRight,
} from "lucide-react";

// Enriched mock data to look like a real CMS response
const articles = [
  {
    id: 1,
    category: "Business",
    readTime: "6 min read",
    author: {
      name: "Dr. Sarah Mitchell",
      role: "Chief of Medicine",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
    },
    date: "July 10, 2024",
    title:
      "Thousands of Patients Referred to Substance Use Treatment Protocols",
    excerpt:
      "New protocols are being implemented across the state to ensure patients receive the immediate care they need. This initiative bridges the gap between emergency response and long-term recovery solutions.",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2070", // High res
    isFeatured: true,
    slug: "patients-referred-substance-use-treatment",
  },
  {
    id: 2,
    category: "Oncology",
    readTime: "4 min read",
    author: {
      name: "James Wilson",
      role: "Medical Editor",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100",
    },
    date: "April 04, 2024",
    title: "MedStar Health Bel Air Cancer Services Aligns Expertise",
    excerpt:
      "A comprehensive look at how new alignments in oncology departments are improving patient survival rates.",
    img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1170",
    isFeatured: true,
    slug: "medstar-health-bel-air-cancer-services",
  },
  {
    id: 3,
    category: "Staffing",
    readTime: "3 min read",
    author: {
      name: "Dr. Emily Chen",
      role: "HR Director",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100",
    },
    date: "February 20, 2024",
    title: "Dr. Gabriel Del Corral Joins MedStar Plastic Surgery Team",
    excerpt:
      "We are thrilled to welcome Dr. Del Corral, a specialist in reconstructive surgery, to our growing team of experts.",
    img: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1170",
    isFeatured: true,
    slug: "dr-gabriel-del-corral-joins-medstar",
  },
];

export default function InsightsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto max-w-6xl px-4">
        {/* --- Section Header --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-gray-100 pb-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
              Our Latest
              <span className="text-primary"> Press Releases</span>
            </h2>
            <p className="text-gray-500 text-lg">
              Explore the latest updates, medical breakthroughs, and
              announcements from our team of specialists.
            </p>
          </div>
          <Link
            href="/newsroom"
            className="group flex items-center gap-2 px-5 py-3 rounded-full bg-gray-50 text-gray-900 font-medium hover:bg-primary hover:text-white transition-all duration-300"
          >
            View All Articles
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* --- Standard Articles Grid --- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/newsroom/press-releases/${article.slug}`}
              className="group flex flex-col bg-transparent"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl mb-5 shadow-sm">
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-block px-3 py-1 rounded-md bg-white/95 backdrop-blur-sm text-xs font-bold uppercase tracking-wide text-gray-800 shadow-sm">
                    {article.category}
                  </span>
                </div>
                <Image
                  src={article.img}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow">
                <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                  <span className="flex items-center">
                    <CalendarDays className="w-4 h-4 mr-1.5" />
                    {article.date}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span>{article.readTime}</span>
                </div>

                <h4 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h4>

                <p className="text-gray-600 text-sm line-clamp-2 mb-5 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
