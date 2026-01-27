"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getAllProducts() {
  try {
    return await prisma.product.findMany({
      orderBy: { order: "asc" },
      include: {
        category: true,
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getProductById(id: string) {
  try {
    return await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function getProductBySlug(slug: string) {
  try {
    return await prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
      },
    });
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
}

export async function getAllCategories() {
  try {
    return await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function createProduct(data: any) {
  try {
    const product = await prisma.product.create({
      data,
    });
    revalidatePath("/dashboard/products");
    revalidatePath("/products/overview");
    revalidatePath("/");
    return { success: true, data: product };
  } catch (error: any) {
    console.error("Error creating product:", error);
    return { success: false, error: error.message };
  }
}

export async function updateProduct(id: string, data: any) {
  try {
    const product = await prisma.product.update({
      where: { id },
      data,
    });
    revalidatePath("/dashboard/products");
    revalidatePath("/products/overview");
    revalidatePath("/");
    return { success: true, data: product };
  } catch (error: any) {
    console.error("Error updating product:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({
      where: { id },
    });
    revalidatePath("/dashboard/products");
    revalidatePath("/products/overview");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting product:", error);
    return { success: false, error: error.message };
  }
}

export async function getFeaturedProducts() {
  try {
    return await prisma.product.findMany({
      orderBy: { order: "asc" },
      include: {
        category: true,
      },
      take: 5,
    });
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}
