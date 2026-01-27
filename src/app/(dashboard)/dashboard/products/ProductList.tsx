"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Edit, Trash2, ImageIcon } from "lucide-react";
import { toast } from "sonner";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { deleteProduct } from "@/actions/products/actions";

interface ProductListProps {
  products: any[];
}

export default function ProductTable({ products }: ProductListProps) {
  const [data, setData] = useState(products);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await deleteProduct(id);
      if (res.success) {
        toast.success("Product deleted");
        setData((prev) => prev.filter((item) => item.id !== id));
      } else {
        toast.error(res.error || "Failed to delete");
      }
    } catch {
      toast.error("An error occurred");
    }
  };

  if (data.length === 0) {
    return (
      <div className="text-center py-20 border-2 border-dashed rounded-xl bg-muted/20">
        <p className="text-muted-foreground">
          No products found. Add your first pharmaceutical product!
        </p>
        <Button asChild className="mt-4" variant="outline">
          <Link href="/dashboard/products/new">Add New Product</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((product) => (
            <TableRow key={product.id}>
              {/* Product + Image */}
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 rounded-md overflow-hidden border bg-muted shrink-0">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center">
                        <ImageIcon className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <span className="font-medium">{product.name}</span>
                    {product.subtitle && (
                      <span className="text-xs text-muted-foreground">
                        {product.subtitle}
                      </span>
                    )}
                  </div>
                </div>
              </TableCell>

              {/* Category */}
              <TableCell>
                {product.category ? (
                  <Badge variant="secondary" className="text-xs">
                    {product.category}
                  </Badge>
                ) : (
                  <span className="text-muted-foreground text-xs">—</span>
                )}
              </TableCell>

              {/* Status */}
              <TableCell>
                {product.isActive ? (
                  <Badge className="bg-green-100 text-green-700 border-none">
                    Active
                  </Badge>
                ) : (
                  <Badge className="bg-red-100 text-red-700 border-none">
                    Inactive
                  </Badge>
                )}
              </TableCell>

              {/* SKU */}
              <TableCell className="text-xs text-muted-foreground">
                {product.sku || "—"}
              </TableCell>

              {/* Actions */}
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-blue-600 hover:bg-blue-50"
                    asChild
                  >
                    <Link href={`/dashboard/products/${product.id}`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>

                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-destructive hover:bg-red-50"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
