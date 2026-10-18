import GlobalPageBanner from "@/components/shared/PageBanner";

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white">
      <GlobalPageBanner
        desktopImage="/about-banner-desktop.webp"
        mobileImage="/about-banner-mobile.webp"
      />
      {children}
    </div>
  );
}
