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
          "focus-ring inline-flex min-h-12 items-center justify-center whitespace-nowrap px-2 py-2",
          "text-xs font-medium uppercase tracking-wide text-amber-100",
          "transition-colors hover:text-brand-gold xl:min-w-12 xl:px-3 xl:text-sm 2xl:px-3",
        )}
      >
        {label}
      </Link>
    </li>
  );
}
