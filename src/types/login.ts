import type { LoginFormValues, LoginPayload } from "@/schemas/login-schema";

export type { LoginFormValues, LoginPayload };

export { LOGIN_UNAUTHORIZED_MESSAGE } from "@/schemas/login-schema";

export type LoginSuccessResponse = {
  token: string;
  type: "Bearer";
};

export type LoginApiErrorResponse = {
  error: string;
  message?: string;
  details?: Partial<Record<keyof LoginPayload, string>>;
};

export type LoginFieldErrors = Partial<Record<keyof LoginPayload, string>>;

export type LoginActionResult =
  | { status: "success"; token: string; type: LoginSuccessResponse["type"] }
  | { status: "validation"; fieldErrors: LoginFieldErrors }
  | { status: "unauthorized"; message: string }
  | { status: "error"; message: string };
