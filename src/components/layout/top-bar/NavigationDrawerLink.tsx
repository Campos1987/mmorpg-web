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
    <li className={isNested ? undefined : "border-t border-[#d4af37]/10 mt-1 pt-1"}>
      <Link
        href={href}
        className={cn(
          "focus-ring flex w-full items-center px-4 py-2.5 text-xs font-medium uppercase tracking-wide text-red-400 transition-colors text-left",
          "hover:bg-[#d4af37]/10 hover:text-brand-gold cursor-pointer",
          isNested ? "pl-8 pr-4" : "px-4",
        )}
        onClick={onNavigationLinkSelect}
      >
        {label}
      </Link>
    </li>
  );
}
