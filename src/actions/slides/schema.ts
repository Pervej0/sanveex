import { z } from "zod";

export const slideSchema = z.object({
  subtitle: z.string().min(1, "Subtitle is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  buttonText: z.string().optional().nullable(),
  buttonLink: z.string().optional().nullable(),
  secondaryButtonText: z.string().optional().nullable(),
  secondaryButtonLink: z.string().optional().nullable(),
  backgroundImage: z.string().min(1, "Background image is required"),
  isActive: z.boolean().default(true),
  order: z.number().default(0),
});

export type SlideFormValues = z.infer<typeof slideSchema>;
