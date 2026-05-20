/**
 * Contratos da API de login — espelham specify.md e Documentation/end-points/login.md.
 * LoginPayload será reexportado do schema Zod na Fase 2 quando disponível.
 */
export type LoginPayload = {
  user: string;
  password: string;
};

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
