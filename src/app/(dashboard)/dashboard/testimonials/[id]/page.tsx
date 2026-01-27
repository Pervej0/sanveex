import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getTestimonialById } from "@/actions/testimonials/actions";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { Button } from "@/components/ui/button";
import TestimonialForm from "../TestimonialForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function UpdateTestimonialPage({ params }: PageProps) {
  const { id } = await params;
  const entry = await getTestimonialById(id);

  if (!entry) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Update Review"
        description={`Editing review from: ${entry.name}`}
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

      <TestimonialForm initialData={entry} id={id} />
    </div>
  );
}
