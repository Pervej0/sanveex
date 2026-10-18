import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  FileText,
  Mail,
  Phone,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";

import {
  findProductBySlug,
  listProducts,
  listProductSlugs,
} from "@/lib/products";
import { company, productDisclaimer } from "@/lib/company";
import ClinicalAccordion from "@/components/products/ClinicalAccordion";
import ProductCard from "@/components/products/ProductCard";
import ProductGalleryViewer from "@/components/products/ProductGalleryViewer";
import DynamicPageRenderer, {
  loadPage,
} from "@/components/shared/DynamicPageRenderer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await listProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await findProductBySlug(slug);

  if (!product) {
    // The slug may belong to a marketing page nested under /products
    // (e.g. /products/overview, /products/quality).
    const page = await loadPage(`/products/${slug}`);
    if (page) {
      return {
        title: page.title,
        description: page.description ?? undefined,
        keywords: page.keywords ?? undefined,
      };
    }
    return { title: "Product not found" };
  }

  return {
    title: `${product.name} (${product.genericName ?? ""})`,
    description:
      product.description ??
      `${product.name} — ${product.genericName}. Marketed and distributed by ${company.legalName}.`,
    openGraph: {
      title: `${product.name} | ${company.legalName}`,
      description: product.description ?? undefined,
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await findProductBySlug(slug);

  if (!product) {
    // Fall back to a dashboard-managed page living under /products/*.
    const page = await loadPage(`/products/${slug}`);
    if (page && page.isActive) return <DynamicPageRenderer page={page} />;
    notFound();
  }

  const allProducts = await listProducts();
  const related = allProducts
    .filter((p) => p.slug !== product.slug)
    .sort((a, b) => {
      const aSame = a.categorySlug === product.categorySlug ? 0 : 1;
      const bSame = b.categorySlug === product.categorySlug ? 0 : 1;
      return aSame - bSame;
    })
    .slice(0, 3);

  /* Quick facts shown beside the product name. */
  const facts = [
    { label: "Dosage form", value: product.dosageForm },
    { label: "Pack size", value: product.packSize },
    { label: "Strength", value: product.strength },
    { label: "Therapeutic class", value: product.therapeuticClass },
  ].filter((fact) => Boolean(fact.value));

  const maNumber = product.specs.find((spec) =>
    spec.label.toLowerCase().includes("authorisation"),
  )?.value;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description ?? undefined,
    image: `https://sanveex.com${product.image}`,
    category: product.categoryName ?? "Pharmaceutical",
    brand: { "@type": "Brand", name: "Sanveex Global Health" },
    manufacturer: {
      "@type": "Organization",
      name: company.manufacturer.name,
    },
    additionalProperty: product.specs.map((spec) => ({
      "@type": "PropertyValue",
      name: spec.label,
      value: spec.value,
    })),
  };

  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      {/* ================= Product header ================= */}
      <section className="border-b border-border bg-gradient-to-b from-navy-50 to-white">
        <div className="container-x">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 pt-6 text-xs text-muted-foreground"
          >
            <Link href="/" className="transition-colors hover:text-primary">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link
              href="/products/overview"
              className="transition-colors hover:text-primary"
            >
              Products
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="font-semibold text-navy-800">{product.name}</span>
          </nav>

          <div className="grid gap-10 py-10 lg:grid-cols-12 lg:gap-14 lg:py-16">
            {/* Media & Artwork Gallery */}
            <div className="order-2 lg:order-1 lg:col-span-6">
              <ProductGalleryViewer
                primaryImage={product.image}
                gallery={product.gallery}
                productName={product.name}
                genericName={product.genericName}
              />
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Click any thumbnail to inspect high-resolution carton packaging and label artwork
              </p>
            </div>

            {/* Summary */}
            <div className="order-1 lg:order-2 lg:col-span-6">
              <div className="flex flex-wrap items-center gap-2">
                {product.categoryName && (
                  <span className="eyebrow rounded-full bg-brand-teal-100 px-3 py-1.5 text-brand-teal-700">
                    {product.categoryName}
                  </span>
                )}
                <span className="eyebrow rounded-full bg-navy-100 px-3 py-1.5 text-navy-800">
                  WHO-GMP Compliant
                </span>
                {maNumber && (
                  <span className="eyebrow rounded-full bg-emerald-50 px-3 py-1.5 text-emerald-700 ring-1 ring-emerald-200">
                    MA: {maNumber}
                  </span>
                )}
              </div>

              <div className="mt-4 flex flex-wrap items-baseline gap-3">
                <h1 className="text-4xl font-extrabold tracking-tight text-navy-800 sm:text-5xl">
                  {product.name}
                </h1>
                {product.brandBangla && (
                  <span className="rounded-lg bg-navy-50 px-3 py-1 font-display text-xl font-bold text-navy-800 ring-1 ring-navy-100">
                    {product.brandBangla}
                  </span>
                )}
              </div>

              <p className="mt-3 text-lg font-semibold text-brand-teal-600">
                {product.genericName}
                {product.genericBangla ? ` (${product.genericBangla})` : ""}
                {product.strength ? ` · ${product.strength}` : ""}
              </p>

              {product.description && (
                <p className="mt-5 leading-relaxed text-muted-foreground">
                  {product.description}
                </p>
              )}

              {/* Quick facts */}
              {facts.length > 0 && (
                <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-border py-6">
                  {facts.map((fact) => (
                    <div key={fact.label}>
                      <dt className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                        {fact.label}
                      </dt>
                      <dd className="mt-1 text-sm font-semibold text-navy-800">
                        {fact.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}

              {/* Actions */}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-white shadow-sm transition-all hover:bg-navy-700"
                >
                  <Mail className="h-4 w-4" />
                  Commercial &amp; Distribution Inquiry
                </Link>

                {product.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center gap-2 rounded-lg border border-border bg-white px-6 text-sm font-semibold text-navy-800 transition-colors hover:border-navy-200 hover:text-primary"
                  >
                    <FileText className="h-4 w-4 text-brand-teal-500" />
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Regulatory footnote */}
              <div className="mt-8 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
                <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                <p className="text-xs leading-relaxed text-amber-900">
                  {productDisclaimer}
                  {maNumber && (
                    <>
                      {" "}
                      <span className="font-semibold">
                        Marketing authorisation no. {maNumber}.
                      </span>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Highlights ================= */}
      {product.features.length > 0 && (
        <section className="border-b border-border py-14 lg:py-18">
          <div className="container-x">
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <p className="eyebrow text-brand-teal-600">Key highlights</p>
                <h2 className="mt-3 text-3xl font-bold">
                  Why clinicians choose {product.name}
                </h2>
              </div>
              <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
                {product.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 rounded-xl border border-border bg-navy-50/60 p-5"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal-500" />
                    <span className="text-sm leading-relaxed font-medium text-navy-800">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* ================= Clinical + specifications ================= */}
      <section className="border-b border-border py-14 lg:py-18">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            {product.clinical.length > 0 && (
              <div className="lg:col-span-7">
                <p className="eyebrow text-brand-teal-600">
                  Clinical information
                </p>
                <h2 className="mt-3 mb-6 text-3xl font-bold">
                  Prescribing summary
                </h2>
                <ClinicalAccordion sections={product.clinical} />
                <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                  This summary is provided for healthcare professionals and does
                  not replace the full prescribing information approved by the{" "}
                  {company.regulatory.authority}.
                </p>
              </div>
            )}

            {product.specs.length > 0 && (
              <div className="lg:col-span-5">
                <p className="eyebrow text-brand-teal-600">
                  Product record
                </p>
                <h2 className="mt-3 mb-6 text-3xl font-bold">Specifications</h2>

                <dl className="overflow-hidden rounded-xl border border-border">
                  {product.specs.map((spec, index) => (
                    <div
                      key={spec.label}
                      className={`flex flex-col gap-1 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 ${
                        index % 2 === 0 ? "bg-navy-50/60" : "bg-white"
                      }`}
                    >
                      <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        {spec.label}
                      </dt>
                      <dd className="text-sm font-semibold text-navy-800 sm:text-right">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-6 flex items-start gap-3 rounded-xl border border-border bg-white p-4">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal-500" />
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    Manufactured by{" "}
                    <span className="font-semibold text-navy-800">
                      {company.manufacturer.name}
                    </span>
                    , {company.manufacturer.address}. Mfg. Licence No.{" "}
                    {company.regulatory.mfgLicence}.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= Related ================= */}
      {related.length > 0 && (
        <section className="bg-navy-50/60 py-14 lg:py-18">
          <div className="container-x">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow text-brand-teal-600">
                  Continue exploring
                </p>
                <h2 className="mt-3 text-3xl font-bold">Other products</h2>
              </div>
              <Link
                href="/products/overview"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-brand-teal-600"
              >
                View full portfolio
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= Medical enquiries ================= */}
      <section className="py-14 lg:py-18">
        <div className="container-x">
          <div className="overflow-hidden rounded-2xl bg-navy-600 px-6 py-10 sm:px-10 lg:px-14 lg:py-12">
            <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  Medical &amp; commercial enquiries
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-navy-100">
                  Our medical information team can supply the full prescribing
                  information, stability data and pharmacovigilance contact
                  details for {product.name}.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`mailto:${company.contact.email}`}
                  className="inline-flex h-12 items-center gap-2 rounded-lg bg-brand-teal-400 px-6 text-sm font-semibold text-navy-900 transition-colors hover:bg-brand-teal-300"
                >
                  <Mail className="h-4 w-4" />
                  {company.contact.email}
                </a>
                <a
                  href={`tel:${company.contact.phoneHref}`}
                  className="inline-flex h-12 items-center gap-2 rounded-lg border border-white/25 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <Phone className="h-4 w-4" />
                  {company.contact.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
