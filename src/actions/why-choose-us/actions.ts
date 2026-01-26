"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { whyChooseUsSchema, WhyChooseUsFormValues } from "./schema";

export async function getAllWhyChooseUs() {
  try {
    return await prisma.whyChooseUs.findMany({
      orderBy: [{ position: "asc" }, { order: "asc" }],
    });
  } catch (error) {
    console.error("Error fetching why choose us entries:", error);
    return [];
  }
}

export async function getWhyChooseUsById(id: string) {
  try {
    return await prisma.whyChooseUs.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error("Error fetching why choose us entry:", error);
    return null;
  }
}

export async function createWhyChooseUs(data: WhyChooseUsFormValues) {
  try {
    const validated = whyChooseUsSchema.parse(data);
    const entry = await prisma.whyChooseUs.create({
      data: validated,
    });
    revalidatePath("/dashboard/why-choose-us");
    revalidatePath("/");
    return { success: true, data: entry };
  } catch (error) {
    console.error("Error creating entry:", error);
    return { success: false, error: "Failed to create entry" };
  }
}

export async function updateWhyChooseUs(
  id: string,
  data: WhyChooseUsFormValues,
) {
  try {
    const validated = whyChooseUsSchema.parse(data);
    const entry = await prisma.whyChooseUs.update({
      where: { id },
      data: validated,
    });
    revalidatePath("/dashboard/why-choose-us");
    revalidatePath("/");
    return { success: true, data: entry };
  } catch (error) {
    console.error("Error updating entry:", error);
    return { success: false, error: "Failed to update entry" };
  }
}

export async function deleteWhyChooseUs(id: string) {
  try {
    await prisma.whyChooseUs.delete({
      where: { id },
    });
    revalidatePath("/dashboard/why-choose-us");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting entry:", error);
    return { success: false, error: "Failed to delete entry" };
  }
}
