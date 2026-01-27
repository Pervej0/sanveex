import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { Button } from "@/components/ui/button";
import ProductForm from "../ProductForm";
import { getAllCategories } from "@/actions/products/actions";

export default async function NewProductPage() {
  const categories = await getAllCategories();
  const categoryOptions = categories.map((cat) => ({
    label: cat.name,
    value: cat.id,
  }));

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Add New Product"
        description="List a new pharmaceutical or medical product"
      >
        <Button variant="outline" asChild>
          <Link href="/dashboard/products" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to List
          </Link>
        </Button>
      </DashboardPageHeader>

      <ProductForm categories={categoryOptions} />
    </div>
  );
}
