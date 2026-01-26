"use client";

import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageIcon, X, Paperclip, VideoIcon, Globe } from "lucide-react";
import MediaSelector from "@/components/dashboard/media-selector";
import Image from "next/image";

interface MediaPickerFieldProps {
  name: string;
  label?: string;
  description?: string;
  required?: boolean;
}

export default function MediaPickerField({
  name,
  label,
  description,
  required,
}: MediaPickerFieldProps) {
  const { control, setValue, watch } = useFormContext();
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  const selectedUrl = watch(name);

  // Helper to check if URL is a video
  const isVideo = (url: string) => {
    if (!url) return false;
    return url.match(/\.(mp4|webm|ogg|quicktime)$/i) || url.includes("video");
  };

  const handleRemove = () => {
    setValue(name, "", { shouldValidate: true, shouldDirty: true });
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          {label && (
            <FormLabel className="text-base">
              {label} {required && <span className="text-destructive">*</span>}
            </FormLabel>
          )}

          <div className="space-y-4">
            {/* Preview Section */}
            {selectedUrl ? (
              <div className="relative group w-full max-w-sm aspect-video rounded-xl border-2 border-muted overflow-hidden bg-muted/50">
                {isVideo(selectedUrl) ? (
                  <video
                    src={selectedUrl}
                    className="w-full h-full object-cover"
                    controls
                  />
                ) : (
                  <Image
                    src={selectedUrl}
                    alt="Selected logo"
                    fill
                    className="object-contain p-2"
                  />
                )}

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => setIsSelectorOpen(true)}
                  >
                    Change
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="h-8 w-8"
                    onClick={handleRemove}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div
                className="flex flex-col items-center justify-center w-full max-w-sm aspect-video border-2 border-dashed rounded-xl bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer"
                onClick={() => setIsSelectorOpen(true)}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <ImageIcon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm font-medium">No media selected</p>
                <p className="text-xs text-muted-foreground mt-1 text-center px-4">
                  Click to choose from your gallery or provide a URL below
                </p>
              </div>
            )}

            {/* Input and Selector Actions */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  {...field}
                  placeholder="Paste URL or choose from gallery..."
                  className="pl-9"
                  value={field.value || ""}
                />
              </div>
              <Button
                type="button"
                variant="outline"
                className="gap-2"
                onClick={() => setIsSelectorOpen(true)}
              >
                <Paperclip className="w-4 h-4" />
                Gallery
              </Button>
            </div>

            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>

          <FormMessage />

          <MediaSelector
            isOpen={isSelectorOpen}
            onClose={() => setIsSelectorOpen(false)}
            onSelect={(url) => field.onChange(url)}
            selectedUrl={field.value}
            title={label ? `Select ${label}` : undefined}
          />
        </FormItem>
      )}
    />
  );
}
