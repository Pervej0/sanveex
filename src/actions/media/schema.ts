import { z } from "zod";

export const GalleryImageSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  image: z.instanceof(File).refine((file) => file.size <= 2 * 1024 * 1024, {
    message: "File size exceeds 2MB limit",
  }),
});

export const GalleryVideoSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  video: z.instanceof(File).refine((file) => file.size <= 50 * 1024 * 1024, {
    message: "File size exceeds 50MB limit",
  }),
});
