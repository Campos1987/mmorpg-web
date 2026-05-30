/**
 * FeedbackBadge — Badge de retorno de ação (sucesso / erro).
 *
 * Extraído de UserProfileForm para ser reutilizável em qualquer formulário
 * do dashboard que faça Server Actions.
 *
 * WCAG 4.1.3 (Mensagens de Status):
 *  - role="alert" + aria-live="polite" garante anúncio imediato por leitores
 *    de tela sem mover o foco do usuário.
 */

import { CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Tipo exportado para uso em useState nos formulários ────────────────────────
export type FeedbackState = {
  type: "success" | "error";
  message: string;
} | null;

interface FeedbackBadgeProps {
  feedback: FeedbackState;
  className?: string;
}

export function FeedbackBadge({ feedback, className }: FeedbackBadgeProps) {
  if (!feedback) return null;

  const isSuccess = feedback.type === "success";

  return (
    <div
      role="alert"
      /*
       * aria-live="polite": anuncia a mensagem sem interromper o leitor de tela.
       * aria-atomic="true": lê toda a mensagem, não apenas o trecho alterado.
       */
      aria-live="polite"
      aria-atomic="true"
      className={cn(
        "flex items-start gap-3 rounded-lg border px-4 py-3 text-sm transition-dashboard",
        isSuccess
          ? "border-dashboard-success/30 bg-dashboard-success/10 text-dashboard-success"
          : "border-brand-cta/30 bg-brand-cta/10 text-brand-cta",
        className,
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
