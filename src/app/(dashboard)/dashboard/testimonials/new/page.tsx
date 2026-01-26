import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { Button } from "@/components/ui/button";
import TestimonialForm from "../TestimonialForm";

export default function NewTestimonialPage() {
  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Add New Review"
        description="Create a new client testimonial"
      >
        <Button variant="outline" asChild>
          <Link
            href="/dashboard/testimonials"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to List
          </Link>
        </Button>
      </DashboardPageHeader>

      <TestimonialForm />
    </div>
  );
}
