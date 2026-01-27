import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getDepartmentById } from "@/actions/departments/actions";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { Button } from "@/components/ui/button";
import DepartmentForm from "../DepartmentForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function UpdateDepartmentPage({ params }: PageProps) {
  const { id } = await params;
  const entry = await getDepartmentById(id);

  if (!entry) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Update Department"
        description={`Editing department: ${entry.title}`}
      >
        <Button variant="outline" asChild>
          <Link
            href="/dashboard/departments"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to List
          </Link>
        </Button>
      </DashboardPageHeader>

      <DepartmentForm initialData={entry} id={id} />
    </div>
  );
}
