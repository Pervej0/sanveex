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
import FormRichTextEditorCompact from "@/components/forms/FormRichTextEditorCompact";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { articleSchema, ArticleFormValues } from "@/actions/articles/schema";
import { createArticle, updateArticle } from "@/actions/articles/actions";
import { useFormContext } from "react-hook-form";

const ARTICLE_TYPES = [
  { label: "Press Release", value: "PRESS RELEASE" },
  { label: "Company Statement", value: "Company Statement" },
  { label: "Sanveex Story", value: "Sanveex Story" },
  { label: "Event", value: "Event" },
];

interface ArticleFormProps {
  initialData?: any;
  id?: string;
}

export default function ArticleForm({ initialData, id }: ArticleFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: ArticleFormValues) => {
    try {
      setLoading(true);
      let res;
      if (id) {
        res = await updateArticle(id, data);
      } else {
        res = await createArticle(data);
      }

      if (res.success) {
        toast.success(id ? "Article updated" : "Article created");
        router.push("/dashboard/articles");
        router.refresh();
      } else {
        toast.error(res.error || "Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to save article");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form<ArticleFormValues>
      schema={articleSchema}
      onSubmit={handleSubmit}
      defaultValues={
        initialData
          ? {
              ...initialData,
              publishedAt: new Date(initialData.publishedAt),
            }
          : {
              title: "",
              slug: "",
              excerpt: "",
              content: "",
              category: "General",
              type: "PRESS RELEASE",
              image: "",
              readTime: "5 min read",
              authorName: "Sanveex Media",
              authorRole: "Press Office",
              authorAvatar: "",
              isFeatured: false,
              isActive: true,
              publishedAt: new Date(),
            }
      }
      submitButtonText={id ? "Update Article" : "Create Article"}
      isSubmitting={loading}
    >
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-full lg:col-span-8 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Article Details</CardTitle>
              <CardDescription>Main content of your news item</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormInput
                name="title"
                label="Title"
                placeholder="e.g. Sanveex New Milestone..."
              />
              <FormInput
                name="slug"
                label="URL Slug"
                placeholder="e.g. sanveex-new-milestone"
              />
              <FormRichTextEditorCompact
                name="excerpt"
                label="Summary / Excerpt"
                placeholder="Write a compelling excerpt for your article..."
                minHeight={120}
                allowImages={false}
                allowVideos={false}
              />
              <FormRichTextEditor
                name="content"
                label="Full Content"
                placeholder="Write your article content here..."
                required
                minHeight={400}
                maxHeight={800}
                allowImages={true}
                allowVideos={true}
                description="Use the rich text editor to format your article with headings, lists, links, and media."
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Author Information</CardTitle>
              <CardDescription>
                Details about the writer or office
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput name="authorName" label="Author Name" />
                <FormInput name="authorRole" label="Author Role" />
              </div>
              <MediaPickerField name="authorAvatar" label="Author Avatar" />
            </CardContent>
          </Card>
        </div>

        <div className="col-span-full lg:col-span-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Featured Image</CardTitle>
              <CardDescription>Main image for the article</CardDescription>
            </CardHeader>
            <CardContent>
              <MediaPickerField name="image" label="Cover Image" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Taxonomy & Metadata</CardTitle>
              <CardDescription>Categorize your content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormSelect
                name="type"
                label="Content Type"
                options={ARTICLE_TYPES}
              />
              <FormInput
                name="category"
                label="Category"
                placeholder="e.g. Oncology, Business"
              />
              <FormInput
                name="readTime"
                label="Read Time"
                placeholder="e.g. 5 min read"
              />
              {/* Note: Date picker might be needed for publishedAt, using hidden for now or just current date */}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Visibility</CardTitle>
              <CardDescription>Display settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 shadow-none">
              <FormSwitch
                name="isFeatured"
                label="Featured Article"
                description="Highlight this in the home page slider or grid"
              />
              <FormSwitch
                name="isActive"
                label="Published"
                description="Show this article to the public"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </Form>
  );
}
