/**
 * CreateAccountForm — Formulário de criação de Gamer Account.
 *
 * ⚠️  SEM integração com API (placeholder).
 * Validação client-side via Zod (conta + senha + confirmação).
 * Segue os padrões:
 *  - SectionCard  : container semântico (§4.4 system-desing.mdc)
 *  - PasswordInput: toggle de visibilidade + WCAG 2.5.5 (44px target)
 *  - FormButton   : botão padronizado (§4.2 system-desing.mdc)
 *  - FeedbackBadge: retorno de status (§4.7 system-desing.mdc)
 */

"use client";

import { useState, useTransition } from "react";
import { z } from "zod";
import { Gamepad2, Lock, ShieldCheck, User } from "lucide-react";

import { SectionCard } from "@/components/ui/SectionCard";
import { FormField } from "@/components/ui/form/FormField";
import { FormTextInput } from "@/components/ui/form/FormTextInput";
import { PasswordInput } from "@/components/ui/form/PasswordInput";
import { FormButton } from "@/components/ui/form/FormButton";
import { FeedbackBadge } from "@/components/ui/FeedbackBadge";
import type { FeedbackState } from "@/components/ui/FeedbackBadge";
import {
  PasswordCriteriaList,
  buildPasswordCriteria,
} from "@/components/ui/PasswordCriteriaList";

// ──────────────────────────────────────────────────────────────────────────────
// Schema de validação (client-side, será espelhado no Server Action futuramente)
// ──────────────────────────────────────────────────────────────────────────────
const createAccountSchema = z
  .object({
    account: z
      .string()
      .min(5, "A conta deve ter no mínimo 5 caracteres.")
      .max(12, "A conta deve ter no máximo 12 caracteres.")
      .regex(/^[a-zA-Z0-9]+$/, "Apenas letras e números, sem espaços."),
    password: z
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres.")
      .max(12, "A senha deve ter no máximo 12 caracteres."),
    confirmPassword: z.string().min(1, "Confirme sua senha."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

type FormErrors = Partial<Record<"account" | "password" | "confirmPassword", string>>;

type FormState = {
  account: string;
  password: string;
  confirmPassword: string;
  errors: FormErrors;
};

// ──────────────────────────────────────────────────────────────────────────────
// Componente
// ──────────────────────────────────────────────────────────────────────────────
export function CreateAccountForm() {
  const [form, setForm] = useState<FormState>({
    account: "",
    password: "",
    confirmPassword: "",
    errors: {},
  });

  const [feedback, setFeedback] = useState<FeedbackState>(null);
  const [isPending, startTransition] = useTransition();

  const passwordCriteria = buildPasswordCriteria(form.password);

  const isFormEmpty = !form.account || !form.password || !form.confirmPassword;

  // ── Handlers de campo ──────────────────────────────────────────────────────
  function handleAccountChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({
      ...prev,
      account: e.target.value,
      errors: { ...prev.errors, account: undefined },
    }));
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({
      ...prev,
      password: e.target.value,
      errors: { ...prev.errors, password: undefined },
    }));
  }

  function handleConfirmPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({
      ...prev,
      confirmPassword: e.target.value,
      errors: { ...prev.errors, confirmPassword: undefined },
    }));
  }

  // ── Submit ─────────────────────────────────────────────────────────────────
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFeedback(null);

    const parsed = createAccountSchema.safeParse({
      account: form.account,
      password: form.password,
      confirmPassword: form.confirmPassword,
    });

    if (!parsed.success) {
      const fieldErrors: FormErrors = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as keyof FormErrors;
        if (field && !fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setForm((prev) => ({ ...prev, errors: fieldErrors }));
      return;
    }

    setForm((prev) => ({ ...prev, errors: {} }));

    // TODO: substituir por Server Action quando a API /gamer/account (POST) for implementada
    startTransition(async () => {
      // Simulação de resposta — remover quando conectar à API
      await new Promise((resolve) => setTimeout(resolve, 800));
      setFeedback({
        type: "success",
        message: "Conta criada com sucesso! (integração com API pendente)",
      });
    });
  }

  return (
    <SectionCard
      headingId="section-create-account"
      title="Criar Conta"
      subtitle="Preencha os dados abaixo para vincular uma conta ao seu perfil."
      icon={Gamepad2}
      className="border-none"
    >
      <form
        id="form-create-account"
        onSubmit={handleSubmit}
        noValidate
        aria-label="Formulário de criação de conta de jogo"
        autoComplete="off"
        className="max-w-xl m-auto"
      >
        <fieldset className="space-y-5" disabled={isPending}>
          <legend className="sr-only">Dados da Conta de Jogo</legend>

          {/* ── Campo: Conta ───────────────────────────────────────────────── */}
          <FormField
            id="account"
            label=""
            error={form.errors.account}
          >
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted pointer-events-none"
                aria-hidden="true"
              />
              <FormTextInput
                id="account"
                type="text"
                value={form.account}
                onChange={handleAccountChange}
                hasError={Boolean(form.errors.account)}
                placeholder="Digite sua conta"
                className="pl-9"
                maxLength={12}
                aria-required="true"
                aria-describedby={form.errors.account ? "account-error" : undefined}
                disabled={isPending}
              />
            </div>
          </FormField>

          {/* ── Campo: Senha ───────────────────────────────────────────────── */}
          <PasswordInput
            id="password"
            label=""
            error={form.errors.password}
            leadingIcon={ShieldCheck}
            showLabel="Exibir senha"
            hideLabel="Ocultar senha"
            value={form.password}
            onChange={handlePasswordChange}
            placeholder="••••••••"
            autoComplete="new-password"
            aria-required="true"
          />

          {/* ── Critérios de senha ─────────────────────────────────────────── */}
          <PasswordCriteriaList criteria={passwordCriteria} />

          {/* ── Campo: Confirmar Senha ─────────────────────────────────────── */}
          <PasswordInput
            id="confirmPassword"
            label=""
            error={form.errors.confirmPassword}
            leadingIcon={ShieldCheck}
            showLabel="Exibir confirmação de senha"
            hideLabel="Ocultar confirmação de senha"
            value={form.confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="••••••••"
            autoComplete="new-password"
            aria-required="true"
          />

          {/* ── Feedback ───────────────────────────────────────────────────── */}
          <FeedbackBadge feedback={feedback} />

          {/* ── Submit ────────────────────────────────────────────────────── */}
          <div className="flex justify-end pt-2">
            <FormButton
              form="form-create-account"
              variant="success"
              isPending={isPending}
              pendingLabel="Criando conta..."
              idleIcon={(isPending || isFormEmpty)
                ? <Lock className="size-4" aria-hidden="true" /> :
                <Gamepad2 className="size-4" aria-hidden="true" />}
              disabled={isPending || isFormEmpty}
            >
              Criar Conta de Jogo
            </FormButton>
          </div>
        </fieldset>
      </form>
    </SectionCard>
  );
}
