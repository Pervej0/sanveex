import { getAboutSection } from "@/actions/about-section/actions";
import {
  getAllDepartments,
  getDepartmentSection,
} from "@/actions/departments/actions";
import { getAllSlides } from "@/actions/slides/slide";
import { getAllWhyChooseUs } from "@/actions/why-choose-us/actions";
import { getAllTestimonials } from "@/actions/testimonials/actions";
import { getAllFaqs, getFaqSection } from "@/actions/faqs/actions";
import { getAllArticles } from "@/actions/articles/actions";

import ArticlesAndFaqs from "@/components/home/Articles";
import ClientsReview from "@/components/home/ClientsReview";
import FAQ from "@/components/home/FAQ";
import HeroSlider from "@/components/home/HeroSlider";
import OurDepartments from "@/components/home/OurDepartments";
import AboutSection from "@/components/home/WhyChooseUs";
import ProductShowcase from "@/components/home/ProductShowcase";
import TrustBar from "@/components/home/TrustBar";

import { listProducts } from "@/lib/products";
import { resolveImageSrc } from "@/lib/images";
import {
  defaultSlides,
  defaultFaqs,
  defaultFaqSection,
} from "@/lib/site-defaults";

/**
 * Every home-page collection is optional content sourced from the dashboard.
 * A failure to reach one collection must never take down the whole page.
 */
async function safe<T>(task: () => Promise<T>, fallback: T): Promise<T> {
  try {
    const result = await task();
    return result ?? fallback;
  } catch (error) {
    console.error(
      "[home] Collection unavailable, using fallback:",
      error instanceof Error ? error.message : error,
    );
    return fallback;
  }
}

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
    safe(getAllSlides, [] as Awaited<ReturnType<typeof getAllSlides>>),
    safe(
      getAllWhyChooseUs,
      [] as Awaited<ReturnType<typeof getAllWhyChooseUs>>,
    ),
    safe(getAboutSection, null),
    safe(getAllDepartments, [] as Awaited<ReturnType<typeof getAllDepartments>>),
    safe(getDepartmentSection, null),
    safe(
      getAllTestimonials,
      [] as Awaited<ReturnType<typeof getAllTestimonials>>,
    ),
    safe(getAllFaqs, [] as Awaited<ReturnType<typeof getAllFaqs>>),
    safe(getFaqSection, null),
    safe(getAllArticles, [] as Awaited<ReturnType<typeof getAllArticles>>),
    listProducts(),
  ]);

  const activeSlides = slides.filter((slide) => slide.isActive && slide.title);
  const heroSlides =
    activeSlides.length > 0
      ? activeSlides.map((slide) => ({
          ...slide,
          backgroundImage:
            resolveImageSrc(slide.backgroundImage, "/hero1.jpeg")!,
        }))
      : defaultSlides;

  const activeWhyChooseUs = whyChooseUsEntries.filter((e) => e.isActive);
  const activeDepartments = departments.filter((d) => d.isActive);
  const activeTestimonials = testimonials.filter((t) => t.isActive);
  const activeFaqs = faqs.filter((f) => f.isActive);

  const featuredArticles = articles
    .filter((a) => a.isActive)
    .sort((a, b) => (a.isFeatured === b.isFeatured ? 0 : a.isFeatured ? -1 : 1))
    .slice(0, 3);

  return (
    <>
      <HeroSlider slides={heroSlides as any} />
      <TrustBar />
      <AboutSection
        entries={activeWhyChooseUs}
        sectionData={aboutSectionData}
      />
      <ProductShowcase products={products} totalCount={products.length} />
      <OurDepartments
        departments={activeDepartments}
        sectionData={departmentSectionData}
      />
      <ClientsReview testimonials={activeTestimonials} />
      <FAQ
        faqs={(activeFaqs.length > 0 ? activeFaqs : defaultFaqs) as any}
        sectionData={faqSectionData ?? defaultFaqSection}
      />
      <ArticlesAndFaqs articles={featuredArticles as any} />
    </>
  );
}
