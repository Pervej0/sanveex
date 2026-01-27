"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import FormTextArea from "@/components/forms/FormTextArea";
import FormSwitch from "@/components/forms/FormSwitch";
import FormSelect from "@/components/forms/FormSelect";
import MediaPickerField from "@/components/forms/MediaPickerField";
import FormRichTextEditor from "@/components/forms/FormRichTextEditor";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, X, Image as ImageIcon } from "lucide-react";
import { productSchema, ProductFormValues } from "@/actions/products/schema";
import { createProduct, updateProduct } from "@/actions/products/actions";
import MediaSelector from "@/components/dashboard/media-selector";
import Image from "next/image";

import { useFormContext, useFieldArray } from "react-hook-form";

import { generateSlugFromTitle } from "@/lib/admin-utils";
import { Trash2 } from "lucide-react";

interface ProductFormProps {
  initialData?: any;
  id?: string;
  categories: { label: string; value: string }[];
}

function FormSlugSync() {
  const { watch, setValue } = useFormContext();
  const name = watch("name");
  const slug = watch("slug");

  React.useEffect(() => {
    if (name && (!slug || slug.trim() === "" || slug === "/")) {
      const generatedSlug = generateSlugFromTitle(name).replace(/^\//, "");
      setValue("slug", generatedSlug, { shouldValidate: true });
    }
  }, [name, slug, setValue]);

  return null;
}

function LinksField() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
  });

  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="flex gap-3 items-end bg-muted/20 p-3 rounded-lg border border-dashed"
        >
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
            <FormInput
              name={`links.${index}.label`}
              label="Link Label"
              placeholder="e.g. Brochure, Scientific Paper"
            />
            <FormInput
              name={`links.${index}.link`}
              label="URL"
              placeholder="https://..."
            />
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-destructive h-10 w-10 flex-shrink-0"
            onClick={() => remove(index)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={() => append({ label: "", link: "" })}
      >
        <Plus className="w-4 h-4" />
        Add External Link
      </Button>
    </div>
  );
}

export default function ProductForm({
  initialData,
  id,
  categories,
}: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [gallery, setGallery] = useState<string[]>(initialData?.gallery || []);

  const handleSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);

      const submitData = {
        ...data,
        gallery,
        slug: data.slug.startsWith("/") ? data.slug.substring(1) : data.slug,
        price: data.price ? parseFloat(data.price.toString()) : undefined,
        categoryId: data.categoryId || undefined,
        description: data.description || undefined,
        content: data.content || undefined,
      };

      let res;
      if (id) {
        res = await updateProduct(id, submitData);
      } else {
        res = await createProduct(submitData);
      }

      if (res.success) {
        toast.success(id ? "Product updated" : "Product created");
        router.push("/dashboard/products");
        router.refresh();
      } else {
        toast.error(res.error || "Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  const removeFromGallery = (url: string) => {
    setGallery(gallery.filter((item) => item !== url));
  };

  const addToGallery = (url: string) => {
    if (!gallery.includes(url)) {
      setGallery([...gallery, url]);
    }
    setIsGalleryOpen(false);
  };

  return (
    <Form<ProductFormValues>
      schema={productSchema}
      onSubmit={handleSubmit}
      defaultValues={
        initialData
          ? {
              ...initialData,
              price: initialData.price || undefined,
              categoryId: initialData.categoryId || undefined,
              links: initialData.links || [],
            }
          : {
              name: "",
              url: "",
              genericName: "",
              slug: "",
              description: "",
              content: "",
              image: "",
              gallery: [],
              links: [],
              isActive: true,
              isFeatured: false,
              order: 0,
            }
      }
      submitButtonText={id ? "Update Product" : "Create Product"}
      isSubmitting={loading}
    >
      <FormSlugSync />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-full lg:col-span-8 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Main product details and content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  name="name"
                  label="Product Name"
                  placeholder="e.g. Sanveex-500"
                />
                <FormInput
                  name="slug"
                  label="URL Slug"
                  placeholder="e.g. sanveex-500"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  name="url"
                  label="Official Website URL"
                  placeholder="e.g. sanveex.com"
                />
                <FormInput
                  name="genericName"
                  label="Generic Name"
                  placeholder="e.g. (Interferon gamma-1b)"
                />
              </div>
              <FormTextArea
                name="description"
                label="Short Description"
                placeholder="Brief summary for listings..."
              />
              <FormRichTextEditor
                name="content"
                label="Detailed Description / Usage"
                placeholder="Compose your product details here..."
                minHeight={400}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>External Resources & Links</CardTitle>
              <CardDescription>
                Add brochures, scientific papers, or other external references
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LinksField />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Product Gallery</CardTitle>
              <CardDescription>
                Additional images for the product showcase
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {gallery.map((url, index) => (
                  <div
                    key={index}
                    className="relative group aspect-square rounded-xl border overflow-hidden bg-muted"
                  >
                    <Image
                      src={url}
                      alt={`Gallery ${index}`}
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeFromGallery(url)}
                      className="absolute top-1 right-1 p-1 bg-destructive text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setIsGalleryOpen(true)}
                  className="aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center hover:bg-muted/50 transition-colors"
                >
                  <Plus className="w-6 h-6 text-muted-foreground mb-1" />
                  <span className="text-xs text-muted-foreground text-center px-2">
                    Add Image
                  </span>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-full lg:col-span-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Media</CardTitle>
              <CardDescription>Main featured image</CardDescription>
            </CardHeader>
            <CardContent>
              <MediaPickerField name="image" label="Featured Image" required />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Classification & Pricing</CardTitle>
              <CardDescription>Organization and price</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormSelect
                name="categoryId"
                label="Category"
                options={categories}
                placeholder="Select a category"
              />
              <FormInput
                name="price"
                label="Price (Optional)"
                type="number"
                placeholder="0.00"
              />
              <FormInput name="order" label="Display Order" type="number" />
              <div className="space-y-4 pt-2">
                <FormSwitch
                  name="isActive"
                  label="Visible on Site"
                  description="If disabled, product will be hidden"
                />
                <FormSwitch
                  name="isFeatured"
                  label="Featured Product"
                  description="Show on homepage or featured sections"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <MediaSelector
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        onSelect={addToGallery}
      />
    </Form>
  );
}
