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

async function seedSlides() {
  const existingSlides = await prisma.slide.findFirst();

  if (existingSlides) {
    console.log("Slides already exist. Skipping slides seed.");
    return;
  }

  const slides = [
    {
      subtitle: "Patient-Centered Care",
      title: "Planning For Patient Support Program",
      description:
        "The bold mission of America's MEDITEX Companies is to bring an end to the burdens of disease, in all its forms.",
      buttonText: "Get In Touch",
      buttonLink: "#contact",
      secondaryButtonText: "Learn More",
      secondaryButtonLink: "#about",
      backgroundImage: "/hero1.jpeg",
      order: 1,
    },
    {
      subtitle: "Innovation & Growth",
      title: "Growing to Meet Your Needs",
      description:
        "Advancing healthcare through cutting-edge research and development, delivering breakthrough treatments that transform lives.",
      buttonText: "Our Research",
      buttonLink: "#science",
      secondaryButtonText: "View Pipeline",
      secondaryButtonLink: "#pipeline",
      backgroundImage: "/hero2.jpeg",
      order: 2,
    },
  ];

  for (const slide of slides) {
    await prisma.slide.create({
      data: slide,
    });
  }

  console.log("Hero slides seeded successfully.");
}

async function seedWhyChooseUs() {
  const existingEntries = await prisma.whyChooseUs.findFirst();

  if (existingEntries) {
    console.log("WhyChooseUs entries already exist. Skipping seed.");
    return;
  }

  const entries = [
    {
      title: "Importing Innovation",
      description:
        "Bringing cutting-edge medical technologies from around the world to enhance healthcare solutions and patient outcomes.",
      icon: "Pen",
      secondaryIcon: "Sparkles",
      position: "left",
      order: 1,
    },
    {
      title: "Delivering Quality",
      description:
        "Ensuring the highest standards in every product and service we provide, prioritizing patient safety and satisfaction.",
      icon: "Home",
      secondaryIcon: "CheckCircle",
      position: "left",
      order: 2,
    },
    {
      title: "Improving Healthcare",
      description:
        "Committed to advancing medical care through innovative solutions that empower healthcare professionals and improve patient lives.",
      icon: "PenTool",
      secondaryIcon: "Star",
      position: "left",
      order: 3,
    },
    {
      title: "Customized Solutions",
      description:
        "Tailoring medical products and solutions to meet the specific needs of healthcare providers and institutions.",
      icon: "PaintBucket",
      secondaryIcon: "Sparkles",
      position: "right",
      order: 1,
    },
    {
      title: "Regulatory Compliance",
      description:
        "Adhering strictly to international medical standards and regulations to ensure safety, reliability, and trust.",
      icon: "Ruler",
      secondaryIcon: "CheckCircle",
      position: "right",
      order: 2,
    },
    {
      title: "Healthcare Partnerships",
      description:
        "Building strong, long-term partnerships with hospitals, clinics, and distributors to drive sustainable healthcare growth.",
      icon: "Building2",
      secondaryIcon: "Star",
      position: "right",
      order: 3,
    },
  ];

  for (const entry of entries) {
    await prisma.whyChooseUs.create({
      data: entry,
    });
  }

  console.log("WhyChooseUs entries seeded successfully.");
}

async function seedAboutSection() {
  const existing = await prisma.aboutSection.findFirst();

  if (existing) {
    console.log("AboutSection already exists. Skipping seed.");
    return;
  }

  const about = await prisma.aboutSection.create({
    data: {
      eyebrow: "About Our Company",
      title: "About Us",
      description: `Sanveex is built by a team of experienced professionals with backgrounds across multinational and leading local pharmaceutical organizations. With strong expertise in product management, brand strategy, and market development, the team has deliberately planned and executed initiatives to build an organization focused on delivering meaningful and sustainable healthcare impact.

The leadership team brings combined experience from the pharmaceutical and MedTech sectors, positioning Sanveex to address complex healthcare challenges through solutions that are both innovative and practical. Within a relatively short period, Sanveex has established a growing healthcare product portfolio designed to improve patient outcomes and strengthen healthcare delivery across Bangladesh.`,
      image: "/about.jpeg",
    },
  });

  console.log("AboutSection seeded successfully.");
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
      description:
        "Advanced cardiac care with state-of-the-art diagnostic facilities.",
      icon: "Heart",
      secondaryIcon: "Sparkles",
      color: "#88734C",
      order: 1,
    },
    {
      title: "Neurology",
      description:
        "Comprehensive neurological services for brain and nervous system.",
      icon: "Brain",
      secondaryIcon: "Star",
      color: "#A9BBC8",
      order: 2,
    },
    {
      title: "General Med",
      description:
        "Primary healthcare services with experienced physicians for diagnosis.",
      icon: "Stethoscope",
      secondaryIcon: "CheckCircle",
      color: "#88734C",
      order: 3,
    },
    {
      title: "Pediatrics",
      description: "Specialized care for infants, children, and adolescents.",
      icon: "Baby",
      secondaryIcon: "Sparkles",
      color: "#A9BBC8",
      order: 4,
    },
    {
      title: "Ophthalmology",
      description:
        "Comprehensive eye care services including advanced surgical procedures.",
      icon: "Eye",
      secondaryIcon: "Star",
      color: "#88734C",
      order: 5,
    },
    {
      title: "Orthopedics",
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

async function seedDepartmentSection() {
  const existing = await prisma.departmentSection.findFirst();
  if (existing) {
    console.log("Department section already exists. Skipping seed.");
    return;
  }

  await prisma.departmentSection.create({
    data: {
      title: "Excellence in Care",
      subtitle: "Advancing Healthcare Through Innovation",
      videoUrl: "/healthcare.mp4",
      buttonText: "Explore Departments",
      buttonLink: "#",
    },
  });
  console.log("Department section seeded successfully.");
}

async function seedTestimonials() {
  const existing = await prisma.testimonial.findFirst();
  if (existing) {
    console.log("Testimonials already exist. Skipping seed.");
    return;
  }

  const items = [
    {
      name: "Reta Schmidt",
      role: "Patient",
      text: "When I began looking for the 'best' center for Max I chose Medicol. You are the best. Many thanks to you and your warm, concerned staff...",
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small_2x/Basic_Ui__28186_29.jpg",
      order: 1,
    },
    {
      name: "Katlynn Pouros",
      role: "Patient’s Family",
      text: "Three and a half months ago, my family lost someone that meant the world to us. We made many trips to Medicol. He adored two employees and they were great to him.",
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small_2x/Basic_Ui__28186_29.jpg",
      order: 2,
    },
  ];

  for (const item of items) {
    await prisma.testimonial.create({ data: item });
  }
  console.log("Testimonials seeded successfully.");
}

async function seedFaqs() {
  const existing = await prisma.faq.findFirst();
  if (existing) {
    console.log("FAQs already exist. Skipping seed.");
    return;
  }

  const items = [
    {
      question: "This is the start of something new",
      answer:
        "Managing a small business today is already tough. Avoid further complications by ditching outdated, tedious trade methods.",
      order: 1,
    },
    {
      question: "How do I get started with the platform?",
      answer:
        "Simply sign up for an account and follow the onboarding process. Our goal is to streamline SMB trade, making it easier and faster than ever.",
      order: 2,
    },
    {
      question: "Is there a free trial available?",
      answer:
        "Yes, we offer a 14-day free trial so you can experience all the features before committing.",
      order: 3,
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer:
        "Absolutely. You can cancel your subscription at any time from your account settings.",
      order: 4,
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and bank transfers for annual plans.",
      order: 5,
    },
  ];

  for (const item of items) {
    await prisma.faq.create({ data: item });
  }
  console.log("FAQs seeded successfully.");
}

async function seedFaqSection() {
  const existing = await prisma.faqSection.findFirst();
  if (existing) {
    console.log("FAQ section already exists. Skipping seed.");
    return;
  }

  await prisma.faqSection.create({
    data: {
      title: "Common Questions",
      description:
        "Managing a small business today is already tough. We are here to help clear up any confusion so you can focus on growth.",
      buttonText: "Any questions? Reach out",
      buttonLink: "#",
    },
  });
  console.log("FAQ section seeded successfully.");
}

async function seedArticles() {
  const existing = await prisma.article.findFirst();
  if (existing) {
    console.log("Articles already exist. Skipping seed.");
    return;
  }

  const items = [
    {
      title:
        "SANVEEX TO PRESENT AT THE 44TH ANNUAL J.P. MORGAN HEALTHCARE CONFERENCE",
      slug: "jpm-conference",
      excerpt:
        "Sanveex leadership will provide a comprehensive overview of the company's growth strategy and oncology pipeline at the upcoming JP Morgan conference.",
      category: "Business",
      type: "PRESS RELEASE",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2070",
      isFeatured: true,
      authorName: "Media Relations",
      publishedAt: new Date("2026-01-07"),
    },
    {
      title:
        "SANVEEX ACQUIRES DARK BLUE THERAPEUTICS, BOLSTERING ONCOLOGY PIPELINE",
      slug: "acquisition",
      excerpt:
        "The acquisition marks a significant step in expanding our therapeutic reach and bringing innovative treatments to patients with rare diseases.",
      category: "Oncology",
      type: "PRESS RELEASE",
      image:
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1170",
      isFeatured: true,
      authorName: "Corporate Office",
      publishedAt: new Date("2026-01-06"),
    },
    {
      title: "NEW CLINICAL DATA SHOWS PROMISE FOR RARE DISEASE THERAPY",
      slug: "clinical-data",
      excerpt:
        "Latest phase II results demonstrate exceptional safety and efficacy profiles for our lead candidate in metabolic disorders.",
      category: "General",
      type: "PRESS RELEASE",
      image:
        "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1170",
      isFeatured: true,
      authorName: "Dr. Emily Chen",
      publishedAt: new Date("2025-12-11"),
    },
  ];

  for (const item of items) {
    await prisma.article.create({ data: item });
  }
  console.log("Articles seeded successfully.");
}

async function main() {
  console.log("Starting database seed...");

  await seedAdminUser();
  await seedSiteContent();
  await seedSlides();
  await seedWhyChooseUs();
  await seedAboutSection();
  await seedDepartments();
  await seedDepartmentSection();
  await seedTestimonials();
  await seedFaqs();
  await seedFaqSection();
  await seedArticles();

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
