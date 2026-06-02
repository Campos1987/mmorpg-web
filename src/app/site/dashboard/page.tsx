import { DashboardView } from "@/components/dashboard/DashboardView";
import { dashboardMockData } from "@/mocks/dashboard-mock-data";
import { getGamerAccount, getGamerAccounts } from "@/services/gamer-account";
import CreateAccountPage from "./create-account/page";

/**
 * Página inicial do painel do jogador (RSC assíncrono).
 *
 * Fluxo de renderização:
 * 1. Busca `GET /gamer/account` server-side (com JWT da sessão)
 * 2. Sem conta (null)  → exibe <CreateAccountPage /> (onboarding)
 * 3. Com conta         → busca lista de sub-contas e exibe <DashboardView />
 *
 * Erros de rede inesperados propagam para o Error Boundary do layout.
 */
export default async function DashboardPage() {
  const gamerAccount = await getGamerAccount();

  if (!gamerAccount) {
    return <CreateAccountPage />;
  }

  // Busca as contas de jogo reais para o dropdown (GET /gamer/account)
  const subAccounts = await getGamerAccounts();

  return (
    <DashboardView
      data={{
        ...dashboardMockData,
        subAccounts, // substitui o mock pela conta real da API
      }}
    />
  );
}
