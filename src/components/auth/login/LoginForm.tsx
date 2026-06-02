"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { loginUserAction } from "@/actions/login-user-action";
import { LoginFeedback } from "@/components/auth/login/LoginFeedback";
import { FormPlaceholderInput } from "@/components/ui/form/FormPlaceholderInput";
import { PasswordInput } from "@/components/ui/form/PasswordInput";
import { FormButton } from "@/components/ui/form/FormButton";
import { ROUTES } from "@/config/routes";
import {
  type LoginFormValues,
  loginSchema,
} from "@/schemas/login-schema";
import { Lock } from "lucide-react";

const defaultValues: LoginFormValues = {
  user: "",
  password: "",
};

/** Mapeia o code de bloqueio para a rota de aviso correspondente. */
const BLOCKED_ROUTE_MAP = {
  PENDING: ROUTES.ACCOUNT_STATUS.PENDING,
  BANNED: ROUTES.ACCOUNT_STATUS.BANNED,
  SUSPENDED: ROUTES.ACCOUNT_STATUS.SUSPENDED,
} as const;

export function LoginForm() {
  const router = useRouter();
  const [isLoginRequestPending, setIsLoginRequestPending] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

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
        router.push(ROUTES.DASHBOARD.ROOT);
        router.refresh();
        return;
      }

      if (result.status === "account_blocked") {
        router.push(BLOCKED_ROUTE_MAP[result.code]);
        return;
      }

      if (result.status === "validation") {
        for (const [field, message] of Object.entries(result.fieldErrors)) {
          if (message && (field === "user" || field === "password")) {
            setError(field as keyof LoginFormValues, { message });
          }
        }
        resetField("password");
        return;
      }

      if (result.status === "unauthorized") {
        resetField("password");
        setGlobalError(result.message);
        return;
      }

      resetField("password");
      setGlobalError(result.message);
    } catch {
      setGlobalError("Ocorreu um erro inesperado. Tente novamente mais tarde.");
      resetField("password");
    } finally {
      setIsLoginRequestPending(false);
    }
  });

  return (
    <form
      id="loginForm"
      noValidate
      onSubmit={handleLoginFormSubmit}
      className="flex w-full flex-col gap-4"
      aria-label="Formulário de login"
      autoComplete="off"
    >
      {globalError ? <LoginFeedback message={globalError} /> : null}

      {/* Campo: Usuário — mantém FormPlaceholderInput (estilo visual auth) */}
      <FormPlaceholderInput
        id="user"
        placeholder="Usuário ou E-mail"
        autoComplete="username"
        hasError={Boolean(errors.user)}
        error={errors.user?.message}
        {...register("user")}
      />

      {/*
       * Campo: Senha — substituído por PasswordInput (componente acessível).
       * WCAG 2.5.5: botão de olho com min 44×44px.
       * WCAG 4.1.2: aria-label descritivo + aria-pressed no toggle.
       * Nota: sem leadingIcon para manter consistência visual com o campo
       * "Usuário" acima (FormPlaceholderInput sem ícone).
       */}
      <PasswordInput
        id="password"
        label="Senha"
        error={errors.password?.message}
        showLabel="Exibir senha"
        hideLabel="Ocultar senha"
        placeholder="••••••••"
        autoComplete="current-password"
        hiddenLabel
        {...register("password")}
      />

      {/*
       * SubmitButton substitui o <button> manual com SVG spinner inline.
       * WCAG 1.4.3: text-foreground sobre bg-brand-cta (#dc2626) ≈ 4.5:1 ✓
       * WCAG 4.1.2: aria-busy + aria-disabled sincronizados.
       * WCAG 4.1.3: sr-only com status de carregamento para leitores de tela.
       *
       * className sobrescreve a cor padrão verde do SubmitButton para usar
       * o vermelho/CTA do tema de autenticação (brand-cta).
       */}
      <FormButton
        form="loginForm"
        variant="danger"
        isPending={isLoginRequestPending}
        pendingLabel="Alterando..."
        idleIcon={(isLoginRequestPending || (isMounted && !isValid))
          ? <Lock className="size-4" aria-hidden="true" /> : null}
        disabled={isLoginRequestPending || (isMounted && !isValid)}
      >
        Entrar
      </FormButton>

      <p className="text-center text-sm text-muted">
        Não tem conta?{" "}
        <Link
          href={ROUTES.AUTH.REGISTER}
          className="focus-ring text-brand-gold hover:text-brand-gold-hover font-semibold transition-colors"
        >
          Registre-se
        </Link>
      </p>
    </form>
  );
}
