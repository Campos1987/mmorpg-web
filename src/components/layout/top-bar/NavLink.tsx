import Link from "next/link";

import type { NavigationLinkItem } from "@/types/navigation";
import { cn } from "@/lib/utils";

type NavLinkProps = Pick<NavigationLinkItem, "label" | "href">;

export function NavLink({ label, href }: NavLinkProps) {
  return (
    <li>
      <Link
        href={href}
        className={cn(
          "focus-ring inline-flex min-h-12 items-center px-3 py-2",
          "text-sm font-medium uppercase tracking-wide text-foreground",
          "transition-colors hover:text-brand-gold",
        )}
      >
        {label}
      </Link>
    </li>
  );
}
