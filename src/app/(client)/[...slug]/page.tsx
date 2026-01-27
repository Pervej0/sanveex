import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import GlobalPageBanner from "@/components/shared/PageBanner";
import ProductListing from "@/components/products/ProductListing";

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const path = "/" + slug.join("/");

  const page = await prisma.page.findUnique({
    where: { slug: path },
  });

  if (!page) return { title: "Page Not Found" };

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
  };
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const path = "/" + slug.join("/");

  const page = await prisma.page.findUnique({
    where: { slug: path },
    include: {
      children: {
        where: { isActive: true },
        orderBy: { order: "asc" },
      },
    },
  });

  if (!page || !page.isActive) {
    return notFound();
  }

  return (
    <main className="min-h-screen">
      <GlobalPageBanner
        desktopImage={page.image || "/about-banner-desktop.webp"}
        mobileImage={page.image || "/about-banner-mobile.webp"}
      />
      <div className="py-12">
        <div className="">
          <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12 rounded bg-white">
            <div className="prose prose-blue prose-lg dark:prose-invert max-w-none">
              {page.content ? (
                <div dangerouslySetInnerHTML={{ __html: page.content }} />
              ) : null}
            </div>
          </div>
          <div className="container mx-auto max-w-6xl rounded bg-[#edf2f7]">
            {page.layout === "product-listing" && <ProductListing />}
          </div>

          {!page.content &&
            page.children.length > 0 &&
            page.layout !== "product-listing" && (
              <div className=" container mx-auto max-w-6xl px-4 py-8 md:py-12 rounded bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                  {page.children.map((child) => (
                    <Link
                      key={child.id}
                      href={child.slug}
                      className="group p-6 rounded-2xl border border-border bg-card hover:border-primary transition-all shadow-sm flex flex-col"
                    >
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {child.title}
                      </h3>
                      <p className="text-muted-foreground line-clamp-2 text-sm">
                        {child.description}
                      </p>
                      <div className="mt-4 flex items-center text-primary text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                        Learn More <ChevronRight className="w-4 h-4 ml-1" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          {!page.content &&
            page.children.length === 0 &&
            page.layout !== "product-listing" && (
              <div className="text-muted-foreground italic py-12 text-center border rounded-xl bg-muted/10">
                No content available for this page yet.
              </div>
            )}
        </div>
      </div>
    </main>
  );
}
