import "server-only";

import { AUTH_API, getAuthApiUrl } from "@/config/auth-api";
import { getAuthorizationHeader, getSessionToken } from "@/lib/auth/session";

export interface UserProfileResponse {
  login: string;
  fullName: string;
  email: string;
  birthDate?: string;
  createdTime?: string;
  lastActive?: string;
  status?: string;
}

/**
 * Obtém o perfil do usuário autenticado.
 *
 * Estratégia de resolução (em ordem de prioridade):
 * 1. Verifica se existe um token de sessão — se não, retorna null imediatamente.
 * 2. Se o token NÃO parece um JWT (sem pontos), usa-o diretamente como nome
 *    de exibição (fallback para backends que retornam userName em vez de claims).
 * 3. Se o token parece um JWT, chama a API protegida para obter o perfil completo.
 */
export async function getUserProfile(): Promise<UserProfileResponse | null> {
  const rawToken = await getSessionToken();

  // Sem sessão → não logado
  if (!rawToken?.trim()) {
    return null;
  }

  // Decodifica para suportar valores com encodeURIComponent (ex: "Ewerton%20Campos")
  const token = decodeURIComponent(rawToken);

  // Fallback: token não é JWT (não contém ".") → backend retornou o userName diretamente
  if (!token.includes(".")) {
    return {
      login: token,
      fullName: token,
      email: "",
    };
  }

  // Token parece JWT → tenta a API protegida
  const authHeader = await getAuthorizationHeader();
  const url = getAuthApiUrl(AUTH_API.PROFILE_PATH);

  try {
    const response = await fetch(url, {
      method: AUTH_API.PROFILE_METHOD,
      headers: {
        ...authHeader,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (response.ok) {
      return (await response.json()) as UserProfileResponse;
    }
  } catch (error) {
    console.error("[getUserProfile] Erro ao buscar perfil do usuário:", error);
  }

  return null;
}
