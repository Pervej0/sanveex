"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import {
  CreateNavItemInput,
  NavItemWithChildren,
} from "@/types/navigation.types";

export async function getAllNavItems(): Promise<NavItemWithChildren[]> {
  try {
    const items = await prisma.navItem.findMany({
      where: { parentId: null, isActive: true },
      include: {
        children: {
          where: { isActive: true },
          orderBy: { order: "asc" },
        },
      },
      orderBy: { order: "asc" },
    });

    return items as NavItemWithChildren[];
  } catch (error) {
    console.error("Error fetching nav items:", error);
    return [];
  }
}

export async function createNavItem(data: CreateNavItemInput) {
  try {
    const item = await prisma.navItem.create({
      data: {
        title: data.title,
        description: data.description,
        href: data.href,
        pageId: data.pageId,
        parentId: data.parentId || null,
        order: data.order ?? 0,
        isActive: true,
      },
    });
    revalidatePath("/dashboard/navigation");
    revalidatePath("/");
    return { success: true, data: item };
  } catch (error: any) {
    console.error("Error creating nav item:", error);
    return {
      success: false,
      error: error.message || "Failed to create navigation item",
    };
  }
}

export async function updateNavItem(
  id: string,
  data: Partial<CreateNavItemInput>,
) {
  try {
    const item = await prisma.navItem.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        href: data.href,
        pageId: data.pageId,
        parentId: data.parentId || null,
        order: data.order,
      },
    });
    revalidatePath("/dashboard/navigation");
    revalidatePath("/");
    return { success: true, data: item };
  } catch (error: any) {
    console.error("Error updating nav item:", error);
    return {
      success: false,
      error: error.message || "Failed to update navigation item",
    };
  }
}

export async function deleteNavItem(id: string) {
  try {
    // Delete children first
    await prisma.navItem.deleteMany({
      where: { parentId: id },
    });

    // Then delete the parent
    await prisma.navItem.delete({
      where: { id },
    });

    revalidatePath("/dashboard/navigation");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting nav item:", error);
    return {
      success: false,
      error: error.message || "Failed to delete navigation item",
    };
  }
}
