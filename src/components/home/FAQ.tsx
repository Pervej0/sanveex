import { PhoneCall, HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface SectionData {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

interface FAQProps {
  faqs: FaqItem[];
  sectionData?: SectionData | null;
}

function FAQ({ faqs = [], sectionData }: FAQProps) {
  const title = sectionData?.title || "Common questions";
  const description =
    sectionData?.description ||
    "Answers to the questions we receive most often from clinicians, pharmacists and patients.";
  const buttonText = sectionData?.buttonText || "Contact our medical team";
  const buttonLink = sectionData?.buttonLink || "/contact";

  if (faqs.length === 0) return null;

  return (
    <section className="bg-white py-16 lg:py-24 border-t border-slate-200/80">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Heading & Medical Inquiries Card */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="eyebrow text-brand-teal-600">
                <HelpCircle className="h-3.5 w-3.5" />
                Frequently Asked Questions
              </span>

              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[2.5rem] font-bold text-navy-900 leading-tight">
                {title}
              </h2>

              <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>

            {/* Medical Support Box */}
            <div className="mt-8 rounded-lg border border-slate-200/90 bg-slate-50/80 p-5 sm:p-6">
              <h4 className="text-sm font-bold uppercase tracking-wider text-navy-900">
                Direct Medical Affairs Inquiry
              </h4>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                Have specific therapeutic inquiries, dosage verification questions, or need regulatory documents?
              </p>
              <div className="mt-5">
                <Link
                  href={buttonLink}
                  className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-navy-700"
                >
                  <PhoneCall className="h-3.5 w-3.5 text-brand-teal-300" />
                  <span>{buttonText}</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Accordion */}
          <div className="lg:col-span-7">
            <Accordion
              type="single"
              collapsible
              className="divide-y divide-slate-200 border-y border-slate-200"
            >
              {faqs.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  value={`item-${index}`}
                  className="border-b-0 py-1"
                >
                  <AccordionTrigger className="py-4 sm:py-5 text-left font-display text-base font-bold text-navy-900 hover:text-primary hover:no-underline sm:text-lg transition-colors">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
