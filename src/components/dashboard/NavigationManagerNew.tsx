"use client";

import React, { useState } from "react";
import {
  Plus,
  Trash2,
  Edit2,
  GripVertical,
  ChevronRight,
  Link as LinkIcon,
  Info,
  Menu,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { deleteNavItem } from "@/actions/navigation/actions";
import type { NavItemWithChildren, PageOption } from "@/types/navigation.types";
import NavItemModalFixed from "@/components/dashboard/NavItemModalFixed";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<
    NavItemWithChildren | undefined
  >();
  const [parentId, setParentId] = useState<string | undefined>();
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{
    id: string;
    title: string;
    isChild?: boolean;
    parentId?: string;
  }>();

  const handleRefresh = () => {
    window.location.reload();
  };

  const openCreateModal = (parentItemId?: string) => {
    setParentId(parentItemId);
    setEditingItem(undefined);
    setModalMode("create");
    setModalOpen(true);
  };

  const openEditModal = (item: NavItemWithChildren) => {
    setEditingItem(item);
    setParentId(undefined);
    setModalMode("edit");
    setModalOpen(true);
  };

  const confirmDelete = (
    id: string,
    title: string,
    isChild = false,
    parentId?: string,
  ) => {
    setItemToDelete({ id, title, isChild, parentId });
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;

    try {
      setLoading(true);
      const res = await deleteNavItem(itemToDelete.id);
      if (res.success) {
        if (itemToDelete.isChild && itemToDelete.parentId) {
          setItems(
            items.map((item) => {
              if (item.id === itemToDelete.parentId) {
                return {
                  ...item,
                  children: item.children.filter(
                    (child) => child.id !== itemToDelete.id,
                  ),
                };
              }
              return item;
            }),
          );
        } else {
          setItems(items.filter((item) => item.id !== itemToDelete.id));
        }
        toast.success(`"${itemToDelete.title}" has been removed from the menu`);
      } else {
        toast.error(res.error || "Failed to delete menu item");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the menu item");
    } finally {
      setLoading(false);
      setDeleteDialogOpen(false);
      setItemToDelete(undefined);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Website Menu Management</h2>
          <p className="text-sm text-muted-foreground">
            Create and organize your website&apos;s main navigation menu
          </p>
        </div>
        <Button
          onClick={() => openCreateModal()}
          disabled={loading}
          className="gap-2 bg-primary hover:bg-primary/90"
        >
          <Plus className="w-4 h-4" />
          Add Main Menu
        </Button>
      </div>

      {/* Menu Items */}
      <div className="space-y-4">
        {items.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardHeader className="bg-muted/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Menu className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {item.title}
                      <Badge variant="outline" className="text-xs">
                        Main Menu
                      </Badge>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {item.children.length} sub-menu item
                      {item.children.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditModal(item)}
                    className="gap-2"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openCreateModal(item.id)}
                    className="gap-2"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Sub-item
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => confirmDelete(item.id, item.title)}
                    className="gap-2 text-red-600 hover:text-red-700 hover:border-red-200"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardHeader>

            {item.children.length > 0 && (
              <CardContent className="pt-4 pb-4">
                <div className="space-y-3">
                  {item.children.map((child) => (
                    <div
                      key={child.id}
                      className="flex items-center justify-between p-3 bg-muted/20 rounded-lg group hover:bg-muted/40 transition-colors"
                    >
                      <div className="flex items-start gap-3 flex-1">
                        <div className="mt-1">
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-foreground">
                              {child.title}
                            </span>
                            {child.href && (
                              <Badge
                                variant="outline"
                                className="text-xs font-mono bg-blue-50"
                              >
                                <ExternalLink className="w-3 h-3 mr-1" />
                                {child.href}
                              </Badge>
                            )}
                          </div>
                          {child.description && (
                            <p className="text-sm text-muted-foreground">
                              {child.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            openEditModal(child as NavItemWithChildren)
                          }
                          className="h-8 w-8 p-0"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            confirmDelete(child.id, child.title, true, item.id)
                          }
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {items.length === 0 && (
        <Card className="p-12 text-center">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
              <Menu className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">No menu items yet</h3>
              <p className="text-muted-foreground">
                Create your first menu item to start building your
                website&apos;s navigation.
              </p>
            </div>
            <Button onClick={() => openCreateModal()} className="gap-2">
              <Plus className="w-4 h-4" />
              Create Your First Menu
            </Button>
          </div>
        </Card>
      )}

      {/* Navigation Item Modal */}
      <NavItemModalFixed
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleRefresh}
        parentId={parentId}
        editingItem={editingItem}
        pages={pages}
        mode={modalMode}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Menu Item</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{itemToDelete?.title}&quot;?
              {!itemToDelete?.isChild &&
                " This will also delete all sub-menu items under it."}{" "}
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
