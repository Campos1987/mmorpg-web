import "server-only";

import { AUTH_API, getAuthApiUrl } from "@/config/auth-api";
import { parseRegisterFieldErrorsFromApiMessage } from "@/lib/auth/parse-api-error";
import type { RegisterPayload } from "@/types/register";
import type {
  RegisterActionResult,
  RegisterSuccessResponse,
} from "@/types/register";
import type { ApiError } from "@/types/api";

const GENERIC_ERROR_MESSAGE =
  "Não foi possível concluir o registro. Tente novamente em instantes.";

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
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (response.status === 201) {
      const data = (await response.json()) as RegisterSuccessResponse;
      return {
        status: "success",
        username: data.username,
        email: data.email,
      };
    }

    const errorBody = (await response.json().catch(() => null)) as ApiError | null;

    if (response.status === 400) {
      const fieldErrors = parseRegisterFieldErrorsFromApiMessage(errorBody?.message);
      return {
        status: "validation",
        fieldErrors,
      };
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

