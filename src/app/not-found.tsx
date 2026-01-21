"use client";

import Link from "next/link";
import { ArrowRight, Search, Home, FileText, Mail } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#edf2f7] flex items-center justify-center p-6">
      <div className="max-w-6xl w-full bg-white border border-gray-200 rounded-sm overflow-hidden flex flex-col lg:flex-row">
        {/* --- LEFT COLUMN: The Error Message --- */}
        <div className="lg:w-7/12 p-12 lg:p-16 flex flex-col justify-center relative overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative z-10">
            <p className="text-[#0085CA] font-bold tracking-widest uppercase mb-4">
              Error 404
            </p>
            <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
              Page not found.
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-md">
              The page you are looking for might have been removed, had its name
              changed, or is temporarily unavailable.
            </p>

            {/* Search Bar */}
            <div className="max-w-md mb-8">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  placeholder="Search Sanveex.com..."
                  className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#0085CA] focus:border-transparent outline-none transition-all"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0085CA]">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Primary CTA (Optional: keeping it for UX best practice) */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-sm font-semibold hover:bg-primary-dark transition-colors w-fit"
            >
              <Home className="w-4 h-4" />
              Return to Homepage
            </Link>
          </div>
        </div>

        {/* --- RIGHT COLUMN: Frequently Visited --- */}
        <div className="lg:w-5/12 bg-slate-900 text-white p-12 lg:p-16 flex flex-col justify-center">
          <h2 className="text-xl font-bold mb-8 border-b border-gray-700 pb-4">
            Frequently Visited
          </h2>

          <div className="space-y-6">
            {/* 1. Home Link */}
            <Link href="/" className="group flex items-start gap-4">
              <div className="p-2 bg-white/10 rounded group-hover:bg-primary transition-colors">
                <Home className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                  Home
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  Return to the main overview.
                </p>
              </div>
            </Link>

            {/* 2. Newsroom Link */}
            <Link href="/newsroom" className="group flex items-start gap-4">
              <div className="p-2 bg-white/10 rounded group-hover:bg-primary transition-colors">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                  Newsroom
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  Latest press releases and statements.
                </p>
              </div>
            </Link>

            {/* 3. Contact Link */}
            <Link href="/contact" className="group flex items-start gap-4">
              <div className="p-2 bg-white/10 rounded group-hover:bg-primary transition-colors">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                  Contact
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  Media relations and general inquiries.
                </p>
              </div>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-700">
            <p className="text-gray-400 text-sm">
              If you believe this is a technical error, please contact
              webmaster@sanveex.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
