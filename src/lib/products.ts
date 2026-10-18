import prisma from "@/lib/prisma";
import {
  PLACEHOLDER_IMAGE,
  isRenderableImageSrc,
  resolveImageSrc,
} from "@/lib/images";
import {
  products as fallbackProducts,
  categories as fallbackCategories,
  type ProductSpec,
  type ProductLink,
} from "@/lib/product-data";

/* -------------------------------------------------------------------------- */
/* Public (view-model) types                                                  */
/* -------------------------------------------------------------------------- */

export type PublicProduct = {
  id: string;
  name: string;
  slug: string;
  genericName: string | null;
  description: string | null;
  content: string | null;
  image: string;
  gallery: string[];
  features: string[];
  specs: ProductSpec[];
  clinical: ProductSpec[];
  links: ProductLink[];
  strength: string | null;
  packSize: string | null;
  dosageForm: string | null;
  therapeuticClass: string | null;
  brandBangla?: string | null;
  genericBangla?: string | null;
  dosageFormBangla?: string | null;
  packSizeBangla?: string | null;
  categoryName: string | null;
  categorySlug: string | null;
  isFeatured: boolean;
  order: number;
};

export type PublicCategory = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  order: number;
};

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function toArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function isSpecList(value: unknown): value is ProductSpec[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        item && typeof item === "object" && "label" in item && "value" in item,
    )
  );
}

/**
 * Products are stored in MongoDB with a deliberately loose JSON column set
 * because the dashboard editor is free-form. Normalise defensively so a
 * half-filled document can never crash a public page.
 */
function normaliseDbProduct(row: any): PublicProduct {
  const specifications = row?.specifications;

  // `specifications` may be either a plain list of {label,value} or the richer
  // envelope written by the seeder.
  const envelope =
    specifications && !Array.isArray(specifications) ? specifications : {};

  const specs: ProductSpec[] = isSpecList(envelope.specs)
    ? envelope.specs
    : isSpecList(specifications)
      ? specifications
      : [];

  const clinical: ProductSpec[] = isSpecList(envelope.clinical)
    ? envelope.clinical
    : [];

  const pick = (key: string, label: string) =>
    (typeof envelope[key] === "string" ? (envelope[key] as string) : null) ??
    specs.find((s) => s.label.toLowerCase() === label.toLowerCase())?.value ??
    null;

  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    genericName: row.genericName ?? null,
    description: row.description ?? null,
    content: row.content ?? null,
    image: resolveImageSrc(row.image) ?? PLACEHOLDER_IMAGE,
    gallery: toArray<string>(row.gallery).filter(isRenderableImageSrc),
    features: toArray<string>(row.features),
    specs,
    clinical,
    links: toArray<ProductLink>(row.links),
    strength: pick("strength", "Strength"),
    packSize: pick("packSize", "Pack size"),
    dosageForm: pick("dosageForm", "Dosage form"),
    therapeuticClass: pick("therapeuticClass", "Therapeutic class"),
    brandBangla: typeof envelope.brandBangla === "string" ? envelope.brandBangla : null,
    genericBangla: typeof envelope.genericBangla === "string" ? envelope.genericBangla : null,
    dosageFormBangla: typeof envelope.dosageFormBangla === "string" ? envelope.dosageFormBangla : null,
    packSizeBangla: typeof envelope.packSizeBangla === "string" ? envelope.packSizeBangla : null,
    categoryName: row.category?.name ?? null,
    categorySlug: row.category?.slug ?? null,
    isFeatured: Boolean(row.isFeatured),
    order: row.order ?? 0,
  };
}

function fromFallback(product: (typeof fallbackProducts)[number]): PublicProduct {
  const category = fallbackCategories.find((c) => c.slug === product.category);
  return {
    id: `local-${product.slug}`,
    name: product.name,
    slug: product.slug,
    genericName: product.genericName,
    description: product.description,
    content: product.content,
    image: product.image,
    gallery: product.gallery,
    features: product.features,
    specs: product.specifications,
    clinical: product.clinical,
    links: product.links,
    strength: product.strength,
    packSize: product.packSize,
    dosageForm: product.dosageForm,
    therapeuticClass: product.therapeuticClass,
    brandBangla: product.brandBangla ?? null,
    genericBangla: product.genericBangla ?? null,
    dosageFormBangla: product.dosageFormBangla ?? null,
    packSizeBangla: product.packSizeBangla ?? null,
    categoryName: category?.name ?? null,
    categorySlug: category?.slug ?? null,
    isFeatured: product.isFeatured,
    order: product.order,
  };
}

const FALLBACK: PublicProduct[] = fallbackProducts.map(fromFallback);

/* -------------------------------------------------------------------------- */
/* Public API                                                                 */
/* -------------------------------------------------------------------------- */

/** All active products, newest catalogue order first. Never throws. */
export async function listProducts(): Promise<PublicProduct[]> {
  try {
    const rows = await prisma.product.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
      include: { category: true },
    });

    if (rows.length === 0) return FALLBACK;
    return rows.map(normaliseDbProduct);
  } catch (error) {
    console.error(
      "[products] Database unavailable, serving bundled catalogue:",
      error instanceof Error ? error.message : error,
    );
    return FALLBACK;
  }
}

/** Featured products for the home page + header mega menu. */
export async function listFeaturedProducts(limit = 5): Promise<PublicProduct[]> {
  try {
    const rows = await prisma.product.findMany({
      where: { isActive: true, isFeatured: true },
      orderBy: { order: "asc" },
      take: limit,
      include: { category: true },
    });

    if (rows.length > 0) return rows.map(normaliseDbProduct);

    const all = await prisma.product.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
      take: limit,
      include: { category: true },
    });

    return all.length > 0 ? all.map(normaliseDbProduct) : FALLBACK.slice(0, limit);
  } catch (error) {
    console.error(
      "[products] Database unavailable, serving bundled catalogue:",
      error instanceof Error ? error.message : error,
    );
    return FALLBACK.slice(0, limit);
  }
}

/** Single product by slug. Returns null when genuinely not found. */
export async function findProductBySlug(
  slug: string,
): Promise<PublicProduct | null> {
  try {
    const row = await prisma.product.findUnique({
      where: { slug },
      include: { category: true },
    });
    if (row) return normaliseDbProduct(row);
  } catch (error) {
    console.error(
      "[products] Database unavailable, serving bundled catalogue:",
      error instanceof Error ? error.message : error,
    );
  }

  return FALLBACK.find((p) => p.slug === slug) ?? null;
}

/** Products slug + name pairs for static params and sitemaps. */
export async function listProductSlugs(): Promise<string[]> {
  const list = await listProducts();
  return list.map((p) => p.slug);
}

export async function listCategories(): Promise<PublicCategory[]> {
  try {
    const rows = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });
    if (rows.length > 0) {
      return rows.map((row) => ({
        id: row.id,
        name: row.name,
        slug: row.slug,
        description: row.description ?? null,
        order: row.order,
      }));
    }
  } catch (error) {
    console.error(
      "[products] Database unavailable, serving bundled categories:",
      error instanceof Error ? error.message : error,
    );
  }

  return fallbackCategories.map((c) => ({
    id: `local-${c.slug}`,
    name: c.name,
    slug: c.slug,
    description: c.description,
    order: c.order,
  }));
}
