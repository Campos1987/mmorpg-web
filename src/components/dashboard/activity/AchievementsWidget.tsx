import { GlassCard } from "@/components/dashboard/ui";
import type { Achievement } from "@/types/dashboard";

import { AchievementItem } from "./AchievementItem";

type AchievementsWidgetProps = {
  achievements: Achievement[];
};

export function AchievementsWidget({ achievements }: AchievementsWidgetProps) {
  const unlocked = achievements.filter((a) => a.status === "unlocked");

  return (
    <GlassCard title="Minhas Conquistas" as="section">
      {unlocked.length === 0 ? (
        <p className="text-sm text-dashboard-muted">Nenhuma conquista desbloqueada.</p>
      ) : (
        <ul className="flex flex-col gap-1">
          {unlocked.map((achievement) => (
            <AchievementItem key={achievement.id} achievement={achievement} />
          ))}
        </ul>
      )}
    </GlassCard>
  );
}
