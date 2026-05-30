/**
 * SubmitButton — Botão de envio de formulário com estados visuais acessíveis.
 *
 * Substitui o padrão repetido nos botões "Salvar Data" e "Alterar Senha",
 * centralizando as correções de contraste e acessibilidade.
 *
 * WCAG 1.4.3 (Contraste mínimo):
 *  - text-white sobre bg-green-700 (#15803d) = 4.55:1 — aprovado.
 *  - O padrão anterior `text-white/80 bg-green-900/90` = ~3.1:1 — reprovado.
 *
 * WCAG 4.1.2:
 *  - aria-busy reflete estado de processamento.
 *  - aria-disabled sincronizado com o atributo disabled nativo.
 *  - sr-only com status de carregamento para leitores de tela.
 *
 * Aceita todos os atributos nativos de <button> via ...rest.
 */

import type { ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Props ──────────────────────────────────────────────────────────────────────
interface SubmitButtonProps
  extends React.ComponentPropsWithoutRef<"button"> {
  /** Indica que uma ação assíncrona está em progresso */
  isPending?: boolean;
  /** Texto exibido no estado de carregamento (ex: "Salvando...") */
  pendingLabel?: string;
  /** Ícone exibido no estado idle (antes do spinner) */
  idleIcon?: ReactNode;
  children: ReactNode;
}

// ── Componente ─────────────────────────────────────────────────────────────────
export function SubmitButton({
  isPending = false,
  pendingLabel = "Processando...",
  idleIcon,
  children,
  disabled,
  className,
  ...rest
}: SubmitButtonProps) {
  const isDisabled = disabled || isPending;

  return (
    <button
      type="submit"
      disabled={isDisabled}
      /*
       * WCAG 4.1.2: aria-busy informa leitores de tela que uma operação está
       * em andamento. aria-disabled espelha o estado nativo para compatibilidade
       * com leitores mais antigos que ignoram o atributo disabled nativo.
       */
      aria-busy={isPending}
      aria-disabled={isDisabled}
      className={cn(
        // Layout e tipografia
        "focus-ring inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-2.5",
        "text-sm text-center font-semibold tracking-wide transition-dashboard",
        // WCAG 1.4.3: text-white sobre bg-green-700 (#15803d) ≈ 4.55:1 ✓
        "bg-green-700 text-white cursor-pointer",
        "hover:bg-green-600",
        "border border-green-500/10",
        "desabled:cursor-not-allowed disabled:bg-olive-900/10 disabled:text-olive-500/80",
        /*
        // Layout e tipografia
        "focus-ring inline-flex items-center gap-2 rounded-lg px-5 py-2.5",
        "text-sm font-semibold tracking-wide transition-dashboard",
        // WCAG 1.4.3: text-white sobre bg-green-700 (#15803d) ≈ 4.55:1 ✓
        "bg-green-700 text-white cursor-pointer",
        "hover:bg-green-600",
        // Estado disabled — reduz opacidade mantendo contraste legível
        "disabled:cursor-not-allowed disabled:opacity-50",
        "disabled:hover:bg-green-700",
        */
        className,
      )}
      {...rest}
    >
      {isPending ? (
        <>
          {/*
           * WCAG 4.1.3: sr-only com texto de status para leitores de tela.
           * O spinner visual (aria-hidden) é complementar, não o anúncio primário.
           */}
          <span className="sr-only">{pendingLabel}</span>
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          <span aria-hidden="true">{pendingLabel}</span>
        </>
      ) : (
        <>
          {idleIcon}
          {children}
        </>
      )}
    </button>
  );
}
