import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { Button } from "@/components/ui/button";
import ProductForm from "../ProductForm";
import { getAllCategories, getProductById } from "@/actions/products/actions";

interface EditProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);
  const categories = await getAllCategories();

  if (!product) {
    notFound();
  }

  const categoryOptions = categories.map((cat) => ({
    label: cat.name,
    value: cat.id,
  }));

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title={`Edit Product: ${product.name}`}
        description="Update product details, images, and classification"
      >
        <Button variant="outline" asChild>
          <Link href="/dashboard/products" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to List
          </Link>
        </Button>
      </DashboardPageHeader>

      <ProductForm initialData={product} id={id} categories={categoryOptions} />
    </div>
  );
}
