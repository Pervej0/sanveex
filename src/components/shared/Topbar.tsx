"use client";

import Link from "next/link";
import { MapPin, Globe } from "lucide-react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Topbar() {
  const languages = ["English", "Español", "Français", "Deutsch", "中文", "日本語"];
  const currentLang = "English";

  return (
    <div className="border-b border-border/40 bg-gradient-to-r from-slate-50 to-blue-50/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-2.5">
          {/* Left: Location */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            <span className="font-medium">Global Healthcare Solutions</span>
          </div>

          {/* Right: Language, Navigation & Social Icons */}
          <div className="flex items-center gap-3 sm:gap-6">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1.5 text-xs font-medium text-foreground hover:text-primary transition-colors px-2.5 py-1.5 rounded-md hover:bg-primary/5">
                <Globe className="h-3.5 w-3.5" />
                <span>{currentLang}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-36">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang}
                    className="cursor-pointer text-sm"
                  >
                    {lang}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Navigation Links */}
            <nav className="hidden sm:flex items-center gap-4">
              <Link
                href="/investor"
                className="text-xs font-medium text-foreground hover:text-primary transition-colors"
              >
                Investors
              </Link>
              <Link
                href="/partner"
                className="text-xs font-medium text-foreground hover:text-primary transition-colors"
              >
                Partners
              </Link>
              <Link
                href="/career"
                className="text-xs font-medium text-foreground hover:text-primary transition-colors"
              >
                Careers
              </Link>
            </nav>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 border-l border-border/40 pl-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

