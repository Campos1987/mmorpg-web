import Link from "next/link";

import type { NavigationLeafItem } from "@/types/navigation";
import { cn } from "@/lib/utils";

type NavigationDrawerLinkProps = NavigationLeafItem & {
  onNavigationLinkSelect: () => void;
  isNested?: boolean;
};

export function NavigationDrawerLink({
  label,
  href,
  onNavigationLinkSelect,
  isNested = false,
}: NavigationDrawerLinkProps) {
  return (
    <li className={isNested ? undefined : "border-b border-border"}>
      <Link
        href={href}
        className={cn(
          "focus-ring block min-h-12 py-3 text-sm text-foreground transition-colors",
          "hover:bg-brand-dark hover:text-brand-gold",
          isNested ? "pl-8 pr-4" : "px-4",
        )}
        onClick={onNavigationLinkSelect}
      >
        {label}
      </Link>
    </li>
  );
}
