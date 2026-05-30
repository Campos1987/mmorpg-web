/**
 * PasswordCriteriaList — Lista de requisitos de senha com feedback visual
 * e auditivo em tempo real.
 *
 * WCAG 1.4.1 (Uso de Cor):
 *  - A distinção de estado NÃO depende apenas de cor.
 *  - Ícone diferente para estado válido (CheckCircle2) e inválido (XCircle),
 *    garantindo que usuários com daltonismo percebam o estado corretamente.
 *
 * WCAG 4.1.3 (Mensagens de Status):
 *  - aria-live="polite" + aria-atomic="false" na <ul> garante que cada
 *    critério seja anunciado individualmente pelo leitor de tela ao ser atingido,
 *    sem interromper o fluxo de digitação do usuário.
 */

import { CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Tipagem de cada critério ───────────────────────────────────────────────────
export interface PasswordCriterion {
  /** Chave única para o key do React */
  key: string;
  label: string;
  /** true quando o requisito for satisfeito */
  met: boolean;
}

interface PasswordCriteriaListProps {
  criteria: PasswordCriterion[];
  className?: string;
}

// ── Componente ─────────────────────────────────────────────────────────────────
export function PasswordCriteriaList({
  criteria,
  className,
}: PasswordCriteriaListProps) {
  return (
    <ul
      aria-label="Critérios de segurança da senha"
      /*
       * WCAG 4.1.3: aria-live="polite" anuncia mudanças sem interromper o leitor.
       * aria-atomic="false": anuncia cada <li> individualmente quando mudar.
       */
      aria-live="polite"
      aria-atomic="false"
      className={cn(
        "grid grid-cols-1 gap-1 text-xs sm:grid-cols-2",
        className,
      )}
    >
      {criteria.map(({ key, label, met }) => (
        <li
          key={key}
          className={cn(
            "flex items-center gap-1.5 transition-colors duration-200",
            /*
             * WCAG 1.4.1: cor muda (verde/muted), MAS o ícone também muda
             * (CheckCircle2 ↔ XCircle) para não depender só de cor.
             */
            met ? "text-dashboard-success" : "text-muted",
          )}
        >
          {met ? (
            <CheckCircle2
              className="size-3.5 shrink-0 text-dashboard-success"
              aria-hidden="true"
            />
          ) : (
            <XCircle
              className="size-3.5 shrink-0 text-muted"
              aria-hidden="true"
            />
          )}
          {label}
        </li>
      ))}
    </ul>
  );
}

// ── Utilitário: gera os critérios para uma senha — importar no formulário ──────
export function buildPasswordCriteria(password: string): PasswordCriterion[] {
  return [
    {
      key: "length",
      label: "8 a 12 caracteres",
      met: password.length >= 8 && password.length <= 12,
    },
    {
      key: "uppercase",
      label: "Ao menos uma letra maiúscula",
      met: /[A-Z]/.test(password),
    },
    {
      key: "number",
      label: "Ao menos um número",
      met: /\d/.test(password),
    },
    {
      key: "symbol",
      label: "Ao menos um símbolo",
      met: /[^a-zA-Z0-9]/.test(password),
    },
  ];
}
