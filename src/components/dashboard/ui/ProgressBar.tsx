import { cn } from "@/lib/utils";

export type ProgressBarVariant = "hp" | "mp" | "cp" | "xp" | "blue" | "purple";

type ProgressBarProps = {
  value: number;
  max?: number;
  variant?: ProgressBarVariant;
  label?: string;
  showLabel?: boolean;
  className?: string;
};

const fillStyles: Record<ProgressBarVariant, string> = {
  cp: "bg-dashboard-cp",
  hp: "bg-dashboard-danger",
  mp: "bg-dashboard-neon-blue",
  xp: "bg-gradient-to-r from-dashboard-neon-blue to-dashboard-neon-purple",
  blue: "bg-dashboard-neon-blue",
  purple: "bg-dashboard-neon-purple",
};

export function ProgressBar({
  value,
  max = 100,
  variant = "blue",
  label,
  showLabel = false,
  className,
}: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn("w-full", className)}>
      {(label || showLabel) && (
        <div className="mb-1 flex items-center justify-between text-xs text-dashboard-muted">
          {label ? <span>{label}</span> : <span />}
          {showLabel && <span>{Math.round(percent)}%</span>}
        </div>
      )}
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-slate-800/80"
        role="progressbar"
        aria-valuenow={Math.round(percent)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div
          className={cn("h-full rounded-full transition-dashboard", fillStyles[variant])}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
