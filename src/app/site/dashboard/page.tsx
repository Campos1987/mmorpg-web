import { DashboardView } from "@/components/dashboard/DashboardView";
import { dashboardMockData } from "@/mocks/dashboard-mock-data";
import {
  getGamerAccount,
  getGamerAccounts,
  findCharacterRequest,
} from "@/services/gamer-account";
import CreateAccountPage from "./create-account/page";
import type { Character } from "@/types/dashboard";

/**
 * Página inicial do painel do jogador (RSC assíncrono).
 *
 * Fluxo de renderização:
 * 1. Busca `POST /gamer/account` server-side (com JWT da sessão)
 * 2. Sem conta (null)  → exibe <CreateAccountPage /> (onboarding)
 * 3. Com conta         → busca sub-contas
 * 4. Pega o primeiro personagem e busca suas estatísticas reais em `/gamer/findCharacters`
 * 5. Exibe o dashboard com os dados carregados
 */
export default async function DashboardPage() {
  const gamerAccount = await getGamerAccount();

  if (!gamerAccount) {
    return <CreateAccountPage />;
  }

  const subAccounts = await getGamerAccounts();

  // Pega o primeiro personagem do primeiro sub-account para carregamento inicial
  const firstChar = subAccounts[0]?.characters?.[0];
  let initialCharacter: Character | null = null;

  if (firstChar) {
    initialCharacter = await findCharacterRequest(firstChar.id);
  }

  return (
    <DashboardView
      data={{
        ...dashboardMockData,
        subAccounts,   // contas de jogo reais
        characters: [], // não é mais necessário carregar todos globalmente
      }}
      initialCharacter={initialCharacter}
    />
  );
}
