"use client";

import { FormPlaceholderInput } from "@/components/ui/form/FormPlaceholderInput";
import { cn } from "@/lib/utils";

/**
 * Layout visual do formulário de login (Fase 4).
 * Será substituído por LoginForm com RHF na Fase 5.
 */
export function LoginFormShell() {
  return (
    <form
      noValidate
      className="flex w-full flex-col gap-4"
      aria-label="Formulário de login"
    >
      <FormPlaceholderInput
        id="user"
        name="user"
        placeholder="Usuário"
        autoComplete="username"
      />

      <FormPlaceholderInput
        id="password"
        name="password"
        type="password"
        placeholder="Senha"
        autoComplete="current-password"
      />

      <button
        type="submit"
        disabled
        className={cn(
          "focus-ring mt-2 min-h-12 w-full rounded-lg bg-brand-cta px-5 py-3",
          "text-sm font-semibold uppercase tracking-wide text-foreground",
          "transition-colors hover:bg-brand-cta-hover",
          "disabled:cursor-not-allowed disabled:opacity-50",
        )}
      >
        Entrar
      </button>
    </form>
  );
}
