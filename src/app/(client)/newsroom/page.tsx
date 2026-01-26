import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { getAllArticles } from "@/actions/articles/actions";
import { format } from "date-fns";
import Image from "next/image";

export default async function NewsroomPage() {
  const articles = await getAllArticles();

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/newsroom/press-releases/${article.slug}`}
              className="group flex flex-col  bg-transparent"
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

                <div
                  dangerouslySetInnerHTML={{ __html: article.excerpt || "" }}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
