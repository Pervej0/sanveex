import { getAboutSection } from "@/actions/about-section/actions";
import {
  getAllDepartments,
  getDepartmentSection,
} from "@/actions/departments/actions";
import { getAllSlides } from "@/actions/slides/slide";
import { getAllWhyChooseUs } from "@/actions/why-choose-us/actions";
import { getAllTestimonials } from "@/actions/testimonials/actions";
import { getAllFaqs, getFaqSection } from "@/actions/faqs/actions";
import ArticlesAndFaqs from "../../components/home/Articles";
import BestMedicine from "../../components/home/BestMedicine";
import ClientsReview from "../../components/home/ClientsReview";
import FAQ from "../../components/home/FAQ";
import HeroSlider from "../../components/home/HeroSlider";
import OurDepartments from "../../components/home/OurDepartments";
import AboutSection from "../../components/home/WhyChooseUs";

import { getAllArticles } from "@/actions/articles/actions";
import { getFeaturedProducts } from "@/actions/products/actions";

export default async function Home() {
  const [
    slides,
    whyChooseUsEntries,
    aboutSectionData,
    departments,
    departmentSectionData,
    testimonials,
    faqs,
    faqSectionData,
    articles,
    products,
  ] = await Promise.all([
    getAllSlides(),
    getAllWhyChooseUs(),
    getAboutSection(),
    getAllDepartments(),
    getDepartmentSection(),
    getAllTestimonials(),
    getAllFaqs(),
    getFaqSection(),
    getAllArticles(),
    getFeaturedProducts(),
  ]);

  const activeSlides = slides.filter((slide) => slide.isActive);

  const activeWhyChooseUs = whyChooseUsEntries.filter(
    (entry) => entry.isActive,
  );

  const activeDepartments = departments.filter((dept) => dept.isActive);

  const activeTestimonials = testimonials.filter((t) => t.isActive);

  const activeFaqs = faqs.filter((f) => f.isActive);

  const featuredArticles = articles
    .filter((a) => a.isActive && a.isFeatured)
    .slice(0, 3);

  return (
    <>
      <HeroSlider slides={activeSlides} />
      <AboutSection
        entries={activeWhyChooseUs}
        sectionData={aboutSectionData}
      />
      <OurDepartments
        departments={activeDepartments}
        sectionData={departmentSectionData}
      />
      <BestMedicine medicines={products} />
      <ClientsReview testimonials={activeTestimonials} />
      <FAQ faqs={activeFaqs} sectionData={faqSectionData} />
      <ArticlesAndFaqs articles={featuredArticles} />
    </>
  );
}
