import { PhoneCall } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
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

// --- 2. The Separated Component (Reusable) ---
function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <Accordion type="single" collapsible className="w-full ">
      {items.map((item, index) => (
        <AccordionItem key={item.id} value={`item-${index}`}>
          <AccordionTrigger className="text-left font-medium text-lg italic decoration-primary group-hover:no-underline">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground leading-relaxed text-lg">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function FAQ({ faqs = [], sectionData }: FAQProps) {
  const title = sectionData?.title || "Common Questions";
  const description =
    sectionData?.description ||
    "Managing a small business today is already tough. We are here to help clear up any confusion so you can focus on growth.";
  const buttonText = sectionData?.buttonText || "Any questions? Reach out";
  const buttonLink = sectionData?.buttonLink || "#";

  if (faqs.length === 0) return null;

  return (
    <div className="w-full py-16 md:py-24 bg-gray-50/50">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left Column: Header Content */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-left font-semibold text-primary">
                  {title}
                </h4>
                <p className="text-lg max-w-xl leading-relaxed tracking-tight text-muted-foreground text-left">
                  {description}
                </p>
              </div>
              <div>
                <Link href={buttonLink}>
                  <Button className="gap-2" variant="outline">
                    {buttonText} <PhoneCall className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: The Separated FAQ Component */}
          <div className="w-full">
            <FaqList items={faqs} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
