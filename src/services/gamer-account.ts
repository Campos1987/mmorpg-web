/**
 * Service server-only: busca a gamer account vinculada ao JWT da sessão.
 *
 * Regras de negócio:
 * - Retorna `null` / `[]` quando a API responde 404 (conta não cadastrada)
 * - Retorna `null` / `[]` quando o body está vazio / não é um objeto válido
 * - Propaga erros inesperados (5xx) para o Error Boundary da página
 *
 * @see GET /gamer/account — api-integration-guide-frontend.md §7
 */
import "server-only";

import { AUTH_API, getAuthApiUrl } from "@/config/auth-api";
import { getAuthorizationHeader } from "@/lib/auth/session";
import { gamerAccountApiSchema } from "@/schemas/gamer-account-schema";
import type { GamerAccount } from "@/types/gamer-account";
import type { SubAccount } from "@/types/dashboard";

// ─────────────────────────────────────────────────────────────────────────────
// Helper interno — compartilhado entre os dois serviços
// ─────────────────────────────────────────────────────────────────────────────

async function fetchGamerAccount(): Promise<Response | null> {
  const authHeader = await getAuthorizationHeader();

  // Sem token na sessão → trata como "sem conta" (middleware já protege a rota)
  if (!authHeader.Authorization) return null;

  return fetch(getAuthApiUrl(AUTH_API.GAMER_ACCOUNT_PATH), {
    method: AUTH_API.GAMER_ACCOUNT_METHOD,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...authHeader,
    },
    // Sem cache: dados de conta devem sempre refletir o estado atual
    cache: "no-store",
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// getGamerAccount — usado pelo fluxo de onboarding (DashboardPage)
// ─────────────────────────────────────────────────────────────────────────────

export async function getGamerAccount(): Promise<GamerAccount | null> {
  const res = await fetchGamerAccount();

  if (!res) return null;

  // 404 → conta de jogo ainda não criada (fluxo de onboarding)
  if (res.status === 404) return null;

  // Outros erros não esperados → propaga para o Error Boundary
  if (!res.ok) {
    throw new Error(
      `Erro ao buscar gamer account: ${res.status} ${res.statusText}`,
    );
  }

  const body: unknown = await res.json().catch(() => null);

  const parsed = gamerAccountApiSchema.safeParse(body);
  if (!parsed.success) {
    return null;
  }

  const logins = Object.keys(parsed.data);
  if (logins.length === 0) {
    return null;
  }

  return {
    username: logins[0],
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// getGamerAccounts — contas de jogo para o dropdown do dashboard
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Busca `POST /gamer/account`, valida via Zod e devolve um array de SubAccount.
 *
 * Retorna `[]` em caso de 404 (sem conta) ou token ausente.
 * Propaga erros de rede/5xx para o Error Boundary da página.
 */
export async function getGamerAccounts(): Promise<SubAccount[]> {
  const res = await fetchGamerAccount();

  if (!res) return [];

  if (res.status === 404) return [];

  if (!res.ok) {
    throw new Error(
      `Erro ao buscar contas de jogo: ${res.status} ${res.statusText}`,
    );
  }

  const body: unknown = await res.json().catch(() => null);

  // Valida com Zod — Zero Trust: todo payload externo é tratado como suspeito
  const parsed = gamerAccountApiSchema.safeParse(body);

  if (!parsed.success) {
    // Log silencioso em produção — não quebra a UI do jogador
    console.error(
      "[getGamerAccounts] Payload inválido retornado pela API:",
      parsed.error.flatten(),
    );
    return [];
  }

  const logins = Object.keys(parsed.data);

  // Mapeia a lista de logins (strings) -> SubAccount do design system
  return logins.map((login) => {
    const characterNames = parsed.data[login] || [];
    return {
      id: login,
      nickname: login,
      className: "—",
      level: 0,
      characterCount: characterNames.length,
      characters: characterNames.map((name) => ({
        name,
        level: 1, // Default level as backend only returns names
      })),
    };
  });
}
