import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import GalleryContent from "@/components/dashboard/gallery-content";
import UploadMediaDialog from "@/components/dashboard/upload-media-dialog";

export default function GalleryPage() {
  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Gallery"
        description="Manage your images and videos"
      >
        <UploadMediaDialog />
      </DashboardPageHeader>

      <GalleryContent />
    </div>
  );
}
