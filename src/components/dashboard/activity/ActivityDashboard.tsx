import type {
  Achievement,
  DailyQuest,
  GameEvent,
  WeeklyChallenge,
} from "@/types/dashboard";
import { cn } from "@/lib/utils";

import { AchievementsWidget } from "./AchievementsWidget";
import { DailyQuestsWidget } from "./DailyQuestsWidget";
import { EventCalendarWidget } from "./EventCalendarWidget";
import { WeeklyChallengesWidget } from "./WeeklyChallengesWidget";

type ActivityDashboardProps = {
  dailyQuests: DailyQuest[];
  weeklyChallenges: WeeklyChallenge[];
  nextEvent: GameEvent;
  achievements: Achievement[];
  className?: string;
};

export function ActivityDashboard({
  dailyQuests,
  weeklyChallenges,
  nextEvent,
  achievements,
  className,
}: ActivityDashboardProps) {
  return (
    <section
      className={cn("container-content pb-12", className)}
      aria-label="Progresso diário e atividades"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DailyQuestsWidget quests={dailyQuests} />
        <WeeklyChallengesWidget challenges={weeklyChallenges} />
        <EventCalendarWidget event={nextEvent} />
        <AchievementsWidget achievements={achievements} />
      </div>
    </section>
  );
}
