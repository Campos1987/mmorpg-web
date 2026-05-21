import Link from "next/link";

import { cn } from "@/lib/utils";
import type { DashboardNavItem } from "@/config/dashboard-navigation";

type DashboardNavLinkProps = DashboardNavItem & {
  isActive: boolean;
};

export function DashboardNavLink({ label, href, isActive }: DashboardNavLinkProps) {
  return (
    <li>
      <Link
        href={href}
        className={cn(
          "focus-ring relative inline-flex min-h-12 min-w-12 items-center justify-center px-3 py-2",
          "text-sm font-medium transition-dashboard",
          isActive
            ? "text-dashboard-neon-blue"
            : "text-dashboard-muted hover:text-white",
        )}
        aria-current={isActive ? "page" : undefined}
      >
        {label}
        {isActive ? (
          <span
            className="absolute inset-x-2 bottom-1 h-0.5 rounded-full bg-dashboard-neon-blue"
            aria-hidden
          />
        ) : null}
      </Link>
    </li>
  );
}
