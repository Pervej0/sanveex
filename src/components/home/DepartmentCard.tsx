import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface DepartmentCardProps {
  department: {
    icon: React.ReactNode;
    secondaryIcon?: React.ReactNode;
    title: string;
    slug?: string;
    description: string;
    color: string;
  };
}

export default function DepartmentCard({ department }: DepartmentCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      role="button"
      tabIndex={0}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative h-full outline-none
      focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
    >
      <div
        className="relative h-full rounded-2xl bg-white p-5 md:p-8
        border border-zinc-200/70
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:shadow"
      >
        <div className="relative z-10 flex h-full flex-col">
          {/* Icon */}
          <div className="mb-5 inline-flex">
            <div
              className="relative rounded-2xl p-4 shadow-sm transition-all duration-300
              group-hover:scale-105 group-hover:rotate-2"
              style={{
                background: `linear-gradient(135deg, ${department.color}25, ${department.color}10)`,
              }}
            >
              <div style={{ color: department.color }}>{department.icon}</div>

              {department.secondaryIcon && (
                <div
                  className="absolute -top-2 -right-2 scale-0 transition-transform duration-300 group-hover:scale-100"
                  style={{ color: department.color }}
                >
                  {department.secondaryIcon}
                </div>
              )}
            </div>
          </div>

          {/* Title */}
          <h3
            className="mb-2 text-lg md:text-xl font-semibold tracking-tight transition-colors duration-300"
            style={{ color: isHovered ? department.color : "#202e44" }}
          >
            {department.title}
          </h3>

          {/* Description */}
          <p className="mb-6 text-sm text-[#202e44]/70 leading-relaxed line-clamp-3">
            {department.description}
          </p>

          {/* CTA */}
          <Link
            href={`/departments/${department.slug || "#"}`}
            className="mt-auto inline-flex items-center gap-2 text-sm font-semibold
            transition-all duration-300 group-hover:translate-x-1 hover:underline "
            style={{ color: department.color }}
          >
            Learn more
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
