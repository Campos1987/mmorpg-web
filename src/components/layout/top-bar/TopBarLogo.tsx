import Link from "next/link";

import { ROUTES } from "@/config/routes";
import { SERVER_INFO } from "@/config/server-info";
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
      aria-label={`Ir para a página inicial — ${SERVER_INFO.serverName}`}
    >
      <span className="truncate">{SERVER_INFO.serverName}</span>
    </Link>
  );
}
