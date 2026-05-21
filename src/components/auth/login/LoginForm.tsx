"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { FormPlaceholderInput } from "@/components/ui/form/FormPlaceholderInput";
import { cn } from "@/lib/utils";
import {
  type LoginFormValues,
  loginSchema,
} from "@/schemas/login-schema";

const defaultValues: LoginFormValues = {
  user: "",
  password: "",
};

export function LoginForm() {
  const [isLoginRequestPending, setIsLoginRequestPending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues,
  });

  const handleLoginFormSubmit = handleSubmit(async () => {
    setIsLoginRequestPending(true);
    try {
      // Fase 6: integração com loginUserAction
    } finally {
      setIsLoginRequestPending(false);
    }
  });

  return (
    <form
      noValidate
      onSubmit={handleLoginFormSubmit}
      className="flex w-full flex-col gap-4"
      aria-label="Formulário de login"
    >
      <FormPlaceholderInput
        id="user"
        placeholder="Usuário"
        autoComplete="username"
        hasError={Boolean(errors.user)}
        error={errors.user?.message}
        {...register("user")}
      />

      <FormPlaceholderInput
        id="password"
        type="password"
        placeholder="Senha"
        autoComplete="current-password"
        hasError={Boolean(errors.password)}
        error={errors.password?.message}
        {...register("password")}
      />

      <button
        type="submit"
        disabled={isLoginRequestPending || !isValid}
        className={cn(
          "focus-ring mt-2 min-h-12 w-full rounded-lg bg-brand-cta px-5 py-3",
          "text-sm font-semibold uppercase tracking-wide text-foreground",
          "transition-colors hover:bg-brand-cta-hover",
          "disabled:cursor-not-allowed disabled:opacity-50",
        )}
      >
        {isLoginRequestPending ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}
