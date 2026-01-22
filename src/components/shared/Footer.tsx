"use client";

import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SiteContent } from "@/generated/prisma/client";

export default function Footer({ siteContent }: { siteContent: SiteContent }) {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (email) {
      console.log("Subscribing email:", email);
      setEmail("");
    }
  };

  return (
    <footer className="relative bg-gray-950 text-gray-300">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent"></div>

      {/* Main Footer */}
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                {siteContent.name.toUpperCase()}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {siteContent.description}
              </p>
            </div>

            {/* Social Links */}
            <div className="space-y-3">
              <p className="text-sm font-semibold text-white">Follow Us</p>
              <div className="flex gap-3">
                {[
                  {
                    icon: Facebook,
                    href: (siteContent.socialLinks as any)?.facebook,
                  },
                  {
                    icon: Twitter,
                    href: (siteContent.socialLinks as any)?.twitter,
                  },
                  {
                    icon: Instagram,
                    href: (siteContent.socialLinks as any)?.instagram,
                  },
                  {
                    icon: Linkedin,
                    href: (siteContent.socialLinks as any)?.linkedin,
                  },
                ]
                  .filter((social) => social.href)
                  .map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-primary text-gray-400 hover:text-white transition-all duration-300 hover:-translate-y-1"
                    >
                      <social.icon className="w-4 h-4" />
                    </a>
                  ))}
              </div>
            </div>
          </div>

          {/* Departments */}
          <div className="hidden sm:block">
            <h4 className="text-lg font-bold text-white mb-6 pb-2 border-b-2 border-primary/30">
              Departments
            </h4>
            <ul className="space-y-3">
              {["Cardiology", "Orthopedics", "Psychiatry", "Ophthalmology"].map(
                (dept) => (
                  <li key={dept}>
                    <Link
                      href="#"
                      className="text-sm text-gray-400 hover:text-primary transition-colors duration-300 flex items-center group"
                    >
                      <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all duration-300" />
                      {dept}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="hidden lg:block">
            <h4 className="text-lg font-bold text-white mb-6 pb-2 border-b-2 border-primary/30">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { name: "About Us", href: "#" },
                { name: "Services", href: "#" },
                { name: "Doctors", href: "#" },
                { name: "Contact", href: "/contact-us" },
                { name: "Careers", href: "#" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-primary transition-colors duration-300 flex items-center group"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 pb-2 border-b-2 border-primary/30">
              Get In Touch
            </h4>

            {/* Contact Info */}
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-white font-medium">
                    {siteContent.phone}
                  </p>
                  <p className="text-xs text-gray-500">Available 24/7</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-white font-medium">
                    {siteContent.email}
                  </p>
                  <p className="text-xs text-gray-500">Support Email</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-white font-medium">
                    {siteContent.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto max-w-6xl px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-gray-400 text-center sm:text-left">
              © {new Date().getFullYear()}{" "}
              <span className="text-white font-semibold">
                {siteContent.name.toUpperCase()}
              </span>{" "}
              Global Healthcare. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-gray-400">
              <Link
                href="#"
                className="hover:text-primary transition-colors duration-300"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="hover:text-primary transition-colors duration-300"
              >
                Terms
              </Link>
              <Link
                href="/contact-us"
                className="hover:text-primary transition-colors duration-300"
              >
                Help
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
