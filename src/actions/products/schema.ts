import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  url: z.string().min(1, "URL is required"),
  genericName: z.string().min(1, "Generic Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional().nullable(),
  content: z.string().optional().nullable(),
  image: z.string().min(1, "Image is required"),
  gallery: z.array(z.string()).default([]),
  price: z.coerce.number().optional().nullable(),
  categoryId: z.string().optional().nullable(),
  features: z.any().optional(),
  specifications: z.any().optional(),
  links: z
    .array(
      z.object({
        label: z.string().min(1, "Label is required"),
        link: z.string().min(1, "Link is required"),
      }),
    )
    .optional()
    .default([]),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  order: z.coerce.number().int().default(0),
});

export type ProductFormValues = z.infer<typeof productSchema>;
