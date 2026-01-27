import { getAllProducts, getAllCategories } from "@/actions/products/actions";
import ProductCard from "./ProductCard";
import Link from "next/link";

export default async function ProductListing() {
  const allProducts = await getAllProducts();

  return (
    <div className="space-y-10 mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {allProducts.map((product) => (
          <ProductCard key={product.id} product={product as any} />
        ))}
      </div>

      {allProducts.length === 0 && (
        <div className="text-center py-20 border-2 border-dashed rounded-xl bg-muted/20">
          <p className="text-muted-foreground">
            No products found in this category.
          </p>
        </div>
      )}
    </div>
  );
}
