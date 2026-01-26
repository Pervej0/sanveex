"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import FormTextArea from "@/components/forms/FormTextArea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { faqSectionSchema, FaqSectionFormValues } from "@/actions/faqs/schema";
import { updateFaqSection } from "@/actions/faqs/actions";

interface FaqSectionFormProps {
  initialData?: any;
}

export default function FaqSectionForm({ initialData }: FaqSectionFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: FaqSectionFormValues) => {
    try {
      setLoading(true);
      const res = await updateFaqSection(initialData?.id, data);

      if (res.success) {
        toast.success("FAQ section updated");
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
    <Form<FaqSectionFormValues>
      schema={faqSectionSchema}
      onSubmit={handleSubmit}
      defaultValues={
        initialData || {
          title: "Common Questions",
          description:
            "Managing a small business today is already tough. We are here to help clear up any confusion so you can focus on growth.",
          buttonText: "Any questions? Reach out",
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
                Main heading and introductory text for the FAQ section
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormInput name="title" label="Section Title" />
              <FormTextArea
                name="description"
                label="Intro Description"
                rows={4}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Call to Action</CardTitle>
              <CardDescription>Configure the side button</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput name="buttonText" label="Button Text" />
              <FormInput name="buttonLink" label="Button Link" />
            </CardContent>
          </Card>
        </div>
      </div>
    </Form>
  );
}
