import Image from "next/image";
import type { Character } from "@/types/dashboard";
import { cn } from "@/lib/utils";

type TopRankingsProps = {
  activeCharacter?: Character | null;
};

const DEFAULT_RANKINGS = [
  {
    rank: 1,
    name: "NightCrawler",
    class: "Warrior",
    level: 85,
    pvpPk: "1248/12",
    avatar: "/images/dasboard/set/elegia/light/dark-elf.jpg",
    rankBg: "bg-amber-500 text-black font-extrabold shadow-[0_0_8px_rgba(245,158,11,0.3)]",
  },
  {
    rank: 2,
    name: "IronWall",
    class: "Paladin",
    level: 80,
    pvpPk: "988/4",
    avatar: null,
    initials: "I",
    rankBg: "bg-slate-700/60 text-slate-200 border border-slate-600/40",
  },
  {
    rank: 3,
    name: "ShadowStep",
    class: "Abyss Walker",
    level: 79,
    pvpPk: "850/85",
    avatar: null,
    initials: "S",
    rankBg: "bg-amber-800/40 text-amber-500 border border-amber-800/60",
  },
  {
    rank: 4,
    name: "ValakasHunter",
    class: "Silver Ranger",
    level: 78,
    pvpPk: "720/12",
    avatar: null,
    initials: "V",
    rankBg: "bg-slate-800/40 text-slate-400 border border-slate-700/20",
  },
  {
    rank: 5,
    name: "EvaBlessing",
    class: "Eva's Saint",
    level: 76,
    pvpPk: "150/2",
    avatar: null,
    initials: "E",
    rankBg: "bg-slate-800/40 text-slate-400 border border-slate-700/20",
  },
  {
    rank: 6,
    name: "TyrantKing",
    class: "Grand Khavatari",
    level: 75,
    pvpPk: "590/45",
    avatar: null,
    initials: "T",
    rankBg: "bg-slate-800/40 text-slate-400 border border-slate-700/20",
  },
];

// Helper para calcular um rank realista baseado no nível do personagem do jogador
function getCharacterRank(character: Character): {
  rank: number;
  name: string;
  class: string;
  level: number;
  pvpPk: string;
  avatar: string | null;
  initials: string;
  rankBg: string;
} {
  const name = character.name;
  const level = character.level;
  const className = character.className;

  const existing = DEFAULT_RANKINGS.find(
    (r) => r.name.toLowerCase() === name.toLowerCase(),
  );
  if (existing) {
    return {
      ...existing,
      initials: ("initials" in existing ? existing.initials : name.slice(0, 1).toUpperCase()) as string,
    };
  }

  let rank = 99;
  let pvp = 0;
  let pk = 0;

  if (level >= 85) {
    rank = 7;
    pvp = 1100;
    pk = 8;
  } else if (level >= 80) {
    rank = 11;
    pvp = 820;
    pk = 5;
  } else if (level >= 75) {
    rank = 19;
    pvp = 450;
    pk = 2;
  } else if (level >= 70) {
    rank = 28;
    pvp = 210;
    pk = 1;
  } else if (level >= 60) {
    rank = 42;
    pvp = 95;
    pk = 0;
  } else if (level >= 40) {
    rank = 68;
    pvp = 12;
    pk = 0;
  } else {
    rank = 124;
    pvp = 0;
    pk = 0;
  }

  return {
    rank,
    name,
    class: className,
    level,
    pvpPk: `${pvp}/${pk}`,
    avatar: null,
    initials: name.slice(0, 1).toUpperCase(),
    rankBg: "bg-slate-800/40 text-slate-400 border border-slate-700/20",
  };
}

export function TopRankings({ activeCharacter }: TopRankingsProps) {
  // Pegamos as primeiras 5 posições de rank
  const topLimit = 5;
  const displayRankings = DEFAULT_RANKINGS.slice(0, topLimit);

  // Verificamos se o personagem ativo está no top 5
  const isActiveInTop5 =
    activeCharacter &&
    displayRankings.some(
      (r) => r.name.toLowerCase() === activeCharacter.name.toLowerCase(),
    );

  // Se o personagem ativo não estiver no top 5, preparamos o seu card de rank para exibir no final
  const activeCharRank =
    activeCharacter && !isActiveInTop5 ? getCharacterRank(activeCharacter) : null;

  return (
    <section className="border border-[#d4af37]/15 bg-[#111111]/90 rounded-xl p-5 shadow-lg flex-1">
      <h2 className="font-serif text-xs font-bold tracking-widest text-[#d4af37]/80 uppercase mb-4">
        Top Rankings
      </h2>
      <div className="w-full overflow-x-auto scrollbar-none">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-white/5 text-[9px] text-dashboard-muted font-bold tracking-wider uppercase">
              <th className="pb-3 w-12 text-center">Rank</th>
              <th className="pb-3 pl-2">Character</th>
              <th className="pb-3 text-center">Level</th>
              <th className="pb-3 text-right">PvP/PK</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {displayRankings.map((row) => {
              const isSelf =
                activeCharacter &&
                row.name.toLowerCase() === activeCharacter.name.toLowerCase();

              return (
                <tr
                  key={row.rank}
                  className={cn(
                    "transition-colors",
                    isSelf ? "bg-[#d4af37]/10 hover:bg-[#d4af37]/15" : "hover:bg-white/[0.02]",
                  )}
                >
                  <td className="py-3 text-center">
                    <div
                      className={cn(
                        "size-6 rounded-full flex items-center justify-center text-xs mx-auto",
                        row.rankBg,
                      )}
                    >
                      {row.rank}
                    </div>
                  </td>
                  <td className="py-3 pl-2">
                    <div className="flex items-center gap-2.5">
                      <div className="relative size-7.5 rounded-full overflow-hidden border border-white/10 bg-slate-800 flex items-center justify-center font-bold text-xs text-dashboard-muted shrink-0">
                        {row.avatar ? (
                          <Image
                            src={row.avatar}
                            alt=""
                            fill
                            className="object-cover object-top"
                            sizes="30px"
                          />
                        ) : (
                          row.initials
                        )}
                      </div>
                      <div className="min-w-0">
                        <div
                          className={cn(
                            "text-xs font-bold truncate leading-snug",
                            row.rank === 1 || isSelf ? "text-[#d4af37]" : "text-white",
                          )}
                        >
                          {row.name}
                        </div>
                        <div className="text-[9px] text-dashboard-muted leading-none">
                          {row.class}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-center text-xs font-semibold text-white/90">
                    {row.level}
                  </td>
                  <td className="py-3 text-right text-xs font-mono text-dashboard-muted font-medium">
                    {row.pvpPk}
                  </td>
                </tr>
              );
            })}

            {/* Separador e Rank real do Personagem Selecionado caso esteja fora do Top 5 */}
            {activeCharRank && (
              <>
                <tr className="bg-[#d4af37]/10 hover:bg-[#d4af37]/15 border-t border-[#d4af37]/20 transition-colors">
                  <td className="py-3 text-center">
                    <div
                      className={cn(
                        "size-6 rounded-full flex items-center justify-center text-xs mx-auto",
                        activeCharRank.rankBg,
                      )}
                    >
                      {activeCharRank.rank}
                    </div>
                  </td>
                  <td className="py-3 pl-2">
                    <div className="flex items-center gap-2.5">
                      <div className="relative size-7.5 rounded-full overflow-hidden border border-white/10 bg-slate-800 flex items-center justify-center font-bold text-xs text-dashboard-muted shrink-0">
                        {activeCharRank.avatar ? (
                          <Image
                            src={activeCharRank.avatar}
                            alt=""
                            fill
                            className="object-cover object-top"
                            sizes="30px"
                          />
                        ) : (
                          activeCharRank.initials
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold truncate leading-snug text-[#d4af37]">
                          {activeCharRank.name}
                        </div>
                        <div className="text-[9px] text-dashboard-muted leading-none">
                          {activeCharRank.class}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-center text-xs font-semibold text-white/90">
                    {activeCharRank.level}
                  </td>
                  <td className="py-3 text-right text-xs font-mono text-dashboard-muted font-medium">
                    {activeCharRank.pvpPk}
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
