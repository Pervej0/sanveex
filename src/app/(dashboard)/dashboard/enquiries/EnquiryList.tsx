"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  CheckCircle2,
  Circle,
  Mail,
  MapPin,
  Phone,
  Trash2,
  Building2,
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  deleteEnquiry,
  setEnquiryRead,
} from "@/actions/enquiries/actions";
import { cn } from "@/lib/utils";

export type EnquiryRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  topic: string;
  message: string;
  isRead: boolean;
  createdAt: Date | string;
};

export default function EnquiryList({ enquiries }: { enquiries: EnquiryRow[] }) {
  const [rows, setRows] = useState(enquiries);
  const [selectedId, setSelectedId] = useState<string | null>(
    enquiries[0]?.id ?? null,
  );
  const [isPending, startTransition] = useTransition();

  const selected = rows.find((row) => row.id === selectedId) ?? null;
  const unread = rows.filter((row) => !row.isRead).length;

  const toggleRead = (row: EnquiryRow) => {
    const next = !row.isRead;
    setRows((prev) =>
      prev.map((item) => (item.id === row.id ? { ...item, isRead: next } : item)),
    );
    startTransition(async () => {
      const result = await setEnquiryRead(row.id, next);
      if (!result.success) toast.error("Could not update the enquiry.");
    });
  };

  const remove = (row: EnquiryRow) => {
    setRows((prev) => prev.filter((item) => item.id !== row.id));
    if (selectedId === row.id) setSelectedId(null);
    startTransition(async () => {
      const result = await deleteEnquiry(row.id);
      if (result.success) toast.success("Enquiry deleted.");
      else toast.error("Could not delete the enquiry.");
    });
  };

  if (rows.length === 0) {
    return (
      <div className="rounded-xl border-2 border-dashed border-border bg-muted/20 py-20 text-center">
        <Mail className="mx-auto h-8 w-8 text-muted-foreground" />
        <p className="mt-4 font-semibold text-foreground">No enquiries yet</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Messages submitted through the website contact form appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* List */}
      <div className="lg:col-span-5">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {rows.length} total ·{" "}
            <span className="font-semibold text-foreground">
              {unread} unread
            </span>
          </p>
        </div>

        <div className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
          {rows.map((row) => (
            <button
              key={row.id}
              type="button"
              onClick={() => setSelectedId(row.id)}
              className={cn(
                "block w-full px-4 py-3.5 text-left transition-colors",
                selectedId === row.id ? "bg-accent" : "hover:bg-muted/60",
              )}
            >
              <div className="flex items-center gap-2">
                {row.isRead ? (
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                ) : (
                  <Circle className="h-3.5 w-3.5 shrink-0 fill-primary text-primary" />
                )}
                <span
                  className={cn(
                    "truncate text-sm",
                    row.isRead ? "font-medium" : "font-bold",
                  )}
                >
                  {row.name}
                </span>
                <span className="ml-auto shrink-0 text-[11px] text-muted-foreground">
                  {format(new Date(row.createdAt), "dd MMM")}
                </span>
              </div>
              <p className="mt-1 truncate pl-5.5 text-xs text-muted-foreground">
                {row.topic} — {row.message}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Detail */}
      <div className="lg:col-span-7">
        {selected ? (
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <span className="inline-block rounded-full bg-brand-teal-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-brand-teal-700">
                  {selected.topic}
                </span>
                <h2 className="mt-3 text-xl font-bold">{selected.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {format(
                    new Date(selected.createdAt),
                    "dd MMMM yyyy 'at' HH:mm",
                  )}
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={isPending}
                  onClick={() => toggleRead(selected)}
                >
                  {selected.isRead ? "Mark unread" : "Mark read"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={isPending}
                  onClick={() => remove(selected)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <dl className="mt-6 grid gap-3 border-y border-border py-5 text-sm sm:grid-cols-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a
                  href={`mailto:${selected.email}`}
                  className="text-primary underline-offset-4 hover:underline"
                >
                  {selected.email}
                </a>
              </div>
              {selected.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={`tel:${selected.phone}`}
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    {selected.phone}
                  </a>
                </div>
              )}
              {selected.company && (
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span>{selected.company}</span>
                </div>
              )}
            </dl>

            <div className="mt-6">
              <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground">
                Message
              </h3>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed">
                {selected.message}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <a
                  href={`mailto:${selected.email}?subject=${encodeURIComponent(
                    `Re: ${selected.topic}`,
                  )}`}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Reply by email
                </a>
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex h-full min-h-64 items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 p-8 text-center">
            <p className="text-sm text-muted-foreground">
              Select an enquiry to read it.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
