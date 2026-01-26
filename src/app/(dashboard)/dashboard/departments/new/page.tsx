import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { Button } from "@/components/ui/button";
import DepartmentForm from "../DepartmentForm";

export default function NewDepartmentPage() {
  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Add New Department"
        description="Create a new healthcare department entry"
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

      <DepartmentForm />
    </div>
  );
}
