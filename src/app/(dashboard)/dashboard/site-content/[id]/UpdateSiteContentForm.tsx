"use client";

import React, { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import FormTextArea from "@/components/forms/FormTextArea";
import { Button } from "@/components/ui/button";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { updateSiteContentById } from "@/actions/site-content/site-content";
import {
  SiteContentFormValues,
  siteContentSchema,
} from "@/actions/site-content/schema";

interface UpdateSiteContentFormProps {
  id: string;
  initialData: any;
}

export default function UpdateSiteContentForm({
  id,
  initialData,
}: UpdateSiteContentFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Transform socialLinks from JSON to flat fields for form
  const defaultValues = {
    ...initialData,
    facebook: initialData.socialLinks?.facebook || "",
    twitter: initialData.socialLinks?.twitter || "",
    instagram: initialData.socialLinks?.instagram || "",
    linkedin: initialData.socialLinks?.linkedin || "",
  };

  const handleSubmit = async (data: SiteContentFormValues) => {
    try {
      setLoading(true);

      const res = await updateSiteContentById(id, {
        name: data.name,
        tagline: data.tagline,
        title: data.title,
        description: data.description,
        logoUrl: data.logoUrl,
        email: data.email,
        phone: data.phone,
        whatsapp: data.whatsapp,
        address: data.address,
        facebook: data.facebook,
        twitter: data.twitter,
        instagram: data.instagram,
        linkedin: data.linkedin,
      });
      toast.success("Site content updated");
      router.push("/dashboard/site-content");
    } catch {
      toast.error("Failed to update site content");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Update Site Content"
        description="Modify your website's branding and contact information"
      >
        <Button onClick={() => router.push("/dashboard/site-content")}>
          Cancel
        </Button>
      </DashboardPageHeader>

      <Form<SiteContentFormValues>
        schema={siteContentSchema}
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
        submitButtonText="Save Changes"
        isSubmitting={loading}
      >
        <div className="grid grid-cols-12 gap-6 ">
          <div className="col-span-full lg:col-span-8 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>General Information</CardTitle>
                <CardDescription>
                  Branding and SEO configuration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    name="name"
                    label="Company Name"
                    placeholder="e.g. Acme Corp"
                  />
                  <FormInput
                    name="tagline"
                    label="Tagline"
                    placeholder="e.g. Innovation at its best"
                  />
                  <div className="md:col-span-2">
                    <FormInput
                      name="title"
                      label="SEO Title"
                      placeholder="e.g. Acme Corp | Best Solutions"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <FormTextArea
                      name="description"
                      label="Description"
                      placeholder="Briefly describe your company..."
                    />
                  </div>
                  <div className="md:col-span-2">
                    <FormInput
                      name="logoUrl"
                      label="Logo URL"
                      placeholder="https://example.com/logo.png"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Primary business contact details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    name="email"
                    label="Email"
                    placeholder="contact@example.com"
                  />
                  <FormInput
                    name="phone"
                    label="Phone"
                    placeholder="+1 234 567 890"
                  />
                  <FormInput
                    name="whatsapp"
                    label="WhatsApp"
                    placeholder="+1 234 567 890"
                  />
                  <div className="md:col-span-2">
                    <FormTextArea
                      name="address"
                      label="Address"
                      placeholder="123 Main St, City, Country"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="col-span-full lg:col-span-4">
            <div className="grid auto-rows-max gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Social Links</CardTitle>
                  <CardDescription>Public social media URLs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <FormInput
                      name="facebook"
                      label="Facebook URL"
                      placeholder="https://facebook.com/yourpage"
                    />
                    <FormInput
                      name="twitter"
                      label="Twitter URL"
                      placeholder="https://twitter.com/yourhandle"
                    />
                    <FormInput
                      name="instagram"
                      label="Instagram URL"
                      placeholder="https://instagram.com/yourprofile"
                    />
                    <FormInput
                      name="linkedin"
                      label="LinkedIn URL"
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}
