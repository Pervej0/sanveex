import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { Button } from "@/components/ui/button";
import ArticleForm from "../ArticleForm";

export default function NewArticlePage() {
  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Create New Article"
        description="Write a new news story or press release"
      >
        <Button variant="outline" asChild>
          <Link href="/dashboard/articles" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to List
          </Link>
        </Button>
      </DashboardPageHeader>

      <ArticleForm />
    </div>
  );
}
