/**
 * Home-page defaults.
 *
 * The hero slider is database-driven, but the home page is the first thing a
 * visitor (or a search engine) sees — it must never render an empty banner.
 * These three slides are used whenever no active slides exist yet.
 */

export type DefaultSlide = {
  id: string;
  subtitle: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  backgroundImage: string;
};

export const defaultSlides: DefaultSlide[] = [
  {
    id: "default-1",
    subtitle: "Pharmaceutical Marketing & Distribution",
    title: "Quality-assured medicines for a healthier Bangladesh",
    description:
      "Sanveex Global Health brings WHO-GMP manufactured, DGDA-registered therapies to clinicians, pharmacies and hospitals through an ethical, fully documented distribution network.",
    buttonText: "Explore our portfolio",
    buttonLink: "/products/overview",
    secondaryButtonText: "About Sanveex",
    secondaryButtonLink: "/about/overview",
    backgroundImage: "/hero1.jpeg",
  },
  {
    id: "default-2",
    subtitle: "Respiratory & Allergy",
    title: "Evidence-based therapies for everyday clinical practice",
    description:
      "From leukotriene receptor antagonists to non-sedating antihistamines and calcium supplementation — our portfolio is built around the conditions clinicians see most.",
    buttonText: "View products",
    buttonLink: "/products/overview",
    secondaryButtonText: "Medical information",
    secondaryButtonLink: "/products/medical-info",
    backgroundImage: "/hero2.jpeg",
  },
  {
    id: "default-3",
    subtitle: "Quality & Compliance",
    title: "Every batch traceable, every claim documented",
    description:
      "Batch documentation, stability data and retention samples are maintained for full traceability — with pharmacovigilance oversight across the product life cycle.",
    buttonText: "Our quality standards",
    buttonLink: "/products/quality",
    secondaryButtonText: "Contact us",
    secondaryButtonLink: "/contact",
    backgroundImage: "/about.jpeg",
  },
];

/** Question/answer set shown when the FAQ collection is empty. */
export const defaultFaqs = [
  {
    id: "default-faq-1",
    question: "Where can I buy Sanveex products?",
    answer:
      "Sanveex products are available through licensed pharmacies, hospitals and clinic dispensaries across Bangladesh. If you cannot find a product locally, contact us and our distribution team will direct you to the nearest stockist.",
  },
  {
    id: "default-faq-2",
    question: "Are your medicines safe to use during pregnancy?",
    answer:
      "Only a registered physician can assess the suitability of any medicine during pregnancy. Please do not start, stop or change any therapy without professional medical advice, and always follow the approved prescribing information.",
  },
  {
    id: "default-faq-3",
    question: "How do I report a side effect or quality complaint?",
    answer:
      "Contact our pharmacovigilance team at info@sanveex.com with the product name, batch number and a description of the event. We acknowledge all reports within one business day and forward serious cases to the DGDA as required.",
  },
  {
    id: "default-faq-4",
    question: "How can my pharmacy or hospital stock Sanveex products?",
    answer:
      "We supply through a network of authorised distributors. Send your trade licence details to our commercial team and we will connect you with the distributor responsible for your district.",
  },
];

export const defaultFaqSection = {
  title: "Questions from healthcare professionals",
  description:
    "Answers to the questions we receive most often from clinicians, pharmacists and patients about our products, quality systems and reporting channels.",
  buttonText: "Still have a question? Contact our medical team",
  buttonLink: "/contact",
};
