import { ProgressBar } from "@/components/dashboard/ui";
import type { WeeklyChallenge } from "@/types/dashboard";

type ProgressBarItemProps = {
  challenge: WeeklyChallenge;
};

export function ProgressBarItem({ challenge }: ProgressBarItemProps) {
  const { progress } = challenge;
  const percent = (progress.current / progress.total) * 100;

  return (
    <li className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2 text-sm">
        <span className="flex items-center gap-2 text-white">
          <span aria-hidden>{challenge.icon}</span>
          {challenge.name}
        </span>
        <span className="shrink-0 text-dashboard-muted">
          {progress.current}/{progress.total}
        </span>
      </div>
      <ProgressBar variant={challenge.barVariant} value={percent} label={challenge.name} />
    </li>
  );
}
