import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { getAllEnquiries } from "@/actions/enquiries/actions";
import EnquiryList from "./EnquiryList";

export const dynamic = "force-dynamic";

export default async function EnquiriesPage() {
  const enquiries = await getAllEnquiries();

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Contact Enquiries"
        description="Messages submitted through the website contact form"
      />

      <EnquiryList enquiries={enquiries as any} />
    </div>
  );
}
