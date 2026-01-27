import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import TopBar from "@/components/shared/Topbar";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import prisma from "@/lib/prisma";

type NavItemWithChildren = {
  id: string;
  title: string;
  description?: string | null;
  href?: string | null;
  children?: NavItemWithChildren[];
};

export default async function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteContent = await prisma.siteContent.findFirst();

  const rawNavItems = await prisma.navItem.findMany({
    where: { parentId: null, isActive: true },
    include: {
      children: {
        where: { isActive: true },
        orderBy: { order: "asc" },
      },
    },
    orderBy: { order: "asc" },
  });

  // Transform to match the expected interface
  const navItems: NavItemWithChildren[] = rawNavItems.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    href: item.href,
    children: item.children.map((child) => ({
      id: child.id,
      title: child.title,
      description: child.description,
      href: child.href,
    })),
  }));

  if (!siteContent) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Site content not available. Please check the database.</p>
      </div>
    );
  }

  return (
    <>
      <TopBar siteContent={siteContent} />
      <Navbar siteContent={siteContent} navItems={navItems} />
      {children}
      <Footer siteContent={siteContent} />
      <WhatsAppButton siteContent={siteContent} />
    </>
  );
}
