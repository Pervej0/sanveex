/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, type LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { NavItem } from "@/config/dashboard-nav";

interface SidebarItemProps {
  item: NavItem;
  collapsed?: boolean;
}

export function SidebarItem({ item, collapsed }: SidebarItemProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Check if this item or any of its children are active
  // Check if this item or any of its children are active
  const isActive =
    item.items && item.items.length > 0
      ? pathname?.startsWith(item.href) // Parent items
      : item.href === pathname ||
        (pathname?.startsWith(item.href + "/") && item.href !== "/dashboard");
  const hasChildren = item.items && item.items.length > 0;

  // Auto-expand if child is active
  useEffect(() => {
    if (isActive && hasChildren && !isOpen) {
      setIsOpen(true);
    }
  }, [isActive, hasChildren, isOpen]);

  // Toggle for parent items
  const handleToggle = (e: React.MouseEvent) => {
    if (hasChildren) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  const Icon = item.icon as LucideIcon;

  return (
    <div className="w-full font-serif ">
      {hasChildren ? (
        // Parent Item with Children
        <div className="select-none">
          <button
            onClick={handleToggle}
            className={cn(
              "group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all duration-200 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800/80 dark:hover:text-zinc-50",
              isActive
                ? "text-zinc-900 dark:text-zinc-50"
                : "text-zinc-500 dark:text-zinc-400",
              collapsed && "justify-center px-2",
            )}
          >
            {Icon && (
              <Icon
                className={cn(
                  "size-5 shrink-0 transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-zinc-500 group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-zinc-50",
                )}
              />
            )}

            {!collapsed && (
              <>
                <span className="grow text-left">{item.title}</span>
                <ChevronRight
                  className={cn(
                    "size-4 shrink-0 transition-transform duration-200",
                    isOpen && "rotate-90",
                  )}
                />
              </>
            )}
          </button>

          {/* Nested Items */}
          <AnimatePresence initial={false}>
            {isOpen && !collapsed && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="ml-4 mt-1 space-y-1 border-l border-zinc-200 pl-3 dark:border-zinc-800">
                  {item.items?.map((subItem) => (
                    <SidebarSubItem key={subItem.href} item={subItem} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        // Leaf Item
        <Link
          href={item.disabled ? "#" : item.href}
          className={cn(
            "group flex items-center gap-3 px-3 py-2.5 text-sm font-semibold transition-all duration-200 border-b border-zinc-200 dark:border-zinc-800",
            isActive
              ? "bg-primary/10 text-primary" // Premium active state
              : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/80 dark:hover:text-zinc-50",
            item.disabled && "pointer-events-none opacity-50",
            collapsed && "justify-center px-2",
          )}
        >
          {Icon && (
            <Icon
              className={cn(
                "size-5 shrink-0 transition-colors",
                isActive
                  ? "text-primary"
                  : "text-zinc-500 group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-zinc-50",
              )}
            />
          )}
          {!collapsed && <span>{item.title}</span>}
        </Link>
      )}
    </div>
  );
}

function SidebarSubItem({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const isActive = item.href === pathname;

  return (
    <Link
      href={item.href}
      className={cn(
        "group flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
        isActive
          ? "bg-zinc-100 font-semibold text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
          : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-50",
      )}
    >
      {item.icon && <item.icon className="h-4 w-4" />}
      <span>{item.title}</span>
    </Link>
  );
}
