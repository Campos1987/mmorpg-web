import Image from "next/image";

import { ProgressBar } from "@/components/dashboard/ui";
import type { Character } from "@/types/dashboard";
import { cn } from "@/lib/utils";

type CharacterCardProps = {
  character: Character;
  isActive: boolean;
  onSelect?: (characterId: string) => void;
};

export function CharacterCard({
  character,
  isActive,
  onSelect,
}: CharacterCardProps) {
  const { stats } = character;

  return (
    <article
      className={cn(
        "relative flex w-64 shrink-0 snap-center flex-col overflow-hidden rounded-xl",
        "transition-dashboard md:w-72",
        isActive ? "neon-border-purple" : "neon-border-blue",
        onSelect && "cursor-pointer hover:opacity-95",
      )}
      onClick={() => onSelect?.(character.id)}
      onKeyDown={(event) => {
        if (onSelect && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          onSelect(character.id);
        }
      }}
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
      aria-pressed={onSelect ? isActive : undefined}
    >
      <div className="relative h-44 w-full md:h-52">
        <Image
          src={character.imageSrc}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 256px, 288px"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-dashboard-bg-deep via-dashboard-bg-deep/60 to-transparent"
          aria-hidden
        />
      </div>

      <div className="relative -mt-16 flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span
                className="inline-flex size-5 items-center justify-center rounded bg-dashboard-success/30 text-xs text-dashboard-success"
                aria-hidden
              >
                ✓
              </span>
              <h3 className="truncate font-serif text-base font-bold text-white">
                {character.name}
              </h3>
            </div>
            {character.isOnline ? (
              <p className="text-xs text-dashboard-success">{character.statusLabel}</p>
            ) : (
              <p className="text-xs text-dashboard-muted">{character.statusLabel}</p>
            )}
          </div>
          <p className="shrink-0 text-right text-xs text-dashboard-muted">
            <span className="block font-semibold text-dashboard-neon-blue">
              {stats.equipmentScore}
            </span>
            Equip.
          </p>
        </div>

        <p className="text-xs text-dashboard-muted">
          {character.className} · Nível {character.level}
        </p>

        <ProgressBar
          variant="hp"
          value={stats.hp.current}
          max={stats.hp.max}
          label="PV"
        />
        <ProgressBar
          variant="mp"
          value={stats.mp.current}
          max={stats.mp.max}
          label="PM"
        />
        <ProgressBar
          variant="xp"
          value={stats.xpPercent}
          showLabel
          label="XP"
        />

        <dl className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-dashboard-muted">
          <div>
            <dt className="sr-only">HP</dt>
            <dd>
              HP {stats.hp.current}/{stats.hp.max}
            </dd>
          </div>
          <div>
            <dt className="sr-only">MP</dt>
            <dd>
              MP {stats.mp.current}/{stats.mp.max}
            </dd>
          </div>
          <div>
            <dt className="sr-only">Missões</dt>
            <dd>
              Missões {stats.activeQuests.current}/{stats.activeQuests.total}
            </dd>
          </div>
          <div>
            <dt className="sr-only">Guilda</dt>
            <dd className="truncate">{stats.guildName}</dd>
          </div>
          <div className="col-span-2">
            <dt className="sr-only">Equipamento</dt>
            <dd className="truncate">{stats.equipmentSummary}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
