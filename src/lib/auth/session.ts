import "server-only";

import { cookies } from "next/headers";

import {
  AUTH_BEARER_PREFIX,
  AUTH_TOKEN_COOKIE,
  AUTH_TOKEN_MAX_AGE_SECONDS,
  USER_NAME_COOKIE,
} from "@/lib/auth/constants";

type SessionCookieOptions = {
  httpOnly: true;
  secure: boolean;
  sameSite: "lax";
  path: "/";
  maxAge: number;
};

function getSessionCookieOptions(): SessionCookieOptions {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: AUTH_TOKEN_MAX_AGE_SECONDS,
  };
}

export async function setSessionToken(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_TOKEN_COOKIE, token, getSessionCookieOptions());
}

export async function getSessionToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_TOKEN_COOKIE)?.value;
}

export async function setSessionUserName(name: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(USER_NAME_COOKIE, encodeURIComponent(name), getSessionCookieOptions());
}

export async function getSessionUserName(): Promise<string | undefined> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(USER_NAME_COOKIE)?.value;
  return raw ? decodeURIComponent(raw) : undefined;
}

export async function clearSessionToken(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_TOKEN_COOKIE);
  cookieStore.delete(USER_NAME_COOKIE);
}

export async function hasSession(): Promise<boolean> {
  const token = await getSessionToken();
  return Boolean(token?.trim());
}

/** Cabeçalho Authorization para chamadas server-side à API protegida. */
export async function getAuthorizationHeader(): Promise<Record<string, string>> {
  const token = await getSessionToken();
  if (!token) {
    return {};
  }

  return { Authorization: `${AUTH_BEARER_PREFIX} ${token}` };
}
