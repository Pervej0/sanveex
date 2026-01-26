"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import FormTextArea from "@/components/forms/FormTextArea";
import FormSwitch from "@/components/forms/FormSwitch";
import FormNumber from "@/components/forms/FormNumber";
import FormSelect from "@/components/forms/FormSelect";
import IconPicker from "@/components/forms/IconPicker";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  whyChooseUsSchema,
  WhyChooseUsFormValues,
} from "@/actions/why-choose-us/schema";
import {
  createWhyChooseUs,
  updateWhyChooseUs,
} from "@/actions/why-choose-us/actions";

const positionOptions = [
  { label: "Left Side", value: "left" },
  { label: "Right Side", value: "right" },
];

interface WhyChooseUsFormProps {
  initialData?: any;
  id?: string;
}

export default function WhyChooseUsForm({
  initialData,
  id,
}: WhyChooseUsFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: WhyChooseUsFormValues) => {
    try {
      setLoading(true);
      let res;
      if (id) {
        res = await updateWhyChooseUs(id, data);
      } else {
        res = await createWhyChooseUs(data);
      }

      if (res.success) {
        toast.success(id ? "Service updated" : "Service created");
        router.push("/dashboard/about-section");
        router.refresh();
      } else {
        toast.error(res.error || "Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to save entry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form<WhyChooseUsFormValues>
      schema={whyChooseUsSchema}
      onSubmit={handleSubmit}
      defaultValues={
        initialData || {
          title: "",
          description: "",
          icon: "Pen",
          secondaryIcon: "Sparkles",
          position: "left",
          order: 0,
          isActive: true,
        }
      }
      submitButtonText={id ? "Update Service" : "Create Service"}
      isSubmitting={loading}
    >
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-full lg:col-span-8 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Service Details</CardTitle>
              <CardDescription>
                Content displayed in the Why Choose Us section
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormInput
                name="title"
                label="Title"
                placeholder="e.g. Importing Innovation"
              />
              <FormTextArea
                name="description"
                label="Description"
                placeholder="Explain the benefit..."
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Icons & Visuals</CardTitle>
              <CardDescription>
                Configure the icons for this service
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <IconPicker
                  name="icon"
                  label="Primary Icon"
                  placeholder="Choose primary icon"
                  required
                />
                <IconPicker
                  name="secondaryIcon"
                  label="Secondary Icon"
                  description="Small overlay icon (optional)"
                  placeholder="Choose overlay icon"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-full lg:col-span-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Display and positioning</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormSelect
                name="position"
                label="Layout Position"
                options={positionOptions}
              />
              <FormNumber name="order" label="Display Order" />
              <FormSwitch
                name="isActive"
                label="Is Active"
                description="Show this service on the home page"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </Form>
  );
}
