"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  FileText,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { deleteArticle } from "@/actions/articles/actions";
import { format } from "date-fns";

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
          No articles found. Write your first news story!
        </p>
        <Button asChild className="mt-4" variant="outline">
          <Link href="/dashboard/articles/new">Create New Article</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {data.map((article) => (
        <Card
          key={article.id}
          className="overflow-hidden group hover:border-primary/50 transition-all"
        >
          <CardContent className="p-4 flex flex-col md:flex-row gap-6">
            <div className="relative w-full md:w-48 aspect-video md:aspect-square rounded-lg overflow-hidden shrink-0 border">
              {article.image ? (
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <FileText className="w-8 h-8 text-muted-foreground" />
                </div>
              )}
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge
                    variant="outline"
                    className="text-[10px] uppercase font-bold"
                  >
                    {article.type}
                  </Badge>
                  <Badge variant="secondary" className="text-[10px] px-2">
                    {article.category}
                  </Badge>
                  {article.isFeatured && (
                    <Badge className="bg-amber-100 text-amber-700 border-none text-[10px]">
                      Featured
                    </Badge>
                  )}
                  {article.isActive ? (
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-700 border-none h-5 px-1.5 text-[10px]"
                    >
                      Published
                    </Badge>
                  ) : (
                    <Badge
                      variant="destructive"
                      className="bg-red-100 text-red-700 border-none h-5 px-1.5 text-[10px]"
                    >
                      Draft
                    </Badge>
                  )}
                </div>
                <h3 className="font-bold text-lg mb-1">{article.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1 font-medium text-primary">
                    {format(new Date(article.publishedAt), "MMM dd, yyyy")}
                  </span>
                  <span>{article.authorName}</span>
                </div>
              </div>
            </div>

            <div className="flex md:flex-col gap-2 justify-end">
              <Button
                size="icon"
                variant="outline"
                className="h-8 w-8"
                asChild
                title="View on Site"
              >
                <Link
                  href={`/newsroom/press-releases/${article.slug}`}
                  target="_blank"
                >
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="h-8 w-8 text-blue-600 border-blue-100 hover:bg-blue-50"
                asChild
                title="Edit"
              >
                <Link href={`/dashboard/articles/${article.id}`}>
                  <Edit className="w-4 h-4" />
                </Link>
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="h-8 w-8 text-destructive border-red-100 hover:bg-red-50 hover:text-destructive"
                onClick={() => handleDelete(article.id)}
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
