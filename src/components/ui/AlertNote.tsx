/**
 * AlertNote — Caixa de aviso informativa (não-interativa).
 *
 * Substitui o padrão anterior que aplicava `focus-ring` e `cursor-not-allowed`
 * em um <div> estático, o que violava WCAG 4.1.2 (Função e Nome).
 *
 * WCAG 4.1.2: Elementos não-interativos não devem ter role ou atributos
 *   reservados a controles (ex: cursor-pointer/cursor-not-allowed implica
 *   interatividade para tecnologias assistivas).
 *
 * Variantes:
 *  - "gold"  : aviso de atenção (padrão — tom âmbar/dourado do tema)
 *  - "error" : mensagem de erro crítico (vermelho/CTA)
 *  - "info"  : informação neutra (azul-neon do dashboard)
 */

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type AlertNoteVariant = "gold" | "error" | "info";

interface AlertNoteProps {
  children: ReactNode;
  variant?: AlertNoteVariant;
  className?: string;
}

const variantClasses: Record<AlertNoteVariant, string> = {
  // WCAG 1.4.3: bg-dashboard-gold/10 eleva contraste da borda sobre fundo escuro
  gold: "border-dashboard-gold/50 bg-dashboard-gold/10 text-foreground",
  error: "border-brand-cta/40 bg-brand-cta/10 text-foreground",
  info: "border-dashboard-neon-blue/30 bg-dashboard-neon-blue/5 text-foreground",
};

export function AlertNote({
  children,
  variant = "gold",
  className,
}: AlertNoteProps) {
  return (
    /*
     * role="note": comunica a semântica de "nota informativa" a leitores de tela.
     * NÃO usa role="alert" pois a mensagem não é urgente nem dinâmica.
     * WCAG 4.1.2: Sem cursor-not-allowed, sem focus-ring — não é interativo.
     */
    <div
      role="note"
      className={cn("rounded-lg border px-4 py-3 text-sm space-y-1",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </div>
  );
}
