"use client";

import { useState, useTransition } from "react";
import { Eye, EyeOff, Lock, Calendar, User, Mail, ShieldCheck, CheckCircle2, XCircle, Loader2 } from "lucide-react";

import { FormField } from "@/components/ui/form/FormField";
import { FormTextInput } from "@/components/ui/form/FormTextInput";
import {
  saveBirthDateAction,
  changePasswordAction,
} from "@/actions/user-profile-actions";
import {
  birthDateSchema,
  changePasswordSchema,
} from "@/schemas/user-profile-schema";
import type { UserProfileData, ProfileActionResult } from "@/types/user-profile";
import { cn } from "@/lib/utils";

// ──────────────────────────────────────────────────────────────────────────────
// Sub-tipos de estado local
// ──────────────────────────────────────────────────────────────────────────────

type BirthDateFormState = {
  birthDate: string;
  error?: string;
};

type PasswordFormState = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  errors: Partial<Record<"currentPassword" | "newPassword" | "confirmPassword", string>>;
  showCurrent: boolean;
  showNew: boolean;
  showConfirm: boolean;
};

type FeedbackState = {
  type: "success" | "error";
  message: string;
} | null;

// ──────────────────────────────────────────────────────────────────────────────
// Utilitário: formata data ISO para o formato de exibição (DD/MM/AAAA)
// ──────────────────────────────────────────────────────────────────────────────
function formatDateDisplay(iso: string): string {
  const [year, month, day] = iso.split("-");
  if (!year || !month || !day) return iso;
  return `${day}/${month}/${year}`;
}

// ──────────────────────────────────────────────────────────────────────────────
// Sub-componente: badge de feedback (sucesso / erro)
// ──────────────────────────────────────────────────────────────────────────────
function FeedbackBadge({ feedback }: { feedback: FeedbackState }) {
  if (!feedback) return null;

  const isSuccess = feedback.type === "success";

  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn(
        "flex items-start gap-3 rounded-lg border px-4 py-3 text-sm transition-dashboard",
        isSuccess
          ? "border-dashboard-success/30 bg-dashboard-success/10 text-dashboard-success"
          : "border-brand-cta/30 bg-brand-cta/10 text-brand-cta",
      )}
    >
      {isSuccess ? (
        <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      ) : (
        <XCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      )}
      <span>{feedback.message}</span>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Sub-componente: campo de leitura somente
// ──────────────────────────────────────────────────────────────────────────────
function ReadOnlyField({
  id,
  label,
  value,
  icon: Icon,
}: {
  id: string;
  label: string;
  value: string;
  icon: React.ElementType;
}) {
  return (
    <ul className={cn("mx-auto w-full max-w-md flex justify-between items-center ",
      "gap-4 list-none p-0")}>
      <li className="shrink-0">
        <label
          htmlFor={id}
          className="flex items-center gap-1.5 text-sm font-medium text-muted"
        >
          <Icon className="size-3.5" aria-hidden="true" />
          {label}
        </label>
      </li>
      <li className="text-right truncate">
        {value}
      </li>
    </ul>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Props do componente principal
// ──────────────────────────────────────────────────────────────────────────────
interface UserProfileFormProps {
  profile: UserProfileData;
}

// ──────────────────────────────────────────────────────────────────────────────
// Componente principal: UserProfileForm
// ──────────────────────────────────────────────────────────────────────────────
export function UserProfileForm({ profile }: UserProfileFormProps) {
  // ── Condicional: a data de nascimento já está cadastrada?
  const hasBirthDate = Boolean(profile.birthDate?.trim());

  // ── Estado: formulário de data de nascimento (somente quando editável)
  const [birthDateForm, setBirthDateForm] = useState<BirthDateFormState>({
    birthDate: "",
  });

  // ── Estado: formulário de alteração de senha
  const [passwordForm, setPasswordForm] = useState<PasswordFormState>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    errors: {},
    showCurrent: false,
    showNew: false,
    showConfirm: false,
  });

  // ── Feedback de retorno das Server Actions
  const [birthDateFeedback, setBirthDateFeedback] = useState<FeedbackState>(null);
  const [passwordFeedback, setPasswordFeedback] = useState<FeedbackState>(null);

  // ── useTransition para feedback de carregamento sem bloquear a UI
  const [isBirthDatePending, startBirthDateTransition] = useTransition();
  const [isPasswordPending, startPasswordTransition] = useTransition();

  // ────────────────────────────────────────────────────────────────────────────
  // Handler: submit do formulário de data de nascimento
  // Conectar: saveBirthDateAction({ birthDate }) — já implementado
  // ────────────────────────────────────────────────────────────────────────────
  function handleBirthDateSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBirthDateFeedback(null);

    // Validação client-side (Zod) antes de chamar a Server Action
    const parsed = birthDateSchema.safeParse({ birthDate: birthDateForm.birthDate });
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      setBirthDateForm((prev) => ({
        ...prev,
        error: firstIssue?.message ?? "Dados inválidos.",
      }));
      return;
    }

    // Limpa erro de campo e dispara a Server Action
    setBirthDateForm((prev) => ({ ...prev, error: undefined }));
    startBirthDateTransition(async () => {
      const result: ProfileActionResult = await saveBirthDateAction({
        birthDate: parsed.data.birthDate,
      });

      if (result.success) {
        setBirthDateFeedback({ type: "success", message: result.message });
        // Limpa o campo após sucesso para evitar dupla submissão
        setBirthDateForm({ birthDate: "" });
      } else {
        setBirthDateFeedback({ type: "error", message: result.message });
        if (result.fieldErrors?.birthDate) {
          setBirthDateForm((prev) => ({
            ...prev,
            error: result.fieldErrors!.birthDate,
          }));
        }
      }
    });
  }

  // ────────────────────────────────────────────────────────────────────────────
  // Handler: submit do formulário de senha
  // Conectar: changePasswordAction({ currentPassword, newPassword, confirmPassword })
  // ────────────────────────────────────────────────────────────────────────────
  function handlePasswordSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPasswordFeedback(null);

    const { currentPassword, newPassword, confirmPassword } = passwordForm;
    const parsed = changePasswordSchema.safeParse({
      currentPassword,
      newPassword,
      confirmPassword,
    });

    if (!parsed.success) {
      const fieldErrors: PasswordFormState["errors"] = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as keyof PasswordFormState["errors"];
        if (field && !fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setPasswordForm((prev) => ({ ...prev, errors: fieldErrors }));
      return;
    }

    setPasswordForm((prev) => ({ ...prev, errors: {} }));
    startPasswordTransition(async () => {
      const result: ProfileActionResult = await changePasswordAction({
        currentPassword: parsed.data.currentPassword,
        newPassword: parsed.data.newPassword,
        confirmPassword: parsed.data.confirmPassword,
      });

      if (result.success) {
        setPasswordFeedback({ type: "success", message: result.message });
        // Limpa os campos de senha após sucesso
        setPasswordForm((prev) => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }));
      } else {
        setPasswordFeedback({ type: "error", message: result.message });
        if (result.fieldErrors) {
          setPasswordForm((prev) => ({
            ...prev,
            errors: result.fieldErrors as PasswordFormState["errors"],
          }));
        }
      }
    });
  }

  // ────────────────────────────────────────────────────────────────────────────
  // Render
  // ────────────────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-8">

      {/* ── Seção 1: Informações Pessoais (somente leitura) ─────────────────── */}
      <section aria-labelledby="section-personal-info">
        <div className="border border-olive-800 rounded-xl p-6 space-y-6">
          <header className="flex items-center gap-3 border-b border-olive-800 pb-4">
            <div className="flex size-9 items-center justify-center rounded-lg bg-brand-cta/20 ring-1 ring-brand-cta/40">
              <User className="size-4 text-brand-cta" aria-hidden="true" />
            </div>
            <div>
              <h2
                id="section-personal-info"
                className="font-serif text-base font-bold tracking-wide text-foreground"
              >
                Informações Pessoais
              </h2>
              <p className="mt-1  text-sm text-gray-300">
                Dados de identidade bloqueados para fins de segurança.
              </p>
            </div>
          </header>

          <div className="space-y-6">
            <div className={cn("focus-ring min-h-12 cursor-not-allowed px-4 py-3",
              "text-sm text-foreground/80 select-none space-y-4")}>
              <ReadOnlyField
                id="field-login"
                label="Usuário (Login)"
                value={profile.login}
                icon={User}
              />

              <ReadOnlyField
                id="field-fullname"
                label="Nome Completo"
                value={profile.fullName}
                icon={User}
              />

              <ReadOnlyField
                id="field-email"
                label="E-mail"
                value={profile.email}
                icon={Mail}
              />

              {hasBirthDate && (
                <ReadOnlyField
                  id="field-birthdate"
                  label="Data de Nascimento"
                  value={formatDateDisplay(profile.birthDate!)}
                  icon={Calendar}
                />
              )}
            </div>

            {!hasBirthDate && (
              <div className="sm:col-span-2">
                <form
                  id="form-birthdate"
                  onSubmit={handleBirthDateSubmit}
                  noValidate
                  aria-label="Formulário de data de nascimento"
                >
                  <fieldset className="space-y-4">
                    <legend className="sr-only">Data de Nascimento</legend>

                    <div className={cn("focus-ring min-h-12 cursor-not-allowed px-4 py-3",
                      "text-sm text-foreground/80 select-none space-y-4",
                      "rounded-lg border border-dashboard-gold/30 bg-dashboard-gold/5")}>
                      <span className="font-semibold">Atenção:</span> A data de
                      nascimento só pode ser cadastrada uma única vez e{" "}
                      <strong>não poderá ser alterada</strong> após salva.
                    </div>

                    <FormField
                      id="birthdate"
                      label=""
                      error={birthDateForm.error}
                    >
                      <div className="relative">
                        <Calendar
                          className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted pointer-events-none"
                          aria-hidden="true"
                        />
                        <FormTextInput
                          id="birthdate"
                          type="date"
                          value={birthDateForm.birthDate}
                          onChange={(e) =>
                            setBirthDateForm((prev) => ({
                              ...prev,
                              birthDate: e.target.value,
                              error: undefined,
                            }))
                          }
                          hasError={Boolean(birthDateForm.error)}
                          className="pl-9"
                          max={new Date().toISOString().split("T")[0]}
                          min="1900-01-01"
                          aria-required="true"
                          disabled={isBirthDatePending}
                        />
                      </div>
                    </FormField>

                    <FeedbackBadge feedback={birthDateFeedback} />

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        form="form-birthdate"
                        disabled={isBirthDatePending || !birthDateForm.birthDate}
                        className={cn(
                          "focus-ring inline-flex items-center gap-2 rounded-lg px-5 py-2.5",
                          "text-sm font-semibold tracking-wide transition-dashboard",
                          "bg-green-900/90 text-white/80",
                          "hover:bg-green-600 hover:ring-green-500/60, cursor-pointer",
                          "disabled:cursor-not-allowed disabled:opacity-50",
                          "disabled:hover:bg-green-900/60 disabled:hover:ring-green-900/60",
                          "disabled:bg-green-900/20 disabled:hover:bg-green-900/20"
                        )}
                        aria-busy={isBirthDatePending}
                      >
                        {isBirthDatePending ? (
                          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                        ) : (
                          <Lock className="size-4" aria-hidden="true" />
                        )}
                        {isBirthDatePending ? "Salvando..." : "Salvar Data"}
                      </button>
                    </div>
                  </fieldset>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Seção 2: Alteração de Senha ────────────────────────────────────── */}
      <section aria-labelledby="section-change-password">
        <div className="border border-olive-800 rounded-xl p-6 space-y-6">
          <header className="flex items-center gap-3 border-b border-olive-800 pb-4">
            <div className="flex size-9 items-center justify-center rounded-lg bg-brand-cta/20 ring-1 ring-brand-cta/40">
              <Lock className="size-4 text-brand-cta" aria-hidden="true" />
            </div>
            <div>
              <h2
                id="section-change-password"
                className="font-serif text-base font-bold tracking-wide text-foreground"
              >
                Alterar Senha
              </h2>
              <p className="mt-1  text-sm text-gray-300">
                8-12 caracteres, incluindo maiúscula, número e símbolo.
              </p>
            </div>
          </header>

          <form
            id="form-change-password"
            onSubmit={handlePasswordSubmit}
            noValidate
            aria-label="Formulário de alteração de senha"
          >
            <fieldset className="space-y-5" disabled={isPasswordPending}>
              <legend className="sr-only">Alterar Senha</legend>

              {/* Senha Atual */}
              <FormField
                id="currentPassword"
                label="Senha Atual"
                error={passwordForm.errors.currentPassword}
              >
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted pointer-events-none"
                    aria-hidden="true"
                  />
                  <FormTextInput
                    id="currentPassword"
                    type={passwordForm.showCurrent ? "text" : "password"}
                    value={passwordForm.currentPassword}
                    onChange={(e) =>
                      setPasswordForm((prev) => ({
                        ...prev,
                        currentPassword: e.target.value,
                        errors: { ...prev.errors, currentPassword: undefined },
                      }))
                    }
                    hasError={Boolean(passwordForm.errors.currentPassword)}
                    className="pl-9 pr-10"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    aria-required="true"
                  />
                  <button
                    type="button"
                    className="focus-ring absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
                    onClick={() =>
                      setPasswordForm((prev) => ({
                        ...prev,
                        showCurrent: !prev.showCurrent,
                      }))
                    }
                    aria-label={
                      passwordForm.showCurrent
                        ? "Ocultar senha atual"
                        : "Exibir senha atual"
                    }
                  >
                    {passwordForm.showCurrent ? (
                      <EyeOff className="size-4" aria-hidden="true" />
                    ) : (
                      <Eye className="size-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </FormField>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Nova Senha */}
                <FormField
                  id="newPassword"
                  label="Nova Senha"
                  error={passwordForm.errors.newPassword}
                >
                  <div className="relative">
                    <ShieldCheck
                      className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted pointer-events-none"
                      aria-hidden="true"
                    />
                    <FormTextInput
                      id="newPassword"
                      type={passwordForm.showNew ? "text" : "password"}
                      value={passwordForm.newPassword}
                      onChange={(e) =>
                        setPasswordForm((prev) => ({
                          ...prev,
                          newPassword: e.target.value,
                          errors: { ...prev.errors, newPassword: undefined },
                        }))
                      }
                      hasError={Boolean(passwordForm.errors.newPassword)}
                      className="pl-9 pr-10"
                      placeholder="••••••••"
                      autoComplete="new-password"
                      aria-required="true"
                    />
                    <button
                      type="button"
                      className="focus-ring absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
                      onClick={() =>
                        setPasswordForm((prev) => ({
                          ...prev,
                          showNew: !prev.showNew,
                        }))
                      }
                      aria-label={
                        passwordForm.showNew
                          ? "Ocultar nova senha"
                          : "Exibir nova senha"
                      }
                    >
                      {passwordForm.showNew ? (
                        <EyeOff className="size-4" aria-hidden="true" />
                      ) : (
                        <Eye className="size-4" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </FormField>

                {/* Confirmar Nova Senha */}
                <FormField
                  id="confirmPassword"
                  label="Confirmar Nova Senha"
                  error={passwordForm.errors.confirmPassword}
                >
                  <div className="relative">
                    <ShieldCheck
                      className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted pointer-events-none"
                      aria-hidden="true"
                    />
                    <FormTextInput
                      id="confirmPassword"
                      type={passwordForm.showConfirm ? "text" : "password"}
                      value={passwordForm.confirmPassword}
                      onChange={(e) =>
                        setPasswordForm((prev) => ({
                          ...prev,
                          confirmPassword: e.target.value,
                          errors: { ...prev.errors, confirmPassword: undefined },
                        }))
                      }
                      hasError={Boolean(passwordForm.errors.confirmPassword)}
                      className="pl-9 pr-10"
                      placeholder="••••••••"
                      autoComplete="new-password"
                      aria-required="true"
                    />
                    <button
                      type="button"
                      className="focus-ring absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
                      onClick={() =>
                        setPasswordForm((prev) => ({
                          ...prev,
                          showConfirm: !prev.showConfirm,
                        }))
                      }
                      aria-label={
                        passwordForm.showConfirm
                          ? "Ocultar confirmação de senha"
                          : "Exibir confirmação de senha"
                      }
                    >
                      {passwordForm.showConfirm ? (
                        <EyeOff className="size-4" aria-hidden="true" />
                      ) : (
                        <Eye className="size-4" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </FormField>
              </div>

              {/* Critérios de senha */}
              <ul
                aria-label="Critérios de segurança da senha"
                className="grid grid-cols-1 gap-1 text-xs text-muted sm:grid-cols-2"
              >
                {[
                  { label: "8 a 12 caracteres", ok: passwordForm.newPassword.length >= 8 && passwordForm.newPassword.length <= 12 },
                  { label: "Ao menos uma letra maiúscula", ok: /[A-Z]/.test(passwordForm.newPassword) },
                  { label: "Ao menos um número", ok: /\d/.test(passwordForm.newPassword) },
                  { label: "Ao menos um símbolo", ok: /[^a-zA-Z0-9]/.test(passwordForm.newPassword) },
                ].map(({ label, ok }) => (
                  <li key={label} className={cn("flex items-center gap-1.5 transition-colors", ok ? "text-dashboard-success" : "text-muted")}>
                    <CheckCircle2 className="size-3.5 shrink-0" aria-hidden="true" />
                    {label}
                  </li>
                ))}
              </ul>

              <FeedbackBadge feedback={passwordFeedback} />

              <div className="flex justify-end">
                <button
                  type="submit"
                  form="form-change-password"
                  disabled={
                    isPasswordPending ||
                    !passwordForm.currentPassword ||
                    !passwordForm.newPassword ||
                    !passwordForm.confirmPassword
                  }
                  className={cn(
                    "focus-ring inline-flex items-center gap-2 rounded-lg px-5 py-2.5",
                    "text-sm font-semibold tracking-wide transition-dashboard",
                    "bg-green-900/90 text-white/80",
                    "hover:bg-green-600 hover:ring-green-500/60, cursor-pointer",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    "disabled:hover:bg-green-900/60 disabled:hover:ring-green-900/60",
                    "disabled:bg-green-900/20 disabled:hover:bg-green-900/20"
                  )}
                  aria-busy={isPasswordPending}
                >
                  {isPasswordPending ? (
                    <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  ) : (
                    <Lock className="size-4" aria-hidden="true" />
                  )}
                  {isPasswordPending ? "Alterando..." : "Alterar Senha"}
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      </section>
    </div>
  );
}
