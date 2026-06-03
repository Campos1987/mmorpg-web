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
import { useRouter } from "next/navigation";
import { Gamepad2, Lock, ShieldCheck, User } from "lucide-react";

import { SectionCard } from "@/components/ui/SectionCard";
import { AlertNote } from "@/components/ui/AlertNote";
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
import { createGamerAccountSchema } from "@/schemas/gamer-account-schema";
import { createGamerAccountAction } from "@/actions/gamer-account-actions";
import { ROUTES } from "@/config/routes";

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
interface CreateAccountFormProps {
  accountCount?: number;
}

export function CreateAccountForm({ accountCount = 0 }: CreateAccountFormProps) {
  const router = useRouter();
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
  const isLimitReached = accountCount >= 3;

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

  // ── Handlers de confirmação de senha ───────────────────────────────────────
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

    const parsed = createGamerAccountSchema.safeParse({
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

    startTransition(async () => {
      const res = await createGamerAccountAction({
        account: parsed.data.account,
        password: parsed.data.password,
        confirmPassword: parsed.data.confirmPassword,
      });

      if (res.status === "success") {
        setFeedback({
          type: "success",
          message: "Conta de jogo criada com sucesso!",
        });
        setForm({
          account: "",
          password: "",
          confirmPassword: "",
          errors: {},
        });
        // Dá um pequeno tempo para o feedback visual antes do redirecionamento
        setTimeout(() => {
          router.push(ROUTES.DASHBOARD.ROOT);
          router.refresh();
        }, 1000);
      } else if (res.status === "validation") {
        setForm((prev) => ({
          ...prev,
          errors: res.fieldErrors || {},
        }));
      } else if (res.status === "conflict") {
        setForm((prev) => ({
          ...prev,
          errors: {
            ...prev.errors,
            account: res.message || "Este nome de conta de jogo já está em uso.",
          },
        }));
      } else {
        setFeedback({
          type: "error",
          message: res.message || "Erro inesperado ao criar a conta de jogo.",
        });
      }
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
        <fieldset className="space-y-5" disabled={isPending || isLimitReached}>
          <legend className="sr-only">Dados da Conta de Jogo</legend>

          {/* ── Contador de contas de jogo criadas ── */}
          <div className="space-y-2 border-b border-olive-800/40 pb-4">
            <div className="flex items-center justify-between text-sm text-dashboard-muted">
              <span>Contas de jogo vinculadas</span>
              <span className="font-semibold text-foreground">
                {accountCount} de 3
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-olive-950/60 overflow-hidden border border-olive-800/30">
              <div
                className="h-full rounded-full bg-gradient-to-r from-dashboard-neon-blue to-dashboard-neon-purple transition-all duration-500 ease-out"
                style={{ width: `${(Math.min(accountCount, 3) / 3) * 100}%` }}
              />
            </div>
          </div>

          {/* Aviso se o limite for atingido */}
          {isLimitReached && (
            <AlertNote variant="gold">
              Você já atingiu o limite de <strong>3 contas de jogo</strong>. Para criar uma nova conta, será necessário remover ou desvincular uma conta existente.
            </AlertNote>
          )}

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
              idleIcon={(isPending || isFormEmpty || isLimitReached)
                ? <Lock className="size-4" aria-hidden="true" /> :
                <Gamepad2 className="size-4" aria-hidden="true" />}
              disabled={isPending || isFormEmpty || isLimitReached}
            >
              Criar Conta de Jogo
            </FormButton>
          </div>
        </fieldset>
      </form>
    </SectionCard>
  );
}
