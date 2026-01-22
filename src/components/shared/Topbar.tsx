"use client";

import { SiteContent } from "@/generated/prisma/client";
import { Facebook, Instagram, Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";

const quickLinks = [
  { title: "Newsroom", href: "/newsroom" },
  { title: "Investors", href: "/investors" },
  { title: "Partners", href: "/partners" },
  { title: "Contact", href: "/contact" },
];

type TopBarProps = {
  siteContent: SiteContent;
};

export default function Topbar({ siteContent }: { siteContent: SiteContent }) {
  return (
    <div className="hidden md:block bg-primary text-primary-foreground">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between h-10 py-2">
          {/* Left Section: Email */}
          <div className="flex items-center">
            <a
              href={`mailto:${siteContent.email}`}
              className="flex items-center gap-2 text-sm font-medium text-primary-foreground/90 hover:text-primary-foreground transition-colors group"
            >
              <Mail className="h-4 w-4 transition-transform group-hover:scale-110" />
              <span className="text-xs sm:text-sm">{siteContent.email}</span>
            </a>
          </div>

          {/* Right Section: Quick Links & Social Icons */}
          <div className="flex items-center gap-4 lg:gap-6">
            {/* Quick Links - Hidden on medium, shown on large screens */}
            <div className="hidden lg:flex items-center gap-5">
              <nav className="flex items-center gap-5">
                {quickLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-xs font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors relative group/link"
                  >
                    {link.title}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-foreground group-hover/link:w-full transition-all duration-300" />
                  </Link>
                ))}
              </nav>
              <span className="w-px h-4 bg-primary-foreground/30" />
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {(siteContent.socialLinks as any)?.facebook && (
                <a
                  href={(siteContent.socialLinks as any).facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors hover:scale-110 transform duration-200"
                  aria-label="Visit our Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              )}
              {(siteContent.socialLinks as any)?.twitter && (
                <a
                  href={(siteContent.socialLinks as any).twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors hover:scale-110 transform duration-200"
                  aria-label="Visit our Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              )}
              {(siteContent.socialLinks as any)?.instagram && (
                <a
                  href={(siteContent.socialLinks as any).instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors hover:scale-110 transform duration-200"
                  aria-label="Visit our Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              )}
              {(siteContent.socialLinks as any)?.linkedin && (
                <a
                  href={(siteContent.socialLinks as any).linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors hover:scale-110 transform duration-200"
                  aria-label="Visit our LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
