import Image from "next/image";
import Link from "next/link";

import {
  DASHBOARD_ACTIVE_NAV_ID,
  DASHBOARD_NAV_ITEMS,
} from "@/config/dashboard-navigation";
import { ROUTES } from "@/config/routes";
import type { DashboardUser } from "@/types/dashboard";
import { cn } from "@/lib/utils";

import { DashboardNavLink } from "./DashboardNavLink";
import { DashboardQuickActions } from "./DashboardQuickActions";
import { DashboardUserMenu } from "./DashboardUserMenu";

type DashboardNavbarProps = {
  user: DashboardUser;
  activeNavId?: string;
  className?: string;
};

export function DashboardNavbar({
  user,
  activeNavId = DASHBOARD_ACTIVE_NAV_ID,
  className,
}: DashboardNavbarProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-dashboard-neon-blue/20 bg-dashboard-bg-deep/90 backdrop-blur-md",
        className,
      )}
    >
      <div className="container-content flex h-16 items-center justify-between gap-4">
        <Link
          href={ROUTES.DASHBOARD.ROOT}
          className="focus-ring shrink-0 transition-dashboard hover:opacity-90"
          aria-label="GamerHub — Início do painel"
        >
          <Image
            src="/assets/dashboard/icons/logo.svg"
            alt=""
            width={120}
            height={32}
            priority
          />
        </Link>

        <nav
          className="hidden flex-1 justify-center lg:flex"
          aria-label="Navegação principal do painel"
        >
          <ul className="flex items-center gap-1">
            {DASHBOARD_NAV_ITEMS.map((item) => (
              <DashboardNavLink
                key={item.id}
                {...item}
                isActive={item.id === activeNavId}
              />
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <DashboardUserMenu user={user} />
          <DashboardQuickActions unreadCount={user.unreadNotifications} />
        </div>
      </div>
    </header>
  );
}
