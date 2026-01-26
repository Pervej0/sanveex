import { z } from "zod";

export const aboutSectionSchema = z.object({
  eyebrow: z.string().min(1, "Eyebrow is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().min(1, "Image is required"),
});

export type AboutSectionFormValues = z.infer<typeof aboutSectionSchema>;
