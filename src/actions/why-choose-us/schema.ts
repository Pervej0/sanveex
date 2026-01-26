import { z } from "zod";

export const whyChooseUsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  icon: z.string().min(1, "Icon is required"),
  secondaryIcon: z.string().optional().nullable(),
  position: z.enum(["left", "right"]).default("left"),
  order: z.number().default(0),
  isActive: z.boolean().default(true),
});

export type WhyChooseUsFormValues = z.infer<typeof whyChooseUsSchema>;
