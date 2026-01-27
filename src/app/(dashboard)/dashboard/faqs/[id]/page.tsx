import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getFaqById } from "@/actions/faqs/actions";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { Button } from "@/components/ui/button";
import FaqForm from "../FaqForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function UpdateFaqPage({ params }: PageProps) {
  const { id } = await params;
  const entry = await getFaqById(id);

  if (!entry) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Update FAQ"
        description={`Editing question: ${entry.question}`}
      >
        <Button variant="outline" asChild>
          <Link href="/dashboard/faqs" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to List
          </Link>
        </Button>
      </DashboardPageHeader>

      <FaqForm initialData={entry} id={id} />
    </div>
  );
}
