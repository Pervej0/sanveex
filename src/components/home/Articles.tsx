"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock, Newspaper } from "lucide-react";
import { format } from "date-fns";
import SectionHeader from "../shared/SectionHeader";
import { resolveImageSrc } from "@/lib/images";

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

/** Excerpts may contain editor HTML; render plain text only. */
const stripHtml = (value: string) =>
  value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

export default function InsightsSection({ articles = [] }: ArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section className="bg-slate-50/70 py-16 lg:py-24 border-t border-slate-200/80">
      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            align="left"
            icon={Newspaper}
            eyebrow="Newsroom & Insights"
            title="Latest news &amp; medical updates"
            description="Announcements, product updates and clinical information from the Sanveex medical affairs team."
          />

          <Link
            href="/newsroom"
            className="mb-12 hidden shrink-0 items-center gap-2 rounded-md border border-slate-300 bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-primary shadow-xs transition-colors hover:border-brand-teal-400 hover:text-brand-teal-700 lg:inline-flex"
          >
            <span>Visit the newsroom</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-2.5 lg:grid-cols-4 lg:gap-2.5">
          {articles.slice(0, 4).map((article) => (
            <Link
              key={article.id}
              href={`/newsroom/press-releases/${article.slug}`}
              className="group flex flex-col overflow-hidden rounded-lg border border-slate-200/90 bg-white shadow-2xs transition-all duration-300 hover:border-brand-teal-400 hover:shadow-xl hover:shadow-navy-950/5"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-navy-100">
                {resolveImageSrc(article.image, null) ? (
                  <Image
                    src={resolveImageSrc(article.image, null)!}
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 280px, (min-width: 1024px) 25vw, (min-width: 768px) 45vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Newspaper className="h-6 w-6 sm:h-8 sm:w-8 text-navy-300" />
                  </div>
                )}

                <span className="absolute left-2 top-2 sm:left-3.5 sm:top-3.5 rounded-sm bg-navy-900/90 px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.1em] text-white shadow-sm backdrop-blur-sm">
                  {article.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-3 sm:p-5">
                <div className="mb-2 sm:mb-3 flex flex-wrap items-center gap-x-2 sm:gap-x-4 gap-y-1 text-[10px] sm:text-xs text-muted-foreground">
                  <span className="flex items-center gap-1 font-medium">
                    <CalendarDays className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-brand-teal-600" />
                    {format(new Date(article.publishedAt), "dd MMM yyyy")}
                  </span>
                  {article.readTime && (
                    <span className="hidden xs:flex items-center gap-1 font-medium">
                      <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-brand-teal-600" />
                      {article.readTime}
                    </span>
                  )}
                </div>

                <h3 className="line-clamp-2 text-xs sm:text-base font-bold leading-snug text-navy-900 transition-colors group-hover:text-primary min-h-[32px] sm:min-h-0">
                  {article.title}
                </h3>

                {article.excerpt && (
                  <p className="hidden sm:block mt-2.5 line-clamp-3 flex-1 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                    {stripHtml(article.excerpt)}
                  </p>
                )}

                <span className="mt-3 sm:mt-5 inline-flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-sm font-bold text-primary">
                  <span>Read article</span>
                  <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-0.5 text-brand-teal-500" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-center lg:hidden">
          <Link
            href="/newsroom"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-700"
          >
            Visit the newsroom
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
