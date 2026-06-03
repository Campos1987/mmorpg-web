import { DashboardView } from "@/components/dashboard/DashboardView";
import { dashboardMockData } from "@/mocks/dashboard-mock-data";
import {
  getGamerAccount,
  getGamerAccounts,
  getCharactersFromApi,
} from "@/services/gamer-account";
import CreateAccountPage from "./create-account/page";

/**
 * Página inicial do painel do jogador (RSC assíncrono).
 *
 * Fluxo de renderização:
 * 1. Busca `POST /gamer/account` server-side (com JWT da sessão)
 * 2. Sem conta (null)  → exibe <CreateAccountPage /> (onboarding)
 * 3. Com conta         → busca sub-contas e personagens em paralelo
 *                        e exibe <DashboardView /> com dados reais
 *
 * Erros de rede inesperados propagam para o Error Boundary do layout.
 */
export default async function DashboardPage() {
  const gamerAccount = await getGamerAccount();

  if (!gamerAccount) {
    return <CreateAccountPage />;
  }

  // Busca sub-contas e personagens em paralelo (mesma chamada de rede — ambos
  // usam fetchGamerAccount internamente, que é cache:"no-store")
  const [subAccounts, characters] = await Promise.all([
    getGamerAccounts(),
    getCharactersFromApi(),
  ]);

  return (
    <DashboardView
      data={{
        ...dashboardMockData,
        subAccounts,   // contas de jogo reais
        characters,    // personagens reais com CP/HP/MP da API
      }}
    />
  );
}
