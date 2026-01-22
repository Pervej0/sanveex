import GlobalPageBanner from "@/components/shared/PageBanner";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#edf2f7]">
      <GlobalPageBanner
        desktopImage="/about-banner-desktop.webp"
        mobileImage="/about-banner-mobile.webp"
      />
      <div className="py-12 p-4">
        <div className="container mx-auto max-w-6xl px-4 py-12 bg-white ">
          {children}
        </div>
      </div>
    </div>
  );
}
