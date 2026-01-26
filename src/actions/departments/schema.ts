import { z } from "zod";

export const departmentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  icon: z.string().min(1, "Icon is required"),
  secondaryIcon: z.string().optional().nullable(),
  color: z.string().default("#88734C"),
  order: z.number().default(0),
  isActive: z.boolean().default(true),
});

export type DepartmentFormValues = z.infer<typeof departmentSchema>;

export const departmentSectionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().min(1, "Subtitle is required"),
  videoUrl: z.string().min(1, "Video URL is required"),
  buttonText: z.string().default("Explore Departments"),
  buttonLink: z.string().default("#"),
});

export type DepartmentSectionFormValues = z.infer<
  typeof departmentSectionSchema
>;
