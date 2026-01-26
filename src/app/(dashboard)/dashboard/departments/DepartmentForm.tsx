"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import FormTextArea from "@/components/forms/FormTextArea";
import FormSwitch from "@/components/forms/FormSwitch";
import FormNumber from "@/components/forms/FormNumber";
import IconPicker from "@/components/forms/IconPicker";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  departmentSchema,
  DepartmentFormValues,
} from "@/actions/departments/schema";
import {
  createDepartment,
  updateDepartment,
} from "@/actions/departments/actions";

const COLOR_OPTIONS = [
  { label: "Golden Brown", value: "#88734C" },
  { label: "Slate Blue", value: "#A9BBC8" },
  { label: "Navy", value: "#202e44" },
  { label: "Emerald", value: "#10b981" },
  { label: "Rose", value: "#f43f5e" },
];

interface DepartmentFormProps {
  initialData?: any;
  id?: string;
}

export default function DepartmentForm({
  initialData,
  id,
}: DepartmentFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: DepartmentFormValues) => {
    try {
      setLoading(true);
      let res;
      if (id) {
        res = await updateDepartment(id, data);
      } else {
        res = await createDepartment(data);
      }

      if (res.success) {
        toast.success(id ? "Department updated" : "Department created");
        router.push("/dashboard/departments");
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
    <Form<DepartmentFormValues>
      schema={departmentSchema}
      onSubmit={handleSubmit}
      defaultValues={
        initialData || {
          title: "",
          description: "",
          icon: "Heart",
          secondaryIcon: "Sparkles",
          color: "#88734C",
          order: 0,
          isActive: true,
        }
      }
      submitButtonText={id ? "Update Department" : "Create Department"}
      isSubmitting={loading}
    >
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-full lg:col-span-8 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Department Details</CardTitle>
              <CardDescription>
                Content displayed in the Our Departments section
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormInput
                name="title"
                label="Title"
                placeholder="e.g. Cardiology"
              />
              <FormTextArea
                name="description"
                label="Description"
                placeholder="Brief overview of the department..."
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Icons & Visuals</CardTitle>
              <CardDescription>
                Configure the icons and color theme
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
                  label="Secondary Icon (Small overlay)"
                  placeholder="Choose secondary icon"
                />
                <div className="md:col-span-2">
                  <FormInput
                    name="color"
                    label="Theme Color (Hex)"
                    type="color"
                    className="h-14"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-full lg:col-span-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Display and order settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormNumber name="order" label="Display Order" />
              <FormSwitch
                name="isActive"
                label="Is Active"
                description="Show this department on the home page"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </Form>
  );
}
