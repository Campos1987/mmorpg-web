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

    const { claims, loginTime, userName } = json as LoginResponse;

    const cookieStore = await cookies();

    const tokenToSave = claims || userName;

    console.log("[loginAction] json recebido:", JSON.stringify(json));
    console.log("[loginAction] tokenToSave:", tokenToSave);

    if (!tokenToSave) {
      throw new Error("Resposta da API inválida: token ausente.");
    }

    // Salva o JWT ou userName em cookie HttpOnly — inacessível ao JavaScript do browser
    // encodeURIComponent garante que valores com espaços (ex: "Ewerton Campos") sejam válidos
    cookieStore.set("auth_token", encodeURIComponent(tokenToSave), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 3600, // 1 hora
      path: "/",
    });

    console.log("[loginAction] cookie gravado com sucesso!");

    // Não retorna o token bruto para o client component
    return { data: { loginTime: loginTime || new Date().toISOString() } };
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
