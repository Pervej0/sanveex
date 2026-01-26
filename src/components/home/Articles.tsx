"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { format } from "date-fns";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string;
  image: string | null;
  readTime: string | null;
  publishedAt: Date;
}

interface ArticlesProps {
  articles: Article[];
}

export default function InsightsSection({ articles = [] }: ArticlesProps) {
  if (articles.length === 0) return null;

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
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl mb-5 shadow-sm border bg-muted">
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-block px-3 py-1 rounded-md bg-white/95 backdrop-blur-sm text-xs font-bold uppercase tracking-wide text-gray-800 shadow-sm">
                    {article.category}
                  </span>
                </div>
                {article.image && (
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow">
                <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                  <span className="flex items-center">
                    <CalendarDays className="w-4 h-4 mr-1.5" />
                    {format(new Date(article.publishedAt), "MMMM dd, yyyy")}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span>{article.readTime}</span>
                </div>

                <h4 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h4>

                <p className="text-gray-600 text-sm line-clamp-3 mb-5 leading-relaxed">
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
