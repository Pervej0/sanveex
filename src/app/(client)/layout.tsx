import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import Topbar from "@/components/shared/Topbar";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import prisma from "@/lib/prisma";

export default async function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteContent = await prisma.siteContent.findFirst();

  if (!siteContent) {
    return (
      <div>
        <h1>History</h1>
        <p>Content not available.</p>
      </div>
    );
  }

  return (
    <>
      <Topbar siteContent={siteContent} />
      <Navbar siteContent={siteContent} />
      {children}
      <Footer siteContent={siteContent} />
      <WhatsAppButton siteContent={siteContent} />
    </>
  );
}
