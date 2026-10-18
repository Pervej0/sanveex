import { notFound } from "next/navigation";
import type { Metadata } from "next";
import DynamicPageRenderer, {
  loadPage,
} from "@/components/shared/DynamicPageRenderer";

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await loadPage("/" + slug.join("/"));

  if (!page) return { title: "Page Not Found" };

  return {
    title: page.title,
    description: page.description ?? undefined,
    keywords: page.keywords ?? undefined,
  };
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const page = await loadPage("/" + slug.join("/"));

  if (!page || !page.isActive) {
    return notFound();
  }

  return <DynamicPageRenderer page={page} />;
}
