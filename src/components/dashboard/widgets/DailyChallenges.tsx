import { Flame, CheckCircle, Briefcase } from "lucide-react";
import { ProgressBar } from "@/components/dashboard/ui";

export function DailyChallenges() {
  const challenges = [
    {
      id: "1",
      label: "Raids",
      subtitle: "Incursions",
      current: 2,
      max: 3,
      percent: 66,
      icon: Flame,
      iconColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    },
    {
      id: "2",
      label: "PvP",
      subtitle: "PvP Daily",
      current: 1,
      max: 5,
      percent: 20,
      icon: CheckCircle,
      iconColor: "text-red-400 bg-red-500/10 border-red-500/20",
    },
    {
      id: "3",
      label: "Adena",
      subtitle: "Collector",
      current: 42,
      max: 100,
      percent: 42,
      isPercentage: true,
      icon: Briefcase,
      iconColor: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    },
  ];

  return (
    <section className="border border-[#d4af37]/15 bg-[#111111]/90 rounded-xl p-5 shadow-lg">
      <h2 className="font-serif text-xs font-bold tracking-widest text-[#d4af37]/80 uppercase mb-4">
        Daily Challenges
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {challenges.map((ch) => {
          const Icon = ch.icon;
          return (
            <div
              key={ch.id}
              className="flex flex-col items-center justify-between text-center bg-black/40 border border-white/5 rounded-lg p-4 hover:border-[#d4af37]/30 transition-all duration-300"
            >
              <div className={`flex size-12 items-center justify-center rounded-full border ${ch.iconColor} mb-3 shrink-0`}>
                <Icon className="size-5.5" />
              </div>
              <div className="mb-4 min-w-0">
                <span className="text-[9px] text-dashboard-muted font-bold tracking-wider uppercase block">
                  {ch.label}
                </span>
                <h3 className="font-serif text-xs font-bold text-white mt-0.5 truncate">
                  {ch.subtitle}
                </h3>
              </div>
              <div className="w-full">
                <div className="flex justify-center text-[10px] font-bold text-dashboard-gold mb-1.5">
                  {ch.isPercentage ? `${ch.current}%` : `${ch.current}/${ch.max}`}
                </div>
                <ProgressBar
                  value={ch.current}
                  max={ch.max}
                  variant="cp"
                  className="h-1"
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
