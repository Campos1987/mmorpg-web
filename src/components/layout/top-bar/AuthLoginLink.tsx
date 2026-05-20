import Link from "next/link";

import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils";

export function AuthLoginLink() {
  return (
    <Link
      href={ROUTES.AUTH.LOGIN}
      className={cn(
        "focus-ring inline-flex min-h-12 shrink-0 items-center justify-center whitespace-nowrap px-2 py-2",
        "rounded-md border border-border text-xs font-medium uppercase tracking-wide text-muted",
        "transition-colors hover:border-muted hover:text-foreground xl:px-3 xl:text-sm",
      )}
    >
      Login
    </Link>
  );
}
