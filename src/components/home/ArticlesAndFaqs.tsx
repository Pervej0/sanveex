"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";

const articles = [
  {
    category: "Business",
    date: "July 10, 2018",
    title: "Thousands of Patients Referred to Substance Use Treatment",
    img: "https://images.unsplash.com/photo-1742996111692-2d924f12a058?q=80&w=1170&auto=format&fit=crop",
  },
  {
    category: "Lifestyle",
    date: "April 04, 2018",
    title: "MedStar Health Bel Air Cancer Services Aligns Expertise",
    img: "https://images.unsplash.com/photo-1742996111692-2d924f12a058?q=80&w=1170&auto=format&fit=crop",
  },
  {
    category: "Experience",
    date: "February 20, 2018",
    title:
      "Dr. Gabriel Del Corral Joins MedStar Plastic & Reconstructive Surgery",
    img: "https://images.unsplash.com/photo-1742996111692-2d924f12a058?q=80&w=1170&auto=format&fit=crop",
  },
];

const faqs = [
  {
    q: "What causes tooth decay?",
    a: "Decay is caused by bacteria that collect on teeth and feed on carbohydrates. These bacteria produce acid that wears away enamel. Brush, floss and visit your dentist regularly.",
  },
  {
    q: "What is dry mouth and what can I do about it?",
    a: "Dry mouth happens when saliva production decreases. Drink plenty of water, avoid sugary drinks, and visit a dentist for treatment.",
  },
  {
    q: "How often should I change my toothbrush?",
    a: "Change your toothbrush every three months or sooner if bristles are worn out.",
  },
  {
    q: "How often should I see a dentist?",
    a: "Visit your dentist every six months for regular cleaning and examination.",
  },
];

export default function ArticlesAndFaqs() {
  return (
    <section id="faqs" className="py-16 bg-gray-50 container">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12">
        {/* Left Section - Articles */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            POPULAR <span className="text-foreground-accent">ARTICLES</span>
          </h2>

          <div className="space-y-6">
            {articles.map((item, i) => (
              <div
                key={i}
                className="flex gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-lg transition"
              >
                <Link href="#">
                  <Image
                    src={item.img}
                    width={150}
                    height={120}
                    alt={item.title}
                    className="rounded-lg w-[150px] h-[120px] object-cover"
                  />
                </Link>
                <div className="flex flex-col justify-between h-0 mb-4">
                  <h6 className="text-lg font-semibold text-gray-800 hover:foreground-accent transition">
                    <Link href="#">{item.title}</Link>
                  </h6>
                  <p className="text-gray-500 text-small">
                    {item.category} ·{" "}
                    <Link
                      href="#"
                      className="text-foreground-accent hover:underline text-small"
                    >
                      {item.date}
                    </Link>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section - FAQs */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            MEDICAL <span className="text-foreground-accent">FAQs</span>
          </h2>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((item, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="rounded-xl bg-white shadow-sm"
              >
                <AccordionTrigger className="px-4 py-3 text-lg font-medium">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="px-4 text-small pb-4 text-gray-600">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
