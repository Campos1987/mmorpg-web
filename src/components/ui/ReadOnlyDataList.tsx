/**
 * ReadOnlyDataList — Lista semântica de pares rótulo/valor somente leitura.
 *
 * Utiliza <dl>/<dt>/<dd> que é a estrutura correta para dados de definição.
 *
 * WCAG 1.3.1 (Info e Relações):
 *  - <label> sem <input> associado (padrão anterior) viola 1.3.1.
 *  - <dl>/<dt>/<dd> anuncia corretamente a relação nome-valor em NVDA/JAWS/VoiceOver.
 */

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// ── Tipagem de cada item da lista ──────────────────────────────────────────────
export interface DataListItem {
  /** id único para o <dd> — pode ser referenciado por aria-labelledby externo */
  id: string;
  label: string;
  value: string;
  /** Ícone Lucide ou qualquer componente SVG */
  icon: React.ElementType;
}

interface ReadOnlyDataListProps {
  items: DataListItem[];
  className?: string;
}

// ── Componente ─────────────────────────────────────────────────────────────────
export function ReadOnlyDataList({ items, className }: ReadOnlyDataListProps) {
  return (
    /*
     * WCAG 1.3.1: <dl> é o elemento semântico correto para pares de definição.
     * Leitores de tela anunciam automaticamente o tipo "lista de definição"
     * e associam cada <dt> ao seu <dd> correspondente.
     */
    <dl
      className={cn(
        "divide-y divide-olive-800/30 rounded-lg overflow-hidden",
        "text-sm text-foreground/90 select-none",
        className,
      )}
    >
      {items.map(({ id, label, value, icon: Icon }) => (
        <div
          key={id}
          className="flex justify-between items-center gap-4 px-4 py-3 min-h-12"
        >
          {/* dt: rótulo do campo — ícone decorativo + texto */}
          <dt className="flex items-center gap-1.5 font-medium text-muted shrink-0 ">
            {/* aria-hidden: ícone puramente decorativo, o texto já descreve */}
            <Icon className="size-3.5 shrink-0" aria-hidden="true" />
            {label}
          </dt>

          {/* dd: valor do campo */}
          <dd id={id} className="text-right truncate text-foreground">
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

// ── Exportação de uma variante de item único (para uso isolado) ────────────────
interface ReadOnlyFieldProps {
  id: string;
  label: string;
  value: ReactNode;
  icon: React.ElementType;
  className?: string;
}

export function ReadOnlyField({
  id,
  label,
  value,
  icon: Icon,
  className,
}: ReadOnlyFieldProps) {
  return (
    <div
      className={cn(
        "flex justify-between items-center gap-4 px-4 py-3 min-h-12",
        className,
      )}
    >
      <dt className="flex items-center gap-1.5 text-sm font-medium text-muted shrink-0">
        <Icon className="size-3.5 shrink-0" aria-hidden="true" />
        {label}
      </dt>
      <dd id={id} className="text-sm text-right truncate text-foreground">
        {value}
      </dd>
    </div>
  );
}
