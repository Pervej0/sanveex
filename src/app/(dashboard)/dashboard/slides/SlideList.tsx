"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Edit, Trash2, GripVertical, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { deleteSlide } from "@/actions/slides/slide";
import Image from "next/image";

interface SlideListProps {
  slides: any[];
}

export default function SlideList({ slides }: SlideListProps) {
  const [data, setData] = useState(slides);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this slide?")) return;

    try {
      const res = await deleteSlide(id);
      if (res.success) {
        toast.success("Slide deleted");
        setData(data.filter((item) => item.id !== id));
      } else {
        toast.error(res.error || "Failed to delete");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  if (data.length === 0) {
    return (
      <div className="text-center py-20 border-2 border-dashed rounded-xl bg-muted/20">
        <p className="text-muted-foreground">
          No slides found. Create your first slide!
        </p>
        <Button asChild className="mt-4" variant="outline">
          <Link href="/dashboard/slides/new">Add New Slide</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data.map((slide) => (
        <Card key={slide.id} className="overflow-hidden group">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row items-center gap-4 p-4">
              <div className="shrink-0 flex items-center gap-3">
                <GripVertical className="text-muted-foreground cursor-move" />
                <div className="relative w-32 aspect-video rounded-md overflow-hidden bg-muted border">
                  <Image
                    src={slide.backgroundImage}
                    alt={slide.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-sm md:text-base truncate">
                    {slide.title}
                  </h3>
                  {slide.isActive ? (
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-700 hover:bg-green-100 border-none"
                    >
                      <CheckCircle className="w-3 h-3 mr-1" /> Active
                    </Badge>
                  ) : (
                    <Badge
                      variant="destructive"
                      className="bg-red-100 text-red-700 hover:bg-red-100 border-none"
                    >
                      <XCircle className="w-3 h-3 mr-1" /> Inactive
                    </Badge>
                  )}
                  <Badge variant="outline">Order: {slide.order}</Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {slide.subtitle}
                </p>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                  {slide.description}
                </p>
              </div>

              <div className="flex items-center gap-2 mt-4 md:mt-0">
                <Button size="icon" variant="outline" asChild>
                  <Link href={`/dashboard/slides/${slide.id}`}>
                    <Edit className="w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => handleDelete(slide.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
