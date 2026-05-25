import type { ApiError } from "./api";

/** Payload enviado no corpo da requisição de login */
export interface LoginRequest {
  /** Username (ex: "GankMaster") ou e-mail (ex: "user@mail.com") */
  user: string;
  password: string;
}

/** Resposta de sucesso do endpoint POST /auth/login */
export interface LoginResponse {
  /** Timestamp ISO 8601 do momento do login */
  loginTime: string;
  /** JWT Bearer Token. Armazenar em cookie HttpOnly, nunca em localStorage */
  claims: string;
}

/** Payload decodificado do JWT */
export interface JwtPayload {
  iss: string;      // "mmorpg-l2-api"
  sub: string;      // username do jogador
  scope: UserRole;  // role do usuário
  iat: number;      // Unix timestamp de emissão
  exp: number;      // Unix timestamp de expiração (iat + 3600)
}

export type UserRole = "ROLE_USER" | "ROLE_ADM" | "ROLE_MODERATOR";

export type LoginActionResult =
  | { success: true; loginTime: string }
  | { success: false; error: ApiError };
