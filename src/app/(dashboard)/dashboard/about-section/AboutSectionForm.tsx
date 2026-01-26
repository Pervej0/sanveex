"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import FormTextArea from "@/components/forms/FormTextArea";
import MediaPickerField from "@/components/forms/MediaPickerField";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  aboutSectionSchema,
  AboutSectionFormValues,
} from "@/actions/about-section/schema";
import { updateAboutSection } from "@/actions/about-section/actions";

interface AboutSectionFormProps {
  initialData?: any;
}

export default function AboutSectionForm({
  initialData,
}: AboutSectionFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: AboutSectionFormValues) => {
    try {
      setLoading(true);
      const res = await updateAboutSection(initialData?.id, data);

      if (res.success) {
        toast.success("About section updated");
        router.refresh();
      } else {
        toast.error(res.error || "Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to save about section");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form<AboutSectionFormValues>
      schema={aboutSectionSchema}
      onSubmit={handleSubmit}
      defaultValues={
        initialData || {
          eyebrow: "About Our Company",
          title: "About Us",
          description: "",
          image: "",
        }
      }
      submitButtonText="Save Changes"
      isSubmitting={loading}
    >
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-full lg:col-span-8 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Section Header</CardTitle>
              <CardDescription>
                Configure the eyebrow and main title
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormInput
                name="eyebrow"
                label="Eyebrow Text"
                placeholder="e.g. About Our Company"
              />
              <FormInput
                name="title"
                label="Main Title"
                placeholder="e.g. About Us"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Main Description</CardTitle>
              <CardDescription>
                Detailed information about your company
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormTextArea
                name="description"
                label="Content"
                placeholder="Write your company overview here..."
                rows={12}
              />
              <p className="text-xs text-muted-foreground mt-2">
                Tip: You can use multiple paragraphs by pressing Enter.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-full lg:col-span-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Featured Image</CardTitle>
              <CardDescription>
                Main image displayed in the section
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MediaPickerField
                name="image"
                label="Section Image"
                description="This image will appear in the center of the About Us section"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </Form>
  );
}
