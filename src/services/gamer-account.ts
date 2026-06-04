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
import {
  gamerAccountApiSchema,
  type CreateGamerAccountInput,
} from "@/schemas/gamer-account-schema";
import type { GamerAccount } from "@/types/gamer-account";
import type { SubAccount, Character } from "@/types/dashboard";
import type { ApiError } from "@/types/api";

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
    const charactersData = parsed.data[login] || [];
    return {
      id: login,
      nickname: login,
      className: "—",
      level: 0,
      characterCount: charactersData.length,
      characters: charactersData.map((charData) => ({
        id: charData.charId.toString(),
        name: charData.charName,
        level: charData.lvl,
      })),
    };
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// getCharactersFromApi — personagens reais para o CharacterPanel
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Busca `POST /gamer/account`, valida via Zod e devolve um array de `Character`
 * pronto para consumo pelo `DashboardView` / `CharacterPanel`.
 *
 * A API só retorna os valores máximos (maxHp, maxMp, maxCp).
 * Os valores atuais (current) são assumidos como iguais ao máximo —
 * refletindo o estado offline do personagem (plena capacidade sem combat log).
 *
 * Retorna `[]` em caso de 404 (sem conta) ou token ausente.
 * Propaga erros de rede/5xx para o Error Boundary da página.
 */
export async function getCharactersFromApi(): Promise<Character[]> {
  const res = await fetchGamerAccount();

  if (!res) return [];
  if (res.status === 404) return [];

  if (!res.ok) {
    throw new Error(
      `Erro ao buscar personagens: ${res.status} ${res.statusText}`,
    );
  }

  const body: unknown = await res.json().catch(() => null);

  const parsed = gamerAccountApiSchema.safeParse(body);

  if (!parsed.success) {
    console.error(
      "[getCharactersFromApi] Payload inválido retornado pela API:",
      parsed.error.flatten(),
    );
    return [];
  }

  const characters: Character[] = [];

  for (const [login, charList] of Object.entries(parsed.data)) {
    charList.forEach((char, index) => {
      const isOnline = char.isOnline === 1;

      characters.push({
        // id único: login + índice (API não retorna UUID de personagem)
        id: `${login}-char-${index}`,
        subAccountId: login,
        name: char.charName,
        // A API retorna classId numérico; exibimos o ID até integração com tabela de classes
        className: `Classe ${char.classId}`,
        classId: char.classId,
        level: char.lvl,
        statusLabel: isOnline ? "Online" : "Offline",
        isOnline,
        // Imagem fixa por enquanto — será parametrizada quando a API expuser o campo
        imageSrc: "/images/dasboard/set/elegia/light/dark-elf.jpg",
        stats: {
          // A API retorna apenas valores máximos; current = max (capacidade plena offline)
          cp: { current: Math.round(char.maxCp), max: Math.round(char.maxCp) },
          hp: { current: Math.round(char.maxHp), max: Math.round(char.maxHp) },
          mp: { current: Math.round(char.maxMp), max: Math.round(char.maxMp) },
          // Campos não disponíveis na API nesta versão — valores neutros
          xpPercent: 0,
          equipmentScore: 0,
          activeQuests: { current: 0, total: 0 },
          guildName: "—",
          equipmentSummary: "—",
        },
      });
    });
  }

  return characters;
}

// ─────────────────────────────────────────────────────────────────────────────
// createGamerAccountRequest — cria uma nova conta de jogo associada à conta web
// ─────────────────────────────────────────────────────────────────────────────

export interface CreateGamerAccountResult {
  status: "success" | "validation" | "conflict" | "limit_reached" | "error";
  message?: string;
  fieldErrors?: Partial<Record<keyof CreateGamerAccountInput, string>>;
}

export async function createGamerAccountRequest(
  payload: CreateGamerAccountInput,
): Promise<CreateGamerAccountResult> {
  const authHeader = await getAuthorizationHeader();

  if (!authHeader.Authorization) {
    return {
      status: "error",
      message: "Sessão inválida. Por favor, faça login novamente.",
    };
  }

  try {
    const res = await fetch(getAuthApiUrl(AUTH_API.GAMER_CREATE_PATH), {
      method: AUTH_API.GAMER_CREATE_METHOD,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...authHeader,
      },
      body: JSON.stringify({
        login: payload.account,
        password: payload.password,
      }),
      cache: "no-store",
    });

    if (res.status === 200 || res.status === 201) {
      return { status: "success" };
    }

    const errorBody: unknown = await res.json().catch(() => null);

    if (res.status === 400 && typeof errorBody === "object" && errorBody !== null) {
      const apiError = errorBody as ApiError;
      const message = apiError.message || "";
      const fieldErrors: Partial<Record<keyof CreateGamerAccountInput, string>> = {};

      if (message.toLowerCase().includes("login") || message.toLowerCase().includes("username")) {
        fieldErrors.account = message.replace(/^(login|username):\s*/i, "");
      } else if (message.toLowerCase().includes("password") || message.toLowerCase().includes("senha")) {
        fieldErrors.password = message.replace(/^password:\s*/i, "");
      } else {
        return { status: "error", message: message || "Erro de validação nos dados enviados." };
      }

      return { status: "validation", fieldErrors };
    }

    if (res.status === 404 && typeof errorBody === "object" && errorBody !== null) {
      const apiError = errorBody as ApiError;
      const message = (apiError.message || "").toLowerCase();

      if (message.includes("3 gamer accounts") || message.includes("you can only have")) {
        return {
          status: "limit_reached",
          message: "Você atingiu o limite máximo de 3 contas de jogo.",
        };
      }

      if (message.includes("account already exists")) {
        return {
          status: "conflict",
          message: "Este nome de conta de jogo já está em uso.",
        };
      }

      // Em produção, a API não retorna 'message' (retorna null por segurança).
      // Como fallback para 404, se não houver mensagem, verificamos a quantidade de contas
      // para saber se o limite foi atingido, caso contrário assumimos conflito de nome existente.
      if (!message) {
        try {
          const accounts = await getGamerAccounts();
          if (accounts.length >= 3) {
            return {
              status: "limit_reached",
              message: "Você atingiu o limite máximo de 3 contas de jogo.",
            };
          }
        } catch (e) {
          console.error(
            "[createGamerAccountRequest] Erro ao verificar limite de contas no fallback:",
            e,
          );
        }

        return {
          status: "conflict",
          message: "Este nome de conta de jogo já está em uso.",
        };
      }
    }

    if (res.status === 409) {
      return {
        status: "conflict",
        message: "Este nome de conta de jogo já está em uso.",
      };
    }

    return {
      status: "error",
      message: "Erro inesperado ao criar a conta de jogo.",
    };
  } catch (err) {
    return {
      status: "error",
      message: err instanceof Error ? err.message : "Erro de conexão com o servidor.",
    };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// findCharacterRequest — busca detalhes de um personagem específico pelo ID
// ─────────────────────────────────────────────────────────────────────────────

export async function findCharacterRequest(charId: string): Promise<Character | null> {
  const authHeader = await getAuthorizationHeader();

  if (!authHeader.Authorization) return null;

  try {
    const res = await fetch(getAuthApiUrl("/gamer/findCharacters"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...authHeader,
      },
      body: JSON.stringify({ charId }),
      cache: "no-store",
    });

    if (!res.ok) {
      if (res.status === 404 || res.status === 403) {
        return null;
      }
      throw new Error(`Erro ao buscar detalhes do personagem: ${res.status}`);
    }

    const char = await res.json();
    const isOnline = char.isOnline === 1;

    return {
      id: char.charId.toString(),
      subAccountId: char.accountName || "",
      name: char.charName,
      className: `Classe ${char.classId}`,
      classId: char.classId,
      level: char.lvl,
      statusLabel: isOnline ? "Online" : "Offline",
      isOnline,
      imageSrc: "/images/dasboard/set/elegia/light/dark-elf.jpg",
      stats: {
        cp: { current: Math.round(char.maxCp), max: Math.round(char.maxCp) },
        hp: { current: Math.round(char.maxHp), max: Math.round(char.maxHp) },
        mp: { current: Math.round(char.maxMp), max: Math.round(char.maxMp) },
        xpPercent: 0,
        equipmentScore: 0,
        activeQuests: { current: 0, total: 0 },
        guildName: "—",
        equipmentSummary: "—",
      },
    };
  } catch (err) {
    console.error("[findCharacterRequest] Erro:", err);
    return null;
  }
}

