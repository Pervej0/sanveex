import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { Button } from "@/components/ui/button";
import PageForm from "../PageForm";
import { getAllPages, getPageById } from "@/actions/pages/actions";
import { getAllNavItems } from "@/actions/navigation/actions";

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPage({ params }: EditPageProps) {
  const { id } = await params;
  const page = await getPageById(id);
  const allPages = await getAllPages();
  const navItems = await getAllNavItems();

  if (!page) {
    notFound();
  }

  const pageOptions = allPages
    .filter((p) => p.id !== id) // Prevent self-parenting
    .map((p) => ({
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

  // Ensure current slug is in the options even if not in menu
  if (page.slug && !navOptions.find((opt) => opt.value === page.slug)) {
    navOptions.unshift({
      label: `Current Slug (${page.slug})`,
      value: page.slug,
    });
  }

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title={`Edit Page: ${page.title}`}
        description="Update your page content and settings"
      >
        <Button variant="outline" asChild>
          <Link href="/dashboard/pages" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to List
          </Link>
        </Button>
      </DashboardPageHeader>

      <PageForm
        initialData={page}
        id={id}
        pages={pageOptions}
        navMenuOptions={navOptions}
      />
    </div>
  );
}
