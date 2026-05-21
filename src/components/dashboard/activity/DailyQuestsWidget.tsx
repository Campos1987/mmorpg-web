import { GlassCard } from "@/components/dashboard/ui";
import type { DailyQuest } from "@/types/dashboard";

import { DailyQuestItem } from "./DailyQuestItem";

type DailyQuestsWidgetProps = {
  quests: DailyQuest[];
};

export function DailyQuestsWidget({ quests }: DailyQuestsWidgetProps) {
  return (
    <GlassCard title="Missões Diárias" as="section">
      {quests.length === 0 ? (
        <p className="text-sm text-dashboard-muted">Nenhuma missão disponível hoje.</p>
      ) : (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {quests.map((quest) => (
            <DailyQuestItem key={quest.id} quest={quest} />
          ))}
        </ul>
      )}
    </GlassCard>
  );
}
