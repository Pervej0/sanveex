import { getDepartmentBySlug } from "@/actions/departments/actions";
import GlobalPageBanner from "@/components/shared/PageBanner";
import Image from "next/image";
import { notFound } from "next/navigation";

type DepartmentPageProps = {
  params: Promise<{ slug: string }>;
};

const DepartmentPage = async ({ params }: DepartmentPageProps) => {
  const { slug } = await params;

  const data = await getDepartmentBySlug(slug);
  if (!data) {
    return notFound();
  }

  return (
    <section className="">
      <GlobalPageBanner
        desktopImage={"/about-banner-desktop.webp"}
        mobileImage={"/about-banner-mobile.webp"}
      />
      <div className="py-12">
        {/* Content Section */}
        <div className="container-x rounded bg-white py-8 md:py-12">
          <div
            className="prose max-w-none mx-auto"
            dangerouslySetInnerHTML={{ __html: data.content || "" }}
          />
        </div>
      </div>
    </section>
  );
};

export default DepartmentPage;
