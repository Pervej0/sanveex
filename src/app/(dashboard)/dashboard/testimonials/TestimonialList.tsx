"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Edit, Trash2, CheckCircle, XCircle, Quote } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { deleteTestimonial } from "@/actions/testimonials/actions";

interface TestimonialListProps {
  entries: any[];
}

export default function TestimonialList({ entries }: TestimonialListProps) {
  const [data, setData] = useState(entries);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;

    try {
      const res = await deleteTestimonial(id);
      if (res.success) {
        toast.success("Review deleted");
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
          No client reviews found. Add your first testimonial!
        </p>
        <Button asChild className="mt-4" variant="outline">
          <Link href="/dashboard/testimonials/new">Add New Review</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((item) => (
        <Card
          key={item.id}
          className="overflow-hidden group hover:border-primary/50 transition-all hover:shadow-md h-full"
        >
          <CardContent className="p-0 flex flex-col h-full">
            <div className="p-6 flex-1">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">{item.name}</h3>
                    <p className="text-xs text-muted-foreground">{item.role}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {item.isActive ? (
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-700 border-none h-5 px-1.5 text-[10px]"
                    >
                      Active
                    </Badge>
                  ) : (
                    <Badge
                      variant="destructive"
                      className="bg-red-100 text-red-700 border-none h-5 px-1.5 text-[10px]"
                    >
                      Inactive
                    </Badge>
                  )}
                </div>
              </div>

              <div className="relative">
                <Quote className="w-8 h-8 text-primary/10 absolute -top-2 -left-2" />
                <p className="text-sm text-muted-foreground italic line-clamp-4 pl-4 relative z-10">
                  {item.text}
                </p>
              </div>
            </div>

            <div className="px-6 py-4 bg-muted/30 border-t flex items-center justify-between">
              <Badge variant="outline" className="text-[10px]">
                Order: {item.order}
              </Badge>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost" className="h-8 w-8" asChild>
                  <Link href={`/dashboard/testimonials/${item.id}`}>
                    <Edit className="w-4 h-4 text-muted-foreground" />
                  </Link>
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 hover:text-destructive"
                  onClick={() => handleDelete(item.id)}
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
