"use server";

import prisma from "@/lib/prisma";
import { GalleryVideoSchema } from "./schema";
import { deleteFile, uploadFile } from "./upload";
import { ActionResponse, DeleteResponse } from "@/types/action.type";

export const addVideo = async (
  previousState: ActionResponse | null,
  formData: FormData,
): Promise<ActionResponse> => {
  try {
    const videoFiles = formData.getAll("video");
    const baseName = (formData.get("name") as string | null) ?? "";

    const validFiles = videoFiles.filter(
      (file): file is File => file instanceof File && file.size > 0,
    );

    if (validFiles.length === 0) {
      return {
        errors: { video: ["Please select at least one video file"] },
        error: null,
        success: null,
        status: false,
        formData: null,
      };
    }

    const maxSize = 50 * 1024 * 1024; // 50MB
    const maxFiles = 5;
    const allowedTypes = [
      "video/mp4",
      "video/webm",
      "video/ogg",
      "video/quicktime",
    ];

    if (validFiles.length > maxFiles) {
      return {
        errors: {
          video: [`You can upload a maximum of ${maxFiles} videos at once`],
        },
        error: null,
        success: null,
        status: false,
        formData: null,
      };
    }

    const videoErrors: string[] = [];

    validFiles.forEach((file) => {
      if (!allowedTypes.includes(file.type.toLowerCase())) {
        videoErrors.push(`"${file.name}" is not a supported video format`);
      }
      if (file.size > maxSize) {
        videoErrors.push(`"${file.name}" is too large (max 50MB per video)`);
      }
    });

    if (videoErrors.length > 0) {
      return {
        errors: { video: videoErrors },
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
          fileName = `Video ${i + 1}`;
        }

        const validation = GalleryVideoSchema.safeParse({
          name: fileName,
          video: file,
        });

        if (!validation.success) {
          failedFiles.push(file.name);
          continue;
        }

        const uploadResult = await uploadFile(validation.data.video);

        if (!uploadResult?.status || !uploadResult.fileId) {
          failedFiles.push(file.name);
          continue;
        }

        const newVideo = await prisma.videos.create({
          data: {
            name: validation.data.name,
            url: uploadResult.url,
            publicId: uploadResult.fileId,
          },
        });

        uploadedFiles.push(newVideo);
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
        error: "Upload failed. Please check your videos and try again.",
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
            ? "Video uploaded successfully!"
            : `All ${totalFiles} videos uploaded successfully!`,
        status: true,
        formData: null,
      };
    }

    return {
      errors: {},
      error: null,
      success: `${successCount} of ${totalFiles} videos uploaded successfully. ${failedCount} failed to upload.`,
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

export const deleteVideo = async (videoId: string): Promise<DeleteResponse> => {
  try {
    const video = await prisma.videos.findUnique({
      where: { id: videoId },
    });

    if (!video) {
      return {
        success: false,
        message: "Video not found",
        errors: { _form: ["Video not found"] },
      };
    }

    const deleteResult = await deleteFile(video.publicId);

    if (!deleteResult.status) {
      return {
        success: false,
        message: "File deletion failed",
        errors: {
          _form: [deleteResult.error ?? "Failed to delete video file"],
        },
      };
    }

    await prisma.videos.delete({
      where: { id: videoId },
    });

    return {
      success: true,
      message: "Video deleted successfully",
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: "Database error occurred",
      errors: { _form: ["Failed to delete video"] },
    };
  }
};

export const getVideos = async () => {
  return prisma.videos.findMany({
    orderBy: { createdAt: "desc" },
  });
};
