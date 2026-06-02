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
 * Estratégia de resolução:
 * 1. Verifica se existe um token de sessão — se não, retorna null.
 * 2. Chama SEMPRE o endpoint PROFILE_PATH com o token como Bearer.
 * 3. Se a chamada de API falhar ou retornar erro, usa o token como fallback
 *    de exibição (fullName) sem tentar decodificar JWT, pois o token
 *    agora é o fullName literal (ex: "Ewerton Campos").
 */
export async function getUserProfile(): Promise<UserProfileResponse | null> {
  const rawToken = await getSessionToken();

  // Sem sessão → não logado
  if (!rawToken?.trim()) {
    return null;
  }

  const token = decodeURIComponent(rawToken);

  const authHeader = await getAuthorizationHeader();
  const url = getAuthApiUrl(AUTH_API.PROFILE_PATH);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        ...authHeader,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (response.ok) {
      const data = (await response.json()) as UserProfileResponse;
      console.log("[getUserProfile] Perfil obtido com sucesso:", JSON.stringify(data));
      return data;
    }
  } catch (error) {
    console.error("[getUserProfile] Erro de rede ao buscar perfil do usuário:", error);
  }

  // Fallback: usa o token (fullName) como dado de exibição mínimo
  console.warn("[getUserProfile] Usando token como fallback de exibição. login/email estarão vazios.");
  return {
    login: token,
    fullName: token,
    email: "",
  };
}
