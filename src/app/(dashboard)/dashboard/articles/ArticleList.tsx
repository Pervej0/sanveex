"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Edit, Trash2, FileText, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

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
import { deleteArticle } from "@/actions/articles/actions";

interface ArticleListProps {
  articles: any[];
}

export default function ArticleList({ articles }: ArticleListProps) {
  const [data, setData] = useState(articles);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;

    try {
      const res = await deleteArticle(id);
      if (res.success) {
        toast.success("Article deleted");
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
          No articles found. Write your first news story!
        </p>
        <Button asChild className="mt-4" variant="outline">
          <Link href="/dashboard/articles/new">Create New Article</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Article</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Published</TableHead>
            <TableHead>Author</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="">
          {data.map((article) => (
            <TableRow key={article.id}>
              {/* Article */}
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-20 rounded-md overflow-hidden border shrink-0">
                    {article.image ? (
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-muted flex items-center justify-center">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  <div className="max-w-[320px]">
                    <p className="font-medium leading-tight line-clamp-1">
                      {article.title}
                    </p>
                    <div
                      dangerouslySetInnerHTML={{ __html: article.excerpt }}
                      className="prose prose-sm text-muted-foreground mt-1 line-clamp-2"
                    />

                    {article.isFeatured && (
                      <Badge className="mt-1 bg-amber-100 text-amber-700 border-none text-[10px]">
                        Featured
                      </Badge>
                    )}
                  </div>
                </div>
              </TableCell>

              {/* Type */}
              <TableCell>
                <Badge
                  variant="outline"
                  className="uppercase text-xs font-bold"
                >
                  {article.type}
                </Badge>
              </TableCell>

              {/* Category */}
              <TableCell>
                <Badge variant="secondary" className="text-xs">
                  {article.category}
                </Badge>
              </TableCell>

              {/* Status */}
              <TableCell>
                {article.isActive ? (
                  <Badge className="bg-green-100 text-green-700 border-none">
                    Published
                  </Badge>
                ) : (
                  <Badge className="bg-red-100 text-red-700 border-none">
                    Draft
                  </Badge>
                )}
              </TableCell>

              {/* Date */}
              <TableCell className="text-xs text-muted-foreground">
                {format(new Date(article.publishedAt), "MMM dd, yyyy")}
              </TableCell>

              {/* Author */}
              <TableCell className="text-xs">{article.authorName}</TableCell>

              {/* Actions */}
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    asChild
                    title="View on site"
                  >
                    <Link
                      href={`/newsroom/press-releases/${article.slug}`}
                      target="_blank"
                    >
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
                    <Link href={`/dashboard/articles/${article.id}`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>

                  <Button
                    size="icon"
                    variant="outline"
                    className="text-destructive border-red-100 hover:bg-red-50"
                    title="Delete"
                    onClick={() => handleDelete(article.id)}
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
