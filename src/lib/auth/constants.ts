/** Nome do cookie HttpOnly que armazena o JWT emitido pela API Spring. */
export const AUTH_TOKEN_COOKIE = "mmorpg_auth_token";

/** Expiração alinhada ao JWT da API (LoginService: 3600s). */
export const AUTH_TOKEN_MAX_AGE_SECONDS = 3600;

export const AUTH_BEARER_PREFIX = "Bearer";
