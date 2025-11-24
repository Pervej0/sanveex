import Image from "next/image";
import Topbar from "../components/shared/Topbar";
import HeroSlider from "../components/home/HeroSlider";
import WhyChooseUs from "../components/home/WhyChooseUs";
import CompanyOverview from "../components/home/CompanyOverview";
import OurDepartments from "../components/home/OurDepartments";
import BestMedicine from "../components/home/BestMedicine";
import Milestone from "../components/home/Milestone";
import ClientsReview from "../components/home/ClientsReview";
import ArticlesAndFaqs from "../components/home/ArticlesAndFaqs";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <WhyChooseUs />
      <CompanyOverview />
      <OurDepartments />
      <BestMedicine />
      <Milestone />
      <ClientsReview />
      <ArticlesAndFaqs />
    </>
  );
}
