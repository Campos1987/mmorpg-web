import Link from "next/link";

import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils";

export function TopBarLogo() {
  return (
    <Link
      href={ROUTES.HOME}
      className={cn(
        "focus-ring inline-flex min-h-12 shrink-0 items-center",
        "max-w-36 min-w-0 font-serif text-base font-bold tracking-wide text-brand-logo",
        "transition-colors hover:text-brand-logo-hover sm:max-w-none sm:text-lg xl:text-xl",
      )}
      aria-label="Ir para a página inicial — Portal MMORPG"
    >
      <span className="truncate">L2 Portal</span>
    </Link>
  );
}
