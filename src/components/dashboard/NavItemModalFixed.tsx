"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createNavItem, updateNavItem } from "@/actions/navigation/actions";
import type { NavItemWithChildren, PageOption } from "@/types/navigation.types";

interface NavItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  parentId?: string;
  editingItem?: NavItemWithChildren;
  pages: PageOption[];
  mode: "create" | "edit";
}

export default function NavItemModal({
  isOpen,
  onClose,
  onSuccess,
  parentId,
  editingItem,
  pages,
  mode,
}: NavItemModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    href: "",
    pageId: "",
    linkType: "none" as "page" | "custom" | "none",
  });

  // Reset form when modal opens or editingItem changes
  React.useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && editingItem) {
        setFormData({
          title: editingItem.title || "",
          description: editingItem.description || "",
          href: editingItem.href || "",
          pageId: editingItem.pageId || "",
          linkType: editingItem.pageId
            ? "page"
            : editingItem.href
              ? "custom"
              : "none",
        });
      } else {
        setFormData({
          title: "",
          description: "",
          href: "",
          pageId: "",
          linkType: "none",
        });
      }
    }
  }, [isOpen, editingItem, mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Menu item name is required");
      return;
    }

    try {
      setLoading(true);

      const submitData = {
        title: formData.title,
        description: formData.description || undefined,
        href:
          formData.linkType === "custom"
            ? formData.href
            : formData.linkType === "page" && formData.pageId
              ? pages.find((p) => p.value === formData.pageId)?.slug
              : undefined,
        pageId: formData.linkType === "page" ? formData.pageId : undefined,
        parentId,
      };

      let result;
      if (mode === "edit" && editingItem) {
        result = await updateNavItem(editingItem.id, submitData);
      } else {
        result = await createNavItem(submitData);
      }

      if (result.success) {
        toast.success(
          mode === "edit"
            ? "Menu item updated successfully! 🎉"
            : "Menu item created successfully! 🎉",
        );
        onSuccess();
        onClose();
        // Reset form
        setFormData({
          title: "",
          description: "",
          href: "",
          pageId: "",
          linkType: "none",
        });
      } else {
        toast.error(result.error || "Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to save menu item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {mode === "edit"
              ? "Edit Menu Item"
              : parentId
                ? "Add Sub-Menu Item"
                : "Add Main Menu Item"}
          </DialogTitle>
          <DialogDescription>
            {mode === "edit"
              ? "Update the menu item details below"
              : parentId
                ? "Create a new item under this menu section"
                : "Create a new main menu section"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title">Menu Item Name *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="e.g., About Us, Our Services, Contact"
              required
              className="mt-2"
            />
            <p className="text-sm text-muted-foreground mt-1">
              This is what visitors will see in the menu
            </p>
          </div>

          <div>
            <Label htmlFor="description">Short Description (Optional)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Brief description for dropdown menus"
              className="mt-2"
              rows={2}
            />
            <p className="text-sm text-muted-foreground mt-1">
              Appears in dropdown menus to help users understand what this page
              is about
            </p>
          </div>

          <div>
            <Label>Where should this menu item go?</Label>
            <Select
              value={formData.linkType}
              onValueChange={(value) => {
                setFormData({
                  ...formData,
                  linkType: value as "page" | "custom" | "none",
                  pageId: value !== "page" ? "" : formData.pageId,
                  href: value !== "custom" ? "" : formData.href,
                });
              }}
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Choose link type..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="page">Select an existing page</SelectItem>
                <SelectItem value="custom">
                  Enter a custom web address
                </SelectItem>
                <SelectItem value="none">
                  Just a menu label (no link)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.linkType === "page" && (
            <div>
              <Label>Which page should this link to?</Label>
              <Select
                value={formData.pageId}
                onValueChange={(value) =>
                  setFormData({ ...formData, pageId: value })
                }
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select a page..." />
                </SelectTrigger>
                <SelectContent>
                  {pages.map((page) => (
                    <SelectItem key={page.value} value={page.value}>
                      {page.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground mt-1">
                Choose from your existing pages
              </p>
            </div>
          )}

          {formData.linkType === "custom" && (
            <div>
              <Label htmlFor="href">Custom Web Address</Label>
              <Input
                id="href"
                value={formData.href}
                onChange={(e) =>
                  setFormData({ ...formData, href: e.target.value })
                }
                placeholder="/contact or https://example.com"
                className="mt-2"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Enter a web address (URL) or page path
              </p>
            </div>
          )}

          <DialogFooter className="sm:justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading
                ? "Saving..."
                : mode === "edit"
                  ? "Update Menu Item"
                  : "Create Menu Item"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
