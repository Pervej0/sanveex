import { z } from "zod";

export const articleSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().optional().nullable(),
  content: z.string().min(1, "Article content is required"),
  category: z.string().default("General"),
  type: z.string().default("PRESS RELEASE"),
  image: z.string().optional().nullable(),
  readTime: z.string().default("5 min read"),
  authorName: z.string().optional().nullable(),
  authorRole: z.string().optional().nullable(),
  authorAvatar: z.string().optional().nullable(),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true),
  publishedAt: z.date().default(() => new Date()),
});

export type ArticleFormValues = z.infer<typeof articleSchema>;
