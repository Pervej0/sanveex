"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-700">
      {/* Top Footer */}
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* About Us */}
        <div className="md:col-span-4">
          <h4 className="text-xl font-semibold mb-4">About Us</h4>
          <p className="text-sm md:text-base leading-relaxed mb-4">
            As the only hospital in our growing county, things are buzzing as we
            expand our facilities and services. We are an intimate, 200 licensed
            bed hospital and the caregivers of neighbors we love.
          </p>
          <div className="flex space-x-4">
            <a
              href="#"
              target="_blank"
              className="text-gray-600 hover:text-gray-900"
            >
              <Facebook />
            </a>
            <a
              href="#"
              target="_blank"
              className="text-gray-600 hover:text-gray-900"
            >
              <Twitter />
            </a>
            <a
              href="#"
              target="_blank"
              className="text-gray-600 hover:text-gray-900"
            >
              <Instagram />
            </a>
            <a
              href="#"
              target="_blank"
              className="text-gray-600 hover:text-gray-900"
            >
              <Linkedin />
            </a>
          </div>
        </div>

        {/* Departments */}
        <div className="md:col-span-2">
          <h4 className="text-xl font-semibold mb-4">Departments</h4>
          <ul className="space-y-2 text-sm">
            {[
              "Psychiatry",
              "Ophthalmology",
              "Cardiology",
              "Immunology",
              "Hematology",
              "Gastroenterology",
              "Orthopedics",
              "Pulmonary",
            ].map((dept) => (
              <li key={dept}>
                <Link href="#" className="hover:text-gray-900">
                  {dept}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Links */}
        <div className="md:col-span-2">
          <h4 className="text-xl font-semibold mb-4">Links</h4>
          <ul className="space-y-2 text-sm">
            {[
              { name: "About Us", href: "#" },
              { name: "Appointment", href: "#" },
              { name: "Contact Us", href: "/contact-us" },
              { name: "Newsroom", href: "/newsroom" },
              { name: "Doctors", href: "#" },
              { name: "Gallery", href: "#" },
              { name: "Investor", href: "#" },
              { name: "Partners", href: "#" },
              { name: "Career", href: "#" },
            ].map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="hover:text-gray-900">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="md:col-span-4">
          <h4 className="text-xl font-semibold mb-4">Newsletter</h4>
          <p className="text-sm md:text-base mb-4">
            Subscribe to our newsletter. We are not spammers!
          </p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter Your Email*"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
            />
            <Button
              asChild
              size="lg"
              className="bg-foreground-accent hover:bg-foreground-accent/90 text-white px-8 py-6 text-base font-medium rounded-md shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Link href="#contact">SUBSCRIBE</Link>
            </Button>
          </form>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-100 py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <p>
            © 2025 <span className="font-semibold">Sanveex</span>. All rights
            reserved.
          </p>
          <ul className="flex space-x-4 mt-2 md:mt-0">
            <li>
              <Link href="#" className="hover:text-gray-900">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-900">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/contact-us" className="hover:text-gray-900">
                Help Center
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
