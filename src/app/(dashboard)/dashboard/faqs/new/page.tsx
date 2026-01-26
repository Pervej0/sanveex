import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { Button } from "@/components/ui/button";
import FaqForm from "../FaqForm";

export default function NewFaqPage() {
  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Add New FAQ"
        description="Create a new frequently asked question"
      >
        <Button variant="outline" asChild>
          <Link href="/dashboard/faqs" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to List
          </Link>
        </Button>
      </DashboardPageHeader>

      <FaqForm />
    </div>
  );
}
