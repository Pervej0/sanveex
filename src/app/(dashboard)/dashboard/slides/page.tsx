import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { getAllSlides } from "@/actions/slides/slide";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { Button } from "@/components/ui/button";
import SlideList from "./SlideList";

export default async function SlidesPage() {
  const slides = await getAllSlides();

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Hero Slider"
        description="Manage the slides displayed in the home page hero section"
      >
        <Button asChild>
          <Link
            href="/dashboard/slides/new"
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Slide
          </Link>
        </Button>
      </DashboardPageHeader>

      <SlideList slides={slides} />
    </div>
  );
}
