"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { articleSchema, ArticleFormValues } from "./schema";

export async function getAllArticles() {
  try {
    return await prisma.article.findMany({
      orderBy: { publishedAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

export async function getArticleBySlug(slug: string) {
  try {
    return await prisma.article.findUnique({
      where: { slug },
    });
  } catch (error) {
    console.error("Error fetching article by slug:", error);
    return null;
  }
}

export async function getArticleById(id: string) {
  try {
    return await prisma.article.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error("Error fetching article by id:", error);
    return null;
  }
}

export async function createArticle(data: ArticleFormValues) {
  try {
    const validated = articleSchema.parse(data);
    const entry = await prisma.article.create({
      data: {
        ...validated,
        publishedAt: validated.publishedAt || new Date(),
      },
    });
    revalidatePath("/dashboard/articles");
    revalidatePath("/newsroom");
    revalidatePath("/");
    return { success: true, data: entry };
  } catch (error) {
    console.error("Error creating article:", error);
    return { success: false, error: "Failed to create article" };
  }
}

export async function updateArticle(id: string, data: ArticleFormValues) {
  try {
    const validated = articleSchema.parse(data);
    const entry = await prisma.article.update({
      where: { id },
      data: validated,
    });
    revalidatePath("/dashboard/articles");
    revalidatePath("/newsroom");
    revalidatePath("/");
    return { success: true, data: entry };
  } catch (error) {
    console.error("Error updating article:", error);
    return { success: false, error: "Failed to update article" };
  }
}

export async function deleteArticle(id: string) {
  try {
    await prisma.article.delete({
      where: { id },
    });
    revalidatePath("/dashboard/articles");
    revalidatePath("/newsroom");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting article:", error);
    return { success: false, error: "Failed to delete article" };
  }
}
