import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-200 overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg shadow-primary/20">
                  S
                </div>
                <span className="text-2xl font-bold text-white">Sanveex</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Leading the way in pharmaceutical innovation. We are dedicated to improving global health through advanced medical solutions and research.
              </p>
              <div className="flex gap-3 pt-2">
                <SocialLink href="#" icon={<Facebook className="h-4 w-4" />} />
                <SocialLink href="#" icon={<Twitter className="h-4 w-4" />} />
                <SocialLink href="#" icon={<Instagram className="h-4 w-4" />} />
                <SocialLink href="#" icon={<Linkedin className="h-4 w-4" />} />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-6 text-lg">Quick Links</h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li>
                  <Link href="/about" className="hover:text-primary transition-colors inline-flex items-center gap-1 group">
                    <span>About Us</span>
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="hover:text-primary transition-colors inline-flex items-center gap-1 group">
                    <span>Our Products</span>
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  </Link>
                </li>
                <li>
                  <Link href="/research" className="hover:text-primary transition-colors inline-flex items-center gap-1 group">
                    <span>Research & Development</span>
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  </Link>
                </li>
                <li>
                  <Link href="/sustainability" className="hover:text-primary transition-colors inline-flex items-center gap-1 group">
                    <span>Sustainability</span>
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-primary transition-colors inline-flex items-center gap-1 group">
                    <span>Careers</span>
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white font-semibold mb-6 text-lg">Contact Us</h3>
              <ul className="space-y-4 text-sm text-slate-400">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>
                    123 Innovation Drive,
                    <br />
                    Tech Park, NY 10001
                  </span>
                </li>
                <li className="flex items-center gap-3 hover:text-primary transition-colors cursor-pointer">
                  <Phone className="h-4 w-4 text-primary shrink-0" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center gap-3 hover:text-primary transition-colors cursor-pointer">
                  <Mail className="h-4 w-4 text-primary shrink-0" />
                  <span>contact@sanveex.com</span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-white font-semibold mb-6 text-lg">Newsletter</h3>
              <p className="text-slate-400 text-sm mb-4">
                Subscribe to get the latest updates and news.
              </p>
              <div className="flex flex-col gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-primary focus-visible:border-primary"
                />
                <Button className="w-full gap-2 shadow-lg shadow-primary/20 bg-gradient-primary hover:opacity-90 transition-all">
                  Subscribe
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} Sanveex Pharmaceuticals. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-primary transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      className="h-9 w-9 rounded-full bg-slate-800/50 flex items-center justify-center text-slate-400 hover:bg-gradient-primary hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5"
    >
      {icon}
    </a>
  );
}

