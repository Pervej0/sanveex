import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Users, DollarSign, Activity, CreditCard } from "lucide-react";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Dashboard"
        description="Welcome to your administrative overview"
      >
        {/* Example Action Buttons could go here */}
      </DashboardPageHeader>

      {/* Main Content Area Placeholder */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>
              Recent sales contributions chart placeholder.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-900/20 rounded-md border border-dashed border-zinc-200 dark:border-zinc-800">
            <span className="text-sm text-zinc-500">Chart Area</span>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>You made 265 sales this month.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="h-9 w-9 rounded-full bg-zinc-100 dark:bg-zinc-800" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">User {i}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      user{i}@example.com
                    </p>
                  </div>
                  <div className="text-sm font-medium">+$1,999.00</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
