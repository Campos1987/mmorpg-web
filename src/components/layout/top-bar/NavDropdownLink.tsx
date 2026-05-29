import Link from "next/link";

import type { NavigationLeafItem } from "@/types/navigation";
import { cn } from "@/lib/utils";

type NavDropdownLinkProps = NavigationLeafItem;

export function NavDropdownLink({ label, href }: NavDropdownLinkProps) {
  return (
    <li>
      <Link
        href={href}
        role="menuitem"
        className={cn(
          "focus-ring flex w-full items-center px-4 py-2.5 text-xs font-medium uppercase tracking-wide text-amber-100/80 transition-colors",
          "hover:bg-[#d4af37]/10 hover:text-brand-gold",
        )}
      >
        {label}
      </Link>
    </li>
  );
}
