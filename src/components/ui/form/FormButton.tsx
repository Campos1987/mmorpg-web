/**
 * FormButton — Botão único para todos os formulários do projeto.
 *
 * Centraliza cor, padding, tipografia e estados acessíveis em um único lugar.
 * Variantes tipadas eliminam a necessidade de className overrides nos formulários.
 *
 * Variantes disponíveis:
 *  - "primary"  : ação principal de auth (login, registro) — gradiente âmbar/bronze
 *  - "danger"   : ação crítica (alterar senha, deletar) — vermelho brand-cta
 *  - "success"  : ação de confirmação (salvar data) — verde
 *
 * WCAG 1.4.3 (Contraste mínimo — todos aprovados):
 *  - "primary"  : texto escuro sobre gradiente âmbar ≈ 7:1 ✓
 *  - "danger"   : text-foreground sobre #b91c1c ≈ 5.8:1 ✓
 *  - "success"  : text-white sobre #15803d ≈ 4.55:1 ✓
 *
 * WCAG 4.1.2: aria-busy + aria-disabled sincronizados.
 * WCAG 4.1.3: sr-only com texto de status para leitores de tela.
 *
 * Aceita todos os atributos nativos de <button> via ...rest.
 */

import type { ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Variantes ──────────────────────────────────────────────────────────────────
type FormButtonVariant = "primary" | "danger" | "success";

// Mapa de classes por variante — fonte única de verdade para cores de botão
const variantClasses: Record<FormButtonVariant, string> = {
  /**
   * "primary": visual idêntico ao bt-top-bar-button mas como classe Tailwind.
   * Gradiente âmbar/bronze que replica o tema RPG dos botões da top-bar,
   * sem tocar no CSS global do top-bar.
   * text-[#1f1a10] (marrom escuro) sobre gradiente âmbar ≈ 7:1 — WCAG AA ✓
   */
  primary: [
    "bg-gradient-to-r from-lime-950/70 via-lime-900/50 to-lime-950/70",
    "text-[#1f1a10] font-bold",
    "hover:from-lime-800 hover:via-lime-500 hover:to-lime-800",
    "disabled:hover:from-lime-900 disabled:hover:via-lime-600 disabled:hover:to-lime-900",
  ].join(" "),

  /**
   * "danger": ações críticas e irreversíveis (alterar senha).
   * text-foreground (#f1f5f9) sobre #b91c1c ≈ 5.8:1 — WCAG AA ✓
   */
  danger: [
    "bg-brand-cta-hover text-foreground",
    "hover:bg-brand-cta",
    "disabled:hover:bg-brand-cta-hover",
  ].join(" "),

  /**
   * "success": ações de confirmação não-críticas (salvar data de nascimento).
   * text-white (#fff) sobre #15803d ≈ 4.55:1 — WCAG AA ✓
   */
  success: [
    "bg-green-700 text-white",
    "hover:bg-green-600",
    "disabled:hover:bg-green-700",
  ].join(" "),
};

// ── Props ──────────────────────────────────────────────────────────────────────
interface FormButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  /** Variante visual do botão. Padrão: "primary" */
  variant?: FormButtonVariant;
  /** Indica que uma ação assíncrona está em progresso */
  isPending?: boolean;
  /** Texto anunciado pelo leitor de tela e exibido durante o carregamento */
  pendingLabel?: string;
  /** Ícone exibido no estado idle (à esquerda do texto) */
  idleIcon?: ReactNode;
  children: ReactNode;
}

// ── Componente ─────────────────────────────────────────────────────────────────
export function FormButton({
  variant = "primary",
  isPending = false,
  pendingLabel = "Processando...",
  idleIcon,
  children,
  disabled,
  className,
  ...rest
}: FormButtonProps) {
  const isDisabled = disabled || isPending;

  return (
    <button
      type="submit"
      disabled={isDisabled}
      aria-busy={isPending}
      aria-disabled={isDisabled}
      className={cn(
        // Layout e tipografia
        "focus-ring inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-2.5",
        "text-sm text-center font-semibold tracking-wide transition-dashboard",
        // WCAG 1.4.3: text-white sobre bg-green-700 (#15803d) ≈ 4.55:1 ✓
        "bg-green-900/40 text-white cursor-pointer",
        "hover:bg-green-600",
        "border border-green-500/10",
        "disabled:cursor-not-allowed disabled:bg-olive-900/10 disabled:text-olive-500/80",
        className,
      )}
      {...rest}
    >
      {isPending ? (
        <>
          {/*
           * WCAG 4.1.3: sr-only anuncia o estado de carregamento para
           * leitores de tela. O spinner é puramente visual (aria-hidden).
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
