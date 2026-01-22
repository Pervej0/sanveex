import { z } from "zod";

export const siteContentSchema = z.object({
  name: z.string().min(2),
  tagline: z.string().min(2),
  title: z.string().min(5),
  description: z.string().min(10),
  logoUrl: z.string().url().optional().or(z.literal("")),

  email: z.string().email(),
  phone: z.string().min(6),
  whatsapp: z.string().min(6),
  address: z.string().min(10),

  facebook: z.string().url().optional().or(z.literal("")),
  twitter: z.string().url().optional().or(z.literal("")),
  instagram: z.string().url().optional().or(z.literal("")),
  linkedin: z.string().url().optional().or(z.literal("")),
});

export type SiteContentFormValues = z.infer<typeof siteContentSchema>;
