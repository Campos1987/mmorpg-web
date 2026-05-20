import Link from "next/link";

import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils";

export function AuthLoginLink() {
  return (
    <Link
      href={ROUTES.AUTH.LOGIN}
      className={cn(
        "focus-ring inline-flex min-h-12 min-w-12 items-center justify-center px-4 py-2",
        "rounded-md border border-border text-sm font-medium text-muted",
        "transition-colors hover:border-muted hover:text-foreground",
      )}
    >
      Login
    </Link>
  );
}
