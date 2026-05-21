import { DashboardView } from "@/components/dashboard/DashboardView";
import { dashboardMockData } from "@/mocks/dashboard-mock-data";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardView data={dashboardMockData} />
    </div>
  );
}
