import Link from "next/link";

import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils";

export function AuthLoginLink() {
  return (
    <div className="bt-top-bar-button">
      <Link
        href={ROUTES.AUTH.LOGIN}
        className={cn(
          "focus-ring inline-flex min-h-12 shrink-0 items-center justify-center whitespace-nowrap px-2 py-2",
          "text-xs font-medium uppercase tracking-wide text-muted",
          "hover:text-foreground xl:px-3 xl:text-sm",
        )}
      >
        <span>
          Login
        </span>
      </Link>
    </div>
  );
}
