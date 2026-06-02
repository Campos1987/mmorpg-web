import type { LoginFormValues, LoginPayload } from "@/schemas/login-schema";

export type { LoginFormValues, LoginPayload };

export { LOGIN_UNAUTHORIZED_MESSAGE } from "@/schemas/login-schema";

/** Resposta do POST /auth/login (Spring — HTTP 200/202).
 *  Novo contrato: { email, status }
 *  Campos legados mantidos para fallback: claims, userName, loginTime
 */
export type LoginApiSuccessResponse = {
  fullName?: string;
  email?: string;
  status?: string;
  token?: string;
};

/** Erro padronizado da API (ApiErrorException). */
export type LoginApiErrorResponse = {
  timestamp?: string | null;
  status?: number | null;
  error?: string;
  message?: string | null;
  path?: string | null;
};

export type LoginFieldErrors = Partial<Record<keyof LoginPayload, string>>;

export type LoginActionResult =
  | { status: "success" }
  | { status: "validation"; fieldErrors: LoginFieldErrors }
  | { status: "unauthorized"; message: string }
  | { status: "account_blocked"; code: "PENDING" | "BANNED" | "SUSPENDED" }
  | { status: "error"; message: string };

export type LoginServiceResult =
  | { status: "success"; token: string; fullName?: string }
  | Exclude<LoginActionResult, { status: "success" }>;
