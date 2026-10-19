import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarDays, Clock, ChevronRight } from "lucide-react";
import { getAllArticles } from "@/actions/articles/actions";
import { format } from "date-fns";
import Image from "next/image";
import { resolveImageSrc } from "@/lib/images";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsroom & Corporate Press Releases",
  description:
    "Official corporate announcements, regulatory filings, clinical portfolio updates and company statements from Sanveex Global Health.",
};

const stripHtml = (value: string) =>
  value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

export default async function NewsroomPage() {
  const articles = await getAllArticles();
  const activeArticles = articles.filter((a) => a.isActive);

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* ================= Header Banner ================= */}
      <section className="relative overflow-hidden border-b-4 border-b-brand-teal-400 bg-navy-950 py-14 text-white lg:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(86,174,184,0.18),rgba(255,255,255,0))]" />
        
        {/* Ambient subtle glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 top-0 z-10 h-64 w-64 rounded-full bg-brand-teal-500/15 blur-3xl"
        />

        <div className="container-x relative z-10">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumbs"
            className="mb-6 flex items-center gap-2 text-xs font-medium text-slate-300"
          >
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <span className="text-brand-teal-300">Newsroom &amp; Media</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-teal-400/30 bg-brand-teal-950/60 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-teal-300 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-brand-teal-400 animate-pulse" />
              Press Office &amp; Announcements
            </span>
            <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Corporate News &amp; Updates
            </h1>
            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              Stay informed with official press releases, therapeutic expansion
              milestones, and regulatory announcements from Sanveex Global Health.
            </p>
          </div>
        </div>
      </section>

      {/* ================= Articles Grid ================= */}
      <section className="py-12 lg:py-16">
        <div className="container-x">
          {activeArticles.length > 0 ? (
            <div className="grid grid-cols-2 gap-2.5 sm:gap-8 lg:grid-cols-3">
              {activeArticles.map((article) => {
                const plainExcerpt = article.excerpt ? stripHtml(article.excerpt) : "";
                const imageSrc = resolveImageSrc(article.image, null);

                return (
                  <Link
                    key={article.id}
                    href={`/newsroom/press-releases/${article.slug}`}
                    className="group flex flex-col overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-navy-200 hover:shadow-lg"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-navy-50">
                      <div className="absolute left-2 top-2 sm:left-3 sm:top-3 z-10">
                        <span className="inline-block rounded-md border border-slate-200/80 bg-white/95 px-1.5 sm:px-3 py-0.5 sm:py-1 text-[9px] sm:text-[11px] font-bold uppercase tracking-wider text-navy-900 shadow-sm backdrop-blur-sm">
                          {article.category}
                        </span>
                      </div>
                      {imageSrc ? (
                        <Image
                          src={imageSrc}
                          alt={article.title}
                          fill
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-navy-50 text-navy-300">
                          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">Sanveex News</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col justify-between p-3 sm:p-6">
                      <div>
                        {/* Meta row */}
                        <div className="flex items-center gap-2 sm:gap-2.5 text-[10px] sm:text-xs text-muted-foreground">
                          <span className="flex items-center gap-1 font-medium">
                            <CalendarDays className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-brand-teal-600" />
                            {format(new Date(article.publishedAt), "dd MMM yyyy")}
                          </span>
                          {article.readTime && (
                            <>
                              <span className="h-1 w-1 rounded-full bg-slate-300" />
                              <span className="hidden xs:flex items-center gap-1">
                                <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-brand-teal-600" />
                                {article.readTime}
                              </span>
                            </>
                          )}
                        </div>

                        {/* Title */}
                        <h2 className="mt-2 sm:mt-3 font-display text-xs sm:text-lg font-bold leading-snug text-navy-900 transition-colors group-hover:text-primary sm:text-xl line-clamp-2 min-h-[32px] sm:min-h-0">
                          {article.title}
                        </h2>

                        {/* Plain text excerpt */}
                        {plainExcerpt && (
                          <p className="hidden sm:block mt-2.5 line-clamp-3 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                            {plainExcerpt}
                          </p>
                        )}
                      </div>

                      {/* Read more footer */}
                      <div className="mt-3 sm:mt-5 flex items-center gap-1 sm:gap-1.5 border-t border-slate-100 pt-2.5 sm:pt-4 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-primary group-hover:text-brand-teal-600 transition-colors">
                        <span>Read statement</span>
                        <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
              <p className="font-display text-lg font-bold text-navy-900">No press releases published yet</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Check back soon for announcements and media releases.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
