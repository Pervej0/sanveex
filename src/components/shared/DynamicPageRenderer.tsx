import prisma from "@/lib/prisma";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import GlobalPageBanner from "@/components/shared/PageBanner";
import ProductListing from "@/components/products/ProductListing";

/**
 * Renders a dashboard-managed `Page` document by its full slug path
 * (e.g. `/products/overview`).
 *
 * Extracted so that both the catch-all route and the `/products/[slug]` route
 * (which falls back to a page when no product matches) share one implementation.
 */
export async function loadPage(slug: string) {
  try {
    return await prisma.page.findUnique({
      where: { slug },
      include: {
        children: {
          where: { isActive: true },
          orderBy: { order: "asc" },
        },
      },
    });
  } catch (error) {
    console.error(
      "[page] Database unavailable:",
      error instanceof Error ? error.message : error,
    );
    return null;
  }
}

export default function DynamicPageRenderer({
  page,
}: {
  page: NonNullable<Awaited<ReturnType<typeof loadPage>>>;
}) {
  const isCatalogue = page.layout === "product-listing";

  return (
    <main className="min-h-screen bg-white">
      <GlobalPageBanner
        desktopImage={page.image || "/about-banner-desktop.webp"}
        mobileImage={page.image || "/about-banner-mobile.webp"}
      />

      {/* ---------------- Product catalogue ---------------- */}
      {isCatalogue && (
        <section className="border-t border-border py-12 lg:py-16">
          <div className="container-x">
            {page.content ? (
              <div
                className="prose prose-lg mb-10 max-w-3xl text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: page.content }}
              />
            ) : (
              <div className="mb-10 max-w-3xl">
                <p className="eyebrow text-brand-teal-600">
                  Complete catalogue
                </p>
                <h2 className="mt-3 text-3xl sm:text-4xl">{page.title}</h2>
                {page.description && (
                  <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                    {page.description}
                  </p>
                )}
              </div>
            )}

            <ProductListing />
          </div>
        </section>
      )}

      {/* ---------------- Rich text page ---------------- */}
      {!isCatalogue && page.content && (
        <section className="py-12 lg:py-16">
          <div className="container-x">
            <div className="prose prose-lg max-w-3xl prose-headings:font-display prose-headings:text-navy-800 prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
              <div dangerouslySetInnerHTML={{ __html: page.content }} />
            </div>
          </div>
        </section>
      )}

      {/* ---------------- Child page index ---------------- */}
      {!page.content && page.children.length > 0 && !isCatalogue && (
        <section className="py-12 lg:py-16">
          <div className="container-x">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {page.children.map((child) => (
                <Link
                  key={child.id}
                  href={child.slug}
                  className="group flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-navy-200 hover:shadow-lg"
                >
                  <h3 className="mb-2 text-xl transition-colors group-hover:text-primary">
                    {child.title}
                  </h3>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {child.description}
                  </p>
                  <div className="mt-5 flex items-center text-sm font-bold text-primary">
                    Learn more
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------------- Empty placeholder ---------------- */}
      {!page.content && page.children.length === 0 && !isCatalogue && (
        <section className="py-16">
          <div className="container-x">
            <div className="rounded-xl border border-dashed border-border bg-muted/20 py-16 text-center">
              <p className="font-semibold text-navy-800">
                This page is being prepared
              </p>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Content for <span className="font-medium">{page.title}</span>{" "}
                will be published shortly. In the meantime, please{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-primary underline-offset-4 hover:underline"
                >
                  contact us
                </Link>{" "}
                for more information.
              </p>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
