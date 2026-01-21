"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation"; // Added usePathname
import { Phone, Menu, ChevronDown, Search, ArrowRight } from "lucide-react";

// Utils
import { cn } from "@/lib/utils";

// Shadcn UI Components
import { Button } from "@/src/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/ui/sheet";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/src/components/ui/command";

// --- Navigation Data ---
const aboutItems = [
  {
    title: "Company Overview",
    href: "/about/overview",
    description: "Learn about our mission and vision",
  },
  {
    title: "Our History",
    href: "/about/history",
    description: "50+ years of innovation",
  },
  {
    title: "Leadership Team",
    href: "/about/leadership",
    description: "Meet our executive team",
  },
  {
    title: "Mission & Values",
    href: "/about/mission-and-values",
    description: "What drives us forward",
  },
  {
    title: "Board Message",
    href: "/about/speech",
    description: "Message from our Chairman",
  },
];

const productsItems = [
  {
    title: "Products Overview",
    href: "/products/overview",
    description: "Explore our product range",
  },
  {
    title: "Medical Information",
    href: "/products/medical-info",
    description: "Clinical data & resources",
  },
  {
    title: "Quality Assurance",
    href: "/products/quality",
    description: "Our commitment to quality",
  },
  {
    title: "Safety Information",
    href: "/products/safety",
    description: "Drug safety & compliance",
  },
];

const scienceItems = [
  {
    title: "R&D Overview",
    href: "/science/overview",
    description: "Innovation at our core",
  },
  {
    title: "Research Pipeline",
    href: "/science/pipeline",
    description: "Products in development",
  },
  {
    title: "Scientific Advisory",
    href: "/science/advisory",
    description: "Expert guidance",
  },
  {
    title: "Publications",
    href: "/science/publications",
    description: "Latest research findings",
  },
];

const storiesItems = [
  {
    title: "Patient Stories",
    href: "/stories/patients",
    description: "Real impact, real lives",
  },
  {
    title: "Sustainability",
    href: "/stories/sustainability",
    description: "Our environmental commitment",
  },
  {
    title: "Community Impact",
    href: "/stories/community",
    description: "Making a difference",
  },
  {
    title: "Innovation Stories",
    href: "/stories/innovation",
    description: "Breakthroughs & discoveries",
  },
];

// --- Mega Menu Component ---
interface MegaMenuProps {
  title: string;
  items: typeof aboutItems;
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isActivePath: boolean; // NEW PROP to check if this section is active
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
          "flex items-center gap-1 text-sm font-bold uppercase tracking-wider transition-colors py-2 px-1", // Added UPPERCASE
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
          "absolute left-1/2 -translate-x-1/2 pt-4 transition-all duration-200",
          isOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-2",
        )}
      >
        <div className="bg-card rounded-xl shadow-xl border border-border p-6 min-w-[380px]">
          <div className="space-y-1">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-start gap-4 p-3 rounded-lg hover:bg-accent transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {item.description}
                  </p>
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
export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname(); // NEW: Get current path
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const emergencyNumber = "+8801996-716929";

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
                src="/sanveex-logo.png"
                alt="Sanveex Logo"
                width={140}
                height={40}
                priority
                className="w-auto h-8 lg:h-10"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              <MegaMenu
                title="About"
                items={aboutItems}
                isOpen={activeMenu === "about"}
                isActivePath={pathname?.startsWith("/about") ?? false}
                onMouseEnter={() => handleMenuEnter("about")}
                onMouseLeave={handleMenuLeave}
              />

              <MegaMenu
                title="Products"
                items={productsItems}
                isOpen={activeMenu === "products"}
                isActivePath={pathname?.startsWith("/products") ?? false}
                onMouseEnter={() => handleMenuEnter("products")}
                onMouseLeave={handleMenuLeave}
              />

              <MegaMenu
                title="Science"
                items={scienceItems}
                isOpen={activeMenu === "science"}
                isActivePath={pathname?.startsWith("/science") ?? false}
                onMouseEnter={() => handleMenuEnter("science")}
                onMouseLeave={handleMenuLeave}
              />

              <MegaMenu
                title="Stories"
                items={storiesItems}
                isOpen={activeMenu === "stories"}
                isActivePath={pathname?.startsWith("/stories") ?? false}
                onMouseEnter={() => handleMenuEnter("stories")}
                onMouseLeave={handleMenuLeave}
              />
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
                              src="/sanveex-logo.png"
                              alt="Sanveex"
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
                        {[
                          { title: "About", items: aboutItems },
                          { title: "Products", items: productsItems },
                          { title: "Science", items: scienceItems },
                          { title: "Stories", items: storiesItems },
                        ].map((section) => (
                          <div key={section.title}>
                            <button
                              onClick={() => toggleMobileSection(section.title)}
                              className={cn(
                                "flex items-center justify-between w-full h-12 px-4 rounded-lg text-base font-bold uppercase tracking-wider transition-colors",
                                pathname?.startsWith(
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
                                  expandedMobile === section.title &&
                                    "rotate-180",
                                )}
                              />
                            </button>
                            <div
                              className={cn(
                                "overflow-hidden transition-all duration-300 ease-in-out",
                                expandedMobile === section.title
                                  ? "max-h-96 opacity-100"
                                  : "max-h-0 opacity-0",
                              )}
                            >
                              <div className="pl-4 py-2 space-y-1">
                                {section.items.map((item) => (
                                  <Link
                                    key={item.href}
                                    href={item.href}
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
                                    <span className="text-xs text-muted-foreground">
                                      {item.description}
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            </div>
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

          <CommandGroup heading="About">
            {aboutItems.map((item) => (
              <CommandItem
                key={item.href}
                onSelect={() => runCommand(() => router.push(item.href))}
              >
                <span>{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="Products">
            {productsItems.map((item) => (
              <CommandItem
                key={item.href}
                onSelect={() => runCommand(() => router.push(item.href))}
              >
                <span>{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="Science">
            {scienceItems.map((item) => (
              <CommandItem
                key={item.href}
                onSelect={() => runCommand(() => router.push(item.href))}
              >
                <span>{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
