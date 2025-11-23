import Image from "next/image";
import Topbar from "../components/shared/Topbar";
import HeroSlider from "../components/home/HeroSlider";
import WhyChooseUs from "../components/home/WhyChooseUs";
import CompanyOverview from "../components/home/CompanyOverview";
import OurDepartments from "../components/home/OurDepartments";

export default function Home() {
  return (
  <>
  <HeroSlider/>
  <WhyChooseUs/>
  <CompanyOverview/>
  <OurDepartments/>
    <div className="container">
      <h1>Welcome to Home</h1>
      <div className="h-screen border">
        <h2>Hi!</h2>
      </div>
      <div className="container h-screen border">
        <h2>Hello, World</h2>
      </div>
    </div>
  </>
  );
}
