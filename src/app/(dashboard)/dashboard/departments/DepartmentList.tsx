"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Edit, Trash2, CheckCircle, XCircle, GripVertical } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { deleteDepartment } from "@/actions/departments/actions";
import { cn } from "@/lib/utils";

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
        setData(data.filter((item) => item.id !== id));
      } else {
        toast.error(res.error || "Failed to delete");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const getIcon = (name: string, color: string) => {
    // @ts-expect-error - Dynamic lucide icon access
    const Icon = LucideIcons[name] || LucideIcons.HelpCircle;
    return <Icon className="w-5 h-5 md:w-6 md:h-6" style={{ color }} />;
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
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {data.map((dept) => (
        <Card
          key={dept.id}
          className="overflow-hidden group hover:border-primary/50 transition-all hover:shadow-md"
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div
                className="p-3 rounded-xl"
                style={{ backgroundColor: `${dept.color}15` }}
              >
                {getIcon(dept.icon, dept.color)}
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost" className="h-8 w-8" asChild>
                  <Link href={`/dashboard/departments/${dept.id}`}>
                    <Edit className="w-4 h-4 text-muted-foreground" />
                  </Link>
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 hover:text-destructive"
                  onClick={() => handleDelete(dept.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg">{dept.title}</h3>
                {dept.isActive ? (
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-700 border-none h-5 px-1.5 text-[10px]"
                  >
                    Active
                  </Badge>
                ) : (
                  <Badge
                    variant="destructive"
                    className="bg-red-100 text-red-700 border-none h-5 px-1.5 text-[10px]"
                  >
                    Inactive
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {dept.description}
              </p>
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: dept.color }}
                />
                <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  {dept.color}
                </span>
              </div>
              <Badge variant="outline" className="text-[10px]">
                Order: {dept.order}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
