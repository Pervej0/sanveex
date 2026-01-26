import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getArticleById } from "@/actions/articles/actions";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { Button } from "@/components/ui/button";
import ArticleForm from "../ArticleForm";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function UpdateArticlePage({ params }: PageProps) {
  const { id } = await params;
  const entry = await getArticleById(id);

  if (!entry) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Edit Article"
        description={`Editing: ${entry.title}`}
      >
        <Button variant="outline" asChild>
          <Link href="/dashboard/articles" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to List
          </Link>
        </Button>
      </DashboardPageHeader>

      <ArticleForm initialData={entry} id={id} />
    </div>
  );
}
