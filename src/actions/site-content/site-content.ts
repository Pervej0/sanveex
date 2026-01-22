"use server";

import prisma from "@/lib/prisma";
import { SiteContentFormValues } from "./schema";
import { revalidatePath } from "next/cache";

export const getSiteContent = async () => {
  return await prisma.siteContent.findFirst();
};

export const getSiteContentById = async (id: string) => {
  return await prisma.siteContent.findUnique({
    where: { id },
  });
};

export const updateSiteContentById = async (
  id: string,
  data: SiteContentFormValues,
) => {
  const updatedSiteContent = await prisma.siteContent.update({
    where: { id },
    data: {
      name: data.name,
      tagline: data.tagline,
      title: data.title,
      description: data.description,
      logoUrl: data.logoUrl,
      email: data.email,
      phone: data.phone,
      whatsapp: data.whatsapp,
      address: data.address,
      socialLinks: {
        facebook: data.facebook,
        twitter: data.twitter,
        instagram: data.instagram,
        linkedin: data.linkedin,
      },
    },
  });

  return updatedSiteContent;
};
