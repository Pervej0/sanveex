import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Printer,
  Share2,
  FileText,
  Download,
} from "lucide-react";

// --- MOCK DATA FETCHER ---
// In a real app, you would fetch from your CMS/API based on the slug
const getPressReleaseData = (slug: string) => {
  return {
    title:
      "SANVEEX TO PRESENT AT THE 44TH ANNUAL J.P. MORGAN HEALTHCARE CONFERENCE",
    date: "January 07, 2026",
    location: "SAN FRANCISCO",
    content: [
      "Sanveex Global Health (NASDAQ: SVX), a biopharmaceutical company focused on discovering, developing, and commercializing innovative medicines, today announced that members of its management team will present at the 44th Annual J.P. Morgan Healthcare Conference.",
      "The presentation is scheduled for Wednesday, January 14, 2026, at 9:00 a.m. Pacific Time (12:00 p.m. Eastern Time). A live audio webcast of the presentation will be available on the Investors section of the Sanveex website at www.sanveex.com.",
      "Sanveex continues to advance its pipeline of novel therapeutics targeting oncology and rare diseases. The company expects to share updates on its Phase 3 clinical trials and strategic outlook for the coming year during the conference.",
    ],
    about:
      "Sanveex is a global biopharmaceutical company dedicated to changing the lives of patients with severe diseases. We focus on scientific innovation to deliver transformative medicines.",
    contact: {
      name: "Sarah Jenkins",
      role: "Vice President, Investor Relations",
      email: "mediarelations@sanveex.com",
    },
  };
};

const sidebarLinks = [
  { title: "Press Releases", href: "/blog" },
  { title: "Company Statements", href: "/statements" },
  { title: "Corporate Fact Sheet", href: "/fact-sheet" },
  { title: "Media Asset Library", href: "/media-assets" },
  { title: "B-roll and Images", href: "/b-roll" },
  { title: "Sanveex Stories", href: "/stories" },
  { title: "Events and Presentations", href: "/events" },
  { title: "Products", href: "/products" },
  { title: "Pipeline", href: "/pipeline" },
];

type PressReleasePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PressReleasePage({
  params,
}: PressReleasePageProps) {
  const { slug } = await params;
  const data = getPressReleaseData(slug);

  return (
    <div className="min-h-screen ">
      {/* 2. Main Container */}
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* --- LEFT COLUMN: Article Content (8 cols) --- */}
          <article className="lg:col-span-8 bg-white p-8 border border-gray-200">
            {/* Back Navigation */}
            <div className="mb-8 border-b border-gray-200 pb-4">
              <Link
                href="/newsroom"
                className="inline-flex items-center text-xs md:text-sm font-bold text-[#0085CA] hover:underline uppercase tracking-wider"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Press Releases
              </Link>
            </div>

            {/* Header Area */}
            <div className="mb-10">
              <div className="flex items-center gap-4 text-xs md:text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
                <span className="text-[#0085CA]">Press Release</span>
                <span>|</span>
                <span>{data.date}</span>
              </div>

              <h1 className="text-xl md:text-3xl font-bold text-[#0085CA] leading-tight mb-6">
                {data.title}
              </h1>

              {/* Toolbar (Print/Share) */}
              <div className="flex gap-4">
                <button className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest hover:text-[#0085CA] transition-colors">
                  <Printer className="w-4 h-4" /> Print
                </button>
                <button className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest hover:text-[#0085CA] transition-colors">
                  <Share2 className="w-4 h-4" /> Share
                </button>
              </div>
            </div>

            {/* Main Body Text */}
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p className="font-bold text-black mb-6">
                <span className="uppercase">{data.location}</span> &mdash;{" "}
                {data.date} &mdash; {data.content[0]}
              </p>
              {data.content.slice(1).map((paragraph, index) => (
                <p key={index} className="mb-6">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Boilerplate Section (About Company) */}
            <div className="mt-12 bg-gray-50 p-8 rounded-sm border-l-4 border-[#0085CA]">
              <h3 className="text-[#0085CA] font-bold text-lg mb-2">
                About Sanveex
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {data.about}
              </p>

              <div className="border-t border-gray-200 pt-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                  Media Contact:
                </p>
                <p className="text-gray-800 font-bold">{data.contact.name}</p>
                <a
                  href={`mailto:${data.contact.email}`}
                  className="text-[#0085CA] hover:underline"
                >
                  {data.contact.email}
                </a>
              </div>
            </div>

            {/* Legal / Disclaimer Footer */}
            <div className="mt-8 text-[10px] text-gray-400 leading-normal text-justify">
              <p>
                <strong>Forward-Looking Statements:</strong> This press release
                contains forward-looking statements within the meaning of the
                Private Securities Litigation Reform Act of 1995. Words such as
                and similar expressions (as well as other words or expressions
                referencing future events, conditions or circumstances) are
                intended to identify forward-looking statements.
              </p>
            </div>
          </article>

          {/* --- RIGHT COLUMN: Sidebar (4 cols) --- */}
          <aside className="lg:col-span-4">
            <div className="bg-white p-8 border border-gray-200">
              {/* Sidebar Header */}
              <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4">
                <h3 className="text-[#0085CA] font-bold uppercase tracking-widest text-sm">
                  Newsroom
                </h3>
                <ArrowRight className="w-4 h-4 text-[#0085CA]" />
              </div>

              {/* Sidebar Links */}
              <ul className="space-y-4">
                {sidebarLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center justify-between text-[#0085CA] hover:text-[#005f9e] transition-colors"
                    >
                      <span className="text-base font-normal">
                        {link.title}
                      </span>
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Extra Download Box (Like 'Amgen Fact Sheet' in screenshot 1) */}
              <div className="mt-12 border-t border-gray-200 pt-6">
                <h4 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">
                  Downloads
                </h4>
                <Link
                  href="#"
                  className="flex items-center justify-between text-[#0085CA] hover:underline"
                >
                  <span>Corporate Fact Sheet</span>
                  <span className="border border-[#0085CA] rounded px-1 text-[10px] font-bold">
                    PDF
                  </span>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
