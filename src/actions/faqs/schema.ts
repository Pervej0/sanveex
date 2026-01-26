import { z } from "zod";

export const faqSchema = z.object({
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required"),
  isActive: z.boolean().default(true),
  order: z.number().default(0),
});

export type FaqFormValues = z.infer<typeof faqSchema>;

export const faqSectionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  buttonText: z.string().min(1, "Button text is required"),
  buttonLink: z.string().min(1, "Button link is required"),
});

export type FaqSectionFormValues = z.infer<typeof faqSectionSchema>;
