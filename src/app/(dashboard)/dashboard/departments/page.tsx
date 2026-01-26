import React from "react";
import Link from "next/link";
import { Plus, List, Layout } from "lucide-react";
import {
  getAllDepartments,
  getDepartmentSection,
} from "@/actions/departments/actions";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DepartmentList from "./DepartmentList";
import DepartmentSectionForm from "./DepartmentSectionForm";

export default async function DepartmentsPage() {
  const departments = await getAllDepartments();
  const sectionData = await getDepartmentSection();

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Departments Management"
        description="Manage your healthcare departments and the section banner"
      >
        <Button asChild>
          <Link
            href="/dashboard/departments/new"
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Department
          </Link>
        </Button>
      </DashboardPageHeader>

      <Tabs defaultValue="list" className="space-y-6">
        <TabsList className="bg-muted/60 p-1">
          <TabsTrigger value="list" className="gap-2">
            <List className="w-4 h-4" />
            Departments List
          </TabsTrigger>
          <TabsTrigger value="section" className="gap-2">
            <Layout className="w-4 h-4" />
            Section Banner
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="m-0 border-none p-0">
          <DepartmentList departments={departments} />
        </TabsContent>

        <TabsContent value="section" className="m-0 border-none p-0">
          <DepartmentSectionForm initialData={sectionData} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
