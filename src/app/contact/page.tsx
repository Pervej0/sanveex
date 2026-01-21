"use client";

import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  AlertCircle,
  Globe,
  CheckCircle2,
  Building2,
  Users,
  Newspaper,
} from "lucide-react";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";

// --- MOCK DATA ---
const departments = [
  {
    title: "Media Relations",
    email: "media@sanveex.com",
    icon: Newspaper,
  },
  {
    title: "Investor Relations",
    email: "investors@sanveex.com",
    icon: Building2,
  },
  {
    title: "Business Development",
    email: "partnering@sanveex.com",
    icon: Users,
  },
];

const locations = [
  {
    city: "Cambridge, MA (HQ)",
    address: "500 Technology Square",
    phone: "+1 (617) 555-0100",
  },
  {
    city: "Basel, Switzerland",
    address: "Grenzacherstrasse 124",
    phone: "+41 61 555 0200",
  },
  {
    city: "London, UK",
    address: "1 Kingdom Street",
    phone: "+44 20 7555 0300",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-[#0085CA] selection:text-white">
      {/* 2. MAIN CONTAINER */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        {/* Layout: 8 cols (Content) + 4 cols (Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">
          {/* --- LEFT COLUMN: Main Content (Form & Triage) --- */}
          <div className="lg:col-span-8">
            {/* Intro */}
            <div className="mb-12 border-b border-gray-100 pb-10">
              <h2 className="text-3xl font-bold text-[#0085CA] mb-6">
                How can we help?
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Thank you for your interest in Sanveex. To ensure your inquiry
                is routed to the correct team, please review the department
                contacts below or use the general inquiry form.
              </p>
            </div>

            {/* Department Triage (Clean Horizontal List) */}
            <div className="mb-16">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">
                Direct Department Contacts
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {departments.map((dept, idx) => (
                  <a
                    key={idx}
                    href={`mailto:${dept.email}`}
                    className="group flex flex-col p-5 border border-gray-200 rounded-sm hover:border-[#0085CA] hover:bg-slate-50 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <dept.icon className="w-5 h-5 text-[#0085CA]" />
                      <span className="font-bold text-slate-900 text-sm">
                        {dept.title}
                      </span>
                    </div>
                    <div className="mt-auto flex items-center text-xs font-bold text-gray-400 group-hover:text-[#0085CA] transition-colors uppercase tracking-wider">
                      Email Team{" "}
                      <ArrowRight className="w-3 h-3 ml-2 opacity-50 group-hover:translate-x-1 group-hover:opacity-100 transition-all" />
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Form (Clean & Airy) */}
            <div>
              <div className="flex items-center mb-8">
                <div className="w-1 h-6 bg-[#0085CA] mr-3"></div>
                <h3 className="text-2xl font-bold text-slate-900">
                  General Inquiry Form
                </h3>
              </div>

              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                      First Name
                    </Label>
                    <Input
                      className="border-0 border-b border-gray-300 rounded-none px-0 focus-visible:ring-0 focus-visible:border-[#0085CA] transition-colors bg-transparent placeholder:text-gray-300"
                      placeholder="Jane"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                      Last Name
                    </Label>
                    <Input
                      className="border-0 border-b border-gray-300 rounded-none px-0 focus-visible:ring-0 focus-visible:border-[#0085CA] transition-colors bg-transparent placeholder:text-gray-300"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                    Email Address
                  </Label>
                  <Input
                    type="email"
                    className="border-0 border-b border-gray-300 rounded-none px-0 focus-visible:ring-0 focus-visible:border-[#0085CA] transition-colors bg-transparent placeholder:text-gray-300"
                    placeholder="name@company.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                    Message
                  </Label>
                  <Textarea
                    className="min-h-[150px] resize-none border-gray-300 focus-visible:ring-[#0085CA] bg-gray-50/50"
                    placeholder="Please provide details regarding your inquiry..."
                  />
                </div>

                <div className="pt-4">
                  <Button className="h-14 px-8 bg-[#0085CA] hover:bg-[#006fab] text-white font-bold uppercase tracking-widest text-xs rounded-sm transition-all shadow-lg hover:shadow-xl w-full md:w-auto">
                    Send Message
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* --- RIGHT COLUMN: Sidebar (Locations & Map) --- */}
          <aside className="lg:col-span-4 lg:pl-8 border-t lg:border-t-0 lg:border-l border-gray-200 pt-12 lg:pt-0">
            <div className="sticky top-8">
              {/* Sidebar Title */}
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-[#0085CA] font-bold uppercase tracking-widest text-xs">
                  Global Offices
                </h3>
                <Globe className="w-4 h-4 text-[#0085CA]" />
              </div>

              {/* Map Container */}
              <div className="h-56 w-full bg-slate-100 rounded-sm overflow-hidden mb-8 relative border border-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.903663909163!2d90.39108221498223!3d23.75088579457964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ1JzAzLjIiTiA5MMKwMjMnMzMuOSJF!5e0!3m2!1sen!2sbd!4v1692023417435"
                  className="w-full h-full grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                  loading="lazy"
                ></iframe>
                <div className="absolute bottom-2 left-2 bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-800 backdrop-blur-sm rounded-sm">
                  Interactive Map
                </div>
              </div>

              {/* Locations List */}
              <div className="space-y-8">
                {locations.map((loc, i) => (
                  <div key={i} className="group">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-gray-400 group-hover:text-[#0085CA] transition-colors" />
                      <h4 className="font-bold text-slate-900">{loc.city}</h4>
                    </div>
                    <div className="pl-6 space-y-1">
                      <p className="text-sm text-gray-600">{loc.address}</p>
                      <p className="text-sm text-[#0085CA] font-medium">
                        {loc.phone}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sidebar Footer Info */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <p className="text-xs text-gray-400 leading-relaxed">
                  Sanveex Global Health
                  <br />
                  Copyright © 2026
                  <br />
                  <a
                    href="#"
                    className="hover:text-[#0085CA] transition-colors"
                  >
                    Privacy Policy
                  </a>{" "}
                  &bull;{" "}
                  <a
                    href="#"
                    className="hover:text-[#0085CA] transition-colors"
                  >
                    Terms of Use
                  </a>
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
