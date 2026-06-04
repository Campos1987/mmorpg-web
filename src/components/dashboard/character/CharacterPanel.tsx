import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { ProgressBar } from "@/components/dashboard/ui";
import type { Character } from "@/types/dashboard";
import classes from "@/config/character/classes.json";
import { cn } from "@/lib/utils";

type CharacterPanelProps = {
  character: Character;
  onNext?: () => void;
  onPrev?: () => void;
  hasMultipleCharacters?: boolean;
  isLoading?: boolean;
  className?: string;
};

/**
 * Painel visual do personagem selecionado.
 *
 * Exibe a arte do personagem com gradiente de imersão e as 3 barras
 * de status extraídas da API: CP (pontos de combate), HP (pontos de vida)
 * e MP (pontos de mana), cada uma com valor atual e máximo.
 */
export function CharacterPanel({
  character,
  onNext,
  onPrev,
  hasMultipleCharacters = false,
  isLoading = false,
  className,
}: CharacterPanelProps) {
  const { stats } = character;

  // Encontra o nome da classe estaticamente mapeada a partir do JSON pelo classId do personagem
  const resolvedClass = classes.find((c) => c.id === character.classId);
  const rawClassName = resolvedClass ? resolvedClass.name : character.className;

  // Formata o nome para Capitalize (Capitaliza todas as palavras) e substitui '_' por espaço
  const formattedClassName = rawClassName
    .toLowerCase()
    .replace(/_/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <section
      aria-labelledby="character-panel-heading"
      className={cn(
        "max-w-xs h-full flex flex-col relative overflow-hidden rounded-xl border border-[#d4af37]/20 bg-[#111111]",
        className,
      )}
    >
      {/* ── Overlay de Carregamento ── */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] flex items-center justify-center z-30 transition-all duration-300">
          <div className="flex flex-col items-center gap-2">
            <span className="animate-spin size-8 border-4 border-[#d4af37] border-t-transparent rounded-full" />
            <span className="text-xs text-[#d4af37] font-semibold font-serif tracking-wider">Carregando...</span>
          </div>
        </div>
      )}
      {/* ── Imagem do personagem ── */}
      <div className="relative flex-1 min-h-[160px] w-full">
        <Image
          src="/images/dasboard/set/elegia/light/dark-elf.jpg"
          alt={`Arte do personagem ${character.name}`}
          fill
          priority
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 700px"
        />
        {/* Gradiente de imersão: funde a imagem com o painel de stats */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/50 to-transparent"
          aria-hidden="true"
        />

        {/* Setas de navegação */}
        {hasMultipleCharacters && (
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-3 z-20">
            <button
              type="button"
              onClick={onPrev}
              className="focus-ring flex size-9 items-center justify-center rounded-full bg-black/60 text-brand-gold/80 border border-brand-gold/10 hover:border-[#d4af37]/50 hover:text-[#d4af37] transition-all hover:bg-black/80 hover:scale-110 active:scale-95 cursor-pointer"
              aria-label="Personagem anterior"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={onNext}
              className="focus-ring flex size-9 items-center justify-center rounded-full bg-black/60 text-brand-gold/80 border border-brand-gold/10 hover:border-[#d4af37]/50 hover:text-[#d4af37] transition-all hover:bg-black/80 hover:scale-110 active:scale-95 cursor-pointer"
              aria-label="Próximo personagem"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        )}
      </div>

      {/* ── Identidade do personagem ── */}
      <div className="-mt-10 relative px-6 pb-2 flex items-end justify-between gap-2">
        <div className="min-w-0">
          <h2
            id="character-panel-heading"
            className="font-serif text-xl font-bold text-white truncate"
          >
            {character.name}
          </h2>
          <p className="text-xs text-dashboard-muted mt-0.5">
            {formattedClassName} · Nível {character.level}
          </p>
        </div>

        {/* Badge de status online/offline */}
        <span
          aria-label={character.isOnline ? "Personagem online" : "Personagem offline"}
          className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
            character.isOnline
              ? "bg-dashboard-success/20 text-dashboard-success border border-dashboard-success/30"
              : "bg-slate-800/60 text-dashboard-muted border border-slate-700/40"
          }`}
        >
          <span
            className={`size-1.5 rounded-full ${
              character.isOnline ? "bg-dashboard-success" : "bg-slate-500"
            }`}
            aria-hidden="true"
          />
          {character.statusLabel}
        </span>
      </div>

      {/* ── Barras de status CP / HP / MP ── */}
      <dl className="px-6 pb-6 pt-4 space-y-3">
        {/* CP — Pontos de Combate */}
        <div>
          <dt className="mb-1 flex items-center justify-between text-xs">
            <span className="font-semibold text-dashboard-cp uppercase tracking-wide">
              CP
            </span>
            <span className="text-dashboard-muted tabular-nums">
              {stats.cp.current.toLocaleString("pt-BR")} /{" "}
              {stats.cp.max.toLocaleString("pt-BR")}
            </span>
          </dt>
          <dd>
            <ProgressBar
              variant="cp"
              value={stats.cp.current}
              max={stats.cp.max}
              label=""
            />
          </dd>
        </div>

        {/* HP — Pontos de Vida */}
        <div>
          <dt className="mb-1 flex items-center justify-between text-xs">
            <span className="font-semibold text-dashboard-danger uppercase tracking-wide">
              HP
            </span>
            <span className="text-dashboard-muted tabular-nums">
              {stats.hp.current.toLocaleString("pt-BR")} /{" "}
              {stats.hp.max.toLocaleString("pt-BR")}
            </span>
          </dt>
          <dd>
            <ProgressBar
              variant="hp"
              value={stats.hp.current}
              max={stats.hp.max}
              label=""
            />
          </dd>
        </div>

        {/* MP — Pontos de Mana */}
        <div>
          <dt className="mb-1 flex items-center justify-between text-xs">
            <span className="font-semibold text-dashboard-mp uppercase tracking-wide">
              MP
            </span>
            <span className="text-dashboard-muted tabular-nums">
              {stats.mp.current.toLocaleString("pt-BR")} /{" "}
              {stats.mp.max.toLocaleString("pt-BR")}
            </span>
          </dt>
          <dd>
            <ProgressBar
              variant="mp"
              value={stats.mp.current}
              max={stats.mp.max}
              label=""
            />
          </dd>
        </div>
      </dl>
    </section>
  );
}
