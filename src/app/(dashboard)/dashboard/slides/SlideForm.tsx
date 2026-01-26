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
import { Separator } from "@/components/ui/separator";
import { slideSchema, SlideFormValues } from "@/actions/slides/schema";
import { createSlide, updateSlide } from "@/actions/slides/slide";

interface SlideFormProps {
  initialData?: any;
  id?: string;
}

export default function SlideForm({ initialData, id }: SlideFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: SlideFormValues) => {
    try {
      setLoading(true);
      let res;
      if (id) {
        res = await updateSlide(id, data);
      } else {
        res = await createSlide(data);
      }

      if (res.success) {
        toast.success(id ? "Slide updated" : "Slide created");
        router.push("/dashboard/slides");
        router.refresh();
      } else {
        toast.error(res.error || "Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to save slide");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form<SlideFormValues>
      schema={slideSchema}
      onSubmit={handleSubmit}
      defaultValues={
        initialData || {
          subtitle: "",
          title: "",
          description: "",
          buttonText: "Get In Touch",
          buttonLink: "#contact",
          secondaryButtonText: "Learn More",
          secondaryButtonLink: "#about",
          backgroundImage: "",
          isActive: true,
          order: 0,
        }
      }
      submitButtonText={id ? "Update Slide" : "Create Slide"}
      isSubmitting={loading}
    >
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-full lg:col-span-8 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Slide Content</CardTitle>
              <CardDescription>
                Main text and descriptions for the hero slide
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormInput
                name="subtitle"
                label="Subtitle"
                placeholder="e.g. Patient-Centered Care"
              />
              <FormInput
                name="title"
                label="Title"
                placeholder="e.g. Planning For Patient Support Program"
              />
              <FormTextArea
                name="description"
                label="Description"
                placeholder="Main description text..."
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions & Buttons</CardTitle>
              <CardDescription>
                Configure the call-to-action buttons
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <FormInput name="buttonText" label="Primary Button Text" />
                  <FormInput name="buttonLink" label="Primary Button Link" />
                </div>
                <div className="space-y-4">
                  <FormInput
                    name="secondaryButtonText"
                    label="Secondary Button Text"
                  />
                  <FormInput
                    name="secondaryButtonLink"
                    label="Secondary Button Link"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-full lg:col-span-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Media & Settings</CardTitle>
              <CardDescription>
                Background image and display options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <MediaPickerField
                name="backgroundImage"
                label="Background Image"
                description="Selected image will be used as the hero slide background"
              />
              <Separator className="my-2" />
              <FormNumber name="order" label="Display Order" />
              <FormSwitch
                name="isActive"
                label="Is Active"
                description="Toggle visibility on the home page"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </Form>
  );
}
