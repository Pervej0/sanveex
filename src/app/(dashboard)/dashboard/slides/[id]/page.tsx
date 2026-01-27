import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getSlideById } from "@/actions/slides/slide";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { Button } from "@/components/ui/button";
import SlideForm from "../SlideForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function UpdateSlidePage({ params }: PageProps) {
  const { id } = await params;
  const slide = await getSlideById(id);

  if (!slide) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Update Slide"
        description="Edit the content of your hero slide"
      >
        <Button variant="outline" asChild>
          <Link href="/dashboard/slides" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to List
          </Link>
        </Button>
      </DashboardPageHeader>

      <SlideForm initialData={slide} id={id} />
    </div>
  );
}
