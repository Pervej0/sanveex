"use client";

import { getImages } from "@/actions/media/image";
import { getVideos } from "@/actions/media/video";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import {
  Check,
  Image as ImageIcon,
  Loader2,
  Search,
  Video as VideoIcon,
  X,
  Upload,
  Grid3x3,
  List,
} from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import UploadMediaDialog from "./upload-media-dialog";

type MediaItem = {
  id: string;
  name: string;
  url: string;
  publicId: string;
  createdAt: Date;
  type: "image" | "video";
};

interface MediaSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  title?: string;
  selectedUrl?: string;
}

export default function MediaSelector({
  isOpen,
  onClose,
  onSelect,
  title = "Select Media",
  selectedUrl,
}: MediaSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "image" | "video">("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const { data: images = [], isLoading: imagesLoading } = useQuery({
    queryKey: ["galleryMedia", "images"],
    queryFn: getImages,
  });

  const { data: videos = [], isLoading: videosLoading } = useQuery({
    queryKey: ["galleryMedia", "videos"],
    queryFn: getVideos,
  });

  const allMedia = useMemo(() => {
    return [
      ...images.map((img) => ({ ...img, type: "image" as const })),
      ...videos.map((vid) => ({ ...vid, type: "video" as const })),
    ].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [images, videos]);

  const filteredMedia = useMemo(() => {
    return allMedia.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesTab = activeTab === "all" || item.type === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [allMedia, searchTerm, activeTab]);

  const isLoading = imagesLoading || videosLoading;

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(date));
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-2xl lg:max-w-4xl p-0 flex flex-col gap-0"
      >
        <SheetHeader className="px-6 pt-6 pb-4 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <SheetTitle className="text-2xl font-semibold tracking-tight">
                {title}
              </SheetTitle>
              <SheetDescription className="text-sm text-muted-foreground">
                Browse and select media from your library
              </SheetDescription>
            </div>
            <UploadMediaDialog />
          </div>
        </SheetHeader>

        <Separator />

        <div className="px-6 py-4 space-y-4 bg-muted/30">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Search by filename..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-9 bg-background"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                  onClick={handleClearSearch}
                >
                  <X className="w-3.5 h-3.5" />
                </Button>
              )}
            </div>

            <div className="flex gap-2">
              <Tabs
                value={activeTab}
                onValueChange={(val) => setActiveTab(val as any)}
                className="w-auto"
              >
                <TabsList className="h-10">
                  <TabsTrigger value="all" className="px-4">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="image" className="px-4">
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Images
                  </TabsTrigger>
                  <TabsTrigger value="video" className="px-4">
                    <VideoIcon className="w-4 h-4 mr-2" />
                    Videos
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="flex border rounded-md bg-background">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-10 w-10 rounded-r-none"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3x3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-10 w-10 rounded-l-none"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <p className="text-muted-foreground">
              {filteredMedia.length}{" "}
              {filteredMedia.length === 1 ? "item" : "items"}
              {searchTerm && " found"}
            </p>
            {selectedUrl && (
              <Badge variant="outline" className="gap-1.5">
                <Check className="w-3 h-3" />1 selected
              </Badge>
            )}
          </div>
        </div>

        <ScrollArea className="flex-1 px-6">
          <div className="py-6">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-24">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-muted rounded-full" />
                  <Loader2 className="w-16 h-16 text-primary animate-spin absolute inset-0" />
                </div>
                <p className="text-sm font-medium mt-4">
                  Loading media library
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Please wait while we fetch your files
                </p>
              </div>
            ) : filteredMedia.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed rounded-xl bg-muted/20">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  {searchTerm ? (
                    <Search className="w-10 h-10 text-primary/60" />
                  ) : (
                    <ImageIcon className="w-10 h-10 text-primary/60" />
                  )}
                </div>
                <p className="text-lg font-semibold">
                  {searchTerm ? "No results found" : "No media yet"}
                </p>
                <p className="text-sm text-muted-foreground mt-1 max-w-sm text-center">
                  {searchTerm
                    ? "Try adjusting your search or filter settings"
                    : "Upload your first image or video to get started"}
                </p>
                {!searchTerm && (
                  <Button className="mt-6" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Media
                  </Button>
                )}
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredMedia.map((item) => (
                  <button
                    key={item.id}
                    className={`relative group aspect-square rounded-lg border-2 overflow-hidden transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                      selectedUrl === item.url
                        ? "border-primary ring-2 ring-primary/20 shadow-lg"
                        : "border-border hover:border-primary/50 hover:shadow-md"
                    }`}
                    onClick={() => {
                      onSelect(item.url);
                      onClose();
                    }}
                  >
                    {item.type === "image" ? (
                      <Image
                        src={item.url}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    ) : (
                      <div className="relative w-full h-full bg-muted">
                        <video
                          src={item.url}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                          <div className="bg-black/50 backdrop-blur-sm rounded-full p-3">
                            <VideoIcon className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="absolute inset-x-0 bottom-0 p-3 text-left translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
                      <p className="text-xs font-medium text-white line-clamp-1 drop-shadow-lg">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-white/70 mt-0.5 drop-shadow">
                        {formatDate(item.createdAt)}
                      </p>
                    </div>

                    {selectedUrl === item.url && (
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1.5 shadow-lg ring-2 ring-background">
                        <Check className="w-4 h-4" />
                      </div>
                    )}

                    <Badge
                      variant="secondary"
                      className="absolute top-2 left-2 text-[10px] h-5 px-2 font-medium shadow-sm"
                    >
                      {item.type}
                    </Badge>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredMedia.map((item) => (
                  <button
                    key={item.id}
                    className={`w-full flex items-center gap-4 p-3 rounded-lg border-2 transition-all text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                      selectedUrl === item.url
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border hover:border-primary/50 hover:bg-muted/50"
                    }`}
                    onClick={() => {
                      onSelect(item.url);
                      onClose();
                    }}
                  >
                    <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0 border bg-muted">
                      {item.type === "image" ? (
                        <Image
                          src={item.url}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      ) : (
                        <div className="relative w-full h-full">
                          <video
                            src={item.url}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <VideoIcon className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">
                        {item.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          variant="outline"
                          className="text-[10px] h-5 px-1.5"
                        >
                          {item.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(item.createdAt)}
                        </span>
                      </div>
                    </div>

                    {selectedUrl === item.url && (
                      <div className="flex-shrink-0 bg-primary text-primary-foreground rounded-full p-1.5">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
