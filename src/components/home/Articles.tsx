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

export default function InsightsSection({ articles = [] }: ArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section className="bg-navy-50/60 py-16 lg:py-24">
      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            align="left"
            icon={Newspaper}
            eyebrow="Newsroom"
            title="Latest news &amp; medical updates"
            description="Announcements, product updates and clinical information from the Sanveex medical affairs team."
          />

          <Link
            href="/newsroom"
            className="mb-12 hidden shrink-0 items-center gap-2 rounded-lg border border-navy-200 bg-white px-5 py-3 text-sm font-semibold text-primary transition-all hover:border-primary hover:shadow-sm lg:inline-flex"
          >
            Visit the newsroom
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.slice(0, 3).map((article) => (
            <Link
              key={article.id}
              href={`/newsroom/press-releases/${article.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:border-navy-200 hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-navy-100">
                {resolveImageSrc(article.image, null) ? (
                  <Image
                    src={resolveImageSrc(article.image, null)!}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 380px, (min-width: 768px) 45vw, 90vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Newspaper className="h-8 w-8 text-navy-300" />
                  </div>
                )}

                <span className="absolute left-4 top-4 rounded-md bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-primary shadow-sm backdrop-blur">
                  {article.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {format(new Date(article.publishedAt), "dd MMM yyyy")}
                  </span>
                  {article.readTime && (
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {article.readTime}
                    </span>
                  )}
                </div>

                <h3 className="line-clamp-2 text-lg font-bold leading-snug text-navy-800 transition-colors group-hover:text-primary">
                  {article.title}
                </h3>

                {article.excerpt && (
                  <p className="mt-2.5 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {article.excerpt}
                  </p>
                )}

                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Read article
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-center lg:hidden">
          <Link
            href="/newsroom"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-700"
          >
            Visit the newsroom
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
