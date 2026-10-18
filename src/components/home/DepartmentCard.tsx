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
  const href = `/departments/${department.slug ?? ""}`;

  return (
    <Link
      href={href}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-navy-200 hover:shadow-lg"
    >
      {/* Accent wash */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ backgroundColor: department.color }}
      />

      <span
        className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105"
        style={{
          backgroundColor: `${department.color}1A`,
          color: department.color,
        }}
      >
        {department.icon}
      </span>

      <h3 className="text-lg font-bold text-navy-800 transition-colors group-hover:text-primary">
        {department.title}
      </h3>

      <p className="mt-2.5 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {department.description}
      </p>

      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
        Learn more
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
