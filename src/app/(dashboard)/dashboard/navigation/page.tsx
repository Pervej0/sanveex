import React from "react";
import { getAllNavItems } from "@/actions/navigation/actions";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import NavigationManager from "@/components/dashboard/NavigationManagerNew";
import { getAllPages } from "@/actions/pages/actions";
import type { PageOption } from "@/types/navigation.types";

export default async function NavigationDashboard() {
  const navItems = await getAllNavItems();
  const pages = await getAllPages();
  const pageOptions: PageOption[] = pages.map((p) => ({
    label: p.title,
    value: p.id,
    slug: p.slug,
  }));

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Website Navigation"
        description="Create and manage your website's main menu and sub-menus. No technical knowledge required!"
      />

      <NavigationManager initialItems={navItems} pages={pageOptions} />
    </div>
  );
}
