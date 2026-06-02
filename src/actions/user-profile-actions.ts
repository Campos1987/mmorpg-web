"use server";

import { z } from "zod";

import {
  birthDateSchema,
  changePasswordSchema,
} from "@/schemas/user-profile-schema";
import type { ProfileActionResult } from "@/types/user-profile";
import { getAuthorizationHeader, clearSessionToken } from "@/lib/auth/session";
import { AUTH_API, getAuthApiUrl } from "@/config/auth-api";

// ──────────────────────────────────────────────────────────────────────────────
// Helper: extrai erros de campo do ZodError para o formato esperado pelo form
// ──────────────────────────────────────────────────────────────────────────────
function mapZodErrors<T extends z.ZodTypeAny>(
  error: z.ZodError<z.infer<T>>,
): Partial<Record<string, string>> {
  const fieldErrors: Partial<Record<string, string>> = {};
  for (const issue of error.issues) {
    const field = issue.path[0];
    if (typeof field === "string" && !fieldErrors[field]) {
      fieldErrors[field] = issue.message;
    }
  }
  return fieldErrors;
}

// ──────────────────────────────────────────────────────────────────────────────
// Server Action: salvar data de nascimento (apenas quando está em branco)
// Conectar ao endpoint PATCH /account/profile ou equivalente
// ──────────────────────────────────────────────────────────────────────────────
export async function saveBirthDateAction(
  payload: unknown,
): Promise<ProfileActionResult> {
  const parsed = birthDateSchema.safeParse(payload);

  if (!parsed.success) {
    return {
      success: false,
      message: "Dados inválidos.",
      fieldErrors: mapZodErrors(parsed.error),
    };
  }

  try {
    const authHeader = await getAuthorizationHeader();

    // Salva a data de nascimento chamando o endpoint do backend com o JSON { birthday: "AAAA-MM-DD" }
    const res = await fetch(getAuthApiUrl(AUTH_API.BIRTHDAY_PATH), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...authHeader,
      },
      body: JSON.stringify({ birthday: parsed.data.birthDate }),
      cache: "no-store",
    });

    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      return {
        success: false,
        message: (json as { message?: string })?.message ?? "Erro ao salvar data de nascimento.",
      };
    }

    return { success: true, message: "Data de nascimento salva com sucesso!" };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Erro interno do servidor.",
    };
  }
}

// ──────────────────────────────────────────────────────────────────────────────
// Server Action: alterar senha
// Conectar ao endpoint POST /account/change-password ou equivalente
// ──────────────────────────────────────────────────────────────────────────────
export async function changePasswordAction(
  payload: unknown,
): Promise<ProfileActionResult> {
  const parsed = changePasswordSchema.safeParse(payload);

  if (!parsed.success) {
    return {
      success: false,
      message: "Dados inválidos.",
      fieldErrors: mapZodErrors(parsed.error),
    };
  }

  try {
    const authHeader = await getAuthorizationHeader();

    const res = await fetch(getAuthApiUrl(AUTH_API.CHANGE_PASSWORD_PATH), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...authHeader,
      },
      body: JSON.stringify({
        oldPassword: parsed.data.currentPassword,
        newPassword: parsed.data.newPassword,
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      // Trata 401 de forma genérica para evitar enumeração
      if (res.status === 401) {
        return { success: false, message: "Senha atual incorreta." };
      }
      return {
        success: false,
        message: (json as { message?: string })?.message ?? "Erro ao alterar a senha.",
      };
    }

    // Após mudança de senha bem-sucedida, invalida o cookie de sessão para
    // forçar novo login (boa prática de segurança — RFC 6749 §10.4)
    await clearSessionToken();

    return {
      success: true,
      message: "Senha alterada com sucesso! Faça login novamente para continuar.",
    };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Erro interno do servidor.",
    };
  }
}
