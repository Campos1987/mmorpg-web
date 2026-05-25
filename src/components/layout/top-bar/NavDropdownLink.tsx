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
          "focus-ring block min-h-12 px-4 py-3 text-sm text-foreground",
          "transition-colors hover:bg-brand-dark hover:text-brand-gold",
        )}
      >
        {label}
      </Link>
    </li>
  );
}
