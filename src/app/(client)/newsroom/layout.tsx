import GlobalPageBanner from "@/components/shared/PageBanner";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <GlobalPageBanner
        desktopImage="/about-banner-desktop.webp"
        mobileImage="/about-banner-mobile.webp"
      />
      <div className="">{children}</div>
    </div>
  );
}
