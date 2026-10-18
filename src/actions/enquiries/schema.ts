import { z } from "zod";

export const TOPICS = [
  "General Enquiry",
  "Medical Information",
  "Product Quality Complaint",
  "Adverse Event Report",
  "Business Partnership",
  "Careers",
] as const;

export const enquirySchema = z.object({
  name: z.string().min(2, "Please enter your full name").max(120),
  email: z.email("Please enter a valid email address").max(160),
  phone: z.string().max(40).optional().or(z.literal("")),
  company: z.string().max(160).optional().or(z.literal("")),
  topic: z.enum(TOPICS).default("General Enquiry"),
  message: z
    .string()
    .min(10, "Please describe your enquiry in at least 10 characters")
    .max(4000),
  /** Simple honeypot — real users never fill this in. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type EnquiryInput = z.input<typeof enquirySchema>;
export type EnquiryValues = z.output<typeof enquirySchema>;
