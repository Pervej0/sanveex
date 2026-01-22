import { getSiteContentById } from "@/actions/site-content/site-content";
import { notFound } from "next/navigation";
import UpdateSiteContentForm from "./UpdateSiteContentForm";

type prams = {
  params: Promise<{ id: string }>;
};

export default async function UpdateSiteContentPage({ params }: prams) {
  const { id } = await params;
  const content = await getSiteContentById(id);

  if (!content) {
    notFound();
  }

  return <UpdateSiteContentForm id={id} initialData={content} />;
}
