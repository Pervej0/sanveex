"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Edit, Trash2, HelpCircle } from "lucide-react";
import * as LucideIcons from "lucide-react";
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
import { deleteDepartment } from "@/actions/departments/actions";

interface DepartmentListProps {
  departments: any[];
}

export default function DepartmentList({ departments }: DepartmentListProps) {
  const [data, setData] = useState(departments);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this department?")) return;

    try {
      const res = await deleteDepartment(id);
      if (res.success) {
        toast.success("Department deleted");
        setData((prev) => prev.filter((item) => item.id !== id));
      } else {
        toast.error(res.error || "Failed to delete");
      }
    } catch {
      toast.error("An error occurred");
    }
  };

  const getIcon = (name: string, color: string) => {
    // @ts-expect-error dynamic lucide icon
    const Icon = LucideIcons[name] || HelpCircle;
    return <Icon className="h-5 w-5" style={{ color }} />;
  };

  if (data.length === 0) {
    return (
      <div className="text-center py-20 border-2 border-dashed rounded-xl bg-muted/20">
        <p className="text-muted-foreground">
          No departments found. Add your first department!
        </p>
        <Button asChild className="mt-4" variant="outline">
          <Link href="/dashboard/departments/new">Add New Department</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Department</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Color</TableHead>
            <TableHead>Order</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((dept) => (
            <TableRow key={dept.id}>
              {/* Department */}
              <TableCell>
                <div className="flex items-center gap-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${dept.color}20` }}
                  >
                    {getIcon(dept.icon, dept.color)}
                  </div>
                  <span className="font-medium">{dept.title}</span>
                </div>
              </TableCell>

              {/* Status */}
              <TableCell>
                {dept.isActive ? (
                  <Badge className="bg-green-100 text-green-700 border-none">
                    Active
                  </Badge>
                ) : (
                  <Badge className="bg-red-100 text-red-700 border-none">
                    Inactive
                  </Badge>
                )}
              </TableCell>

              {/* Description */}
              <TableCell className="max-w-[320px]">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {dept.description}
                </p>
              </TableCell>

              {/* Color */}
              <TableCell>
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: dept.color }}
                  />
                  <span className="text-xs text-muted-foreground uppercase">
                    {dept.color}
                  </span>
                </div>
              </TableCell>

              {/* Order */}
              <TableCell>
                <Badge variant="outline" className="text-xs">
                  {dept.order}
                </Badge>
              </TableCell>

              {/* Actions */}
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button size="icon" variant="ghost" asChild>
                    <Link href={`/dashboard/departments/${dept.id}`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>

                  <Button
                    size="icon"
                    variant="ghost"
                    className="hover:text-destructive"
                    onClick={() => handleDelete(dept.id)}
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
