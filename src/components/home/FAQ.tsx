import { PhoneCall } from "lucide-react";
import { Badge } from "@/src/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import { Button } from "@/src/components/ui/button";

// --- 1. The Data ---
const faqData = [
  {
    question: "This is the start of something new",
    answer:
      "Managing a small business today is already tough. Avoid further complications by ditching outdated, tedious trade methods.",
  },
  {
    question: "How do I get started with the platform?",
    answer:
      "Simply sign up for an account and follow the onboarding process. Our goal is to streamline SMB trade, making it easier and faster than ever.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Yes, we offer a 14-day free trial so you can experience all the features before committing.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Absolutely. You can cancel your subscription at any time from your account settings.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, PayPal, and bank transfers for annual plans.",
  },
];

// --- 2. The Separated Component (Reusable) ---
function FaqList({ items }: { items: typeof faqData }) {
  return (
    <Accordion type="single" collapsible className="w-full ">
      {items.map((item, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className="text-left font-medium text-lg">
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

function FAQ() {
  return (
    <div className="w-full py-10  bg-gray-50">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left Column: Header Content */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-left font-semibold text-primary">
                  Common Questions
                </h4>
                <p className="text-lg max-w-xl leading-relaxed tracking-tight text-muted-foreground text-left">
                  Managing a small business today is already tough. We are here
                  to help clear up any confusion so you can focus on growth.
                </p>
              </div>
              <div>
                <Button className="gap-2" variant="outline">
                  Any questions? Reach out <PhoneCall className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column: The Separated FAQ Component */}
          <div className="w-full">
            <FaqList items={faqData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
