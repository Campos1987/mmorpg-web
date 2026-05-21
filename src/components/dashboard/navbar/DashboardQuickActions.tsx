import Image from "next/image";

import { Badge } from "@/components/dashboard/ui";
import { cn } from "@/lib/utils";

type DashboardQuickActionsProps = {
  unreadCount: number;
  className?: string;
};

export function DashboardQuickActions({
  unreadCount,
  className,
}: DashboardQuickActionsProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <button
        type="button"
        className="focus-ring relative inline-flex min-h-12 min-w-12 items-center justify-center rounded-lg transition-dashboard hover:bg-white/5"
        aria-label={
          unreadCount > 0
            ? `Notificações, ${unreadCount} não lidas`
            : "Notificações"
        }
      >
        <Image
          src="/assets/dashboard/icons/bell.svg"
          alt=""
          width={22}
          height={22}
          aria-hidden
        />
        {unreadCount > 0 ? (
          <Badge
            variant="notification"
            className="absolute right-1 top-1"
            aria-hidden
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </Badge>
        ) : null}
      </button>
      <button
        type="button"
        className="focus-ring inline-flex min-h-12 min-w-12 items-center justify-center rounded-lg transition-dashboard hover:bg-white/5"
        aria-label="Configurações"
      >
        <Image
          src="/assets/dashboard/icons/settings.svg"
          alt=""
          width={22}
          height={22}
          aria-hidden
        />
      </button>
    </div>
  );
}
