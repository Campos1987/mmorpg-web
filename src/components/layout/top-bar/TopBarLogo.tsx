import Link from "next/link";

import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils";

export function TopBarLogo() {
  return (
    <Link
      href={ROUTES.HOME}
      className={cn(
        "focus-ring inline-flex min-h-12 min-w-12 shrink-0 items-center",
        "font-serif text-lg font-bold tracking-wide text-foreground",
        "transition-colors hover:text-brand-gold sm:text-xl",
      )}
      aria-label="Ir para a página inicial — Portal MMORPG"
    >
      <span>L2 Portal</span>
    </Link>
  );
}
