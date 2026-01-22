import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/config/auth.config";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="min-h-screen bg-[#edf2f7] flex items-center justify-center p-6">
      <div className="max-w-lg w-full">{children}</div>
    </div>
  );
}
