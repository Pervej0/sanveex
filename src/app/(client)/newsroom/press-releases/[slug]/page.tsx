import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock, FileText, ChevronRight } from "lucide-react";
import { getArticleBySlug } from "@/actions/articles/actions";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import Image from "next/image";
import SocialShare from "@/components/shared/SocialShare";
import { resolveImageSrc } from "@/lib/images";
import { company } from "@/lib/company";
import type { Metadata } from "next";

type PressReleasePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PressReleasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article || !article.isActive) {
    return { title: "Press Release Not Found" };
  }

  return {
    title: `${article.title} | Sanveex Global Health`,
    description: article.excerpt ?? undefined,
  };
}

export default async function PressReleasePage({
  params,
}: PressReleasePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article || !article.isActive) {
    notFound();
  }

  const shareData = {
    name: article.title,
    description: article.excerpt || "",
    image: article.image || "",
  };

  const imageSrc = resolveImageSrc(article.image, null);

  return (
    <div className="min-h-screen bg-slate-50/70 py-10 lg:py-14">
      <div className="container-x max-w-4xl">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumbs"
          className="mb-8 flex items-center gap-2 text-xs font-medium text-muted-foreground"
        >
          <Link href="/" className="transition-colors hover:text-primary">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          <Link href="/newsroom" className="transition-colors hover:text-primary">
            Newsroom
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          <span className="truncate font-semibold text-navy-800">
            {article.title}
          </span>
        </nav>

        {/* Article Card Container */}
        <article className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-10 lg:p-12">
          {/* Header Area */}
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-block rounded-full border border-brand-teal-400/30 bg-brand-teal-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-teal-700">
                {article.category || article.type || "Press Release"}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <CalendarDays className="h-3.5 w-3.5 text-brand-teal-600" />
                {format(new Date(article.publishedAt), "MMMM dd, yyyy")}
              </span>
              {article.readTime && (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 text-brand-teal-600" />
                  {article.readTime}
                </span>
              )}
            </div>

            <h1 className="mt-5 font-display text-2xl font-extrabold tracking-tight text-navy-950 sm:text-3xl lg:text-4xl leading-[1.2]">
              {article.title}
            </h1>

            {/* Featured Image */}
            {imageSrc && (
              <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-xl border border-slate-200/80 bg-navy-50 shadow-sm">
                <Image
                  src={imageSrc}
                  alt={article.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            )}

            {/* Social Share Toolbar */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-slate-100 py-4">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Share this release
              </span>
              <SocialShare product={shareData} />
            </div>
          </div>

          {/* Main Body Text */}
          <div className="prose prose-slate prose-lg max-w-none pt-8 font-normal leading-relaxed text-slate-700 prose-headings:font-display prose-headings:font-bold prose-headings:text-navy-950 prose-a:font-semibold prose-a:text-brand-teal-600 hover:prose-a:text-brand-teal-700">
            <div dangerouslySetInnerHTML={{ __html: article.content || "" }} />
          </div>

          {/* Boilerplate Section (About Company) */}
          <div className="mt-14 rounded-xl border border-slate-200/90 border-l-4 border-l-primary bg-navy-50/50 p-6 sm:p-8">
            <h3 className="font-display text-base font-bold text-navy-900">
              About Sanveex Global Health
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {company.legalName} is a pharmaceutical marketing and distribution
              company in Bangladesh dedicated to delivering quality-assured,
              WHO-GMP manufactured medicines in strategic partnership with Amulet
              Pharmaceuticals Ltd. Our portfolio spans Respiratory, Allergy,
              Bone and Nutritional Health across all 64 districts.
            </p>

            <div className="mt-6 border-t border-slate-200/80 pt-5 text-xs text-slate-500">
              <p className="font-bold uppercase tracking-wider text-slate-400">
                Media &amp; Public Relations Contact:
              </p>
              <p className="mt-1 font-semibold text-navy-800 text-sm">
                {article.authorName || "Sanveex Press Office"}
              </p>
              {article.authorRole && (
                <p className="text-slate-500">{article.authorRole}</p>
              )}
              <a
                href={`mailto:${company.contact.email}`}
                className="mt-1 inline-block font-semibold text-brand-teal-600 transition-colors hover:text-brand-teal-700 hover:underline"
              >
                {company.contact.email}
              </a>
            </div>
          </div>

          {/* Legal / Regulatory Disclaimer */}
          <div className="mt-10 border-t border-slate-100 pt-6 text-[11px] leading-relaxed text-slate-400">
            <p>
              <strong>Corporate Notice:</strong> Information contained in this
              release is accurate at the time of distribution. Product
              availability and registration status reflect authorizations by the
              Directorate General of Drug Administration (DGDA) in the People&apos;s
              Republic of Bangladesh.
            </p>
          </div>
        </article>

        {/* Back Link */}
        <div className="mt-8 text-center sm:text-left">
          <Link
            href="/newsroom"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary transition-colors hover:text-brand-teal-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all press releases
          </Link>
        </div>
      </div>
    </div>
  );
}
