import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Twitter,
  Youtube,
} from "lucide-react";
import { SiteContent } from "@/generated/prisma/client";
import { company } from "@/lib/company";

const productLinks = [
  { name: "All Products Catalogue", href: "/products" },
  { name: "Montilet® 10 (Montelukast)", href: "/products/montilet-10" },
  { name: "Adcal D (Calcium & Vit D3)", href: "/products/adcal-d" },
  { name: "Xofedin® 120 (Fexofenadine)", href: "/products/xofedin-120" },
  { name: "Medical Information", href: "/products/medical-info" },
];

const companyLinks = [
  { name: "Company Overview", href: "/about/overview" },
  { name: "Leadership Team", href: "/about/leadership" },
  { name: "Board Message", href: "/about/speech" },
  { name: "Newsroom", href: "/newsroom" },
  { name: "Contact Us", href: "/contact" },
];

const socialIconMap = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
} as const;

export default function Footer({ siteContent }: { siteContent: SiteContent }) {
  const socialLinks = (siteContent.socialLinks ?? {}) as Record<string, string>;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-slate-800">
      {/* ================= Partner CTA ================= */}
      <div className="border-b border-white/10 bg-navy-900/60">
        <div className="container-x">
          <div className="flex flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-center">
            <div>
              <h2 className="font-display text-2xl font-extrabold text-white sm:text-3xl tracking-tight">
                Partner with Sanveex Global Health
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300">
                Looking for a reliable distribution partner, product information
                or a career in pharmaceutical marketing? Our team responds
                within one business day.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex h-12 items-center gap-2 rounded-lg bg-brand-teal-400 px-6 text-sm font-semibold text-navy-900 transition-colors hover:bg-brand-teal-300"
              >
                Contact our team
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`tel:${company.contact.phoneHref}`}
                className="inline-flex h-12 items-center gap-2 rounded-lg border border-white/20 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <Phone className="h-4 w-4" />
                {company.contact.phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ================= Main footer ================= */}
      <div className="container-x">
        <div className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block">
              <span className="relative block h-12 w-44 rounded-md bg-white/95 p-1.5">
                <Image
                  src={siteContent.logoUrl}
                  alt={`${siteContent.name} logo`}
                  fill
                  sizes="176px"
                  className="object-contain p-1"
                />
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-navy-200">
              {siteContent.description}
            </p>

            <div className="mt-6 flex items-center gap-3">
              {Object.entries(socialIconMap).map(([key, Icon]) => {
                const href = socialLinks[key];
                if (!href) return null;
                return (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Sanveex Global Health on ${key}`}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-navy-200 transition-all hover:border-brand-teal-400/40 hover:text-brand-teal-300"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Products */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-white">
              Products
            </h3>
            <ul className="mt-5 space-y-3">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-navy-200 transition-colors hover:text-brand-teal-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-white">
              Company
            </h3>
            <ul className="mt-5 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-navy-200 transition-colors hover:text-brand-teal-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-white">
              Registered Office
            </h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal-300" />
                <span className="leading-relaxed text-navy-200">
                  {siteContent.address}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal-300" />
                <a
                  href={`tel:${company.contact.phoneHref}`}
                  className="text-navy-200 transition-colors hover:text-brand-teal-300"
                >
                  {company.contact.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal-300" />
                <a
                  href={`mailto:${siteContent.email}`}
                  className="text-navy-200 transition-colors hover:text-brand-teal-300"
                >
                  {siteContent.email}
                </a>
              </li>
            </ul>

          </div>
        </div>
      </div>

      {/* ================= Legal ================= */}
      <div className="border-t border-white/10">
        <div className="container-x">
          <div className="flex flex-col-reverse items-start justify-between gap-4 py-6 sm:flex-row sm:items-center">
            <p className="text-xs text-navy-300">
              © {year} {siteContent.name}. All rights reserved.
            </p>
            <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
              <Link
                href="/privacy-policy"
                className="text-navy-300 transition-colors hover:text-brand-teal-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-navy-300 transition-colors hover:text-brand-teal-300"
              >
                Terms of Use
              </Link>
              <Link
                href="/products/safety"
                className="text-navy-300 transition-colors hover:text-brand-teal-300"
              >
                Report an Adverse Event
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
