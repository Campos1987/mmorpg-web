import Image from "next/image";

import { Badge, StatusIndicator } from "@/components/dashboard/ui";
import type { DashboardUser } from "@/types/dashboard";
import { cn } from "@/lib/utils";

type DashboardUserMenuProps = {
  user: DashboardUser;
  className?: string;
};

export function DashboardUserMenu({ user, className }: DashboardUserMenuProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative shrink-0">
        <Image
          src={user.avatarSrc}
          alt=""
          width={44}
          height={44}
          className="size-11 rounded-full border border-dashboard-neon-blue/30 object-cover"
        />
        <Badge
          variant="level"
          className="absolute -bottom-1 -right-1 size-6"
          aria-label={`Nível ${user.level}`}
        >
          {user.level}
        </Badge>
      </div>
      <div className="hidden min-w-0 sm:block">
        <p className="truncate text-sm font-semibold text-white">{user.displayName}</p>
        <StatusIndicator status={user.connectionStatus} />
      </div>
    </div>
  );
}
