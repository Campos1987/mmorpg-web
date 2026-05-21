"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { loginUserAction } from "@/actions/login-user-action";
import { LoginFeedback } from "@/components/auth/login/LoginFeedback";
import { FormPlaceholderInput } from "@/components/ui/form/FormPlaceholderInput";
import { ROUTES } from "@/config/routes";
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
  const router = useRouter();
  const [isLoginRequestPending, setIsLoginRequestPending] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    resetField,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues,
  });

  const handleLoginFormSubmit = handleSubmit(async (values) => {
    setIsLoginRequestPending(true);
    setGlobalError(null);

    try {
      const result = await loginUserAction(values);

      if (result.status === "success") {
        router.push(ROUTES.HOME);
        router.refresh();
        return;
      }

      if (result.status === "validation") {
        for (const [field, message] of Object.entries(result.fieldErrors)) {
          if (message && (field === "user" || field === "password")) {
            setError(field, { message });
          }
        }
        resetField("password");
        return;
      }

      if (result.status === "unauthorized") {
        setGlobalError(result.message);
        resetField("password");
        return;
      }

      setGlobalError(result.message);
      resetField("password");
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
      {globalError ? <LoginFeedback message={globalError} /> : null}

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

      <p className="text-center text-sm text-muted">
        Não tem conta?{" "}
        <Link
          href={ROUTES.AUTH.REGISTER}
          className="focus-ring text-brand-gold hover:text-brand-gold-hover"
        >
          Registre-se
        </Link>
      </p>
    </form>
  );
}
