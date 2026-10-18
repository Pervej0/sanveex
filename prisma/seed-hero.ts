/**
 * Hero slider content.
 *
 * The default theme shipped three slides with placeholder copy ("America's
 * MEDITEX Companies"), dead anchor links (`#contact`, `#science`) and — in the
 * case of the partnership slide — an absolute Windows file path that crashed
 * `next/image`. This script restores a clean, Sanveex-specific hero.
 *
 * Idempotent: run it any time with `npm run seed:hero`.
 */
import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";

const prisma = new PrismaClient();

const slides = [
  {
    subtitle: "Manufacturing Partnership",
    title: "Quality-assured medicines, made with a WHO-GMP partner",
    description:
      "Sanveex Global Health markets and distributes therapies manufactured by Amulet Pharmaceuticals Ltd. at their WHO-GMP compliant facility in Gazipur — every product DGDA-registered, batch-documented and traceable.",
    buttonText: "Explore our portfolio",
    buttonLink: "/products/overview",
    secondaryButtonText: "About Sanveex",
    secondaryButtonLink: "/about/overview",
    backgroundImage: "/hero1.jpeg",
    isActive: true,
    order: 0,
  },
  {
    subtitle: "Respiratory & Allergy · Bone Health",
    title: "Focused therapies for everyday clinical practice",
    description:
      "From leukotriene receptor antagonists and non-sedating antihistamines to calcium and vitamin D supplementation — a portfolio built around the conditions clinicians manage most.",
    buttonText: "View products",
    buttonLink: "/products/overview",
    secondaryButtonText: "Medical information",
    secondaryButtonLink: "/products/medical-info",
    backgroundImage: "/hero2.jpeg",
    isActive: true,
    order: 1,
  },
];

async function main() {
  const existing = await prisma.slide.findMany({ orderBy: { order: "asc" } });

  if (existing.length === 0) {
    for (const slide of slides) {
      await prisma.slide.create({ data: slide });
    }
    console.log(`[seed:hero] Created ${slides.length} hero slides.`);
    return;
  }

  // Reuse the two slides that make up the live rotation; keep any extra rows
  // (spares, seasonal banners) untouched but out of the active rotation.
  const [primary, secondary, ...rest] = existing;

  await prisma.slide.update({ where: { id: primary.id }, data: slides[0] });
  await prisma.slide.update({
    where: { id: secondary.id },
    data: slides[1],
  });

  for (const slide of rest) {
    await prisma.slide.update({
      where: { id: slide.id },
      data: { isActive: false, order: (slide.order ?? 0) + 10 },
    });
    console.log(
      `[seed:hero] Deactivated spare slide "${slide.title}" (kept for reuse).`,
    );
  }

  console.log("[seed:hero] Hero slides updated.");
}

main()
  .catch((error) => {
    console.error("[seed:hero] Failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
