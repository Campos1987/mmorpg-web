import { cn } from "@/lib/utils";
import type { ConnectionStatus } from "@/types/dashboard";

type StatusIndicatorProps = {
  status: ConnectionStatus;
  label?: string;
  className?: string;
};

const statusConfig: Record<
  ConnectionStatus,
  { dotClass: string; defaultLabel: string }
> = {
  online: { dotClass: "bg-dashboard-success", defaultLabel: "Conectado" },
  offline: { dotClass: "bg-dashboard-muted", defaultLabel: "Desconectado" },
  away: { dotClass: "bg-dashboard-gold", defaultLabel: "Ausente" },
};

export function StatusIndicator({
  status,
  label,
  className,
}: StatusIndicatorProps) {
  const config = statusConfig[status];
  const displayLabel = label ?? config.defaultLabel;

  return (
    <span
      className={cn("inline-flex items-center gap-1.5 text-xs text-dashboard-muted", className)}
      role="status"
    >
      <span
        className={cn("size-2 shrink-0 rounded-full", config.dotClass)}
        aria-hidden
      />
      <span>{displayLabel}</span>
    </span>
  );
}
