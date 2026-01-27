"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Edit, Trash2, FileText, ExternalLink } from "lucide-react";
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
import { deletePage } from "@/actions/pages/actions";

interface PageListProps {
  pages: any[];
}

export default function PageList({ pages }: PageListProps) {
  const [data, setData] = useState(pages);

  const handleDelete = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this page? This will also remove the route from the site.",
      )
    )
      return;

    try {
      const res = await deletePage(id);
      if (res.success) {
        toast.success("Page deleted");
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
          No dynamic pages found. Build your site content!
        </p>
        <Button asChild className="mt-4" variant="outline">
          <Link href="/dashboard/pages/new">Create New Page</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Layout</TableHead>
            <TableHead>Parent</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((page) => (
            <TableRow key={page.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  {page.title}
                </div>
              </TableCell>

              <TableCell>
                <code className="rounded bg-muted px-2 py-1 text-xs">
                  {page.slug}
                </code>
              </TableCell>

              <TableCell>
                {page.isActive ? (
                  <Badge className="bg-green-100 text-green-700 border-none">
                    Active
                  </Badge>
                ) : (
                  <Badge variant="destructive">Draft</Badge>
                )}
              </TableCell>

              <TableCell>
                <Badge variant="secondary" className="uppercase text-xs">
                  {page.layout}
                </Badge>
              </TableCell>

              <TableCell>
                {page.parent ? (
                  <Badge variant="outline" className="text-xs">
                    {page.parent.title}
                  </Badge>
                ) : (
                  <span className="text-muted-foreground text-xs">—</span>
                )}
              </TableCell>

              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button size="icon" variant="outline" asChild title="Preview">
                    <Link href={page.slug} target="_blank">
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>

                  <Button
                    size="icon"
                    variant="outline"
                    className="text-blue-600 border-blue-100 hover:bg-blue-50"
                    asChild
                    title="Edit"
                  >
                    <Link href={`/dashboard/pages/${page.id}`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>

                  <Button
                    size="icon"
                    variant="outline"
                    className="text-destructive border-red-100 hover:bg-red-50"
                    title="Delete"
                    onClick={() => handleDelete(page.id)}
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
