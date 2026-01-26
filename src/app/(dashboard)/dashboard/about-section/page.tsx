import React from "react";
import Link from "next/link";
import { Plus, List, Layout } from "lucide-react";
import { getAboutSection } from "@/actions/about-section/actions";
import { getAllWhyChooseUs } from "@/actions/why-choose-us/actions";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AboutSectionForm from "./AboutSectionForm";
import WhyChooseUsList from "./WhyChooseUsList";

export default async function AboutSectionPage() {
  const aboutData = await getAboutSection();
  const whyChooseUsEntries = await getAllWhyChooseUs();

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="About & Benefits"
        description="Manage the main company overview and the service benefits grid"
      >
        <Button asChild>
          <Link
            href="/dashboard/about-section/new-benefit"
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Benefit
          </Link>
        </Button>
      </DashboardPageHeader>

      <Tabs defaultValue="content" className="space-y-6">
        <TabsList className="bg-muted/60 p-1">
          <TabsTrigger value="content" className="gap-2">
            <Layout className="w-4 h-4" />
            Main Content
          </TabsTrigger>
          <TabsTrigger value="benefits" className="gap-2">
            <List className="w-4 h-4" />
            Benefits Grid
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="m-0 border-none p-0">
          <AboutSectionForm initialData={aboutData} />
        </TabsContent>

        <TabsContent value="benefits" className="m-0 border-none p-0">
          <WhyChooseUsList entries={whyChooseUsEntries} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
