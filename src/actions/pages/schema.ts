import { z } from "zod";
import { generateSlugFromTitle } from "@/lib/admin-utils";

export const pageSchema = z
  .object({
    title: z.string().min(1, "Page title is required"),
    slug: z.string().optional(), // Make slug optional, will auto-generate from title
    content: z.string().optional(),
    description: z.string().optional(),
    keywords: z.string().optional(),
    image: z.string().optional(),
    parentId: z.string().optional(),
    layout: z.string().default("default"),
    isActive: z.boolean().default(true),
    order: z.number().int().default(0),
  })
  .transform((data) => {
    // Auto-generate slug from title if not provided
    if (!data.slug || data.slug.trim() === "") {
      data.slug = generateSlugFromTitle(data.title);
    } else {
      // Ensure slug starts with / and is properly formatted
      data.slug = data.slug.startsWith("/") ? data.slug : `/${data.slug}`;
      data.slug = data.slug.toLowerCase().replace(/\s+/g, "-");
    }
    return data;
  });

export type PageFormValues = z.infer<typeof pageSchema>;

// For admin-friendly display
export const adminPageSchema = z.object({
  title: z.string().min(1, "What should this page be called?"),
  customUrl: z.string().optional(),
  content: z.string().optional(),
  shortDescription: z.string().optional(),
  searchKeywords: z.string().optional(),
  headerImage: z.string().optional(),
  parentPage: z.string().optional(),
  pageTemplate: z.string().default("default"),
  isPublished: z.boolean().default(true),
  displayOrder: z.number().int().default(0),
});

export type AdminPageFormValues = z.infer<typeof adminPageSchema>;
