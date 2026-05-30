/**
 * UserProfileForm — Formulário de "Dados Cadastrais" e "Alterar Senha".
 *
 * Refatorado para WCAG 2.1 AA conforme plano de acessibilidade aprovado.
 * Cada seção foi extraída para componentes reutilizáveis e tipados.
 *
 * Componentes utilizados:
 *  - SectionCard        : container semântico de seção (aria-labelledby)
 *  - ReadOnlyDataList   : dl/dt/dd para pares rótulo-valor (WCAG 1.3.1)
 *  - AlertNote          : aviso não-interativo com role="note" (WCAG 4.1.2)
 *  - PasswordInput      : input de senha com toggle e alvo 44px (WCAG 2.5.5)
 *  - PasswordCriteriaList: critérios com ícone condicional (WCAG 1.4.1)
 *  - FeedbackBadge      : badge de retorno de Server Action (WCAG 4.1.3)
 *  - SubmitButton       : botão com contraste 4.55:1 e aria-busy (WCAG 1.4.3)
 */

"use client";

import { useState, useTransition } from "react";
import { Lock, Calendar, User, Mail, ShieldCheck } from "lucide-react";

import { SectionCard } from "@/components/ui/SectionCard";
import { ReadOnlyDataList } from "@/components/ui/ReadOnlyDataList";
import type { DataListItem } from "@/components/ui/ReadOnlyDataList";
import { AlertNote } from "@/components/ui/AlertNote";
import { FeedbackBadge } from "@/components/ui/FeedbackBadge";
import type { FeedbackState } from "@/components/ui/FeedbackBadge";
import { PasswordInput } from "@/components/ui/form/PasswordInput";
import {
  PasswordCriteriaList,
  buildPasswordCriteria,
} from "@/components/ui/PasswordCriteriaList";
import { FormButton } from "@/components/ui/form/FormButton";
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

// ──────────────────────────────────────────────────────────────────────────────
// Utilitário: formata data ISO → DD/MM/AAAA para exibição
// ──────────────────────────────────────────────────────────────────────────────
function formatDateDisplay(iso: string): string {
  const [year, month, day] = iso.split("-");
  if (!year || !month || !day) return iso;
  return `${day}/${month}/${year}`;
}

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
};

// ──────────────────────────────────────────────────────────────────────────────
// Props
// ──────────────────────────────────────────────────────────────────────────────
interface UserProfileFormProps {
  profile: UserProfileData;
}

// ──────────────────────────────────────────────────────────────────────────────
// Componente principal
// ──────────────────────────────────────────────────────────────────────────────
export function UserProfileForm({ profile }: UserProfileFormProps) {
  // ── Condicional: a data de nascimento já está cadastrada?
  const hasBirthDate = Boolean(profile.birthDate?.trim());

  // ── Estado: formulário de data de nascimento (somente quando editável)
  const [birthDateForm, setBirthDateForm] = useState<BirthDateFormState>({
    birthDate: "",
  });

  // ── Estado: formulário de alteração de senha
  // Estado de visibilidade removido daqui — agora encapsulado no PasswordInput
  const [passwordForm, setPasswordForm] = useState<PasswordFormState>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    errors: {},
  });

  // ── Feedback das Server Actions
  const [birthDateFeedback, setBirthDateFeedback] = useState<FeedbackState>(null);
  const [passwordFeedback, setPasswordFeedback] = useState<FeedbackState>(null);

  // ── useTransition: feedback de carregamento sem bloquear UI
  const [isBirthDatePending, startBirthDateTransition] = useTransition();
  const [isPasswordPending, startPasswordTransition] = useTransition();

  // ────────────────────────────────────────────────────────────────────────────
  // Dados da seção de informações pessoais (somente leitura)
  // ────────────────────────────────────────────────────────────────────────────
  const personalDataItems: DataListItem[] = [
    {
      id: "field-login",
      label: "Usuário (Login)",
      value: profile.login,
      icon: User,
    },
    {
      id: "field-fullname",
      label: "Nome Completo",
      value: profile.fullName,
      icon: User,
    },
    {
      id: "field-email",
      label: "E-mail",
      value: profile.email,
      icon: Mail,
    },
    ...(hasBirthDate
      ? [
          {
            id: "field-birthdate",
            label: "Data de Nascimento",
            value: formatDateDisplay(profile.birthDate!),
            icon: Calendar,
          } satisfies DataListItem,
        ]
      : []),
  ];

  // ────────────────────────────────────────────────────────────────────────────
  // Handler: submit do formulário de data de nascimento
  // ────────────────────────────────────────────────────────────────────────────
  function handleBirthDateSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBirthDateFeedback(null);

    const parsed = birthDateSchema.safeParse({
      birthDate: birthDateForm.birthDate,
    });

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      setBirthDateForm((prev) => ({
        ...prev,
        error: firstIssue?.message ?? "Dados inválidos.",
      }));
      return;
    }

    setBirthDateForm((prev) => ({ ...prev, error: undefined }));
    startBirthDateTransition(async () => {
      const result: ProfileActionResult = await saveBirthDateAction({
        birthDate: parsed.data.birthDate,
      });

      if (result.success) {
        setBirthDateFeedback({ type: "success", message: result.message });
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
  // Critérios de senha gerados de forma reativa
  // ────────────────────────────────────────────────────────────────────────────
  const passwordCriteria = buildPasswordCriteria(passwordForm.newPassword);

  // ── Desabilita o botão de senha somente se os campos obrigatórios estiverem
  //    vazios (validação real de critérios é feita via Zod no submit)
  const isPasswordFormEmpty =
    !passwordForm.currentPassword ||
    !passwordForm.newPassword ||
    !passwordForm.confirmPassword;

  // ────────────────────────────────────────────────────────────────────────────
  // Render
  // ────────────────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-8">

      {/* ── Seção 1: Informações Pessoais ──────────────────────────────────── */}
      <SectionCard
        headingId="section-personal-info"
        title="Informações Pessoais"
        subtitle="Dados de identidade bloqueados para fins de segurança."
        icon={User}
      >
        <div className="space-y-6">
          {/*
           * WCAG 1.3.1: ReadOnlyDataList usa <dl>/<dt>/<dd> — semântica
           * correta para pares nome-valor. Substitui <label> sem <input>
           * associado (violação do padrão anterior).
           */}
          <ReadOnlyDataList items={personalDataItems} />

          {/* ── Formulário de data de nascimento (apenas se não cadastrada) */}
          {!hasBirthDate && (
            <form
              id="form-birthdate"
              onSubmit={handleBirthDateSubmit}
              noValidate
              aria-label="Formulário de data de nascimento"
            >
              <fieldset className="space-y-4">
                <legend className="sr-only">Cadastrar Data de Nascimento</legend>

                {/*
                 * WCAG 4.1.2: AlertNote usa role="note" em vez de <div> com
                 * focus-ring/cursor-not-allowed (que implicava interatividade).
                 */}
                <AlertNote variant="gold">
                  <strong>Atenção:</strong> A data de nascimento só pode ser
                  cadastrada uma única vez e{" "}
                  <strong>não poderá ser alterada</strong> após salva.
                </AlertNote>

                {/*
                 * WCAG 2.4.6: label visível e associada via htmlFor/id.
                 * O padrão anterior tinha label="" (vazia) — sem rótulo para SR.
                 * type="date": invoca calendário nativo do SO em dispositivos móveis.
                 */}
                <FormField
                  id="birthdate"
                  label="Data de Nascimento"
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
                  {/*
                   * SubmitButton centraliza: WCAG 1.4.3 (contraste 4.55:1),
                   * 4.1.2 (aria-busy/aria-disabled), 4.1.3 (sr-only de status).
                   */}
                  <FormButton
                    form="form-birthdate"
                    variant="success"
                    isPending={isBirthDatePending}
                    pendingLabel="Salvando..."
                    idleIcon={<Lock className="size-4" aria-hidden="true" />}
                    disabled={isBirthDatePending || !birthDateForm.birthDate}
                  >
                    Salvar Data
                  </FormButton>
                </div>
              </fieldset>
            </form>
          )}
        </div>
      </SectionCard>

      {/* ── Seção 2: Alteração de Senha ────────────────────────────────────── */}
      <SectionCard
        headingId="section-change-password"
        title="Alterar Senha"
        subtitle="8-12 caracteres, incluindo maiúscula, número e símbolo."
        icon={Lock}
      >
        <form
          id="form-change-password"
          onSubmit={handlePasswordSubmit}
          noValidate
          aria-label="Formulário de alteração de senha"
        >
          <fieldset className="space-y-5" disabled={isPasswordPending}>
            <legend className="sr-only">Alterar Senha</legend>

            {/*
             * PasswordInput encapsula: toggle de visibilidade com aria-label
             * descritivo e aria-pressed, ícone de olho com alvo 44×44px
             * (WCAG 2.5.5) e focus-ring dourado visível (WCAG 2.4.7).
             */}
            <PasswordInput
              id="currentPassword"
              label="Senha Atual"
              error={passwordForm.errors.currentPassword}
              leadingIcon={Lock}
              showLabel="Exibir senha atual"
              hideLabel="Ocultar senha atual"
              value={passwordForm.currentPassword}
              onChange={(e) =>
                setPasswordForm((prev) => ({
                  ...prev,
                  currentPassword: e.target.value,
                  errors: { ...prev.errors, currentPassword: undefined },
                }))
              }
              placeholder="••••••••"
              autoComplete="current-password"
              aria-required="true"
            />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <PasswordInput
                id="newPassword"
                label="Nova Senha"
                error={passwordForm.errors.newPassword}
                leadingIcon={ShieldCheck}
                showLabel="Exibir nova senha"
                hideLabel="Ocultar nova senha"
                value={passwordForm.newPassword}
                onChange={(e) =>
                  setPasswordForm((prev) => ({
                    ...prev,
                    newPassword: e.target.value,
                    errors: { ...prev.errors, newPassword: undefined },
                  }))
                }
                placeholder="••••••••"
                autoComplete="new-password"
                aria-required="true"
              />

              <PasswordInput
                id="confirmPassword"
                label="Confirmar Nova Senha"
                error={passwordForm.errors.confirmPassword}
                leadingIcon={ShieldCheck}
                showLabel="Exibir confirmação de senha"
                hideLabel="Ocultar confirmação de senha"
                value={passwordForm.confirmPassword}
                onChange={(e) =>
                  setPasswordForm((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                    errors: { ...prev.errors, confirmPassword: undefined },
                  }))
                }
                placeholder="••••••••"
                autoComplete="new-password"
                aria-required="true"
              />
            </div>

            {/*
             * WCAG 1.4.1 + 4.1.3: PasswordCriteriaList usa ícone diferente
             * (✓/✗) para estado válido/inválido — não depende apenas de cor.
             * aria-live="polite" anuncia cada critério atingido para SR.
             */}
            <PasswordCriteriaList criteria={passwordCriteria} />

            <FeedbackBadge feedback={passwordFeedback} />

            <div className="flex justify-end">
              <FormButton
                form="form-change-password"
                variant="danger"
                isPending={isPasswordPending}
                pendingLabel="Alterando..."
                idleIcon={<Lock className="size-4" aria-hidden="true" />}
                disabled={isPasswordPending || isPasswordFormEmpty}
              >
                Alterar Senha
              </FormButton>
            </div>
          </fieldset>
        </form>
      </SectionCard>
    </div>
  );
}
