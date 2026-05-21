import type { Achievement } from "@/types/dashboard";
import { cn } from "@/lib/utils";

type AchievementItemProps = {
  achievement: Achievement;
};

export function AchievementItem({ achievement }: AchievementItemProps) {
  const isUnlocked = achievement.status === "unlocked";

  return (
    <li
      className={cn(
        "flex items-center gap-3 rounded-lg px-2 py-2 transition-dashboard",
        isUnlocked ? "hover:bg-white/5" : "opacity-50",
      )}
    >
      <span className="text-2xl" aria-hidden>
        {achievement.icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-white">{achievement.title}</p>
        <p
          className={cn(
            "text-xs",
            isUnlocked ? "text-dashboard-success" : "text-dashboard-muted",
          )}
        >
          {isUnlocked ? "Desbloqueado" : "Bloqueado"}
        </p>
      </div>
    </li>
  );
}
