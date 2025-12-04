import ArticlesAndFaqs from "../components/home/ArticlesAndFaqs";
import BestMedicine from "../components/home/BestMedicine";
import ClientsReview from "../components/home/ClientsReview";
import CompanyOverview from "../components/home/CompanyOverview";
import HeroSlider from "../components/home/HeroSlider";
import OurDepartments from "../components/home/OurDepartments";
import WhyChooseUs from "../components/home/WhyChooseUs";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <WhyChooseUs />
      <CompanyOverview />
      <OurDepartments />
      <BestMedicine />
      {/* <Milestone /> */}
      <ClientsReview />
      <ArticlesAndFaqs />
    </>
  );
}
