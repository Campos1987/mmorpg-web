import type { DailyQuest } from "@/types/dashboard";
import { cn } from "@/lib/utils";

type DailyQuestItemProps = {
  quest: DailyQuest;
};

export function DailyQuestItem({ quest }: DailyQuestItemProps) {
  return (
    <li
      className={cn(
        "relative flex aspect-square min-h-20 flex-col items-center justify-center gap-1",
        "rounded-lg border-2 bg-black/40 p-2 backdrop-blur-md transition-dashboard",
        quest.borderColor,
        quest.completed ? "opacity-70" : "hover:border-yellow-500",
      )}
    >
      <span className="text-2xl" aria-hidden>
        {quest.icon}
      </span>
      <span className="text-center text-xs font-medium text-foreground">{quest.label}</span>
      {quest.completed ? (
        <span
          className="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full bg-brand-success text-xs text-white"
          aria-label="Concluída"
        >
          ✔
        </span>
      ) : null}
    </li>
  );
}
