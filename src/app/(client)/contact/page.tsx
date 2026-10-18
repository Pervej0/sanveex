import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  Clock,
  ClipboardList,
  FlaskConical,
  Mail,
  MapPin,
  Phone,
  ShieldAlert,
  Users,
} from "lucide-react";

import ContactForm from "@/components/contact/ContactForm";
import prisma from "@/lib/prisma";
import { company } from "@/lib/company";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Sanveex Global Health for medical information, product quality complaints, adverse event reporting, distribution partnerships and careers.",
};

const departmentContacts = [
  {
    title: "Medical Information",
    description:
      "Prescribing information, composition, dosage and clinical references.",
    email: "info@sanveex.com",
    icon: FlaskConical,
  },
  {
    title: "Quality Complaints",
    description:
      "Report a defect, packaging issue or suspected batch problem.",
    email: "info@sanveex.com",
    icon: ClipboardList,
  },
  {
    title: "Pharmacovigilance",
    description:
      "Report a suspected adverse reaction — acknowledged within 24 hours.",
    email: "info@sanveex.com",
    icon: ShieldAlert,
  },
  {
    title: "Business Development",
    description:
      "Distribution partnerships, institutional supply and tenders.",
    email: "info@sanveex.com",
    icon: Building2,
  },
  {
    title: "Media Relations",
    description: "Press enquiries, interviews and corporate statements.",
    email: "info@sanveex.com",
    icon: Users,
  },
];

export default async function ContactPage() {
  const siteContent = await prisma.siteContent.findFirst().catch(() => null);

  const address = siteContent?.address ?? company.address.full;
  const phone = siteContent?.phone ?? company.contact.phone;
  const email = siteContent?.email ?? company.contact.email;
  const phoneHref = phone.replace(/[^\d+]/g, "");

  return (
    <main className="bg-white">
      {/* ================= Intro ================= */}
      <section className="border-b border-border py-12 lg:py-16">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <span className="eyebrow rounded-full bg-brand-teal-100 px-3.5 py-1.5 text-brand-teal-700">
                Contact
              </span>
              <h1 className="mt-5 text-4xl font-extrabold sm:text-5xl">
                How can we help?
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
                Thank you for your interest in {company.legalName}. To route
                your enquiry to the right team, choose the most relevant topic
                in the form below or contact a department directly. We
                acknowledge every enquiry within one business day.
              </p>
            </div>

            {/* Primary contact card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-border bg-navy-50/70 p-6 sm:p-8">
                <h2 className="text-lg font-bold">Registered office</h2>

                <ul className="mt-5 space-y-4 text-sm">
                  <li className="flex gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal-500" />
                    <span className="leading-relaxed text-navy-800">
                      {address}
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal-500" />
                    <a
                      href={`tel:${phoneHref}`}
                      className="font-medium text-navy-800 transition-colors hover:text-primary"
                    >
                      {phone}
                    </a>
                  </li>
                  <li className="flex gap-3">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal-500" />
                    <a
                      href={`mailto:${email}`}
                      className="font-medium text-navy-800 transition-colors hover:text-primary"
                    >
                      {email}
                    </a>
                  </li>
                  <li className="flex gap-3">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal-500" />
                    <span className="text-navy-800">{company.contact.hours}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Department contacts ================= */}
      <section className="border-b border-border py-12 lg:py-16">
        <div className="container-x">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Direct department contacts
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            For the fastest response, contact the relevant team directly.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {departmentContacts.map((department) => (
              <a
                key={department.title}
                href={`mailto:${department.email}?subject=${encodeURIComponent(
                  department.title,
                )}`}
                className="group rounded-xl border border-border bg-white p-5 transition-all hover:-translate-y-1 hover:border-navy-200 hover:shadow-md"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-navy-50 text-primary">
                  <department.icon className="h-5 w-5" strokeWidth={1.9} />
                </span>
                <h3 className="mt-4 text-sm font-bold text-navy-800 transition-colors group-hover:text-primary">
                  {department.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  {department.description}
                </p>
                <span className="mt-4 inline-block text-xs font-semibold text-brand-teal-600">
                  {department.email}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Form + map ================= */}
      <section className="py-12 lg:py-16">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h2 className="text-2xl font-bold sm:text-3xl">
                Send us a message
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Fields marked with * are required.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>

            <aside className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl border border-border bg-navy-50">
                <iframe
                  title="Sanveex Global Health office location"
                  src="https://www.google.com/maps?q=Farmgate,+Dhaka+1215,+Bangladesh&output=embed"
                  className="h-64 w-full border-0 lg:h-80"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="flex items-center justify-between gap-4 border-t border-border bg-white px-5 py-3">
                  <p className="text-xs leading-snug text-muted-foreground">
                    {company.address.full}
                  </p>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Farmgate,+Dhaka+1215,+Bangladesh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-brand-teal-600 transition-colors hover:text-brand-teal-700"
                  >
                    Open in Maps
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                <div className="flex items-start gap-3">
                  <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                  <div>
                    <h3 className="text-sm font-bold text-amber-900">
                      Reporting a side effect?
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-amber-900/80">
                      Please select{" "}
                      <strong>Adverse Event Report</strong> as your topic and
                      include the product name, batch number and a description
                      of the event. Serious reports are handled within 24 hours
                      and forwarded to the DGDA where required.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-border bg-navy-50/70 p-5">
                <h3 className="text-sm font-bold text-navy-800">
                  Medical emergency?
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  This website is not monitored for emergencies. If you or
                  someone else is seriously unwell, contact your physician or
                  the nearest emergency department immediately.
                </p>
                <Link
                  href="/products/safety"
                  className="mt-4 inline-block text-xs font-semibold text-primary underline-offset-4 hover:underline"
                >
                  Read our safety information →
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
