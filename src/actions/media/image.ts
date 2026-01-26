"use server";

import prisma from "@/lib/prisma";
import { GalleryImageSchema } from "./schema";
import { deleteFile, uploadFile } from "./upload";
import { ActionResponse, DeleteResponse } from "@/types/action.type";

export const addImage = async (
  previousState: ActionResponse | null,
  formData: FormData,
): Promise<ActionResponse> => {
  try {
    const imageFiles = formData.getAll("image");
    const baseName = (formData.get("name") as string | null) ?? "";

    const validFiles = imageFiles.filter(
      (file): file is File => file instanceof File && file.size > 0,
    );

    if (validFiles.length === 0) {
      return {
        errors: { image: ["Please select at least one image file"] },
        error: null,
        success: null,
        status: false,
        formData: null,
      };
    }

    const maxSize = 2 * 1024 * 1024; // 2MB
    const maxFiles = 10;
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];

    if (validFiles.length > maxFiles) {
      return {
        errors: {
          image: [`You can upload a maximum of ${maxFiles} images at once`],
        },
        error: null,
        success: null,
        status: false,
        formData: null,
      };
    }

    const imageErrors: string[] = [];

    validFiles.forEach((file) => {
      if (!allowedTypes.includes(file.type.toLowerCase())) {
        imageErrors.push(`"${file.name}" is not a supported image format`);
      }
      if (file.size > maxSize) {
        imageErrors.push(`"${file.name}" is too large (max 2MB per image)`);
      }
    });

    if (imageErrors.length > 0) {
      return {
        errors: { image: imageErrors },
        error: null,
        success: null,
        status: false,
        formData: null,
      };
    }

    const uploadedFiles = [];
    const failedFiles: string[] = [];

    for (let i = 0; i < validFiles.length; i++) {
      const file = validFiles[i];

      try {
        let fileName = baseName.trim();

        if (!fileName) {
          const originalName = file.name;
          const lastDotIndex = originalName.lastIndexOf(".");
          fileName =
            lastDotIndex > 0
              ? originalName.substring(0, lastDotIndex)
              : originalName;
        }

        if (validFiles.length > 1) {
          fileName = `${fileName} (${i + 1})`;
        }

        if (!fileName.trim()) {
          fileName = `Image ${i + 1}`;
        }

        const validation = GalleryImageSchema.safeParse({
          name: fileName,
          image: file,
        });

        if (!validation.success) {
          failedFiles.push(file.name);
          continue;
        }

        const uploadResult = await uploadFile(validation.data.image);

        if (!uploadResult?.status || !uploadResult.fileId) {
          failedFiles.push(file.name);
          continue;
        }

        const newImage = await prisma.images.create({
          data: {
            name: validation.data.name,
            url: uploadResult.url,
            publicId: uploadResult.fileId,
          },
        });

        uploadedFiles.push(newImage);
      } catch (fileError) {
        console.error(`Upload error for ${file.name}:`, fileError);
        failedFiles.push(file.name);
      }
    }

    const totalFiles = validFiles.length;
    const successCount = uploadedFiles.length;
    const failedCount = failedFiles.length;

    if (successCount === 0) {
      return {
        errors: {},
        error: "Upload failed. Please check your images and try again.",
        success: null,
        status: false,
        formData: null,
      };
    }

    if (failedCount === 0) {
      return {
        errors: {},
        error: null,
        success:
          totalFiles === 1
            ? "Image uploaded successfully!"
            : `All ${totalFiles} images uploaded successfully!`,
        status: true,
        formData: null,
      };
    }

    return {
      errors: {},
      error: null,
      success: `${successCount} of ${totalFiles} images uploaded successfully. ${failedCount} failed to upload.`,
      status: true,
      formData: null,
    };
  } catch (error: unknown) {
    console.error("Gallery upload error:", error);

    return {
      errors: {},
      error: "Something went wrong during upload. Please try again.",
      success: null,
      status: false,
      formData: null,
    };
  }
};

export const deleteImage = async (imageId: string): Promise<DeleteResponse> => {
  try {
    const image = await prisma.images.findUnique({
      where: { id: imageId },
    });

    if (!image) {
      return {
        success: false,
        message: "Image not found",
        errors: { _form: ["Image not found"] },
      };
    }

    const deleteResult = await deleteFile(image.publicId);

    if (!deleteResult.status) {
      return {
        success: false,
        message: "File deletion failed",
        errors: {
          _form: [deleteResult.error ?? "Failed to delete image file"],
        },
      };
    }

    await prisma.images.delete({
      where: { id: imageId },
    });

    return {
      success: true,
      message: "Image deleted successfully",
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: "Database error occurred",
      errors: { _form: ["Failed to delete image"] },
    };
  }
};

export const getImages = async () => {
  return prisma.images.findMany({
    orderBy: { createdAt: "desc" },
  });
};
