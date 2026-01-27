import React from "react";
import Link from "next/link";
import { Plus, FileText } from "lucide-react";
import { getAllPages } from "@/actions/pages/actions";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { Button } from "@/components/ui/button";
import PageList from "./PageList";

export default async function PagesDashboard() {
  const pages = await getAllPages();

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Website Pages"
        description="Create and manage all the pages on your website - like About Us, Contact, Services, etc."
      >
        <Button asChild className="gap-2 bg-primary hover:bg-primary/90">
          <Link href="/dashboard/pages/new" className="flex items-center">
            <Plus className="w-4 h-4" />
            Create New Page
          </Link>
        </Button>
      </DashboardPageHeader>

      <PageList pages={pages} />
    </div>
  );
}
