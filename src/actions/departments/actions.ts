"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import {
  departmentSchema,
  DepartmentFormValues,
  departmentSectionSchema,
  DepartmentSectionFormValues,
} from "./schema";

// Department Actions
export async function getAllDepartments() {
  try {
    return await prisma.department.findMany({
      orderBy: { order: "asc" },
    });
  } catch (error) {
    console.error("Error fetching departments:", error);
    return [];
  }
}

export async function getDepartmentById(id: string) {
  try {
    return await prisma.department.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error("Error fetching department:", error);
    return null;
  }
}

export async function createDepartment(data: DepartmentFormValues) {
  try {
    const validated = departmentSchema.parse(data);
    const entry = await prisma.department.create({
      data: validated,
    });
    revalidatePath("/dashboard/departments");
    revalidatePath("/");
    return { success: true, data: entry };
  } catch (error) {
    console.error("Error creating department:", error);
    return { success: false, error: "Failed to create department" };
  }
}

export async function updateDepartment(id: string, data: DepartmentFormValues) {
  try {
    const validated = departmentSchema.parse(data);
    const entry = await prisma.department.update({
      where: { id },
      data: validated,
    });
    revalidatePath("/dashboard/departments");
    revalidatePath("/");
    return { success: true, data: entry };
  } catch (error) {
    console.error("Error updating department:", error);
    return { success: false, error: "Failed to update department" };
  }
}

export async function deleteDepartment(id: string) {
  try {
    await prisma.department.delete({
      where: { id },
    });
    revalidatePath("/dashboard/departments");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting department:", error);
    return { success: false, error: "Failed to delete department" };
  }
}

// Department Section Actions
export async function getDepartmentSection() {
  try {
    return await prisma.departmentSection.findFirst();
  } catch (error) {
    console.error("Error fetching department section:", error);
    return null;
  }
}

export async function updateDepartmentSection(
  id: string | undefined,
  data: DepartmentSectionFormValues,
) {
  try {
    const validated = departmentSectionSchema.parse(data);
    let entry;
    if (id) {
      entry = await prisma.departmentSection.update({
        where: { id },
        data: validated,
      });
    } else {
      entry = await prisma.departmentSection.create({
        data: validated,
      });
    }
    revalidatePath("/dashboard/departments");
    revalidatePath("/");
    return { success: true, data: entry };
  } catch (error) {
    console.error("Error updating department section:", error);
    return { success: false, error: "Failed to update section" };
  }
}
