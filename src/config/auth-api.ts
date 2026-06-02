/**
 * Endpoints de autenticação — desacoplados da UI.
 * Contrato alinhado ao Spring Boot (`AuthController` em `/auth`).
 * Base via API_BASE_URL (ex.: http://localhost:4000).
 */
export const AUTH_API = {
  LOGIN_PATH: "/auth/login",
  LOGIN_METHOD: "POST",
  REGISTER_PATH: "/auth/register",
  REGISTER_METHOD: "POST",
  PROFILE_PATH: "/user/me",
  PROFILE_METHOD: "POST",
  BIRTHDAY_PATH: "/user/setBirthday",
  CHANGE_PASSWORD_PATH: "/user/changePassword",
  GAMER_ACCOUNT_PATH: "/gamer/account",
  GAMER_ACCOUNT_METHOD: "POST",
  GAMER_CREATE_PATH: "/gamer/create",
  GAMER_CREATE_METHOD: "POST",
} as const;

export function getAuthApiUrl(path: string): string {
  const base = process.env.API_BASE_URL?.replace(/\/$/, "") ?? "";
  return `${base}${path}`;
}
