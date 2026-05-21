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

      if (!data.claims?.trim()) {
        return { status: "error", message: GENERIC_ERROR_MESSAGE };
      }

      return { status: "success", token: data.claims };
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
      return {
        status: "unauthorized",
        message: LOGIN_UNAUTHORIZED_MESSAGE,
      };
    }

    return { status: "error", message: GENERIC_ERROR_MESSAGE };
  } catch {
    return { status: "error", message: GENERIC_ERROR_MESSAGE };
  }
}
