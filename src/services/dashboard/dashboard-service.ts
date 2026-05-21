import type { DashboardMockData } from "@/types/dashboard";

/**
 * Contrato da camada de serviço do dashboard — substituir implementação mock
 * por fetch autenticado (Server Action ou RSC fetch com cookies HttpOnly).
 */
export type DashboardService = {
  getDashboardData: () => Promise<DashboardMockData>;
};

/** Implementação stub — integração API pendente (ver TECH_DEBT.md). */
export const dashboardServiceStub: DashboardService = {
  async getDashboardData() {
    const { dashboardMockData } = await import("@/mocks/dashboard-mock-data");
    return dashboardMockData;
  },
};
