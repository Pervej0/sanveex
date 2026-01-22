import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import Topbar from "@/components/shared/Topbar";
import WhatsAppButton from "@/components/shared/WhatsAppButton";

export default async function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/site-content`,
  );

  const siteContent = await res.json();

  return (
    <>
      <Topbar siteContent={siteContent.data} />
      <Navbar siteContent={siteContent.data} />
      {children}
      <Footer siteContent={siteContent.data} />
      <WhatsAppButton siteContent={siteContent.data} />
    </>
  );
}
