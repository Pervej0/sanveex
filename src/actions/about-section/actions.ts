"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { aboutSectionSchema, AboutSectionFormValues } from "./schema";

export async function getAboutSection() {
  try {
    return await prisma.aboutSection.findFirst();
  } catch (error) {
    console.error("Error fetching about section:", error);
    return null;
  }
}

export async function updateAboutSection(
  id: string | undefined,
  data: AboutSectionFormValues,
) {
  try {
    const validated = aboutSectionSchema.parse(data);

    let entry;
    if (id) {
      entry = await prisma.aboutSection.update({
        where: { id },
        data: validated,
      });
    } else {
      entry = await prisma.aboutSection.create({
        data: validated,
      });
    }

    revalidatePath("/dashboard/about-section");
    revalidatePath("/");
    return { success: true, data: entry };
  } catch (error) {
    console.error("Error updating about section:", error);
    return { success: false, error: "Failed to update about section" };
  }
}
