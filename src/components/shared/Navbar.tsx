"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { SiteContent } from "@/generated/prisma/client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Phone,
  Menu,
  ChevronDown,
  ArrowRight,
  ArrowUpRight,
  Mail,
  MapPin,
  Globe,
  ShieldCheck,
  Building2,
  FileCheck2,
  Pill,
  Sparkles,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { company } from "@/lib/company";
import type { DynamicNavItem } from "@/types/navigation.types";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export interface NavProduct {
  name: string;
  slug: string;
  genericName?: string | null;
  strength?: string | null;
  image: string;
  brandBangla?: string | null;
}

interface NavbarProps {
  siteContent: SiteContent;
  navItems: DynamicNavItem[];
  products?: NavProduct[];
}

/** Pre-header audience and quick navigation links. */
const audienceLinks = [
  { title: "Healthcare Professionals", href: "/products/medical-info" },
  { title: "Distribution Partners", href: "/contact" },
  { title: "Pharmacovigilance", href: "/products/safety" },
];

const socialIconMap = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
} as const;

/* -------------------------------------------------------------------------- */
/* International Mega Menu                                                    */
/* -------------------------------------------------------------------------- */

function MegaMenu({
  navItem,
  isOpen,
  isActivePath,
  products,
  onMouseEnter,
  onMouseLeave,
  onNavigate,
}: {
  navItem: DynamicNavItem;
  isOpen: boolean;
  isActivePath: boolean;
  products: NavProduct[];
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onNavigate: () => void;
}) {
  const children = navItem.children ?? [];
  const isProductsMenu = /product/i.test(navItem.href ?? navItem.title ?? "");

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        className={cn(
          "group relative flex items-center gap-1.5 whitespace-nowrap py-2.5 text-[0.8rem] font-semibold uppercase tracking-[0.07em] transition-colors",
          isOpen || isActivePath
            ? "text-primary"
            : "text-navy-800 hover:text-primary",
        )}
      >
        {navItem.title}
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 stroke-[2.2] transition-transform duration-300",
            isOpen && "rotate-180 text-brand-teal-500",
          )}
        />
        <span
          className={cn(
            "absolute -bottom-px left-0 h-[2px] bg-brand-teal-400 transition-all duration-300",
            isOpen || isActivePath ? "w-full" : "w-0 group-hover:w-full",
          )}
        />
      </button>

      {/* Mega dropdown container */}
      <div
        className={cn(
          "absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 transition-all duration-200",
          isOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0",
        )}
      >
        <div className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-xl shadow-navy-950/10 border-t-2 border-t-brand-teal-400">
          {isProductsMenu ? (
            /* Products rich mega menu */
            <div className="flex w-[42rem] max-w-[calc(100vw-2.5rem)] divide-x divide-border/70 p-4">
              {/* Left Column: Categories and Sections */}
              <div className="w-[16rem] shrink-0 space-y-1 pr-4">
                <p className="eyebrow mb-2 px-3 text-brand-teal-600">
                  Portfolio Taxonomy
                </p>
                {children.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href || "#"}
                    onClick={onNavigate}
                    className="group/item flex items-start gap-3 rounded-md p-3 transition-colors hover:bg-navy-50/70"
                  >
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-navy-100 text-primary group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                      <Pill className="h-3.5 w-3.5" />
                    </span>
                    <span className="flex-1">
                      <span className="flex items-center gap-1.5 text-sm font-bold text-navy-800 group-hover/item:text-primary transition-colors">
                        {item.title}
                        <ArrowRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all group-hover/item:translate-x-0 group-hover/item:opacity-100 text-brand-teal-500" />
                      </span>
                      {item.description && (
                        <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground line-clamp-2">
                          {item.description}
                        </span>
                      )}
                    </span>
                  </Link>
                ))}
              </div>

              {/* Center Column: Core Approved Products */}
              <div className="min-w-0 flex-1 pl-4">
                <div className="mb-2.5 flex items-center justify-between">
                  <p className="eyebrow text-navy-800">
                    Approved Formulations
                  </p>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 ring-1 ring-emerald-200">
                    DGDA Authorised
                  </span>
                </div>

                <div className="space-y-2">
                  {products.slice(0, 3).map((product) => (
                    <Link
                      key={product.slug}
                      href={`/products/${product.slug}`}
                      onClick={onNavigate}
                      className="group/prod flex items-center gap-3.5 rounded-md border border-border/60 bg-white p-2.5 shadow-2xs transition-all hover:border-brand-teal-300 hover:bg-slate-50/80 hover:shadow-md"
                    >
                      <span className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg border border-border/80 bg-slate-50 p-1">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="64px"
                          className="object-contain p-1 transition-transform group-hover/prod:scale-110"
                        />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline gap-2">
                          <span className="block truncate text-sm font-extrabold text-navy-800 group-hover/prod:text-primary transition-colors">
                            {product.name}
                          </span>
                          {product.brandBangla && (
                            <span className="text-[11px] font-semibold text-muted-foreground">
                              {product.brandBangla}
                            </span>
                          )}
                        </div>
                        <span className="block truncate text-xs text-brand-teal-600 font-medium">
                          {product.strength || product.genericName}
                        </span>
                      </div>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-brand-teal-500 opacity-0 transition-all group-hover/prod:opacity-100 group-hover/prod:translate-x-0.5" />
                    </Link>
                  ))}
                </div>

                <div className="mt-3 flex items-center justify-between pt-2 border-t border-border/60">
                  <Link
                    href="/products"
                    onClick={onNavigate}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-brand-teal-600 transition-colors"
                  >
                    View All Products &amp; Formulations
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            /* Standard section dropdown */
            <div className="min-w-[24rem] p-3">
              <div className="space-y-1">
                {children.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href || "#"}
                    onClick={onNavigate}
                    className="group/item flex items-start gap-3 rounded-md p-3 transition-colors hover:bg-navy-50/70"
                  >
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-navy-100 text-primary group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                      <Building2 className="h-3.5 w-3.5" />
                    </span>
                    <span className="flex-1">
                      <span className="flex items-center gap-1.5 text-sm font-bold text-navy-800 group-hover/item:text-primary transition-colors">
                        {item.title}
                        <ArrowRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all group-hover/item:translate-x-0 group-hover/item:opacity-100 text-brand-teal-500" />
                      </span>
                      {item.description && (
                        <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                          {item.description}
                        </span>
                      )}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Main Navigation Bar                                                        */
/* -------------------------------------------------------------------------- */

export default function Navbar({
  siteContent,
  navItems = [],
  products = [],
}: NavbarProps) {
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const phone = siteContent.phone || company.contact.phone;
  const socialLinks = (siteContent.socialLinks ?? {}) as Record<string, string>;

  /* Compact the header upon leaving the top of page. */
  useEffect(() => {
    const onScroll = () => setIsCompact(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close menus on route change using React 19 documented state adjustment. */
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setActiveMenu(null);
    setMobileMenuOpen(false);
  }

  const handleMenuEnter = useCallback((id: string) => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setActiveMenu(id);
  }, []);

  const handleMenuLeave = useCallback(() => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => setActiveMenu(null), 180);
  }, []);

  const isActive = (href?: string | null) =>
    !!href && href !== "#" && (pathname === href || pathname?.startsWith(`${href}/`));

  return (
    <>
        {/* ================= Utility Bar ================= */}
        <div
          className={cn(
            "hidden bg-navy-900 text-white/85 lg:block",
          )}
        >
          <div className="container-x flex h-9 items-center justify-between whitespace-nowrap text-[11.5px]">
            {/* Left: contact */}
            <div className="flex items-center divide-x divide-white/15">
              <a
                href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                className="flex items-center gap-2 pr-5 transition-colors hover:text-white"
              >
                <Phone className="h-3 w-3 text-brand-teal-300" />
                <span className="font-medium tracking-wide">{phone}</span>
              </a>
              <a
                href={`mailto:${siteContent.email || company.contact.email}`}
                className="flex items-center gap-2 pl-5 transition-colors hover:text-white"
              >
                <Mail className="h-3 w-3 text-brand-teal-300" />
                <span className="font-medium tracking-wide">
                  {siteContent.email || company.contact.email}
                </span>
              </a>
            </div>

            {/* Right: audiences, region, social */}
            <div className="flex items-center">
              <nav className="hidden items-center divide-x divide-white/15 font-medium xl:flex">
                {audienceLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="px-4 transition-colors hover:text-white"
                  >
                    {link.title}
                  </Link>
                ))}
              </nav>

              <span className="flex items-center gap-1.5 px-4 font-medium xl:border-l xl:border-white/15">
                <Globe className="h-3 w-3 text-brand-teal-300" />
                Global · EN
              </span>

              <div className="flex items-center gap-3 border-l border-white/15 pl-4">
                {Object.entries(socialIconMap).map(([key, Icon]) => {
                  const href = socialLinks[key];
                  if (!href) return null;
                  return (
                    <a
                      key={key}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Sanveex on ${key}`}
                      className="text-white/60 transition-colors hover:text-brand-teal-300"
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ================= Main Header (sticky, fixed height: no layout shift) ================= */}
        <header className="sticky top-0 z-50 w-full">
        <div
          className={cn(
            "border-b border-slate-200 border-t-2 border-t-brand-teal-400 bg-white transition-shadow duration-300",
            isCompact && "shadow-[0_2px_12px_-4px_rgb(21_28_66/0.15)]",
          )}
        >
          <div className="container-x relative">
            <div
              className={cn(
                "flex items-center justify-between gap-8",
                "h-[76px] lg:h-[84px]",
              )}
            >
              {/* Logo only */}
              <Link
                href="/"
                className="flex shrink-0 items-center"
                aria-label={`${siteContent.name} — Home`}
              >
                <Image
                  src={siteContent.logoUrl || "/sanveex-logo.png"}
                  alt={`${siteContent.name} logo`}
                  width={352}
                  height={138}
                  priority
                  className={cn(
                    "w-auto transition-all duration-300",
                    "h-11 lg:h-[52px]",
                  )}
                />
              </Link>

              {/* Desktop Corporate Navigation */}
              <nav className="hidden items-center gap-5 xl:gap-6 lg:flex">
                {navItems.map((navItem) =>
                  navItem.children && navItem.children.length > 0 ? (
                    <MegaMenu
                      key={navItem.id}
                      navItem={navItem}
                      isOpen={activeMenu === navItem.id}
                      isActivePath={isActive(navItem.href)}
                      products={products}
                      onMouseEnter={() => handleMenuEnter(navItem.id)}
                      onMouseLeave={handleMenuLeave}
                      onNavigate={() => setActiveMenu(null)}
                    />
                  ) : (
                    <Link
                      key={navItem.id}
                      href={navItem.href || "#"}
                      className={cn(
                        "group relative whitespace-nowrap py-2.5 text-[0.8rem] font-semibold uppercase tracking-[0.07em] transition-colors",
                        isActive(navItem.href)
                          ? "text-primary"
                          : "text-navy-800 hover:text-primary",
                      )}
                    >
                      {navItem.title}
                      <span
                        className={cn(
                          "absolute -bottom-px left-0 h-[2px] bg-brand-teal-400 transition-all duration-300",
                          isActive(navItem.href)
                            ? "w-full"
                            : "w-0 group-hover:w-full",
                        )}
                      />
                    </Link>
                  ),
                )}
              </nav>

              {/* Header Action Controls */}
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Corporate CTA */}
                <Button
                  asChild
                  className="hidden h-10 rounded-md bg-primary px-6 text-[13px] font-semibold tracking-wide text-white transition-colors hover:bg-navy-700 sm:inline-flex"
                >
                  <Link href="/contact">
                    Partner with Us
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>

                {/* Mobile Hamburger Sheet */}
                <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                  <SheetTrigger asChild className="lg:hidden">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 rounded-md border-border/80 text-navy-800"
                      aria-label="Open navigation menu"
                    >
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="right"
                    className="w-full max-w-sm overflow-y-auto p-0"
                  >
                    <div className="flex h-full flex-col">
                      <SheetHeader className="border-b border-border/80 bg-gradient-to-b from-navy-50 to-white px-6 py-5">
                        <SheetTitle asChild>
                          <Link
                            href="/"
                            className="relative block h-10 w-36"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <Image
                              src={siteContent.logoUrl || "/sanveex-logo.png"}
                              alt={siteContent.name}
                              fill
                              sizes="144px"
                              className="object-contain object-left"
                            />
                          </Link>
                        </SheetTitle>
                      </SheetHeader>

                      <nav className="flex-1 px-4 py-5">
                        <ul className="space-y-1">
                          {navItems.map((section) => {
                            const hasChildren =
                              !!section.children && section.children.length > 0;
                            const expanded = expandedMobile === section.id;

                            return (
                              <li key={section.id}>
                                {hasChildren ? (
                                  <>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setExpandedMobile(
                                          expanded ? null : section.id,
                                        )
                                      }
                                      aria-expanded={expanded}
                                      className={cn(
                                        "flex w-full items-center justify-between rounded-md px-4 py-3 text-left text-sm font-bold uppercase tracking-[0.08em] transition-colors",
                                        isActive(section.href)
                                          ? "text-primary bg-navy-50"
                                          : "text-navy-800 hover:bg-slate-50",
                                      )}
                                    >
                                      {section.title}
                                      <ChevronDown
                                        className={cn(
                                          "h-4 w-4 transition-transform duration-300",
                                          expanded && "rotate-180 text-brand-teal-500",
                                        )}
                                      />
                                    </button>
                                    <div
                                      className={cn(
                                        "grid overflow-hidden transition-all duration-300 ease-in-out",
                                        expanded
                                          ? "grid-rows-[1fr] opacity-100"
                                          : "grid-rows-[0fr] opacity-0",
                                      )}
                                    >
                                      <div className="min-h-0">
                                        <div className="ml-3 space-y-0.5 border-l-2 border-brand-teal-200 py-1 pl-3">
                                          {section.children!.map((item) => (
                                            <Link
                                              key={item.id}
                                              href={item.href || "#"}
                                              onClick={() =>
                                                setMobileMenuOpen(false)
                                              }
                                              className="block rounded-lg px-3 py-2 text-sm font-medium text-navy-800 hover:bg-navy-50 transition-colors"
                                            >
                                              <span className="block font-semibold">
                                                {item.title}
                                              </span>
                                              {item.description && (
                                                <span className="mt-0.5 block text-xs text-muted-foreground line-clamp-1">
                                                  {item.description}
                                                </span>
                                              )}
                                            </Link>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  <Link
                                    href={section.href || "#"}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={cn(
                                      "block rounded-md px-4 py-3 text-sm font-bold uppercase tracking-[0.08em] transition-colors",
                                      isActive(section.href)
                                        ? "text-primary bg-navy-50"
                                        : "text-navy-800 hover:bg-slate-50",
                                    )}
                                  >
                                    {section.title}
                                  </Link>
                                )}
                              </li>
                            );
                          })}
                        </ul>

                        {/* Mobile Products Drawer */}
                        {products.length > 0 && (
                          <div className="mt-6 border-t border-border pt-5">
                            <p className="eyebrow mb-3 px-1 text-brand-teal-600">
                              Core Product Catalogue
                            </p>
                            <div className="space-y-1.5">
                              {products.map((product) => (
                                <Link
                                  key={product.slug}
                                  href={`/products/${product.slug}`}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="flex items-center gap-3 rounded-md border border-border/60 bg-white p-2.5 transition-colors hover:bg-navy-50"
                                >
                                  <span className="relative h-10 w-14 shrink-0 overflow-hidden rounded-md border border-border bg-slate-50">
                                    <Image
                                      src={product.image}
                                      alt={product.name}
                                      fill
                                      sizes="56px"
                                      className="object-contain p-1"
                                    />
                                  </span>
                                  <div className="min-w-0 flex-1">
                                    <span className="block truncate text-sm font-bold text-navy-800">
                                      {product.name}
                                    </span>
                                    <span className="block truncate text-xs text-brand-teal-600 font-medium">
                                      {product.strength || product.genericName}
                                    </span>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </nav>

                      {/* Mobile Footer CTAs */}
                      <div className="border-t border-border bg-slate-50 p-5 space-y-2">
                        <Button
                          asChild
                          className="w-full h-11 rounded-md bg-primary font-bold text-white"
                        >
                          <Link
                            href="/contact"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            Partner with Sanveex
                            <ArrowRight className="ml-1.5 h-4 w-4" />
                          </Link>
                        </Button>
                        <a
                          href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                          className="flex h-11 w-full items-center justify-center gap-2 rounded-md border border-border bg-white text-sm font-semibold text-navy-800 transition-colors hover:border-navy-300"
                        >
                          <Phone className="h-4 w-4 text-brand-teal-500" />
                          {phone}
                        </a>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
        </header>
    </>
  );
}
