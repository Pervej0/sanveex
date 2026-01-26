import Link from "next/link";
import { ArrowLeft, Printer } from "lucide-react";
import { getArticleBySlug } from "@/actions/articles/actions";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import Image from "next/image";
import SocialShare from "@/components/shared/SocialShare";

type PressReleasePageProps = {
  params: Promise<{ slug: string }>;
};

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

  return (
    <div className="min-h-screen bg-[#edf2f7] ">
      {/* 2. Main Container */}
      <div className="container mx-auto max-w-5xl px-4 py-12">
        <article className="bg-white p-6 md:p-12 border border-gray-100 rounded">
          {/* Back Navigation */}
          <div className="mb-8 border-b border-gray-100 pb-4">
            <Link
              href="/newsroom"
              className="inline-flex items-center text-xs md:text-sm font-bold text-primary hover:underline uppercase tracking-wider"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Newsroom
            </Link>
          </div>

          {/* Header Area */}
          <div className="mb-10">
            <div className="flex items-center gap-4 text-xs md:text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">
              <span className="text-primary">{article.type}</span>
              <span>|</span>
              <span>
                {format(new Date(article.publishedAt), "MMMM dd, yyyy")}
              </span>
            </div>

            <h1 className="text-2xl md:text-5xl font-black text-primary uppercase leading-tight tracking-tight mb-8">
              {article.title}
            </h1>

            {article.image && (
              <div className="relative aspect-video w-full mb-10 overflow-hidden rounded-xl border shadow-sm">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Toolbar (Print/Share) */}
            <div className="flex flex-wrap items-center gap-6 border-y border-gray-100 py-4 my-8">
              <div className="flex items-center gap-2">
                <SocialShare product={shareData} />
              </div>
            </div>
          </div>

          {/* Main Body Text */}
          <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed font-medium">
            <div dangerouslySetInnerHTML={{ __html: article.content || "" }} />
          </div>

          {/* Boilerplate Section (About Company) */}
          <div className="mt-16 bg-gray-50 p-8  border-l-3 border-primary">
            <h3 className="text-primary font-black uppercase tracking-wider text-lg mb-4">
              About Sanveex
            </h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8">
              Sanveex is a global biopharmaceutical company dedicated to
              changing the lives of patients with severe diseases. We focus on
              scientific innovation to deliver transformative medicines across
              oncology and rare diseases.
            </p>

            <div className="border-t border-gray-200 pt-6">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                Media Contact:
              </p>
              <p className="text-gray-800 font-bold text-lg">
                {article.authorName || "Sanveex Press Office"}
              </p>
              {article.authorRole && (
                <p className="text-sm text-gray-500 mb-2">
                  {article.authorRole}
                </p>
              )}
              <a
                href="mailto:mediarelations@sanveex.com"
                className="text-primary font-bold hover:underline"
              >
                mediarelations@sanveex.com
              </a>
            </div>
          </div>

          {/* Legal / Disclaimer Footer */}
          <div className="mt-12 text-[10px] text-gray-400 leading-relaxed text-justify opacity-80">
            <p>
              <strong>Forward-Looking Statements:</strong> This press release
              contains forward-looking statements within the meaning of the
              Private Securities Litigation Reform Act of 1995. Words such as
              and similar expressions (as well as other words or expressions
              referencing future events, conditions or circumstances) are
              intended to identify forward-looking statements.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
