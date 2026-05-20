/**
 * Endpoints de autenticação — desacoplados da UI.
 * Base opcional via API_BASE_URL (ex.: backend Spring Boot). Vazio = mesma origem (Next.js).
 */
export const AUTH_API = {
  LOGIN_PATH: "/api/auth/login",
  LOGIN_METHOD: "POST",
  REGISTER_PATH: "/api/auth/register",
  REGISTER_METHOD: "POST",
} as const;

export function getAuthApiUrl(path: string): string {
  const base = process.env.API_BASE_URL?.replace(/\/$/, "") ?? "";
  return `${base}${path}`;
}
