"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { registerUserAction } from "@/actions/register-user-action";
import { RegisterFeedback } from "@/components/auth/register/RegisterFeedback";
import { FormPlaceholderInput } from "@/components/ui/form/FormPlaceholderInput";
import { FormSectionLabel } from "@/components/ui/form/FormSectionLabel";
import { FormSelect } from "@/components/ui/form/FormSelect";
import {
  REGISTER_DAYS,
  REGISTER_MONTHS,
  REGISTER_YEARS,
} from "@/config/register-form-options";
import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils";
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
  birthDay: "",
  birthMonth: "",
  birthYear: "",
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

  const birthDateError =
    errors.birthDay?.message ??
    errors.birthMonth?.message ??
    errors.birthYear?.message;

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

          if (field === "birthday") {
            setError("birthYear", { message });
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
    >
      {globalFeedback ? (
        <RegisterFeedback
          variant={globalFeedback.variant}
          message={globalFeedback.message}
        />
      ) : null}

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

      <div className="flex flex-col gap-2">
        <FormSectionLabel label="Data de nascimento" />
        <div className="grid grid-cols-3 gap-3">
          <FormSelect
            id="birthDay"
            placeholder="Dia"
            options={REGISTER_DAYS}
            hasError={Boolean(errors.birthDay || birthDateError)}
            error={errors.birthDay?.message}
            {...register("birthDay")}
          />
          <FormSelect
            id="birthMonth"
            placeholder="Mês"
            options={REGISTER_MONTHS}
            hasError={Boolean(errors.birthMonth || birthDateError)}
            error={errors.birthMonth?.message}
            {...register("birthMonth")}
          />
          <FormSelect
            id="birthYear"
            placeholder="Ano"
            options={REGISTER_YEARS}
            hasError={Boolean(errors.birthYear || birthDateError)}
            error={errors.birthYear?.message ?? birthDateError}
            {...register("birthYear")}
          />
        </div>
      </div>

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
        autoComplete="new-password"
        hasError={Boolean(errors.password)}
        error={errors.password?.message}
        {...register("password")}
      />

      <FormPlaceholderInput
        id="confirmPassword"
        type="password"
        placeholder="Confirmar senha"
        autoComplete="new-password"
        hasError={Boolean(errors.confirmPassword)}
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      <button
        type="submit"
        disabled={isRegisterRequestPending || !isValid}
        className={cn(
          "focus-ring mt-2 min-h-12 w-full rounded-lg bg-brand-cta px-5 py-3",
          "text-sm font-semibold uppercase tracking-wide text-foreground",
          "transition-colors hover:bg-brand-cta-hover",
          "disabled:cursor-not-allowed disabled:opacity-50",
        )}
      >
        {isRegisterRequestPending ? "Criando conta…" : "Criar conta"}
      </button>

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
