import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getWhyChooseUsById } from "@/actions/why-choose-us/actions";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { Button } from "@/components/ui/button";
import WhyChooseUsForm from "../../WhyChooseUsForm";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function UpdateBenefitPage({ params }: PageProps) {
  const { id } = await params;
  const entry = await getWhyChooseUsById(id);

  if (!entry) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Update Benefit"
        description="Edit the content of your service benefit"
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

      <WhyChooseUsForm initialData={entry} id={id} />
    </div>
  );
}
