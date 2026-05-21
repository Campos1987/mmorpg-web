import { DashboardView } from "@/components/dashboard/DashboardView";
import { dashboardMockData } from "@/mocks/dashboard-mock-data";

export default function DashboardPage() {
  return <DashboardView data={dashboardMockData} />;
}
