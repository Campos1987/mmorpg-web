import type { LoginFormValues, LoginPayload } from "@/schemas/login-schema";

export type { LoginFormValues, LoginPayload };

export { LOGIN_UNAUTHORIZED_MESSAGE } from "@/schemas/login-schema";

/** Resposta de sucesso do POST /auth/login (Spring — HTTP 202). */
export type LoginApiSuccessResponse = {
  loginTime: string;
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
  | { status: "error"; message: string };

/** Resultado interno do serviço — inclui o JWT antes de gravar o cookie. */
export type LoginServiceResult =
  | { status: "success"; token: string }
  | Exclude<LoginActionResult, { status: "success" }>;

