"use client";

import React, { useState } from "react";
import {
  Plus,
  Trash2,
  GripVertical,
  ChevronDown,
  ChevronRight,
  Link as LinkIcon,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { createNavItem, deleteNavItem } from "@/actions/navigation/actions";
import type { NavItemWithChildren, PageOption } from "@/types/navigation.types";

interface NavigationManagerProps {
  initialItems: NavItemWithChildren[];
  pages: PageOption[];
}

export default function NavigationManager({
  initialItems,
  pages,
}: NavigationManagerProps) {
  const [items, setItems] = useState<NavItemWithChildren[]>(initialItems);
  const [loading, setLoading] = useState(false);

  // Simplified Add Root Item
  const addRootItem = async () => {
    const title = prompt("Enter menu title (e.g. About, Products)");
    if (!title) return;

    try {
      setLoading(true);
      const res = await createNavItem({ title, order: items.length });
      if (res.success && res.data) {
        setItems([...items, { ...res.data, children: [] }]);
        toast.success("Root menu added");
      } else {
        toast.error(res.error || "Failed to create navigation item");
      }
    } catch (error) {
      toast.error("An error occurred while creating the navigation item");
    } finally {
      setLoading(false);
    }
  };

  const addChildItem = async (parentId: string) => {
    const title = prompt("Enter sub-menu title");
    if (!title) return;
    const description =
      prompt("Enter sub-menu description (optional)") || undefined;
    const href = prompt(
      "Enter URL or select from pages (e.g. /about/overview)",
    );
    if (!href) return;

    try {
      setLoading(true);
      const res = await createNavItem({ title, description, href, parentId });
      if (res.success && res.data) {
        setItems(
          items.map((item) => {
            if (item.id === parentId) {
              return {
                ...item,
                children: [...item.children, res.data],
              };
            }
            return item;
          }),
        );
        toast.success("Sub-menu item added");
      } else {
        toast.error(res.error || "Failed to create navigation item");
      }
    } catch (error) {
      toast.error("An error occurred while creating the navigation item");
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (
    itemId: string,
    isChild = false,
    parentId?: string,
  ) => {
    try {
      setLoading(true);
      const res = await deleteNavItem(itemId);
      if (res.success) {
        if (isChild && parentId) {
          setItems(
            items.map((item) => {
              if (item.id === parentId) {
                return {
                  ...item,
                  children: item.children.filter(
                    (child) => child.id !== itemId,
                  ),
                };
              }
              return item;
            }),
          );
        } else {
          setItems(items.filter((item) => item.id !== itemId));
        }
        toast.success("Navigation item removed");
      } else {
        toast.error(res.error || "Failed to delete navigation item");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the navigation item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button
          onClick={addRootItem}
          disabled={loading}
          className="gap-2 rounded-full h-11 px-6 shadow-md transition-all hover:shadow-primary/20"
        >
          <Plus className="w-4 h-4" />
          Add Main Level Menu
        </Button>
      </div>

      <div className="space-y-6">
        {items.map((item) => (
          <Card
            key={item.id}
            className="border-l-4 border-l-primary shadow-sm hover:shadow-md transition-shadow rounded-xl overflow-hidden"
          >
            <CardHeader className="flex flex-row items-center justify-between py-4 bg-muted/20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
                </div>
                <div>
                  <CardTitle className="text-lg font-bold">
                    {item.title}
                  </CardTitle>
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary/60">
                    Main Menu Category
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-primary hover:bg-primary/5 rounded-full border-primary/20 px-4"
                  onClick={() => addChildItem(item.id)}
                  disabled={loading}
                >
                  <Plus className="w-3.5 h-3.5 mr-2" /> Add Child Link
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:bg-red-50 rounded-full h-9 w-9"
                  onClick={() => removeItem(item.id)}
                  disabled={loading}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y border-t bg-white">
                {item.children && item.children.length > 0 ? (
                  item.children.map((child) => (
                    <div
                      key={child.id}
                      className="flex items-center justify-between p-4 group hover:bg-primary/5 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <ChevronRight className="w-4 h-4 text-primary/40 group-hover:text-primary transition-colors" />
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-foreground">
                              {child.title}
                            </span>
                            <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground font-mono">
                              {child.href}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                            <Info className="w-3 h-3 text-primary/50" />
                            {child.description || "No description provided"}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 text-destructive opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 rounded-full"
                        onClick={() => removeItem(child.id, true, item.id)}
                        disabled={loading}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-muted-foreground text-sm flex flex-col items-center gap-2">
                    <Plus className="w-8 h-8 opacity-20" />
                    No child links added to this category yet.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {items.length === 0 && (
        <Card className="p-12 text-center">
          <div className="space-y-4">
            <Info className="w-12 h-12 mx-auto text-muted-foreground" />
            <div>
              <h3 className="text-lg font-semibold">No navigation items yet</h3>
              <p className="text-muted-foreground">
                Create your first menu item to get started with navigation.
              </p>
            </div>
            <Button onClick={addRootItem} disabled={loading}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Menu
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
