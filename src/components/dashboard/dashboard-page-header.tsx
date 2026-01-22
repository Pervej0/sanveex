import React from "react";
import { cn } from "@/lib/utils";

interface DashboardPageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export function DashboardPageHeader({
  title,
  description,
  children,
  className,
}: DashboardPageHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between bg-white dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 ",
        className,
      )}
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            {description}
          </p>
        )}
      </div>

      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}
