import "server-only";

import { AUTH_API, getAuthApiUrl } from "@/config/auth-api";
import type { RegisterPayload } from "@/types/register";
import type {
  ApiErrorResponse,
  RegisterActionResult,
  RegisterSuccessResponse,
} from "@/types/register";

const GENERIC_ERROR_MESSAGE =
  "Não foi possível concluir o registro. Tente novamente em instantes.";

function isRegisterFieldKey(
  key: string,
): key is keyof RegisterPayload {
  return (
    key === "user" ||
    key === "name" ||
    key === "lastname" ||
    key === "birthday" ||
    key === "email" ||
    key === "password"
  );
}

function mapDetailsToFieldErrors(
  details: ApiErrorResponse["details"],
): RegisterActionResult {
  const fieldErrors: NonNullable<RegisterActionResult & { status: "validation" }>["fieldErrors"] =
    {};

  if (details) {
    for (const [key, message] of Object.entries(details)) {
      if (isRegisterFieldKey(key) && typeof message === "string") {
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
export async function registerUserRequest(
  payload: RegisterPayload,
): Promise<RegisterActionResult> {
  const url = getAuthApiUrl(AUTH_API.REGISTER_PATH);

  try {
    const response = await fetch(url, {
      method: AUTH_API.REGISTER_METHOD,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (response.status === 201) {
      const data = (await response.json()) as RegisterSuccessResponse;
      return {
        status: "success",
        userId: data.userId,
        message: data.message,
      };
    }

    const errorBody = (await response.json().catch(() => null)) as
      | ApiErrorResponse
      | null;

    if (response.status === 400) {
      return mapDetailsToFieldErrors(errorBody?.details);
    }

    if (response.status === 409) {
      return {
        status: "conflict",
        message:
          errorBody?.message ??
          "Nome de usuário ou e-mail já cadastrado no sistema.",
      };
    }

    return { status: "error", message: GENERIC_ERROR_MESSAGE };
  } catch {
    return { status: "error", message: GENERIC_ERROR_MESSAGE };
  }
}
