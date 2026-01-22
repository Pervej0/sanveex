import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { award1, award2, award3, award4 } from "@/assets";

export default function CompanyOverview() {
  const awards = [award1, award2, award3, award4];

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Image */}
          <div className="welcome_image order-2 lg:order-1">
            <div className="relative rounded-lg overflow-hidden shadow-xl group">
              <Image
                src="https://images.unsplash.com/photo-1618498082410-b4aa22193b38?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Welcome Image"
                width={600}
                height={600}
                className="w-full h-auto object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Right: Content */}
          <div className="welcome_inner order-1 lg:order-2">
            {/* Heading */}
            <div className="heading mb-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight">
                <span className="text-primary">SANVEEX GLOBAL HEALTH</span>
              </h1>
            </div>

            {/* Subtitle */}
            <h6 className="text-lg md:text-xl text-primary font-semibold mb-4 leading-relaxed">
              Founded in 2025 to bring advanced biotech solutions to Bangladesh,
              building strong global partnerships.
            </h6>

            {/* Description */}
            <p className="text-base md:text-lg text-muted-foreground mb-6 leading-relaxed">
              Served over 2 million healthcare professionals and labs with
              temperature-controlled, high-quality products. In 2026, achieved 4
              crore BDT profit and launched local manufacturing of essential
              biotech products for the country.
            </p>

            {/* Awards */}
            <ul className="flex flex-wrap gap-4 md:gap-6 mb-8">
              {awards.map((award, index) => (
                <li key={index} className="shrink-0">
                  <div className="relative w-20 h-20 md:w-22 md:h-22 rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:scale-110">
                    <Image
                      src={award}
                      alt={`Award ${index + 1}`}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                </li>
              ))}
            </ul>

            {/* Button */}
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base font-medium rounded-md shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Link href="#contact">GET IN TOUCH</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
