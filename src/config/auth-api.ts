/**
 * Endpoints de autenticação — desacoplados da UI.
<<<<<<< HEAD
 * Base opcional via API_BASE_URL (ex.: backend externo). Vazio = mesma origem (Next.js).
 */
export const AUTH_API = {
  REGISTER_PATH: "/api/auth/register",
=======
 * Contrato alinhado ao Spring Boot (`AuthController` em `/auth`).
 * Base via API_BASE_URL (ex.: http://localhost:4000).
 */
export const AUTH_API = {
  LOGIN_PATH: "/auth/login",
  LOGIN_METHOD: "POST",
  REGISTER_PATH: "/auth/register",
>>>>>>> main
  REGISTER_METHOD: "POST",
} as const;

export function getAuthApiUrl(path: string): string {
  const base = process.env.API_BASE_URL?.replace(/\/$/, "") ?? "";
  return `${base}${path}`;
}
