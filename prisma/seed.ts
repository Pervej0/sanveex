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

async function seedDepartments() {
  const existing = await prisma.department.findFirst();
  if (existing) {
    console.log("Departments already exist. Skipping seed.");
    return;
  }

  const depts = [
    {
      title: "Cardiology",
      slug: "cardiology",
      description:
        "Advanced cardiac care with state-of-the-art diagnostic facilities.",
      icon: "Heart",
      secondaryIcon: "Sparkles",
      color: "#88734C",
      order: 1,
    },
    {
      title: "Neurology",
      slug: "neurology",
      description:
        "Comprehensive neurological services for brain and nervous system.",
      icon: "Brain",
      secondaryIcon: "Star",
      color: "#A9BBC8",
      order: 2,
    },
    {
      title: "General Med",
      slug: "general-med",
      description:
        "Primary healthcare services with experienced physicians for diagnosis.",
      icon: "Stethoscope",
      secondaryIcon: "CheckCircle",
      color: "#88734C",
      order: 3,
    },
    {
      title: "Pediatrics",
      slug: "pediatrics",
      description: "Specialized care for infants, children, and adolescents.",
      icon: "Baby",
      secondaryIcon: "Sparkles",
      color: "#A9BBC8",
      order: 4,
    },
    {
      title: "Ophthalmology",
      slug: "ophthalmology",
      description:
        "Comprehensive eye care services including advanced surgical procedures.",
      icon: "Eye",
      secondaryIcon: "Star",
      color: "#88734C",
      order: 5,
    },
    {
      title: "Orthopedics",
      slug: "orthopedics",
      description: "Expert treatment for bone, joint, and muscle conditions.",
      icon: "Bone",
      secondaryIcon: "CheckCircle",
      color: "#A9BBC8",
      order: 6,
    },
  ];

  for (const dept of depts) {
    await prisma.department.create({ data: dept });
  }
  console.log("Departments seeded successfully.");
}

async function main() {
  console.log("Starting database seed...");

  await seedAdminUser();
  await seedDepartments();

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
