import { cn } from "@/lib/utils";

export type ProgressBarVariant = "hp" | "mp" | "xp" | "gold" | "muted";

type ProgressBarProps = {
  value: number;
  max?: number;
  variant?: ProgressBarVariant;
  label?: string;
  showLabel?: boolean;
  className?: string;
};

const fillStyles: Record<ProgressBarVariant, string> = {
  hp: "bg-brand-cta",
  mp: "bg-slate-500",
  xp: "bg-gradient-to-r from-brand-gold to-brand-gold-hover",
  gold: "bg-brand-gold",
  muted: "bg-slate-600",
};

export function ProgressBar({
  value,
  max = 100,
  variant = "gold",
  label,
  showLabel = false,
  className,
}: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn("w-full", className)}>
      {(label || showLabel) && (
        <div className="mb-1 flex items-center justify-between text-xs text-muted">
          {label ? <span>{label}</span> : <span />}
          {showLabel && <span>{Math.round(percent)}%</span>}
        </div>
      )}
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-brand-card/80"
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
