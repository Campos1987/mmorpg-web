"use server";

import { clearSessionToken } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { ROUTES } from "@/config/routes";

/**
 * Server Action para deslogar o usuário limpando o token de sessão.
 * Redireciona o usuário para a página inicial de forma segura.
 */
export async function logoutAction(): Promise<void> {
  await clearSessionToken();
  redirect(ROUTES.HOME);
}
