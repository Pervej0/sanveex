import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { getAllArticles } from "@/actions/articles/actions";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { Button } from "@/components/ui/button";
import ArticleList from "./ArticleList";

export default async function ArticlesPage() {
  const articles = await getAllArticles();

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Newsroom Management"
        description="Write and manage press releases, company statements, and news articles"
      >
        <Button asChild>
          <Link
            href="/dashboard/articles/new"
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Article
          </Link>
        </Button>
      </DashboardPageHeader>

      <ArticleList articles={articles} />
    </div>
  );
}
