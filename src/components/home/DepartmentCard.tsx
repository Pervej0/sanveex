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
      className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-slate-200/90 bg-white p-6 sm:p-7 shadow-2xs transition-all duration-300 hover:border-brand-teal-400 hover:shadow-lg hover:shadow-navy-950/5"
    >
      {/* Brand accent rule */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-brand-teal-400 transition-transform duration-300 group-hover:scale-x-100"
      />

      <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-navy-50 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
        {department.icon}
      </span>

      <h3 className="text-lg font-bold text-navy-900 transition-colors group-hover:text-primary">
        {department.title}
      </h3>

      <p className="mt-2.5 line-clamp-3 flex-1 text-xs sm:text-sm leading-relaxed text-muted-foreground">
        {department.description}
      </p>

      <span className="mt-5 inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary">
        <span>Learn more</span>
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 text-brand-teal-500" />
      </span>
    </Link>
  );
}
