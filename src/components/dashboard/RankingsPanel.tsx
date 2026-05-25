import Image from "next/image";

export function RankingsPanel() {
  const rankings = [
    {
      rank: 1,
      name: "NightCrawler",
      class: "Warrior",
      level: 85,
      pvpPk: "1240/12",
      medalColor: "from-amber-300 via-amber-500 to-amber-600",
      textColor: "text-dashboard-gold",
      borderColor: "border-dashboard-gold/45 bg-dashboard-gold/5",
      isSelf: true,
      avatar: "/images/dashboard-warrior.png",
    },
    {
      rank: 2,
      name: "IronWall",
      class: "Paladin",
      level: 80,
      pvpPk: "980/4",
      medalColor: "from-slate-200 via-slate-400 to-slate-500",
      textColor: "text-slate-200",
      borderColor: "border-border bg-brand-dark/20",
      isSelf: false,
      avatar: null, // we can use placeholder letters or a generic shield icon
    },
    {
      rank: 3,
      name: "ShadowStep",
      class: "Abyss Walker",
      level: 79,
      pvpPk: "850/85",
      medalColor: "from-amber-600 via-amber-700 to-amber-900",
      textColor: "text-amber-600",
      borderColor: "border-border bg-brand-dark/20",
      isSelf: false,
      avatar: null,
    },
  ];

  return (
    <div className="glass-panel flex flex-1 flex-col rounded-xl p-6 shadow-xl transition-dashboard hover:border-dashboard-neon-blue/30">
      <h3 className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-dashboard-muted mb-4">
        Top Rankings
      </h3>

      <div className="flex-1 overflow-x-auto scrollbar-none">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-border/60 text-[10px] font-bold uppercase tracking-wider text-dashboard-muted">
              <th className="py-2.5 pl-3">Rank</th>
              <th className="py-2.5">Character</th>
              <th className="py-2.5 text-center">Level</th>
              <th className="py-2.5 pr-3 text-right">PvP/PK</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/25">
            {rankings.map((row, idx) => (
              <tr
                key={idx}
                className={`transition-all duration-300 ${
                  row.isSelf
                    ? "border border-dashboard-gold/30 shadow-[0_0_12px_rgba(251,191,36,0.08)]"
                    : "hover:bg-brand-dark/20"
                }`}
              >
                {/* Rank Medalha */}
                <td className="py-3 pl-3">
                  <div className="flex items-center">
                    <div
                      className={`relative flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br font-serif text-xs font-bold text-black ${row.medalColor}`}
                    >
                      {row.rank}
                      <div className="absolute inset-0.5 rounded-full border border-white/20" />
                    </div>
                  </div>
                </td>

                {/* Personagem (Avatar + Nome e Classe) */}
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    {/* Box do Avatar */}
                    <div className="relative h-9 w-9 overflow-hidden rounded-full border border-border bg-brand-dark shadow-inner">
                      {row.avatar ? (
                        <Image
                          src={row.avatar}
                          alt={row.name}
                          fill
                          sizes="36px"
                          className="object-cover object-center scale-110"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-brand-dark text-xs font-bold text-dashboard-muted">
                          {row.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    {/* Nome e Classe */}
                    <div className="flex flex-col">
                      <span
                        className={`font-serif text-sm font-semibold tracking-wide ${
                          row.isSelf ? "text-dashboard-gold" : "text-foreground"
                        }`}
                      >
                        {row.name}
                      </span>
                      <span className="text-[10px] text-dashboard-muted">
                        {row.class}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Level */}
                <td className="py-3 text-center">
                  <span className="font-serif text-sm font-semibold text-foreground">
                    {row.level}
                  </span>
                </td>

                {/* PvP/PK */}
                <td className="py-3 pr-3 text-right">
                  <span className="font-mono text-xs font-medium text-foreground">
                    {row.pvpPk}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
