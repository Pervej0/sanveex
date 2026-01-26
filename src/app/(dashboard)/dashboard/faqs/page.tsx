import React from "react";
import Link from "next/link";
import { Plus, List, Layout } from "lucide-react";
import { getAllFaqs, getFaqSection } from "@/actions/faqs/actions";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FaqDashboardList from "./FaqDashboardList";
import FaqSectionForm from "./FaqSectionForm";

export default async function FaqsPage() {
  const faqs = await getAllFaqs();
  const sectionData = await getFaqSection();

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="FAQ Management"
        description="Manage your frequently asked questions and the section header"
      >
        <Button asChild>
          <Link href="/dashboard/faqs/new" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add FAQ
          </Link>
        </Button>
      </DashboardPageHeader>

      <Tabs defaultValue="list" className="space-y-6">
        <TabsList className="bg-muted/60 p-1">
          <TabsTrigger value="list" className="gap-2">
            <List className="w-4 h-4" />
            FAQ List
          </TabsTrigger>
          <TabsTrigger value="section" className="gap-2">
            <Layout className="w-4 h-4" />
            Section Header
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="m-0 border-none p-0">
          <FaqDashboardList entries={faqs} />
        </TabsContent>

        <TabsContent value="section" className="m-0 border-none p-0">
          <FaqSectionForm initialData={sectionData} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
