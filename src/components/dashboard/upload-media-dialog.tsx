"use client";

import { addImage } from "@/actions/media/image";
import { addVideo } from "@/actions/media/video";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FileImage,
  FileVideo,
  ImageIcon,
  Upload,
  Video,
  X,
  CloudUpload,
  AlertCircle,
  Check,
} from "lucide-react";
import Image from "next/image";
import { useState, useCallback } from "react";
import { useDropzone, Accept } from "react-dropzone";
import { toast } from "sonner";

const initialUploadState = {
  errors: {},
  error: null,
  success: null,
  status: false,
  formData: null,
};

type MediaType = "image" | "video";

export default function UploadMediaDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [mediaType, setMediaType] = useState<MediaType>("image");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [name, setName] = useState("");
  const queryClient = useQueryClient();

  const closeModal = () => {
    setSelectedFiles([]);
    setName("");
    setIsOpen(false);
  };

  const uploadMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      if (mediaType === "image") {
        return await addImage(initialUploadState, formData);
      } else {
        return await addVideo(initialUploadState, formData);
      }
    },
    onSuccess: (result) => {
      if (result?.status) {
        toast.success(result.success || "Upload successful!");
        queryClient.invalidateQueries({
          queryKey: ["galleryMedia"],
        });
        closeModal();
      } else if (result?.error) {
        toast.error(result.error);
      } else if (result?.errors) {
        const errorMessages = Object.values(result.errors).flat();
        errorMessages.forEach((msg) => toast.error(String(msg)));
      }
    },
    onError: (error) => {
      toast.error("Something went wrong. Please try again.");
    },
  });

  const accept: Accept =
    mediaType === "image"
      ? {
          "image/jpeg": [".jpg", ".jpeg"],
          "image/png": [".png"],
          "image/gif": [".gif"],
          "image/webp": [".webp"],
        }
      : {
          "video/mp4": [".mp4"],
          "video/webm": [".webm"],
          "video/ogg": [".ogg"],
          "video/quicktime": [".mov"],
        };

  const maxSize = mediaType === "image" ? 2 * 1024 * 1024 : 50 * 1024 * 1024;
  const maxFiles = mediaType === "image" ? 10 : 5;

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach((rejection) => {
          rejection.errors.forEach((error: any) => {
            if (error.code === "file-too-large") {
              toast.error(
                `File "${rejection.file.name}" is too large. Max size: ${mediaType === "image" ? "2MB" : "50MB"}`,
              );
            } else if (error.code === "file-invalid-type") {
              toast.error(
                `File "${rejection.file.name}" has invalid type for ${mediaType}`,
              );
            } else if (error.code === "too-many-files") {
              toast.error(`Maximum ${maxFiles} files allowed`);
            } else {
              toast.error(
                `Error with "${rejection.file.name}": ${error.message}`,
              );
            }
          });
        });
      }

      if (acceptedFiles.length > 0) {
        setSelectedFiles((prev) => {
          const newFiles = [...prev, ...acceptedFiles];
          if (newFiles.length > maxFiles) {
            toast.error(`Maximum ${maxFiles} files allowed`);
            return newFiles.slice(0, maxFiles);
          }
          return newFiles;
        });
      }
    },
    [mediaType, maxFiles],
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept,
      maxSize,
      maxFiles,
      disabled: uploadMutation.isPending,
    });

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (selectedFiles.length === 0) {
      toast.error("Please select at least one file");
      return;
    }

    const formData = new FormData();
    if (name) {
      formData.append("name", name);
    }

    selectedFiles.forEach((file) => {
      formData.append(mediaType, file);
    });

    uploadMutation.mutate(formData);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Upload className="w-4 h-4" />
          Upload Media
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Upload className="w-6 h-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl">Upload Media</DialogTitle>
              <DialogDescription>
                Add new images or videos to your gallery
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Separator />

        <div className="flex-1 overflow-y-auto">
          <div className="space-y-6 p-1">
            {/* Media Type Selection */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Media Type</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setMediaType("image");
                    setSelectedFiles([]);
                  }}
                  disabled={uploadMutation.isPending}
                  className={`relative overflow-hidden rounded-lg border-2 p-4 transition-all hover:shadow-md ${
                    mediaType === "image"
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div
                      className={`w-14 h-14 rounded-lg flex items-center justify-center transition-colors ${
                        mediaType === "image"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <FileImage className="w-7 h-7" />
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-sm">Images</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        JPG, PNG, GIF, WebP
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Max 2MB · Up to 10 files
                      </div>
                    </div>
                  </div>
                  {mediaType === "image" && (
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMediaType("video");
                    setSelectedFiles([]);
                  }}
                  disabled={uploadMutation.isPending}
                  className={`relative overflow-hidden rounded-lg border-2 p-4 transition-all hover:shadow-md ${
                    mediaType === "video"
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div
                      className={`w-14 h-14 rounded-lg flex items-center justify-center transition-colors ${
                        mediaType === "video"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <FileVideo className="w-7 h-7" />
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-sm">Videos</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        MP4, WebM, OGG, MOV
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Max 50MB · Up to 5 files
                      </div>
                    </div>
                  </div>
                  {mediaType === "video" && (
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </button>
              </div>
            </div>

            <Separator />

            {/* File Name Input */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base font-semibold">
                Name{" "}
                <span className="text-xs text-muted-foreground font-normal">
                  (Optional)
                </span>
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={`Enter ${mediaType} name`}
                disabled={uploadMutation.isPending}
                className="h-11"
              />
              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                Leave empty to use original file names
              </p>
            </div>

            {/* Dropzone */}
            <div className="space-y-2">
              <Label className="text-base font-semibold">
                Upload Files
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <div
                {...getRootProps()}
                className={`relative border-2 border-dashed rounded-xl p-8 transition-all cursor-pointer ${
                  isDragActive && !isDragReject
                    ? "border-primary bg-primary/5 scale-[1.02]"
                    : isDragReject
                      ? "border-destructive bg-destructive/5"
                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                } ${uploadMutation.isPending ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center justify-center text-center gap-3">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
                      isDragActive && !isDragReject
                        ? "bg-primary text-primary-foreground"
                        : isDragReject
                          ? "bg-destructive text-destructive-foreground"
                          : "bg-muted"
                    }`}
                  >
                    <CloudUpload className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-base font-semibold">
                      {isDragActive && !isDragReject
                        ? "Drop files here"
                        : isDragReject
                          ? "Invalid file type"
                          : "Drag & drop files here"}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      or click to browse from your computer
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant="outline" className="font-normal">
                      {mediaType === "image" ? "Images" : "Videos"}
                    </Badge>
                    <span>·</span>
                    <span>Max {mediaType === "image" ? "2MB" : "50MB"}</span>
                    <span>·</span>
                    <span>Up to {mediaType === "image" ? 10 : 5} files</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Files Preview */}
            {selectedFiles.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold">
                    Selected Files
                  </Label>
                  <Badge variant="secondary" className="gap-1.5">
                    {selectedFiles.length} file
                    {selectedFiles.length !== 1 ? "s" : ""}
                  </Badge>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto border rounded-lg p-3 bg-muted/20">
                  {selectedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-background rounded-lg border hover:border-primary/50 hover:shadow-sm transition-all group"
                    >
                      <div className="relative w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                        {mediaType === "image" &&
                        file.type.startsWith("image/") ? (
                          <Image
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            className="w-full h-full object-cover"
                            height={48}
                            width={48}
                          />
                        ) : mediaType === "image" ? (
                          <ImageIcon className="w-5 h-5 text-primary" />
                        ) : (
                          <Video className="w-5 h-5 text-primary" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFile(index)}
                        disabled={uploadMutation.isPending}
                        className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Footer Actions */}
        <div className="flex gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={closeModal}
            disabled={uploadMutation.isPending}
            className="flex-1 h-11"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={uploadMutation.isPending || selectedFiles.length === 0}
            className="flex-1 h-11 gap-2"
          >
            {uploadMutation.isPending ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Upload {selectedFiles.length > 0 && `(${selectedFiles.length})`}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
