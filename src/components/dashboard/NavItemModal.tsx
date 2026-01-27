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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import FormTextArea from "@/components/forms/FormTextArea";
import FormSelect from "@/components/forms/FormSelect";
import { createNavItem, updateNavItem } from "@/actions/navigation/actions";
import { z } from "zod";
import type { NavItemWithChildren, PageOption } from "@/types/navigation.types";
import { useFormContext } from "react-hook-form";

const navItemSchema = z.object({
  title: z.string().min(1, "Menu item name is required"),
  description: z.string().optional(),
  href: z.string().optional(),
  pageId: z.string().optional(),
  linkType: z.enum(["page", "custom", "none"]),
});

type NavItemFormValues = z.infer<typeof navItemSchema>;

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

  const initialData: NavItemFormValues = {
    title: editingItem?.title || "",
    description: editingItem?.description || "",
    href: editingItem?.href || "",
    pageId: editingItem?.pageId || "",
    linkType: editingItem?.pageId
      ? "page"
      : editingItem?.href
        ? "custom"
        : "none",
  };

  const handleSubmit = async (data: NavItemFormValues) => {
    try {
      setLoading(true);

      const submitData = {
        title: data.title,
        description: data.description || undefined,
        href:
          data.linkType === "custom"
            ? data.href
            : data.linkType === "page" && data.pageId
              ? pages.find((p) => p.value === data.pageId)?.slug
              : undefined,
        pageId: data.linkType === "page" ? data.pageId : undefined,
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
            ? "Menu item updated successfully!"
            : "Menu item created successfully!",
        );
        onSuccess();
        onClose();
      } else {
        toast.error(result.error || "Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to save menu item");
    } finally {
      setLoading(false);
    }
  };

  // Helper to render form fields with dynamic linkType
  function FormFields() {
    const { watch } = useFormContext();
    const linkType = watch("linkType");
    return (
      <>
        <FormInput
          name="title"
          label="Menu Item Name"
          placeholder="e.g., About Us, Our Services, Contact"
          required
        />
        <div className="mb-2">
          <FormTextArea
            name="description"
            label="Short Description (Optional)"
            placeholder="Brief description for dropdown menus"
          />
          <p className="text-sm text-muted-foreground mt-1">
            Appears in dropdown menus to help users understand what this page is
            about
          </p>
        </div>
        <div className="mb-2">
          <FormSelect
            name="linkType"
            label="Where should this menu item go?"
            options={[
              { label: "Select an existing page", value: "page" },
              { label: "Enter a custom web address", value: "custom" },
              { label: "Just a menu label (no link)", value: "none" },
            ]}
            placeholder="Choose link type..."
          />
        </div>
        {linkType === "page" && (
          <div className="mb-2">
            <FormSelect
              name="pageId"
              label="Which page should this link to?"
              options={pages.map((page) => ({
                label: page.label,
                value: page.value,
              }))}
              placeholder="Select a page..."
            />
            <p className="text-sm text-muted-foreground mt-1">
              Choose from your existing pages
            </p>
          </div>
        )}
        {linkType === "custom" && (
          <div className="mb-2">
            <FormInput
              name="href"
              label="Custom Web Address"
              placeholder="/contact or https://example.com"
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
      </>
    );
  }

  const modalContent = (
    <Form
      schema={navItemSchema}
      defaultValues={initialData}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <FormFields />
    </Form>
  );

  // Use Sheet for mobile, Dialog for desktop
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-md overflow-y-auto"
        >
          <SheetHeader className="text-left">
            <SheetTitle>
              {mode === "edit"
                ? "Edit Menu Item"
                : parentId
                  ? "Add Sub-Menu Item"
                  : "Add Main Menu Item"}
            </SheetTitle>
            <SheetDescription>
              {mode === "edit"
                ? "Update the menu item details below"
                : parentId
                  ? "Create a new item under this menu section"
                  : "Create a new main menu section"}
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">{modalContent}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
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
        {modalContent}
      </DialogContent>
    </Dialog>
  );
}
