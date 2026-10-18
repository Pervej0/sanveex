/**
 * Seeds the Sanveex product catalogue into MongoDB.
 *
 * Idempotent — safe to re-run. Products are matched by `slug` and updated in
 * place, so dashboard edits to unrelated fields are preserved.
 *
 * Run:  npm run seed:products
 */

import "dotenv/config";
import prisma from "@/lib/prisma";
import { categories, products } from "@/lib/product-data";

async function seedCategories() {
  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
        description: category.description,
        order: category.order,
        isActive: true,
      },
      create: {
        name: category.name,
        slug: category.slug,
        description: category.description,
        order: category.order,
        isActive: true,
      },
    });
    console.log(`  ✓ category: ${category.name}`);
  }
}

async function seedProducts() {
  for (const product of products) {
    const category = await prisma.category.findUnique({
      where: { slug: product.category },
    });

    const data = {
      name: product.name,
      slug: product.slug,
      genericName: product.genericName,
      description: product.description,
      content: product.content,
      image: product.image,
      gallery: product.gallery,
      features: product.features,
      specifications: {
        strength: product.strength,
        packSize: product.packSize,
        dosageForm: product.dosageForm,
        therapeuticClass: product.therapeuticClass,
        brandBangla: product.brandBangla,
        genericBangla: product.genericBangla,
        dosageFormBangla: product.dosageFormBangla,
        packSizeBangla: product.packSizeBangla,
        specs: product.specifications,
        clinical: product.clinical,
      },
      links: product.links,
      categoryId: category?.id ?? null,
      isActive: product.isActive,
      isFeatured: product.isFeatured,
      order: product.order,
    };

    await prisma.product.upsert({
      where: { slug: product.slug },
      update: data,
      create: data,
    });

    console.log(
      `  ✓ product: ${product.name} (${product.genericName}) → /products/${product.slug}`,
    );
  }
}

async function main() {
  console.log("Seeding Sanveex product catalogue…\n");
  await seedCategories();
  console.log("");
  await seedProducts();
  console.log("\nProduct catalogue seeded successfully.");
}

main()
  .catch((error) => {
    console.error("Product seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
