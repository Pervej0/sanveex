"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export interface CreatePageInput {
  title: string;
  slug?: string;
  content?: string;
  description?: string;
  keywords?: string;
  image?: string;
  parentId?: string;
  layout?: string;
}

export interface UpdatePageInput extends Partial<CreatePageInput> {
  id: string;
}

export async function getAllPages() {
  try {
    return await prisma.page.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
      include: {
        parent: true,
      },
    });
  } catch (error) {
    console.error("Error fetching pages:", error);
    return [];
  }
}

export async function getPageById(id: string) {
  try {
    return await prisma.page.findUnique({
      where: { id },
      include: {
        parent: true,
        children: {
          where: { isActive: true },
          orderBy: { order: "asc" },
        },
      },
    });
  } catch (error) {
    console.error("Error fetching page:", error);
    return null;
  }
}

export async function getPageBySlug(slug: string) {
  try {
    return await prisma.page.findUnique({
      where: { slug, isActive: true },
      include: {
        children: {
          where: { isActive: true },
          orderBy: { order: "asc" },
        },
      },
    });
  } catch (error) {
    console.error("Error fetching page by slug:", error);
    return null;
  }
}

export async function createPage(data: CreatePageInput) {
  try {
    // Auto-generate slug from title if not provided
    let slug = data.slug;
    if (!slug || slug.trim() === "") {
      slug =
        "/" +
        data.title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .trim()
          .replace(/^-+|-+$/g, "");
    }

    // Ensure slug starts with /
    if (!slug.startsWith("/")) {
      slug = `/${slug}`;
    }

    const page = await prisma.page.create({
      data: {
        title: data.title,
        slug,
        content: data.content,
        description: data.description,
        keywords: data.keywords,
        image: data.image,
        parentId: data.parentId,
        layout: data.layout || "default",
        isActive: true,
        order: 0,
      },
    });
    revalidatePath("/dashboard/pages");
    revalidatePath(page.slug);
    revalidatePath("/");
    return { success: true, data: page };
  } catch (error: any) {
    console.error("Error creating page:", error);
    return { success: false, error: error.message || "Failed to create page" };
  }
}

export async function updatePage(id: string, data: Partial<CreatePageInput>) {
  try {
    const updateData: any = {
      title: data.title,
      content: data.content,
      description: data.description,
      keywords: data.keywords,
      image: data.image,
      parentId: data.parentId,
      layout: data.layout,
    };

    // Only update slug if provided and ensure it starts with /
    if (data.slug) {
      updateData.slug = data.slug.startsWith("/") ? data.slug : `/${data.slug}`;
    }

    const page = await prisma.page.update({
      where: { id },
      data: updateData,
    });
    revalidatePath("/dashboard/pages");
    revalidatePath(page.slug);
    revalidatePath("/");
    return { success: true, data: page };
  } catch (error: any) {
    console.error("Error updating page:", error);
    return { success: false, error: error.message || "Failed to update page" };
  }
}

export async function deletePage(id: string) {
  try {
    // Delete child pages first
    await prisma.page.updateMany({
      where: { parentId: id },
      data: { isActive: false },
    });

    // Soft delete the page
    const page = await prisma.page.update({
      where: { id },
      data: { isActive: false },
    });

    revalidatePath("/dashboard/pages");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting page:", error);
    return { success: false, error: error.message || "Failed to delete page" };
  }
}
