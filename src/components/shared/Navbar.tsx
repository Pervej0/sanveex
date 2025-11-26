"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Menu, ChevronDown, Search } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/src/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { sanveexLogo } from "@/src/assets";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/src/components/ui/command";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [openSearch, setOpenSearch] = useState(false);

  const aboutItems = [
    { title: "Profile", href: "/about/profile" },
    { title: "Vision", href: "/about/vision" },
    { title: "Mission", href: "/about/mission" },
    { title: "Speech from BOD", href: "/about/speech" },
  ];

  const productsItems = [
    { title: "Overview", href: "/products/overview" },
    { title: "Medical Information", href: "/products/medical-info" },
  ];

  const emergencyNumber = "+1 (555) 123-4567";

  // Handle scroll for sticky navbar with slide effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const viewportHeight = 100;

      // Check if scrolled past viewport height
      if (currentScrollY >= viewportHeight) {
        setIsSticky(true);
      } else {
        // Not past viewport height - navbar in normal position
        setIsSticky(false);
        setIsVisible(true);
      }

      //   setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <nav
        className={cn(
          "left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 transition-all duration-300",
          isSticky ? "fixed top-0" : "relative",
          isSticky && !isVisible && "-translate-y-full"
        )}
      >
        <div className="container">
          <div className="flex h-16 items-center justify-between">
            {/* Left: Brand Name */}
            <div>
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src={sanveexLogo}
                  alt="Brand Name"
                  width={110}
                  height={110}
                />
              </Link>
            </div>

            {/* Center: Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              <Link
                href="/"
                className="text-md font-medium text-foreground hover:text-foreground-accent transition-colors px-2 py-1 rounded-md hover:bg-accent/50"
              >
                Home
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1.5 text-md font-medium text-foreground hover:text-foreground-accent transition-colors outline-none px-2 py-1 rounded-md hover:bg-accent/50 data-[state=open]:bg-accent/50 data-[state=open]:text-foreground-accent">
                  About
                  <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 data-[state=open]:rotate-180" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="w-56 p-2 bg-background border-border shadow-lg"
                >
                  {aboutItems.map((item, index) => (
                    <div key={item.href}>
                      <DropdownMenuItem asChild className="cursor-pointer">
                        <Link
                          href={item.href}
                          className="flex items-center px-3 py-2.5 text-md text-foreground rounded-md hover:bg-accent hover:text-accent-foreground transition-colors focus:bg-accent focus:text-accent-foreground outline-none"
                        >
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </DropdownMenuItem>
                      {index < aboutItems.length - 1 && (
                        <DropdownMenuSeparator className="my-1" />
                      )}
                    </div>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1.5 text-md font-medium text-foreground hover:text-foreground-accent transition-colors outline-none px-2 py-1 rounded-md hover:bg-accent/50 data-[state=open]:bg-accent/50 data-[state=open]:text-foreground-accent">
                  Products
                  <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 data-[state=open]:rotate-180" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="w-56 p-2 bg-background border-border shadow-lg"
                >
                  {productsItems.map((item, index) => (
                    <div key={item.href}>
                      <DropdownMenuItem asChild className="cursor-pointer">
                        <Link
                          href={item.href}
                          className="flex items-center px-3 py-2.5 text-sm text-foreground rounded-md hover:bg-accent hover:text-accent-foreground transition-colors focus:bg-accent focus:text-accent-foreground outline-none"
                        >
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </DropdownMenuItem>
                      {index < productsItems.length - 1 && (
                        <DropdownMenuSeparator className="my-1" />
                      )}
                    </div>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Link
                href="/newsroom"
                className="text-md font-medium text-foreground hover:text-foreground-accent transition-colors px-2 py-1 rounded-md hover:bg-accent/50"
              >
                Newsroom
              </Link>

              <Link
                href="/contact"
                className="text-md font-medium text-foreground hover:text-foreground-accent transition-colors px-2 py-1 rounded-md hover:bg-accent/50"
              >
                Contact Us
              </Link>
            </div>

            {/* Right: Emergency Contact & Mobile Menu */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4">
                {/* Search Button */}
                <button
                  onClick={() => setOpenSearch(true)}
                  className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition"
                >
                  <Search className="h-5 w-5" />
                </button>
                {/* Emergency Contact - Desktop */}
                <div className="hidden md:flex items-center gap-2.5 text-foreground-accent px-4 py-2.5 rounded-lg transition-colors shadow-sm">
                  <Phone className="h-4 w-4 text-black shrink-0" />
                  <div className="flex flex-col">
                    <a
                      href={`tel:${emergencyNumber.replace(/\s/g, "")}`}
                      className="text-sm font-bold hover:underline leading-tight"
                    >
                      {emergencyNumber}
                    </a>
                  </div>
                </div>

                {/* Mobile Menu Button */}
                <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                  <SheetTrigger asChild className="lg:hidden">
                    <button
                      className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none transition-colors"
                      aria-label="Toggle menu"
                    >
                      <Menu className="h-6 w-6" />
                    </button>
                  </SheetTrigger>
                  <SheetContent
                    side="right"
                    className="w-[300px] sm:w-[400px] overflow-y-auto"
                  >
                    <SheetHeader className="pb-6">
                      <SheetTitle>Menu</SheetTitle>
                    </SheetHeader>

                    <div className="flex flex-col space-y-2 mt-4">
                      {/* Mobile Navigation Links */}
                      <Link
                        href="/"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-base font-medium text-foreground hover:text-foreground-accent hover:bg-accent/50 py-3.5 px-4 rounded-md transition-colors"
                      >
                        Home
                      </Link>

                      {/* About Dropdown - Mobile (Collapsible) */}
                      <div className="space-y-0">
                        <button
                          onClick={() => setAboutOpen(!aboutOpen)}
                          className="w-full flex items-center justify-between text-base font-semibold text-foreground-accent hover:bg-accent/50 py-3.5 px-4 rounded-md transition-colors"
                        >
                          <span>About</span>
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform duration-300",
                              aboutOpen && "rotate-180"
                            )}
                          />
                        </button>
                        <div
                          className={cn(
                            "overflow-hidden transition-all duration-300 ease-in-out",
                            aboutOpen
                              ? "max-h-96 opacity-100"
                              : "max-h-0 opacity-0"
                          )}
                        >
                          <div className="pl-4 pt-2 pb-2 space-y-1">
                            {aboutItems.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  setAboutOpen(false);
                                }}
                                className="block text-sm text-foreground-secondary hover:text-foreground-accent hover:bg-accent/50 py-2.5 px-4 rounded-md transition-colors"
                              >
                                {item.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Products Dropdown - Mobile (Collapsible) */}
                      <div className="space-y-0">
                        <button
                          onClick={() => setProductsOpen(!productsOpen)}
                          className="w-full flex items-center justify-between text-base font-semibold text-foreground-accent hover:bg-accent/50 py-3.5 px-4 rounded-md transition-colors"
                        >
                          <span>Products</span>
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform duration-300",
                              productsOpen && "rotate-180"
                            )}
                          />
                        </button>
                        <div
                          className={cn(
                            "overflow-hidden transition-all duration-300 ease-in-out",
                            productsOpen
                              ? "max-h-96 opacity-100"
                              : "max-h-0 opacity-0"
                          )}
                        >
                          <div className="pl-4 pt-2 pb-2 space-y-1">
                            {productsItems.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  setProductsOpen(false);
                                }}
                                className="block text-sm text-foreground-secondary hover:text-foreground-accent hover:bg-accent/50 py-2.5 px-4 rounded-md transition-colors"
                              >
                                {item.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>

                      <Link
                        href="/newsroom"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-base font-medium text-foreground hover:text-foreground-accent hover:bg-accent/50 py-3.5 px-4 rounded-md transition-colors"
                      >
                        Newsroom
                      </Link>

                      <Link
                        href="/contact"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-base font-medium text-foreground hover:text-foreground-accent hover:bg-accent/50 py-3.5 px-4 rounded-md transition-colors"
                      >
                        Contact Us
                      </Link>

                      {/* Emergency Contact - Mobile (At the end) */}
                      <div className="mt-8 pt-6 border-t border-border">
                        <div className="flex items-center gap-3 bg-error/10 border border-foreground-accent/20 text-foreground-accent px-4 py-4 rounded-lg">
                          <Phone className="h-5 w-5 shrink-0 text-black" />
                          <div className="flex flex-col">
                            <a
                              href={`tel:${emergencyNumber.replace(/\s/g, "")}`}
                              className="text-sm font-bold hover:underline leading-tight"
                            >
                              {emergencyNumber}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* ========== Global Search ========= */}
      <CommandDialog open={openSearch} onOpenChange={setOpenSearch}>
        <CommandInput placeholder="Search medicines, products, pages..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Quick Links">
            <CommandItem onSelect={() => (window.location.href = "/")}>
              🏠 Home
            </CommandItem>
            <CommandItem onSelect={() => (window.location.href = "/newsroom")}>
              📰 Newsroom
            </CommandItem>
            <CommandItem onSelect={() => (window.location.href = "/contact")}>
              📞 Contact Us
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="About">
            {aboutItems.map((item) => (
              <CommandItem
                key={item.href}
                onSelect={() => (window.location.href = item.href)}
              >
                {item.title}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="Products">
            {productsItems.map((item) => (
              <CommandItem
                key={item.href}
                onSelect={() => (window.location.href = item.href)}
              >
                {item.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
