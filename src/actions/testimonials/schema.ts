import { z } from "zod";

export const testimonialSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  text: z.string().min(1, "Review text is required"),
  image: z.string().min(1, "Image is required"),
  isActive: z.boolean().default(true),
  order: z.number().default(0),
});

export type TestimonialFormValues = z.infer<typeof testimonialSchema>;
