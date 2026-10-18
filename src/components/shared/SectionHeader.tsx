import React from "react";
import { LucideIcon } from "lucide-react";

type SectionHeaderProps = {
  title: string;
  eyebrow?: string;
  icon?: LucideIcon;
  align?: "center" | "left";
  description?: string;
  /** Applies light-on-dark styling for use on navy sections. */
  tone?: "default" | "inverse";
};

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  eyebrow,
  icon: Icon,
  align = "center",
  description,
  tone = "default",
}) => {
  const inverse = tone === "inverse";

  return (
    <div
      className={`mb-12 flex flex-col gap-4 md:mb-16 ${
        align === "left" ? "items-start text-left" : "items-center text-center"
      }`}
    >
      {eyebrow && (
        <span
          className={`eyebrow rounded-full px-3.5 py-1.5 ${
            inverse
              ? "bg-white/10 text-brand-teal-300"
              : "bg-brand-teal-100 text-brand-teal-700"
          }`}
        >
          {Icon && <Icon className="h-3.5 w-3.5" />}
          {eyebrow}
        </span>
      )}

      <h2
        className={`max-w-3xl text-3xl sm:text-4xl lg:text-[2.75rem] ${
          inverse ? "text-white" : ""
        }`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`max-w-2xl text-base leading-relaxed ${
            inverse ? "text-navy-200" : "text-muted-foreground"
          }`}
        >
          {description}
        </p>
      )}

      <span
        className={`h-1 w-16 rounded-full ${
          inverse ? "bg-brand-teal-400" : "bg-brand-teal-400"
        }`}
      />
    </div>
  );
};

export default SectionHeader;
