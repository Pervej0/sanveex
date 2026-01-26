"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import FormTextArea from "@/components/forms/FormTextArea";
import FormSwitch from "@/components/forms/FormSwitch";
import FormNumber from "@/components/forms/FormNumber";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { faqSchema, FaqFormValues } from "@/actions/faqs/schema";
import { createFaq, updateFaq } from "@/actions/faqs/actions";

interface FaqFormProps {
  initialData?: any;
  id?: string;
}

export default function FaqForm({ initialData, id }: FaqFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: FaqFormValues) => {
    try {
      setLoading(true);
      let res;
      if (id) {
        res = await updateFaq(id, data);
      } else {
        res = await createFaq(data);
      }

      if (res.success) {
        toast.success(id ? "FAQ updated" : "FAQ created");
        router.push("/dashboard/faqs");
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
    <Form<FaqFormValues>
      schema={faqSchema}
      onSubmit={handleSubmit}
      defaultValues={
        initialData || {
          question: "",
          answer: "",
          isActive: true,
          order: 0,
        }
      }
      submitButtonText={id ? "Update FAQ" : "Create FAQ"}
      isSubmitting={loading}
    >
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-full lg:col-span-8 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>FAQ Content</CardTitle>
              <CardDescription>
                Enter the question and its corresponding answer
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormInput
                name="question"
                label="Question"
                placeholder="e.g. How do I get started?"
              />
              <FormTextArea
                name="answer"
                label="Answer"
                placeholder="Enter the detailed answer..."
                rows={6}
              />
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
                description="Show this FAQ on the home page"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </Form>
  );
}
