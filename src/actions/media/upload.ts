"use server";

import ImageKit from "imagekit";

let imageKit: ImageKit | null = null;

function getImageKit() {
  if (!imageKit) {
    const publicKey = process.env.IMAGE_KIT_PUBLIC_KEY;
    const privateKey = process.env.IMAGE_KIT_PRIVATE_KEY;
    const urlEndpoint = process.env.IMAGE_KIT_URL_ENDPOINT;

    if (!publicKey || !privateKey || !urlEndpoint) {
      throw new Error(
        "ImageKit configuration is missing. Please set IMAGE_KIT_PUBLIC_KEY, IMAGE_KIT_PRIVATE_KEY, and IMAGE_KIT_URL_ENDPOINT environment variables.",
      );
    }

    imageKit = new ImageKit({
      publicKey,
      privateKey,
      urlEndpoint,
    });
  }
  return imageKit;
}

export async function uploadFile(file: File) {
  try {
    if (!file || file.size === 0) {
      return {
        status: false,
        error: "Please select a file to upload.",
      };
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer).toString("base64");

    const kit = getImageKit();
    const response = await kit.upload({
      file: buffer,
      fileName: file.name,
      folder: "/sanveex",
    });
    return {
      status: true,
      success: "File uploaded successfully.",
      url: response.url,
      fileId: response.fileId,
      thumbnailUrl: response.thumbnailUrl,
    };
  } catch (error) {
    return {
      status: false,
      error: "There was an error uploading the file.",
    };
  }
}

export async function deleteFile(fileId: string) {
  try {
    const kit = getImageKit();
    await kit.deleteFile(fileId);
    return {
      status: true,
      success: "File deleted successfully.",
    };
  } catch (error) {
    return {
      status: false,
      error: "File deletion failed.",
    };
  }
}
