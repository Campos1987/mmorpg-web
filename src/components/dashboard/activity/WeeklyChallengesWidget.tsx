import { GlassCard } from "@/components/dashboard/ui";
import type { WeeklyChallenge } from "@/types/dashboard";

import { ProgressBarItem } from "./ProgressBarItem";

type WeeklyChallengesWidgetProps = {
  challenges: WeeklyChallenge[];
};

export function WeeklyChallengesWidget({ challenges }: WeeklyChallengesWidgetProps) {
  return (
    <GlassCard title="Desafios Semanais" as="section">
      <ul className="flex flex-col gap-4">
        {challenges.map((challenge) => (
          <ProgressBarItem key={challenge.id} challenge={challenge} />
        ))}
      </ul>
    </GlassCard>
  );
}
