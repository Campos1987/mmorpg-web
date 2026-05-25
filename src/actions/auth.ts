"use server";

import { cookies } from "next/headers";
import type { LoginRequest, LoginResponse } from "@/types/auth";
import type { ApiError } from "@/types/api";

const BASE_URL = process.env.API_BASE_URL || "http://localhost:4000";

export async function loginAction(
  payload: LoginRequest,
): Promise<{ data?: Pick<LoginResponse, "loginTime">; error?: ApiError }> {
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const json = await res.json();

    if (!res.ok) {
      return { error: json as ApiError };
    }

    const { claims, loginTime } = json as LoginResponse;

    const cookieStore = await cookies();

    // Salva o JWT em cookie HttpOnly — inacessível ao JavaScript do browser
    cookieStore.set("auth_token", claims, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 3600, // 1 hora
      path: "/",
    });

    // Não retorna o token bruto para o client component
    return { data: { loginTime } };
  } catch (err) {
    return {
      error: {
        timestamp: new Date().toISOString(),
        status: 500,
        error: "INTERNAL_SERVER_ERROR",
        message: err instanceof Error ? err.message : "Erro interno do servidor ou falha de conexão",
        trace: null,
        path: "/auth/login",
      },
    };
  }
}
