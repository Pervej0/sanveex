import prisma from "@/lib/prisma";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Globe, Phone, Share2, Edit3 } from "lucide-react";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { getSiteContent } from "@/actions/site-content/site-content";

export default async function SiteContentPage() {
  const content = await getSiteContent();

  if (!content) {
    return <div className="p-6">No site content found.</div>;
  }

  return (
    <div className="space-y-8 ">
      <DashboardPageHeader
        title="Site Content"
        description="Centralized branding & communication settings"
      >
        <Button asChild className="gap-2">
          <Link href={`/dashboard/site-content/${content.id}`}>
            <Edit3 className="h-4 w-4" />
            Update Content
          </Link>
        </Button>
      </DashboardPageHeader>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* General Info (2 cols) */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center gap-2">
            <Globe className="h-5 w-5 text-muted-foreground" />
            <CardTitle>General Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <Info label="Company Name" value={content.name} />
            <Info label="Tagline" value={content.tagline} />
            <Info label="SEO Title" value={content.title} />
            <Separator />
            <Info label="Description" value={content.description} multiline />
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Phone className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <Info label="Email" value={content.email} />
            <Info label="Phone" value={content.phone} />
            <Info label="WhatsApp" value={content.whatsapp} />
            <Separator />
            <Info label="Address" value={content.address} multiline />
          </CardContent>
        </Card>

        {/* Social Links (Full width) */}
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center gap-2">
            <Share2 className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Social Presence</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(content.socialLinks as Record<string, string>).map(
              ([key, value]) => (
                <SocialItem key={key} label={key} value={value} />
              ),
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/* ---------- Components ---------- */

function Info({
  label,
  value,
  multiline = false,
}: {
  label: string;
  value: string;
  multiline?: boolean;
}) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <span
        className={`col-span-2 text-sm ${multiline ? "leading-relaxed" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}

function SocialItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border p-4 space-y-1 hover:bg-muted/40 transition">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <a
        href={value}
        target="_blank"
        className="text-sm text-primary hover:underline break-all"
      >
        {value}
      </a>
    </div>
  );
}
