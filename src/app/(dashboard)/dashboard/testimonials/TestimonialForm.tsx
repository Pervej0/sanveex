"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import FormTextArea from "@/components/forms/FormTextArea";
import FormSwitch from "@/components/forms/FormSwitch";
import FormNumber from "@/components/forms/FormNumber";
import MediaPickerField from "@/components/forms/MediaPickerField";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  testimonialSchema,
  TestimonialFormValues,
} from "@/actions/testimonials/schema";
import {
  createTestimonial,
  updateTestimonial,
} from "@/actions/testimonials/actions";

interface TestimonialFormProps {
  initialData?: any;
  id?: string;
}

export default function TestimonialForm({
  initialData,
  id,
}: TestimonialFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: TestimonialFormValues) => {
    try {
      setLoading(true);
      let res;
      if (id) {
        res = await updateTestimonial(id, data);
      } else {
        res = await createTestimonial(data);
      }

      if (res.success) {
        toast.success(id ? "Review updated" : "Review created");
        router.push("/dashboard/testimonials");
        router.refresh();
      } else {
        toast.error(res.error || "Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to save review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form<TestimonialFormValues>
      schema={testimonialSchema}
      onSubmit={handleSubmit}
      defaultValues={
        initialData || {
          name: "",
          role: "",
          text: "",
          image:
            "https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small_2x/Basic_Ui__28186_29.jpg",
          isActive: true,
          order: 0,
        }
      }
      submitButtonText={id ? "Update Review" : "Add Review"}
      isSubmitting={loading}
    >
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-full lg:col-span-8 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Review Content</CardTitle>
              <CardDescription>
                What did the client say about your service?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  name="name"
                  label="Client Name"
                  placeholder="e.g. Reta Schmidt"
                />
                <FormInput
                  name="role"
                  label="Client Role"
                  placeholder="e.g. Patient"
                />
              </div>
              <FormTextArea
                name="text"
                label="Review Text"
                placeholder="Write the testimonial here..."
                rows={6}
              />
            </CardContent>
          </Card>
        </div>

        <div className="col-span-full lg:col-span-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Client Photo</CardTitle>
              <CardDescription>
                Upload or select the client&apos;s picture
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MediaPickerField
                name="image"
                label="Photo"
                description="Small profile picture for the review"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Display Settings</CardTitle>
              <CardDescription>Control visibility and ordering</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormNumber name="order" label="Display Order" />
              <FormSwitch
                name="isActive"
                label="Is Active"
                description="Show this review in the website slider"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </Form>
  );
}
