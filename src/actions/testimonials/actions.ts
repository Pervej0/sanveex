"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { testimonialSchema, TestimonialFormValues } from "./schema";

export async function getAllTestimonials() {
  try {
    return await prisma.testimonial.findMany({
      orderBy: { order: "asc" },
    });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
}

export async function getTestimonialById(id: string) {
  try {
    return await prisma.testimonial.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error("Error fetching testimonial:", error);
    return null;
  }
}

export async function createTestimonial(data: TestimonialFormValues) {
  try {
    const validated = testimonialSchema.parse(data);
    const entry = await prisma.testimonial.create({
      data: validated,
    });
    revalidatePath("/dashboard/testimonials");
    revalidatePath("/");
    return { success: true, data: entry };
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return { success: false, error: "Failed to create testimonial" };
  }
}

export async function updateTestimonial(
  id: string,
  data: TestimonialFormValues,
) {
  try {
    const validated = testimonialSchema.parse(data);
    const entry = await prisma.testimonial.update({
      where: { id },
      data: validated,
    });
    revalidatePath("/dashboard/testimonials");
    revalidatePath("/");
    return { success: true, data: entry };
  } catch (error) {
    console.error("Error updating testimonial:", error);
    return { success: false, error: "Failed to update testimonial" };
  }
}

export async function deleteTestimonial(id: string) {
  try {
    await prisma.testimonial.delete({
      where: { id },
    });
    revalidatePath("/dashboard/testimonials");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return { success: false, error: "Failed to delete testimonial" };
  }
}
