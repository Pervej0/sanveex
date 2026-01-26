"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  departmentSectionSchema,
  DepartmentSectionFormValues,
} from "@/actions/departments/schema";
import { updateDepartmentSection } from "@/actions/departments/actions";
import { Play } from "lucide-react";

interface DepartmentSectionFormProps {
  initialData?: any;
}

export default function DepartmentSectionForm({
  initialData,
}: DepartmentSectionFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: DepartmentSectionFormValues) => {
    try {
      setLoading(true);
      const res = await updateDepartmentSection(initialData?.id, data);

      if (res.success) {
        toast.success("Department section updated");
        router.refresh();
      } else {
        toast.error(res.error || "Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to save changes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form<DepartmentSectionFormValues>
      schema={departmentSectionSchema}
      onSubmit={handleSubmit}
      defaultValues={
        initialData || {
          title: "Excellence in Care",
          subtitle: "Advancing Healthcare Through Innovation",
          videoUrl: "/healthcare.mp4",
          buttonText: "Explore Departments",
          buttonLink: "#",
        }
      }
      submitButtonText="Save Changes"
      isSubmitting={loading}
    >
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-full lg:col-span-8 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Header Content</CardTitle>
              <CardDescription>
                Main heading and subheading for the department section
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormInput
                name="title"
                label="Banner Title"
                placeholder="e.g. Excellence in Care"
              />
              <FormInput
                name="subtitle"
                label="Banner Subtitle"
                placeholder="e.g. Advancing Healthcare Through Innovation"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Call to Action</CardTitle>
              <CardDescription>
                Configure the button shown on the banner
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput name="buttonText" label="Button Text" />
              <FormInput name="buttonLink" label="Button Link" />
            </CardContent>
          </Card>
        </div>

        <div className="col-span-full lg:col-span-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Banner Video</CardTitle>
              <CardDescription>Background video for the banner</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormInput
                name="videoUrl"
                label="Video URL"
                placeholder="/videos/clinical.mp4"
              />
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border-2 border-dashed">
                <div className="flex flex-col items-center text-muted-foreground">
                  <Play className="w-8 h-8 mb-2" />
                  <span className="text-xs">Video Preview Not Available</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Currently supports local paths or direct video URLs.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Form>
  );
}
