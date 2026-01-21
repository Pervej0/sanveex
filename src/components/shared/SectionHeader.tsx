import React from "react";
import { LucideIcon } from "lucide-react";

type SectionHeaderProps = {
  title: string;
  eyebrow?: string;
  icon?: LucideIcon;
  align?: "center" | "left";
};

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  eyebrow,
  icon: Icon,
  align = "center",
}) => {
  const alignment =
    align === "left" ? "items-start text-left" : "items-center text-center";

  return (
    <div className={`flex flex-col mb-16 ${alignment}`}>
      {eyebrow && (
        <h3 className="text-primary font-medium mb-2 flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4" />}
          {eyebrow}
        </h3>
      )}

      <h2 className="text-4xl md:text-5xl mb-4">{title}</h2>

      <div className="w-32 h-1 bg-gradient-to-r from-primary to-secondary" />
    </div>
  );
};

export default SectionHeader;
