import Link from "next/link";
import { MapPin } from "lucide-react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Topbar() {
  return (
    <div className="border-b border-border bg-background">
      <div className="container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-3">
          {/* Left: Company Location */}
          <div className="flex items-center gap-2 text-sm text-foreground-secondary">
            <MapPin className="h-4 w-4" />
            <span>123 Business Street, City, Country 12345</span>
          </div>

          {/* Right: Navigation & Social Icons */}
          <div className="flex items-center gap-6">
            {/* Navigation Links */}
            <nav className="flex items-center gap-6">
              <Link
                href="/investor"
                className="text-sm font-medium text-foreground hover:text-foreground-accent transition-colors"
              >
                Investor
              </Link>
              <Link
                href="/partner"
                className="text-sm font-medium text-foreground hover:text-foreground-accent transition-colors"
              >
                Partner
              </Link>
              <Link
                href="/career"
                className="text-sm font-medium text-foreground hover:text-foreground-accent transition-colors"
              >
                Career
              </Link>
            </nav>

            {/* Social Icons */}
            <div className="flex items-center gap-4 border-l border-border pl-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground-secondary hover:text-foreground-accent transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground-secondary hover:text-foreground-accent transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground-secondary hover:text-foreground-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground-secondary hover:text-foreground-accent transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}