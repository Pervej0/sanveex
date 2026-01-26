import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { getAllTestimonials } from "@/actions/testimonials/actions";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { Button } from "@/components/ui/button";
import TestimonialList from "./TestimonialList";

export default async function TestimonialsPage() {
  const entries = await getAllTestimonials();

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Client Testimonials"
        description="Manage the client reviews and testimonials displayed on the home page"
      >
        <Button asChild>
          <Link
            href="/dashboard/testimonials/new"
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Review
          </Link>
        </Button>
      </DashboardPageHeader>

      <TestimonialList entries={entries} />
    </div>
  );
}
