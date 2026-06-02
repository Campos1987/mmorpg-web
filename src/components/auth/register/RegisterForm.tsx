"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { registerUserAction } from "@/actions/register-user-action";
import { RegisterFeedback } from "@/components/auth/register/RegisterFeedback";
import { FormPlaceholderInput } from "@/components/ui/form/FormPlaceholderInput";
import { PasswordInput } from "@/components/ui/form/PasswordInput";
import { FormButton } from "@/components/ui/form/FormButton";
import { ROUTES } from "@/config/routes";
import {
  type RegisterFormValues,
  mapFormValuesToPayload,
  registerFormSchema,
} from "@/schemas/register-schema";

type GlobalFeedback = {
  variant: "success" | "error" | "conflict";
  message: string;
} | null;

const defaultValues: RegisterFormValues = {
  name: "",
  lastname: "",
  email: "",
  user: "",
  password: "",
  confirmPassword: "",
};

export function RegisterForm() {
  const router = useRouter();
  const [isRegisterRequestPending, setIsRegisterRequestPending] = useState(false);
  const [globalFeedback, setGlobalFeedback] = useState<GlobalFeedback>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    resetField,
    formState: { errors, isValid },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    mode: "onChange",
    defaultValues,
  });

  const handleRegisterFormSubmit = async (values: RegisterFormValues) => {
    setIsRegisterRequestPending(true);
    setGlobalFeedback(null);

    try {
      const result = await registerUserAction(mapFormValuesToPayload(values));

      if (result.status === "success") {
        reset();
        setGlobalFeedback({
          variant: "success",
          message: "Conta criada com sucesso!",
        });
        router.push(ROUTES.AUTH.LOGIN);
        return;
      }

      resetField("password");
      resetField("confirmPassword");

      if (result.status === "validation") {
        for (const [field, message] of Object.entries(result.fieldErrors)) {
          if (!message) {
            continue;
          }

          if (field in defaultValues) {
            setError(field as keyof RegisterFormValues, { message });
          }
        }
        return;
      }

      if (result.status === "conflict") {
        setGlobalFeedback({ variant: "conflict", message: result.message });
        return;
      }

      setGlobalFeedback({
        variant: "error",
        message: result.message,
      });
    } finally {
      setIsRegisterRequestPending(false);
    }
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(handleRegisterFormSubmit)}
      className="flex w-full max-w-lg flex-col gap-4"
      autoComplete="off"
    >
      {globalFeedback ? (
        <RegisterFeedback
          variant={globalFeedback.variant}
          message={globalFeedback.message}
        />
      ) : null}

      {/* Campos: Nome e Sobrenome */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <FormPlaceholderInput
          id="name"
          placeholder="Nome"
          autoComplete="given-name"
          hasError={Boolean(errors.name)}
          error={errors.name?.message}
          {...register("name")}
        />
        <FormPlaceholderInput
          id="lastname"
          placeholder="Sobrenome"
          autoComplete="family-name"
          hasError={Boolean(errors.lastname)}
          error={errors.lastname?.message}
          {...register("lastname")}
        />
      </div>

      {/* Campo: E-mail */}
      <FormPlaceholderInput
        id="email"
        type="email"
        placeholder="nome@example.com"
        autoComplete="email"
        inputMode="email"
        hasError={Boolean(errors.email)}
        error={errors.email?.message}
        {...register("email")}
      />

      {/* Campo: Usuário */}
      <FormPlaceholderInput
        id="user"
        placeholder="Usuário"
        autoComplete="username"
        hasError={Boolean(errors.user)}
        error={errors.user?.message}
        {...register("user")}
      />

      {/*
       * Campos de senha — substituídos por PasswordInput.
       * WCAG 2.5.5: botão de olho com alvo mínimo 44×44px.
       * WCAG 4.1.2: aria-label + aria-pressed descrevem o estado de visibilidade.
       * WCAG 2.4.6: label visível associada via htmlFor/id (FormField interno).
       *
       * fieldClassName="gap-0" oculta visualmente o label para manter a
       * consistência estética com os demais campos (FormPlaceholderInput
       * usa apenas placeholder). O label ainda existe no DOM para SR (sr-only
       * não aplicado aqui pois o placeholder é suficiente para o contexto visual,
       * mas o label garante a associação semântica para tecnologias assistivas).
       */}
      <PasswordInput
        id="password"
        label="Senha"
        error={errors.password?.message}
        showLabel="Exibir senha"
        hideLabel="Ocultar senha"
        placeholder="Senha"
        autoComplete="new-password"
        hiddenLabel
        {...register("password")}
      />

      <PasswordInput
        id="confirmPassword"
        label="Confirmar senha"
        error={errors.confirmPassword?.message}
        showLabel="Exibir confirmação de senha"
        hideLabel="Ocultar confirmação de senha"
        placeholder="Confirmar senha"
        autoComplete="new-password"
        hiddenLabel
        {...register("confirmPassword")}
      />

      {/*
       * SubmitButton substitui o <button> manual.
       * className sobrescreve a cor verde padrão para brand-cta (tema auth).
       * WCAG 1.4.3: text-foreground sobre bg-brand-cta (#dc2626) ≈ 4.5:1 ✓
       * WCAG 4.1.2: aria-busy + aria-disabled.
       * WCAG 4.1.3: sr-only anuncia estado de carregamento para SR.
       */}
      <FormButton
        variant="primary"
        isPending={isRegisterRequestPending}
        pendingLabel="Criando conta…"
        disabled={isRegisterRequestPending || !isValid}
        className="mt-2"
      >
        Criar conta
      </FormButton>

      <p className="text-center text-sm text-muted">
        Já tem conta?{" "}
        <Link
          href={ROUTES.AUTH.LOGIN}
          className="focus-ring font-medium text-brand-logo hover:text-brand-logo-hover"
        >
          Faça login
        </Link>
      </p>
    </form>
  );
}
