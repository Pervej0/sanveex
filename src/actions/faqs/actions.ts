"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import {
  faqSchema,
  FaqFormValues,
  faqSectionSchema,
  FaqSectionFormValues,
} from "./schema";

// Faq Actions
export async function getAllFaqs() {
  try {
    return await prisma.faq.findMany({
      orderBy: { order: "asc" },
    });
  } catch (error) {
    console.error("Error fetching faqs:", error);
    return [];
  }
}

export async function getFaqById(id: string) {
  try {
    return await prisma.faq.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error("Error fetching faq:", error);
    return null;
  }
}

export async function createFaq(data: FaqFormValues) {
  try {
    const validated = faqSchema.parse(data);
    const entry = await prisma.faq.create({
      data: validated,
    });
    revalidatePath("/dashboard/faqs");
    revalidatePath("/");
    return { success: true, data: entry };
  } catch (error) {
    console.error("Error creating faq:", error);
    return { success: false, error: "Failed to create faq" };
  }
}

export async function updateFaq(id: string, data: FaqFormValues) {
  try {
    const validated = faqSchema.parse(data);
    const entry = await prisma.faq.update({
      where: { id },
      data: validated,
    });
    revalidatePath("/dashboard/faqs");
    revalidatePath("/");
    return { success: true, data: entry };
  } catch (error) {
    console.error("Error updating faq:", error);
    return { success: false, error: "Failed to update faq" };
  }
}

export async function deleteFaq(id: string) {
  try {
    await prisma.faq.delete({
      where: { id },
    });
    revalidatePath("/dashboard/faqs");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting faq:", error);
    return { success: false, error: "Failed to delete faq" };
  }
}

// Faq Section Actions
export async function getFaqSection() {
  try {
    return await prisma.faqSection.findFirst();
  } catch (error) {
    console.error("Error fetching faq section:", error);
    return null;
  }
}

export async function updateFaqSection(
  id: string | undefined,
  data: FaqSectionFormValues,
) {
  try {
    const validated = faqSectionSchema.parse(data);
    let entry;
    if (id) {
      entry = await prisma.faqSection.update({
        where: { id },
        data: validated,
      });
    } else {
      entry = await prisma.faqSection.create({
        data: validated,
      });
    }
    revalidatePath("/dashboard/faqs");
    revalidatePath("/");
    return { success: true, data: entry };
  } catch (error) {
    console.error("Error updating faq section:", error);
    return { success: false, error: "Failed to update faq section" };
  }
}
