"use client";

import Link from "next/link";
import { dashboardNav } from "@/config/dashboard-nav";
import { SidebarItem } from "@/components/dashboard/sidebar-item";
import { Command, LogOut, Settings, User, ChevronsUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";

export function AppSidebar() {
  const handleSignOut = () => {
    signOut({ callbackUrl: "/login" });
    window.location.href = "/login";
  };

  return (
    <div className="flex h-full flex-col border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      {/* Sidebar Header / Logo */}
      <div className="flex h-14 items-center border-b border-zinc-200 px-6 dark:border-zinc-800">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Command className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg tracking-tight">Sanveex</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-6 px-4 custom-scrollbar">
        <nav className="flex flex-col gap-2">
          {dashboardNav.map((item, index) => (
            <SidebarItem key={index} item={item} />
          ))}
        </nav>
      </div>

      {/* Sidebar Footer (User profile & Logout) */}
      <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="focus:outline-none">
            <button className="flex w-full items-center gap-3 rounded-lg bg-zinc-50 p-3 transition-colors hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800">
              <div className="h-9 w-9 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                <div className="flex h-full w-full items-center justify-center text-xs font-medium text-zinc-500">
                  US
                </div>
              </div>
              <div className="flex flex-1 flex-col items-start">
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                  User Name
                </span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  admin@sanveex.com
                </span>
              </div>
              <ChevronsUpDown className="h-4 w-4 text-zinc-500" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56"
            side="top"
            sideOffset={8}
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">User Name</p>
                <p className="text-xs leading-none text-muted-foreground">
                  admin@sanveex.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleSignOut}
              className="text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
