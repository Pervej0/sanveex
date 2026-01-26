"use client";

import { getImages } from "@/actions/media/image";
import { getVideos } from "@/actions/media/video";
import { useQuery } from "@tanstack/react-query";
import { ImageIcon, Loader2 } from "lucide-react";
import GalleryGrid from "./gallery-grid";

export default function GalleryContent() {
  const {
    data: images = [],
    isLoading: imagesLoading,
    error: imagesError,
  } = useQuery({
    queryKey: ["galleryMedia", "images"],
    queryFn: getImages,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const {
    data: videos = [],
    isLoading: videosLoading,
    error: videosError,
  } = useQuery({
    queryKey: ["galleryMedia", "videos"],
    queryFn: getVideos,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const isLoading = imagesLoading || videosLoading;
  const hasError = imagesError || videosError;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <h3 className="text-lg font-semibold text-muted-foreground">
          Loading gallery...
        </h3>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
          <ImageIcon className="w-10 h-10 text-destructive" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Failed to load gallery</h3>
        <p className="text-muted-foreground text-center max-w-md">
          There was an error loading your media. Please try refreshing the page.
        </p>
      </div>
    );
  }

  return <GalleryGrid images={images} videos={videos} />;
}
