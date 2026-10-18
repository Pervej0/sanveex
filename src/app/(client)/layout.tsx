import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import prisma from "@/lib/prisma";
import { listFeaturedProducts } from "@/lib/products";
import { company } from "@/lib/company";

type NavItemWithChildren = {
  id: string;
  title: string;
  description?: string | null;
  href?: string | null;
  children?: NavItemWithChildren[];
};

/**
 * Default navigation used when the dashboard has not been populated yet or the
 * database cannot be reached — the public site must never render an empty
 * header.
 */
const DEFAULT_NAV: NavItemWithChildren[] = [
  {
    id: "nav-about",
    title: "About",
    href: "/about/overview",
    children: [
      {
        id: "nav-about-overview",
        title: "Company Overview",
        href: "/about/overview",
        description: "Who we are, our mission and the markets we serve.",
      },
      {
        id: "nav-about-leadership",
        title: "Leadership Team",
        href: "/about/leadership",
        description: "The people accountable for quality and compliance.",
      },
      {
        id: "nav-about-mission",
        title: "Mission & Values",
        href: "/about/mission-and-values",
        description: "The principles behind every product we release.",
      },
      {
        id: "nav-about-board",
        title: "Board Message",
        href: "/about/speech",
        description: "A word from our board of directors.",
      },
    ],
  },
  {
    id: "nav-products",
    title: "Products",
    href: "/products/overview",
    children: [
      {
        id: "nav-products-overview",
        title: "Product Portfolio",
        href: "/products/overview",
        description: "The complete Sanveex range across therapeutic areas.",
      },
      {
        id: "nav-products-medical",
        title: "Medical Information",
        href: "/products/medical-info",
        description: "Prescribing information and clinical references.",
      },
      {
        id: "nav-products-quality",
        title: "Quality Assurance",
        href: "/products/quality",
        description: "WHO-GMP manufacturing and quality control.",
      },
      {
        id: "nav-products-safety",
        title: "Safety Information",
        href: "/products/safety",
        description: "Adverse event reporting and pharmacovigilance.",
      },
    ],
  },
  {
    id: "nav-quality",
    title: "Quality & Science",
    href: "/science/overview",
    children: [
      {
        id: "nav-science-overview",
        title: "R&D Overview",
        href: "/science/overview",
        description: "How molecules are selected, evaluated and launched.",
      },
      {
        id: "nav-science-advisory",
        title: "Scientific Advisory",
        href: "/science/advisory",
        description: "Our medical and scientific advisory panel.",
      },
      {
        id: "nav-science-publications",
        title: "Publications",
        href: "/science/publications",
        description: "Peer-reviewed references and clinical literature.",
      },
    ],
  },
  {
    id: "nav-newsroom",
    title: "Newsroom",
    href: "/newsroom",
  },
  {
    id: "nav-contact",
    title: "Contact",
    href: "/contact",
  },
];

/** Shape-compatible stand-in for the SiteContent document. */
function fallbackSiteContent() {
  return {
    id: "fallback",
    name: company.legalName,
    tagline: company.tagline,
    title: `${company.legalName} — ${company.establishedNote}`,
    description:
      "Bangladesh-based pharmaceutical marketing and distribution company delivering quality-assured medicines nationwide.",
    logoUrl: "/sanveex-logo.png",
    socialLinks: {},
    phone: company.contact.phone,
    email: company.contact.email,
    address: company.address.full,
    whatsapp: company.contact.phoneHref,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as any;
}

export default async function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let siteContent: any = null;
  let rawNavItems: any[] = [];

  try {
    [siteContent, rawNavItems] = await Promise.all([
      prisma.siteContent.findFirst(),
      prisma.navItem.findMany({
        where: { parentId: null, isActive: true },
        include: {
          children: {
            where: { isActive: true },
            orderBy: { order: "asc" },
          },
        },
        orderBy: { order: "asc" },
      }),
    ]);
  } catch (error) {
    console.error(
      "[layout] Database unavailable, rendering with defaults:",
      error instanceof Error ? error.message : error,
    );
  }

  const resolvedSiteContent = siteContent ?? fallbackSiteContent();

  const navItems: NavItemWithChildren[] =
    rawNavItems.length > 0
      ? rawNavItems.map((item) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          href: item.href,
          children: (item.children ?? []).map((child: any) => ({
            id: child.id,
            title: child.title,
            description: child.description,
            href: child.href,
          })),
        }))
      : DEFAULT_NAV;

  const featuredProducts = await listFeaturedProducts(3);

  const navProducts = featuredProducts.map((p) => ({
    name: p.name,
    slug: p.slug,
    genericName: p.genericName,
    strength: p.strength,
    image: p.image,
    brandBangla: p.brandBangla,
  }));

  return (
    <>
      <Navbar
        siteContent={resolvedSiteContent}
        navItems={navItems}
        products={navProducts}
      />
      <main>{children}</main>
      <Footer siteContent={resolvedSiteContent} />
      <WhatsAppButton siteContent={resolvedSiteContent} />
    </>
  );
}
