import ProductGrid from "./ProductGrid";
import { listProducts, listCategories } from "@/lib/products";

export default async function ProductListing() {
  const [products, categories] = await Promise.all([
    listProducts(),
    listCategories(),
  ]);

  return (
    <ProductGrid
      products={products as any}
      categories={categories as any}
    />
  );
}
