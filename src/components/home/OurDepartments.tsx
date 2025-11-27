import Link from "next/link";
import { cn } from "@/lib/utils";
import { departments } from "@/src/data/departments";

// Helper function to convert title to slug
const titleToSlug = (title: string): string => {
  return title.toLowerCase().replace(/\s+/g, "-");
};

export default function OurDepartments() {
  return (
    <section
      className="department_section py-16 md:py-20 lg:py-24 bg-background"
      id="department_section"
    >
      <div className="container">
        {/* Heading */}
        <div className="mb-12 md:mb-16 text-center">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-foreground-accent uppercase tracking-wider">
              Our Services
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground">
            OUR <span className="text-foreground-accent">DEPARTMENTS</span>
          </h2>
          <div className="w-24 h-1 bg-foreground-accent mx-auto mt-4" />
        </div>

        {/* Departments Grid */}
        <div className="department_inner">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {departments?.map((department, index) => {
              const href = `/departments/${titleToSlug(department.title)}`;
              return (
                <Link key={index} href={href} className="group block">
                  <div className="department_icon_content relative h-full p-8 border-foreground-accent/5 border-2 border-border rounded-2xl hover:border-foreground-accent/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                    {/* Background gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-foreground-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon */}
                      <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-foreground-accent/10 text-foreground-accent group-hover:bg-foreground-accent group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg group-hover:shadow-xl">
                        {department.icon}
                      </div>

                      {/* Title */}
                      <h4 className="text-xl md:text-2xl font-bold text-foreground-accent mb-4 group-hover:text-foreground-accent transition-colors">
                        {department.title}
                      </h4>

                      {/* Description */}
                      <p className="text-sm md:text-base text-foreground-secondary leading-relaxed line-clamp-3">
                        {department.description
                          .split(" ")
                          .slice(0, 10)
                          .join(" ")}
                        ...
                      </p>
                      {/* Arrow indicator */}
                      <div className="mt-4 flex items-center text-foreground-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-sm font-medium">Learn more</span>
                        <svg
                          className="w-4 h-4 ml-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
