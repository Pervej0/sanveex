import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { Button } from "@/components/ui/button";
import SlideForm from "../SlideForm";

export default function NewSlidePage() {
  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Add New Slide"
        description="Create a new hero section slide"
      >
        <Button variant="outline" asChild>
          <Link href="/dashboard/slides" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to List
          </Link>
        </Button>
      </DashboardPageHeader>

      <SlideForm />
    </div>
  );
}
