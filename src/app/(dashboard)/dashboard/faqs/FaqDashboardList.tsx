"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Edit, Trash2, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { deleteFaq } from "@/actions/faqs/actions";

interface FaqDashboardListProps {
  entries: any[];
}

export default function FaqDashboardList({ entries }: FaqDashboardListProps) {
  const [data, setData] = useState(entries);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;

    try {
      const res = await deleteFaq(id);
      if (res.success) {
        toast.success("FAQ deleted");
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
          No FAQs found. Add your first question!
        </p>
        <Button asChild className="mt-4" variant="outline">
          <Link href="/dashboard/faqs/new">Add New FAQ</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data.map((item) => (
        <Card
          key={item.id}
          className="overflow-hidden group hover:border-primary/50 transition-all"
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold">{item.question}</h3>
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
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {item.answer}
                </p>
              </div>

              <div className="flex gap-2">
                <Badge variant="outline" className="h-8 flex items-center">
                  Order: {item.order}
                </Badge>
                <Button size="icon" variant="ghost" className="h-8 w-8" asChild>
                  <Link href={`/dashboard/faqs/${item.id}`}>
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
