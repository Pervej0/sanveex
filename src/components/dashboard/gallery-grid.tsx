"use client";

import { deleteImage } from "@/actions/media/image";
import { deleteVideo } from "@/actions/media/video";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Calendar,
  Download,
  Eye,
  Image,
  Trash2,
  Video,
  Play,
  MoreVertical,
  AlertTriangle,
  Copy,
  ExternalLink,
} from "lucide-react";
import NextImage from "next/image";
import { useState } from "react";
import { toast } from "sonner";

type MediaItem = {
  id: string;
  name: string;
  url: string;
  publicId: string;
  createdAt: Date;
  type: "image" | "video";
};

interface GalleryGridProps {
  images: Array<{
    id: string;
    name: string;
    url: string;
    publicId: string;
    createdAt: Date;
  }>;
  videos: Array<{
    id: string;
    name: string;
    url: string;
    publicId: string;
    createdAt: Date;
  }>;
}

export default function GalleryGrid({ images, videos }: GalleryGridProps) {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [mediaToDelete, setMediaToDelete] = useState<MediaItem | null>(null);
  const queryClient = useQueryClient();

  const mediaItems: MediaItem[] = [
    ...images.map((img) => ({ ...img, type: "image" as const })),
    ...videos.map((vid) => ({ ...vid, type: "video" as const })),
  ].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const deleteMutation = useMutation({
    mutationFn: async (media: MediaItem) => {
      if (media.type === "image") {
        return await deleteImage(media.id);
      } else {
        return await deleteVideo(media.id);
      }
    },
    onSuccess: (result) => {
      if (result?.success) {
        toast.success(result.message || "Deleted successfully!");
        queryClient.invalidateQueries({
          queryKey: ["galleryMedia"],
        });
        setDeleteDialogOpen(false);
        setMediaToDelete(null);
        if (selectedMedia?.id === mediaToDelete?.id) {
          setSelectedMedia(null);
        }
      } else {
        toast.error(result?.message || "Failed to delete");
      }
    },
    onError: () => {
      toast.error("Something went wrong. Please try again.");
    },
  });

  const handleDelete = (media: MediaItem) => {
    setMediaToDelete(media);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (mediaToDelete) {
      deleteMutation.mutate(mediaToDelete);
    }
  };

  const handleDownload = async (media: MediaItem) => {
    try {
      const response = await fetch(media.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = media.name;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success("Download started!");
    } catch (error) {
      toast.error("Failed to download file");
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("URL copied to clipboard!");
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(date));
  };

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };

  if (mediaItems.length === 0) {
    return (
      <div className="border-2 border-dashed rounded-xl bg-muted/20 p-12">
        <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
          <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mb-4">
            <Image className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No media files</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Upload your first image or video to get started with your gallery
          </p>
          <div className="flex gap-2">
            <Badge variant="secondary" className="gap-1">
              <Image className="w-3 h-3" />
              Images
            </Badge>
            <Badge variant="secondary" className="gap-1">
              <Video className="w-3 h-3" />
              Videos
            </Badge>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {mediaItems.map((media) => (
          <div
            key={media.id}
            className="group relative rounded-lg border bg-card overflow-hidden hover:shadow-md hover:border-primary/50 transition-all"
          >
            <button
              onClick={() => setSelectedMedia(media)}
              className="w-full aspect-square relative bg-muted overflow-hidden"
            >
              {media.type === "image" ? (
                <NextImage
                  src={media.url}
                  alt={media.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                />
              ) : (
                <>
                  <video
                    src={media.url}
                    className="w-full h-full object-cover"
                    preload="metadata"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                      <Play className="w-5 h-5 text-black ml-0.5" />
                    </div>
                  </div>
                </>
              )}

              <div className="absolute top-1.5 left-1.5">
                <Badge
                  variant="secondary"
                  className="h-5 px-1.5 text-[10px] backdrop-blur-sm bg-background/80"
                >
                  {media.type === "image" ? (
                    <Image className="w-2.5 h-2.5" />
                  ) : (
                    <Video className="w-2.5 h-2.5" />
                  )}
                </Badge>
              </div>
            </button>

            <div className="p-2.5">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="text-xs font-medium truncate flex-1 leading-tight">
                  {media.name}
                </h3>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 shrink-0 -mt-0.5"
                    >
                      <MoreVertical className="w-3.5 h-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem onClick={() => setSelectedMedia(media)}>
                      <Eye className="w-3.5 h-3.5 mr-2" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDownload(media)}>
                      <Download className="w-3.5 h-3.5 mr-2" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleCopyUrl(media.url)}>
                      <Copy className="w-3.5 h-3.5 mr-2" />
                      Copy URL
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => window.open(media.url, "_blank")}
                    >
                      <ExternalLink className="w-3.5 h-3.5 mr-2" />
                      Open
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleDelete(media)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="w-3.5 h-3.5 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p className="text-[10px] text-muted-foreground">
                {formatDate(media.createdAt)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Dialog
        open={!!selectedMedia}
        onOpenChange={(open) => !open && setSelectedMedia(null)}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 gap-0">
          <DialogHeader className="p-4 border-b">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <DialogTitle className="text-base truncate">
                  {selectedMedia?.name}
                </DialogTitle>
                <DialogDescription className="text-xs mt-1">
                  {selectedMedia && formatDateTime(selectedMedia.createdAt)}
                </DialogDescription>
              </div>
              <Badge
                variant={
                  selectedMedia?.type === "image" ? "default" : "secondary"
                }
              >
                {selectedMedia?.type === "image" ? (
                  <Image className="w-3 h-3 mr-1" />
                ) : (
                  <Video className="w-3 h-3 mr-1" />
                )}
                {selectedMedia?.type}
              </Badge>
            </div>
          </DialogHeader>

          <div className="relative bg-muted/30 flex items-center justify-center min-h-[50vh] max-h-[65vh]">
            {selectedMedia?.type === "image" ? (
              <div className="relative w-full h-full p-4">
                <div className="relative w-full h-full">
                  <NextImage
                    src={selectedMedia.url}
                    alt={selectedMedia.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    priority
                  />
                </div>
              </div>
            ) : (
              selectedMedia && (
                <video
                  src={selectedMedia.url}
                  controls
                  className="max-w-full max-h-[65vh]"
                  autoPlay
                />
              )
            )}
          </div>

          <DialogFooter className="p-4 border-t flex-row gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => selectedMedia && handleCopyUrl(selectedMedia.url)}
              className="flex-1"
            >
              <Copy className="w-3.5 h-3.5 mr-2" />
              Copy URL
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => selectedMedia && handleDownload(selectedMedia)}
              className="flex-1"
            >
              <Download className="w-3.5 h-3.5 mr-2" />
              Download
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                if (selectedMedia) {
                  handleDelete(selectedMedia);
                }
              }}
              className="flex-1"
            >
              <Trash2 className="w-3.5 h-3.5 mr-2" />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <DialogTitle className="text-base">
                  Delete {mediaToDelete?.type}?
                </DialogTitle>
                <DialogDescription className="text-xs">
                  This action cannot be undone
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {mediaToDelete && (
            <div className="flex items-center gap-3 p-3 rounded-lg border bg-muted/50">
              <div className="w-12 h-12 bg-background rounded-md overflow-hidden relative shrink-0">
                {mediaToDelete.type === "image" ? (
                  <NextImage
                    src={mediaToDelete.url}
                    alt={mediaToDelete.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <Video className="w-5 h-5 text-muted-foreground" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {mediaToDelete.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(mediaToDelete.createdAt)}
                </p>
              </div>
            </div>
          )}

          <DialogDescription className="text-xs">
            The file will be permanently removed from your gallery and cannot be
            recovered.
          </DialogDescription>

          <DialogFooter className="gap-2 sm:gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={deleteMutation.isPending}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={confirmDelete}
              disabled={deleteMutation.isPending}
              className="flex-1"
            >
              {deleteMutation.isPending ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="w-3.5 h-3.5 mr-2" />
                  Delete
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
