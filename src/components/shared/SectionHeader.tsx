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
  align = "left",
  description,
  tone = "default",
}) => {
  const inverse = tone === "inverse";
  const centered = align === "center";

  return (
    <div
      className={`mb-12 flex flex-col gap-4 md:mb-14 ${
        centered ? "items-center text-center" : "items-start text-left"
      }`}
    >
      {eyebrow && (
        <span
          className={`eyebrow ${
            inverse ? "text-brand-teal-300" : "text-brand-teal-600"
          }`}
        >
          <span
            aria-hidden
            className={`h-px w-8 ${
              inverse ? "bg-brand-teal-300" : "bg-brand-teal-500"
            }`}
          />
          {eyebrow}
        </span>
      )}

      <h2
        className={`max-w-3xl text-3xl sm:text-4xl lg:text-[2.5rem] ${
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
    </div>
  );
};

export default SectionHeader;
