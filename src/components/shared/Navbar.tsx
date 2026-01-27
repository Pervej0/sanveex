"use client";

import { useState, useEffect, useRef } from "react";
import { SiteContent } from "@/generated/prisma/client";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Phone, Menu, ChevronDown, Search, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DynamicNavItem } from "@/types/navigation.types";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

// --- Mega Menu Component ---
interface MegaMenuProps {
  title: string;
  items: DynamicNavItem[];
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isActivePath: boolean;
}

function MegaMenu({
  title,
  items,
  isOpen,
  onMouseEnter,
  onMouseLeave,
  isActivePath,
}: MegaMenuProps) {
  return (
    <div
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button
        className={cn(
          "flex items-center gap-1 text-sm font-bold uppercase tracking-wider transition-colors py-2 px-1",
          isOpen || isActivePath
            ? "text-primary"
            : "text-foreground hover:text-primary",
        )}
      >
        {title}
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {/* Mega Menu Dropdown */}
      <div
        className={cn(
          "absolute left-1/2 -translate-x-1/2 pt-4 transition-all duration-200 z-[100]",
          isOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-2",
        )}
      >
        <div className="bg-card rounded-xl shadow-xl border border-border p-6 min-w-[380px]">
          <div className="space-y-1">
            {items.map((item) => (
              <Link
                key={item.id}
                href={item.href || "#"}
                className="group flex items-start gap-4 p-3 rounded-lg hover:bg-accent transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </div>
                  {item.description && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.description}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Main Navbar Component ---
export default function Navbar({
  siteContent,
  navItems = [],
}: {
  siteContent: SiteContent;
  navItems: DynamicNavItem[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const emergencyNumber = siteContent.phone;

  // Handle scroll for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle keyboard shortcut for search
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpenSearch((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleMenuEnter = (menu: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menu);
  };

  const handleMenuLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  const toggleMobileSection = (section: string) => {
    setExpandedMobile(expandedMobile === section ? null : section);
  };

  const runCommand = (command: () => void) => {
    setOpenSearch(false);
    command();
  };

  return (
    <>
      <nav
        className={cn(
          "left-0 right-0 z-50 bg-background/95 transition-all duration-300",
          isSticky
            ? "fixed top-0 shadow-sm border-b border-border"
            : "relative",
        )}
      >
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex h-16 lg:h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <Image
                src={siteContent.logoUrl}
                alt={`${siteContent.name} Logo`}
                width={140}
                height={40}
                priority
                className="w-auto h-8 lg:h-10"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              {navItems.map((navItem) =>
                navItem.children && navItem.children.length > 0 ? (
                  <MegaMenu
                    key={navItem.id}
                    title={navItem.title}
                    items={navItem.children}
                    isOpen={activeMenu === navItem.id}
                    isActivePath={
                      pathname?.startsWith(
                        navItem.href || `/${navItem.title.toLowerCase()}`,
                      ) ?? false
                    }
                    onMouseEnter={() => handleMenuEnter(navItem.id)}
                    onMouseLeave={handleMenuLeave}
                  />
                ) : (
                  <Link
                    key={navItem.id}
                    href={navItem.href || "#"}
                    className={cn(
                      "text-sm font-bold uppercase tracking-wider transition-colors py-2 px-1",
                      pathname === navItem.href
                        ? "text-primary"
                        : "text-foreground hover:text-primary",
                    )}
                  >
                    {navItem.title}
                  </Link>
                ),
              )}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Search Button */}
              <button
                onClick={() => setOpenSearch(true)}
                className="flex items-center gap-2 h-9 px-3 rounded-lg bg-secondary hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
              >
                <Search className="h-4 w-4" />
                <span className="hidden sm:inline text-sm">Search</span>
                <kbd className="hidden md:inline-flex h-5 items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </button>

              {/* Phone CTA - Desktop */}
              <div className="hidden md:flex items-center">
                <a
                  href={`tel:${emergencyNumber.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 h-9 px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span className="text-sm font-medium">{emergencyNumber}</span>
                </a>
              </div>

              {/* Mobile Menu Toggle */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-full max-w-md p-0 overflow-y-auto"
                >
                  <div className="flex flex-col h-full">
                    <SheetHeader className="p-6 border-b border-border">
                      <div className="flex items-center justify-between">
                        <SheetTitle className="flex items-center gap-3">
                          <div className="relative w-32 h-8">
                            <Image
                              src={siteContent.logoUrl}
                              alt={siteContent.name}
                              fill
                              className="object-contain object-left"
                            />
                          </div>
                        </SheetTitle>
                      </div>
                    </SheetHeader>

                    <div className="flex-1 p-6">
                      <nav className="space-y-2">
                        {/* Mobile Accordion Sections */}
                        {navItems.map((section) => (
                          <div key={section.id}>
                            {section.children && section.children.length > 0 ? (
                              <>
                                <button
                                  onClick={() =>
                                    toggleMobileSection(section.id)
                                  }
                                  className={cn(
                                    "flex items-center justify-between w-full h-12 px-4 rounded-lg text-base font-bold uppercase tracking-wider transition-colors",
                                    pathname?.startsWith(
                                      section.href ||
                                        `/${section.title.toLowerCase()}`,
                                    )
                                      ? "text-primary"
                                      : "text-foreground hover:bg-accent",
                                  )}
                                >
                                  {section.title}
                                  <ChevronDown
                                    className={cn(
                                      "h-4 w-4 transition-transform duration-200",
                                      expandedMobile === section.id &&
                                        "rotate-180",
                                    )}
                                  />
                                </button>
                                <div
                                  className={cn(
                                    "overflow-hidden transition-all duration-300 ease-in-out",
                                    expandedMobile === section.id
                                      ? "max-h-96 opacity-100"
                                      : "max-h-0 opacity-0",
                                  )}
                                >
                                  <div className="pl-4 py-2 space-y-1">
                                    {section.children.map((item) => (
                                      <Link
                                        key={item.id}
                                        href={item.href || "#"}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex flex-col py-3 px-4 rounded-lg hover:bg-accent transition-colors"
                                      >
                                        <span
                                          className={cn(
                                            "text-sm font-medium",
                                            pathname === item.href
                                              ? "text-primary"
                                              : "text-foreground",
                                          )}
                                        >
                                          {item.title}
                                        </span>
                                        {item.description && (
                                          <span className="text-xs text-muted-foreground">
                                            {item.description}
                                          </span>
                                        )}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              </>
                            ) : (
                              <Link
                                href={section.href || "#"}
                                onClick={() => setMobileMenuOpen(false)}
                                className={cn(
                                  "flex items-center w-full h-12 px-4 rounded-lg text-base font-bold uppercase tracking-wider transition-colors",
                                  pathname === section.href
                                    ? "text-primary"
                                    : "text-foreground hover:bg-accent",
                                )}
                              >
                                {section.title}
                              </Link>
                            )}
                          </div>
                        ))}
                      </nav>
                    </div>

                    {/* Mobile Footer */}
                    <div className="p-6 border-t border-border bg-muted/50">
                      <a
                        href={`tel:${emergencyNumber.replace(/\s/g, "")}`}
                        className="flex items-center justify-center gap-2 h-12 w-full rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                      >
                        <Phone className="h-4 w-4" />
                        <span className="text-sm font-semibold">
                          {emergencyNumber}
                        </span>
                      </a>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Command Dialog */}
      <CommandDialog open={openSearch} onOpenChange={setOpenSearch}>
        <CommandInput placeholder="Search products, pages, information..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Quick Links">
            <CommandItem onSelect={() => runCommand(() => router.push("/"))}>
              <span>Home</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push("/contact"))}
            >
              <span>Contact Us</span>
            </CommandItem>
          </CommandGroup>

          {navItems.map((section) => (
            <CommandGroup key={section.id} heading={section.title}>
              {section.children?.map((item) => (
                <CommandItem
                  key={item.id}
                  onSelect={() =>
                    runCommand(() => router.push(item.href || "#"))
                  }
                >
                  <span>{item.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
