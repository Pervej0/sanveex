import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { getAllProducts } from "@/actions/products/actions";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { Button } from "@/components/ui/button";
import ProductList from "./ProductList";

export default async function ProductsDashboard() {
  const products = await getAllProducts();

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Product Management"
        description="Manage your pharmaceutical and clinical product catalog"
      >
        <Button asChild>
          <Link
            href="/dashboard/products/new"
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </Link>
        </Button>
      </DashboardPageHeader>

      <ProductList products={products} />
    </div>
  );
}
