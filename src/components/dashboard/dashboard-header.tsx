"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AppSidebar } from "@/components/dashboard/app-sidebar";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-zinc-200 bg-white px-6 dark:border-zinc-800 dark:bg-zinc-950">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 border-r-0 w-72">
          <AppSidebar />
        </SheetContent>
      </Sheet>

      <div className="flex flex-1 items-center justify-between">
        {/* Placeholder for Breadcrumbs or Page Title */}
        <div className="font-medium text-sm text-zinc-500">Dashboard</div>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          {/* Add Theme Toggle or Notifications here later */}
        </div>
      </div>
    </header>
  );
}
