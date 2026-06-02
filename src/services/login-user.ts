import "server-only";

import { AUTH_API, getAuthApiUrl } from "@/config/auth-api";
import { parseLoginFieldErrorsFromApiMessage } from "@/lib/auth/parse-api-error";
import { LOGIN_UNAUTHORIZED_MESSAGE } from "@/schemas/login-schema";
import type { LoginPayload } from "@/types/login";
import type {
  LoginApiErrorResponse,
  LoginApiSuccessResponse,
  LoginServiceResult,
} from "@/types/login";

type AccountBlockedCode = "PENDING" | "BANNED" | "SUSPENDED";
const BLOCKED_CODES = new Set<string>(["PENDING", "BANNED", "SUSPENDED"]);

function extractBlockedCode(message: string | null | undefined): AccountBlockedCode | null {
  if (!message) return null;
  const upper = message.trim().toUpperCase();
  return BLOCKED_CODES.has(upper) ? (upper as AccountBlockedCode) : null;
}

const GENERIC_ERROR_MESSAGE =
  "Não foi possível concluir o login. Tente novamente em instantes.";

const LOGIN_SUCCESS_STATUSES = new Set([200, 202]);

/**
 * Senha em texto plano no JSON — hash apenas no backend. Exige HTTPS em produção.
 */
export async function loginUserRequest(
  payload: LoginPayload,
): Promise<LoginServiceResult> {
  const url = getAuthApiUrl(AUTH_API.LOGIN_PATH);

  try {
    const response = await fetch(url, {
      method: AUTH_API.LOGIN_METHOD,
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (LOGIN_SUCCESS_STATUSES.has(response.status)) {
      const data = (await response.json()) as LoginApiSuccessResponse;

      // O token real JWT retornado pela API (ou fallbacks de e-mail/claims)
      const receivedToken = data.token;

      if (!receivedToken?.trim()) {
        return { status: "error", message: GENERIC_ERROR_MESSAGE };
      }

      let fullNameVal = "";

      // Valida se conseguimos obter o perfil usando o token recebido antes de finalizar
      try {
        const profileUrl = getAuthApiUrl(AUTH_API.PROFILE_PATH);
        const profileResponse = await fetch(profileUrl, {
          method: AUTH_API.PROFILE_METHOD,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${receivedToken}`,
          },
          cache: "no-store",
        });

        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          fullNameVal = profileData.fullName || profileData.name || "";
          console.log(`[loginUserRequest] Login e perfil do usuário ${fullNameVal} validados com sucesso.`);
        } else {
          const errorText = await profileResponse.text().catch(() => "N/A");
          console.error(
            `[loginUserRequest] Falha na resposta do perfil. Status: ${profileResponse.status}. Body: ${errorText}`
          );
        }
      } catch (error) {
        console.error("[loginUserRequest] Erro de rede ao buscar perfil no fluxo de login:", error);
      }

      // Retorna o token real (JWT) e o fullName para o cookie
      return { status: "success", token: receivedToken, fullName: fullNameVal };
    }

    const errorBody = (await response.json().catch(() => null)) as
      | LoginApiErrorResponse
      | null;

    if (response.status === 400) {
      const fieldErrors = parseLoginFieldErrorsFromApiMessage(
        errorBody?.message,
      );

      return {
        status: "validation",
        fieldErrors,
      };
    }

    if (response.status === 401 || response.status === 403) {
      const blockedCode = extractBlockedCode(errorBody?.message);
      if (blockedCode) {
        return { status: "account_blocked", code: blockedCode };
      }

      return {
        status: "unauthorized",
        message: LOGIN_UNAUTHORIZED_MESSAGE,
      };
    }

    console.error(`[loginUserRequest] Resposta de erro não tratada da API. Status: ${response.status}`);
    return { status: "error", message: GENERIC_ERROR_MESSAGE };
  } catch (error) {
    console.error("[loginUserRequest] Erro de comunicação com a API de login:", error);
    return { status: "error", message: GENERIC_ERROR_MESSAGE };
  }
}
