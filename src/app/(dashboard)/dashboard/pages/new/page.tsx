import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { Button } from "@/components/ui/button";
import PageForm from "../PageForm";
import { getAllPages } from "@/actions/pages/actions";
import { getAllNavItems } from "@/actions/navigation/actions";

export default async function NewPage() {
  const pages = await getAllPages();
  const navItems = await getAllNavItems();

  const pageOptions = pages.map((p) => ({
    label: p.title,
    value: p.id,
  }));

  // Flatten and prepare navigation options for the slug picker
  const navOptions = navItems.flatMap((parent) => {
    const parentOpt = parent.href
      ? [{ label: `${parent.title} (${parent.href})`, value: parent.href }]
      : [];
    const childrenOpts = (parent.children || [])
      .filter((c) => c.href)
      .map((child) => ({
        label: `${parent.title} > ${child.title} (${child.href})`,
        value: child.href || "",
      }));
    return [...parentOpt, ...childrenOpts];
  });

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Create New Page"
        description="Design a new dynamic page for your website"
      >
        <Button variant="outline" asChild>
          <Link href="/dashboard/pages" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to List
          </Link>
        </Button>
      </DashboardPageHeader>

      <PageForm pages={pageOptions} navMenuOptions={navOptions} />
    </div>
  );
}
