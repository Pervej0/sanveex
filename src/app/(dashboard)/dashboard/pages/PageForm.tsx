"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import FormTextArea from "@/components/forms/FormTextArea";
import FormSwitch from "@/components/forms/FormSwitch";
import FormSelect from "@/components/forms/FormSelect";
import MediaPickerField from "@/components/forms/MediaPickerField";
import FormRichTextEditor from "@/components/forms/FormRichTextEditor";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Info, Globe, Search, Image, Layout, Eye, Edit } from "lucide-react";
import { pageSchema, PageFormValues } from "@/actions/pages/schema";
import { createPage, updatePage } from "@/actions/pages/actions";
import { generateSlugFromTitle } from "@/lib/admin-utils";
import { useFormContext } from "react-hook-form";

interface PageFormProps {
  initialData?: any;
  id?: string;
  pages: { label: string; value: string }[];
  navMenuOptions?: { label: string; value: string }[];
}

const LAYOUT_OPTIONS = [
  {
    label: "📄 Standard Page",
    value: "default",
    description: "Perfect for most content like About, Contact, etc.",
  },
  {
    label: "🛍️ Product Showcase",
    value: "product-listing",
    description: "Display products in a grid layout",
  },
  {
    label: "📞 Contact Page",
    value: "contact",
    description: "Special layout with contact forms and maps",
  },
  {
    label: "🔬 Science/Research",
    value: "science",
    description: "Layout for research content and publications",
  },
];

export default function PageForm({
  initialData,
  id,
  pages,
  navMenuOptions = [],
}: PageFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: PageFormValues) => {
    try {
      setLoading(true);

      // Convert null values to undefined for the API
      const cleanData = {
        ...data,
        content: data.content || undefined,
        description: data.description || undefined,
        keywords: data.keywords || undefined,
        image: data.image || undefined,
        parentId: data.parentId || undefined,
      };

      let res;
      if (id) {
        res = await updatePage(id, cleanData);
      } else {
        res = await createPage(cleanData);
      }

      if (res.success) {
        toast.success(id ? "Page updated" : "Page created");
        router.push("/dashboard/pages");
        router.refresh();
      } else {
        toast.error(res.error || "Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to save page");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form<PageFormValues>
      schema={pageSchema}
      onSubmit={handleSubmit}
      defaultValues={
        initialData
          ? {
              ...initialData,
              parentId: initialData.parentId || undefined,
            }
          : {
              title: "",
              slug: "/",
              content: "",
              description: "",
              keywords: "",
              image: "",
              parentId: undefined,
              layout: "default",
              isActive: true,
              order: 0,
            }
      }
      submitButtonText={id ? "Update Page" : "Create Page"}
      isSubmitting={loading}
    >
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-full lg:col-span-8 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Page Content</CardTitle>
              <CardDescription>
                Main editor for your dynamic page
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  name="title"
                  label="Page Title"
                  placeholder="e.g. Our History"
                />

                <FormSelect
                  name="slug"
                  label="Assign to Website Menu Item"
                  placeholder="Select a menu link (e.g. /about)"
                  options={navMenuOptions}
                />
              </div>

              <FormRichTextEditor
                name="content"
                label="Page Content (HTML)"
                placeholder="Write your page content here..."
                minHeight={500}
                allowImages={true}
                allowVideos={true}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SEO & Metadata</CardTitle>
              <CardDescription>
                Control how this page appears in search engines
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormTextArea
                name="description"
                label="Meta Description"
                placeholder="Brief summary of the page for SEO..."
              />
              <FormInput
                name="keywords"
                label="Keywords"
                placeholder="healthcare, pharma, history (comma separated)"
              />
            </CardContent>
          </Card>
        </div>

        <div className="col-span-full lg:col-span-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Page Image</CardTitle>
              <CardDescription>Featured image for header</CardDescription>
            </CardHeader>
            <CardContent>
              <MediaPickerField name="image" label="Hero/Featured Image" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Organization</CardTitle>
              <CardDescription>
                Hierarchical and display settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormSelect
                name="parentId"
                label="Parent Page"
                options={[{ label: "None (Root)", value: "" }, ...pages]}
              />
              <FormSelect
                name="layout"
                label="Page Layout"
                options={LAYOUT_OPTIONS}
              />
              <FormInput name="order" label="Display Order" type="number" />
              <FormSwitch
                name="isActive"
                label="Active Status"
                description="If disabled, this page returns 404"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </Form>
  );
}
