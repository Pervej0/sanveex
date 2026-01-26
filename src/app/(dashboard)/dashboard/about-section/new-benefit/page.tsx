import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { Button } from "@/components/ui/button";
import WhyChooseUsForm from "../WhyChooseUsForm";

export default function NewBenefitPage() {
  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Add New Benefit"
        description="Create a new service benefit entry"
      >
        <Button variant="outline" asChild>
          <Link
            href="/dashboard/about-section"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to About
          </Link>
        </Button>
      </DashboardPageHeader>

      <WhyChooseUsForm />
    </div>
  );
}
