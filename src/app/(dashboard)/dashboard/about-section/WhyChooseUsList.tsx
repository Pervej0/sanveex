"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  MoveLeft,
  MoveRight,
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { deleteWhyChooseUs } from "@/actions/why-choose-us/actions";

interface WhyChooseUsListProps {
  entries: any[];
}

export default function WhyChooseUsList({ entries }: WhyChooseUsListProps) {
  const [data, setData] = useState(entries);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service entry?")) return;

    try {
      const res = await deleteWhyChooseUs(id);
      if (res.success) {
        toast.success("Entry deleted");
        setData(data.filter((item) => item.id !== id));
      } else {
        toast.error(res.error || "Failed to delete");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const getIcon = (name: string) => {
    // @ts-expect-error - Dynamic lucide icon access
    const Icon = LucideIcons[name] || LucideIcons.HelpCircle;
    return <Icon className="w-5 h-5" />;
  };

  if (data.length === 0) {
    return (
      <div className="text-center py-20 border-2 border-dashed rounded-xl bg-muted/20">
        <p className="text-muted-foreground">
          No services found. Add your first service benefit!
        </p>
        <Button asChild className="mt-4" variant="outline">
          <Link href="/dashboard/about-section/new-benefit">
            Add New Benefit
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            <MoveLeft className="w-4 h-4" /> Left Side Services
          </div>
          {data
            .filter((i) => i.position === "left")
            .map((entry) => (
              <EntryCard
                key={entry.id}
                entry={entry}
                getIcon={getIcon}
                onDelete={handleDelete}
              />
            ))}
        </div>

        {/* Right Column Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Right Side Services <MoveRight className="w-4 h-4" />
          </div>
          {data
            .filter((i) => i.position === "right")
            .map((entry) => (
              <EntryCard
                key={entry.id}
                entry={entry}
                getIcon={getIcon}
                onDelete={handleDelete}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

function EntryCard({
  entry,
  getIcon,
  onDelete,
}: {
  entry: any;
  getIcon: any;
  onDelete: any;
}) {
  return (
    <Card className="overflow-hidden group hover:border-primary/50 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            {getIcon(entry.icon)}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-sm truncate">{entry.title}</h3>
              {entry.isActive ? (
                <CheckCircle className="w-3.5 h-3.5 text-green-500" />
              ) : (
                <XCircle className="w-3.5 h-3.5 text-red-500" />
              )}
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {entry.description}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className="text-[10px]">
                Order: {entry.order}
              </Badge>
              {entry.secondaryIcon && (
                <Badge
                  variant="secondary"
                  className="text-[10px] bg-blue-50 text-blue-700 border-none"
                >
                  {entry.secondaryIcon}
                </Badge>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              size="icon-sm"
              variant="outline"
              asChild
              className="h-8 w-8"
            >
              <Link href={`/dashboard/about-section/benefit/${entry.id}`}>
                <Edit className="w-3.5 h-3.5" />
              </Link>
            </Button>
            <Button
              size="icon-sm"
              variant="outline"
              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => onDelete(entry.id)}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
