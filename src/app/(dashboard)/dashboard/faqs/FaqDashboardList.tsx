"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
        setData((prev) => prev.filter((item) => item.id !== id));
      } else {
        toast.error(res.error || "Failed to delete");
      }
    } catch {
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
    <div className="rounded bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Question</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Answer</TableHead>
            <TableHead>Order</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              {/* Question */}
              <TableCell className="font-medium">{item.question}</TableCell>

              {/* Status */}
              <TableCell>
                {item.isActive ? (
                  <Badge className="bg-green-100 text-green-700 border-none">
                    Active
                  </Badge>
                ) : (
                  <Badge className="bg-red-100 text-red-700 border-none">
                    Inactive
                  </Badge>
                )}
              </TableCell>

              {/* Answer */}
              <TableCell className="max-w-[420px]">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {item.answer}
                </p>
              </TableCell>

              {/* Order */}
              <TableCell>
                <Badge variant="outline" className="text-xs">
                  {item.order}
                </Badge>
              </TableCell>

              {/* Actions */}
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button size="icon" variant="ghost" asChild>
                    <Link href={`/dashboard/faqs/${item.id}`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>

                  <Button
                    size="icon"
                    variant="ghost"
                    className="hover:text-destructive"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
