import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

async function seedAdminUser() {
  const email = "admin@sanveex.com";

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.log("Admin user already exists. Skipping user seed.");
    return;
  }

  const hashedPassword = await bcrypt.hash("password", 10);

  const adminUser = await prisma.user.create({
    data: {
      name: "ADMIN USER",
      firstName: "ADMIN",
      lastName: "USER",
      phone: "+10000000000",
      email,
      password: hashedPassword,
      role: "ADMIN",
      emailVerified: new Date(),
      isVerified: true,
    },
  });

  console.log("Admin user created:", adminUser.email);
}

async function seedSiteContent() {
  const existingContent = await prisma.siteContent.findFirst();

  if (existingContent) {
    console.log("SiteContent already exists. Skipping site content seed.");
    return;
  }

  const siteContent = await prisma.siteContent.create({
    data: {
      name: "Sanveex",
      tagline: "Smart Digital Solutions",
      title: "Sanveex | Digital Products & Services",
      description:
        "Sanveex provides scalable digital solutions including web applications, automation, and enterprise software.",
      logoUrl: "/images/logo.png",
      socialLinks: {
        facebook: "https://facebook.com/sanveex",
        twitter: "https://twitter.com/sanveex",
        instagram: "https://instagram.com/sanveex",
        linkedin: "https://linkedin.com/company/sanveex",
      },
      phone: "+10000000000",
      email: "info@sanveex.com",
      address: "123 Business Street, New York, USA",
      whatsapp: "+10000000000",
    },
  });

  console.log("SiteContent created:", siteContent.name);
}

async function main() {
  console.log("Starting database seed...");

  await seedAdminUser();
  await seedSiteContent();

  console.log("Database seed completed.");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
