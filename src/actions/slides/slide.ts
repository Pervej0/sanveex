"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { slideSchema, SlideFormValues } from "./schema";

export async function getAllSlides() {
  try {
    return await prisma.slide.findMany({
      orderBy: {
        order: "asc",
      },
    });
  } catch (error) {
    console.error("Error fetching slides:", error);
    return [];
  }
}

export async function getSlideById(id: string) {
  try {
    return await prisma.slide.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error("Error fetching slide:", error);
    return null;
  }
}

export async function createSlide(data: SlideFormValues) {
  try {
    const validated = slideSchema.parse(data);
    const slide = await prisma.slide.create({
      data: validated,
    });
    revalidatePath("/dashboard/slides");
    return { success: true, data: slide };
  } catch (error) {
    console.error("Error creating slide:", error);
    return { success: false, error: "Failed to create slide" };
  }
}

export async function updateSlide(id: string, data: SlideFormValues) {
  try {
    const validated = slideSchema.parse(data);
    const slide = await prisma.slide.update({
      where: { id },
      data: validated,
    });
    revalidatePath("/dashboard/slides");
    return { success: true, data: slide };
  } catch (error) {
    console.error("Error updating slide:", error);
    return { success: false, error: "Failed to update slide" };
  }
}

export async function deleteSlide(id: string) {
  try {
    await prisma.slide.delete({
      where: { id },
    });
    revalidatePath("/dashboard/slides");
    return { success: true };
  } catch (error) {
    console.error("Error deleting slide:", error);
    return { success: false, error: "Failed to delete slide" };
  }
}
