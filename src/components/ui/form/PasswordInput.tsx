/**
 * PasswordInput — Input de senha com botão de revelar/ocultar integrado.
 *
 * Encapsula o padrão repetido 3x em UserProfileForm (Senha Atual, Nova Senha
 * e Confirmar Senha), eliminando duplicação e centralizando as correções
 * de acessibilidade.
 *
 * WCAG 2.5.5 (Tamanho do Alvo):
 *  - O botão de olho tem min-w-[44px] min-h-[44px] para cumprir o mínimo
 *    de 44×44px em dispositivos touch.
 *
 * WCAG 4.1.2:
 *  - aria-label descritivo no botão de toggle (não apenas ícone).
 *  - aria-pressed reflete o estado corrente (visível/oculto).
 */

import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { FormField } from "@/components/ui/form/FormField";
import { FormTextInput } from "@/components/ui/form/FormTextInput";
import { cn } from "@/lib/utils";

// ── Props ──────────────────────────────────────────────────────────────────────
interface PasswordInputProps
  extends Omit<React.ComponentPropsWithoutRef<"input">, "type"> {
  id: string;
  label: string;
  error?: string;
  /** Ícone opcional à esquerda (ex: Lock, ShieldCheck) */
  leadingIcon?: React.ElementType;
  /** Texto do aria-label quando a senha está oculta (padrão gerado automaticamente) */
  showLabel?: string;
  /** Texto do aria-label quando a senha está visível */
  hideLabel?: string;
  /** Classes extras para o container FormField */
  fieldClassName?: string;
  /**
   * Quando true, o label fica visualmente oculto (sr-only) mas permanece no
   * DOM para leitores de tela — WCAG 2.4.6 satisfeito sem impacto visual.
   * Use em formulários que dependem apenas de placeholder para identificação visual.
   */
  hiddenLabel?: boolean;
}

// ── Componente ─────────────────────────────────────────────────────────────────
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput(
    {
      id,
      label,
      error,
      leadingIcon: LeadingIcon,
      showLabel,
      hideLabel,
      hiddenLabel = false,
      fieldClassName,
      className,
      ...rest
    },
    ref,
  ) {
    const [isVisible, setIsVisible] = useState(false);

    const resolvedShowLabel = showLabel ?? `Exibir ${label.toLowerCase()}`;
    const resolvedHideLabel = hideLabel ?? `Ocultar ${label.toLowerCase()}`;

    /*
     * hiddenLabel: passa uma className ao FormField que aplica sr-only no <label>.
     * O label ainda existe no DOM — leitores de tela o anunciam normalmente.
     * Isso garante WCAG 2.4.6 (Headings and Labels) mesmo quando o design
     * usa apenas placeholder como indicação visual.
     */
    return (
      <FormField
        id={id}
        label={label}
        error={error}
        className={fieldClassName}
        labelClassName={hiddenLabel ? "sr-only" : undefined}
      >
        <div className="relative">
          {/* Ícone decorativo à esquerda */}
          {LeadingIcon && (
            <LeadingIcon
              className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted pointer-events-none"
              aria-hidden="true"
            />
          )}

          <FormTextInput
            ref={ref}
            id={id}
            type={isVisible ? "text" : "password"}
            hasError={Boolean(error)}
            className={cn(LeadingIcon ? "pl-9" : "pl-4", "pr-12", className)}
            {...rest}
          />

          {/*
           * WCAG 2.5.5: min-w/min-h de 44px para acessibilidade touch.
           * WCAG 4.1.2: aria-label descritivo + aria-pressed para estado.
           * WCAG 2.4.7: focus-ring visível com cor dourada (definida em globals.css).
           */}
          <button
            type="button"
            onClick={() => setIsVisible((v) => !v)}
            aria-label={isVisible ? resolvedHideLabel : resolvedShowLabel}
            aria-pressed={isVisible}
            className={cn(
              "focus-ring",
              "absolute right-1 top-1/2 -translate-y-1/2",
              "flex items-center justify-center",
              "min-w-[44px] min-h-[44px]",
              "rounded text-muted hover:text-foreground transition-colors",
            )}
          >
            {isVisible ? (
              <EyeOff className="size-4" aria-hidden="true" />
            ) : (
              <Eye className="size-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </FormField>
    );
  },
);
