import "server-only";

import { AUTH_API, getAuthApiUrl } from "@/config/auth-api";
import { LOGIN_UNAUTHORIZED_MESSAGE } from "@/schemas/login-schema";
import type { LoginPayload } from "@/types/login";
import type {
  LoginActionResult,
  LoginApiErrorResponse,
  LoginSuccessResponse,
} from "@/types/login";

const GENERIC_ERROR_MESSAGE =
  "Não foi possível concluir o login. Tente novamente em instantes.";

function isLoginFieldKey(key: string): key is keyof LoginPayload {
  return key === "user" || key === "password";
}

function mapDetailsToFieldErrors(
  details: LoginApiErrorResponse["details"],
): LoginActionResult {
  const fieldErrors: NonNullable<
    LoginActionResult & { status: "validation" }
  >["fieldErrors"] = {};

  if (details) {
    for (const [key, message] of Object.entries(details)) {
      if (isLoginFieldKey(key) && typeof message === "string") {
        fieldErrors[key] = message;
      }
    }
  }

  return {
    status: "validation",
    fieldErrors,
  };
}

/**
 * Senha em texto plano no JSON — hash apenas no backend (Argon2). Exige HTTPS em produção.
 */
export async function loginUserRequest(
  payload: LoginPayload,
): Promise<LoginActionResult> {
  const url = getAuthApiUrl(AUTH_API.LOGIN_PATH);

  try {
    const response = await fetch(url, {
      method: AUTH_API.LOGIN_METHOD,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (response.status === 200) {
      const data = (await response.json()) as LoginSuccessResponse;
      return {
        status: "success",
        token: data.token,
        type: data.type,
      };
    }

    const errorBody = (await response.json().catch(() => null)) as
      | LoginApiErrorResponse
      | null;

    if (response.status === 400) {
      return mapDetailsToFieldErrors(errorBody?.details);
    }

    if (response.status === 401 || response.status === 403) {
      return {
        status: "unauthorized",
        message: errorBody?.message ?? LOGIN_UNAUTHORIZED_MESSAGE,
      };
    }

    return { status: "error", message: GENERIC_ERROR_MESSAGE };
  } catch {
    return { status: "error", message: GENERIC_ERROR_MESSAGE };
  }
}
