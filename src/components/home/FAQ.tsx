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
    <section className="bg-white py-16 lg:py-24">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Heading */}
          <div className="lg:col-span-5">
            <span className="eyebrow rounded-full bg-brand-teal-100 px-3.5 py-1.5 text-brand-teal-700">
              <HelpCircle className="h-3.5 w-3.5" />
              Support
            </span>

            <h2 className="mt-5 text-3xl sm:text-4xl">{title}</h2>

            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              {description}
            </p>

            <Link
              href={buttonLink}
              className="mt-7 inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-semibold text-navy-800 transition-colors hover:border-navy-200 hover:text-primary"
            >
              <PhoneCall className="h-4 w-4 text-brand-teal-500" />
              {buttonText}
            </Link>
          </div>

          {/* Accordion */}
          <div className="lg:col-span-7">
            <Accordion
              type="single"
              collapsible
              className="divide-y divide-border border-y border-border"
            >
              {faqs.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  value={`item-${index}`}
                  className="border-b-0"
                >
                  <AccordionTrigger className="py-5 text-left font-display text-base font-bold text-navy-800 hover:text-primary hover:no-underline sm:text-lg">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
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
