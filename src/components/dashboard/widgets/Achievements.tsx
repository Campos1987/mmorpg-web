import { Swords, Trophy, Vault, Star } from "lucide-react";

export function Achievements() {
  const achievementsList = [
    {
      id: "1",
      title: "Dragon Slayer",
      desc: "Defeated all Raid bosses",
      status: "5/5",
      statusColor: "text-amber-500",
      borderColor: "border-amber-500/20 hover:border-amber-500/40",
      iconBg: "bg-amber-500/10 text-amber-500",
      icon: Trophy,
    },
    {
      id: "2",
      title: "PvP Warlord",
      desc: "100 PvP Wins",
      status: "100/100",
      statusColor: "text-red-500",
      borderColor: "border-red-500/20 hover:border-red-500/40",
      iconBg: "bg-red-500/10 text-red-500",
      icon: Swords,
    },
    {
      id: "3",
      title: "Treasure Hunter",
      desc: "Accumulated 100M Adena",
      status: "Accumulating...",
      statusColor: "text-cyan-400",
      borderColor: "border-cyan-500/20 hover:border-cyan-500/40",
      iconBg: "bg-cyan-500/10 text-cyan-400",
      icon: Vault,
    },
    {
      id: "4",
      title: "Skill Master",
      desc: "Level 85 Mastery",
      status: "85/85 Skills",
      statusColor: "text-yellow-400",
      borderColor: "border-yellow-500/20 hover:border-yellow-500/40",
      iconBg: "bg-yellow-500/10 text-yellow-400",
      icon: Star,
    },
  ];

  return (
    <section className="border border-[#d4af37]/15 bg-[#111111]/90 rounded-xl p-5 shadow-lg">
      <h2 className="font-serif text-xs font-bold tracking-widest text-[#d4af37]/80 uppercase mb-4">
        Achievements
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {achievementsList.map((ach) => {
          const Icon = ach.icon;
          return (
            <div
              key={ach.id}
              className={`flex items-start gap-3 bg-black/40 border rounded-lg p-3.5 transition-all duration-300 ${ach.borderColor}`}
            >
              <div className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${ach.iconBg}`}>
                <Icon className="size-5" />
              </div>
              <div className="min-w-0">
                <h3 className="font-serif text-sm font-bold text-white truncate">
                  {ach.title}
                </h3>
                <p className="text-[10px] text-dashboard-muted mt-0.5 truncate">
                  {ach.desc}
                </p>
                <div className={`text-[10px] font-bold mt-1.5 ${ach.statusColor}`}>
                  {ach.status}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
