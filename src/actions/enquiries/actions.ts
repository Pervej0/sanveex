"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { enquirySchema, type EnquiryInput } from "./schema";

export async function submitEnquiry(input: EnquiryInput) {
  try {
    const { website, ...data } = enquirySchema.parse(input);

    if (website) {
      // Silently accept bot submissions without storing them.
      return { success: true as const };
    }

    const enquiry = await prisma.contactEnquiry.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        topic: data.topic,
        message: data.message,
      },
    });

    revalidatePath("/dashboard/enquiries");

    return { success: true as const, id: enquiry.id };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false as const,
        error: error.issues[0]?.message ?? "Please check the form and try again.",
      };
    }

    console.error("Error submitting enquiry:", error);
    return {
      success: false as const,
      error:
        "We could not send your message right now. Please email us directly at info@sanveex.com.",
    };
  }
}

export async function getAllEnquiries() {
  try {
    return await prisma.contactEnquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    return [];
  }
}

export async function setEnquiryRead(id: string, isRead: boolean) {
  try {
    await prisma.contactEnquiry.update({ where: { id }, data: { isRead } });
    revalidatePath("/dashboard/enquiries");
    return { success: true as const };
  } catch (error) {
    console.error("Error updating enquiry:", error);
    return { success: false as const, error: "Failed to update enquiry" };
  }
}

export async function deleteEnquiry(id: string) {
  try {
    await prisma.contactEnquiry.delete({ where: { id } });
    revalidatePath("/dashboard/enquiries");
    return { success: true as const };
  } catch (error) {
    console.error("Error deleting enquiry:", error);
    return { success: false as const, error: "Failed to delete enquiry" };
  }
}
