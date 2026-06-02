/**
 * SectionCard — Container semântico de seção para o Dashboard.
 *
 * Encapsula o padrão de card com cabeçalho (ícone + título + subtítulo)
 * e conteúdo, reutilizado nas seções de "Dados Cadastrais" e "Alterar Senha".
 *
 * WCAG 2.1 AA:
 *  - Usa <section aria-labelledby> para associar título ao contêiner.
 *  - O <h2> recebe o id passado via props para garantir a relação semântica.
 */

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionCardProps {
  /** ID único — conecta o aria-labelledby da <section> ao <h2>. */
  headingId: string;
  title: string;
  subtitle?: string;
  /** Ícone Lucide ou qualquer SVG/componente de ícone. */
  icon: React.ElementType;
  children: ReactNode;
  className?: string;
}

export function SectionCard({
  headingId,
  title,
  subtitle,
  icon: Icon,
  children,
  className,
}: SectionCardProps) {
  return (
    <section aria-labelledby={headingId}>
      <div
        className={cn(
          "border border-olive-800 rounded-xl p-6 space-y-6",
          className,
        )}
      >
        {/* ── Cabeçalho da seção ── */}
        <header className="flex items-stretch gap-3 border-b border-olive-800 pb-4">
          {/* Ícone decorativo — aria-hidden pois o título já descreve a seção */}
          <div
            className={cn(
              "flex size-14 items-center justify-center rounded-lg bg-brand-cta/20 ring-1 ring-brand-cta/40",
            )}
            aria-hidden="true"
          >
            <Icon className="size-6 text-brand-cta" aria-hidden="true" />
          </div>

          <div className="flex-1">
            {/* WCAG 2.4.6: Títulos descritivos e visíveis */}
            <h2
              id={headingId}
              className="text-fluid-h2 mt-0 text-gray-200"
            >
              {title}
            </h2>
            {subtitle && (
              /* text-muted (#94a3b8) sobre bg-slate-900 ≈ 4.6:1 — WCAG 1.4.3 ✓ */
              <p className="mt-1 text-sm text-muted">{subtitle}</p>
            )}
          </div>
        </header>

        {/* ── Conteúdo da seção ── */}
        {children}
      </div>
    </section>
  );
}
