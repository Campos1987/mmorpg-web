import Link from "next/link";

import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils";

export function AuthRegisterLink() {
  return (
    <Link
      href={ROUTES.AUTH.REGISTER}
      className={cn(
        "focus-ring inline-flex min-h-12 items-center justify-center px-5 py-2",
        "rounded-md bg-brand-cta text-sm font-semibold uppercase tracking-wide text-foreground",
        "ring-1 ring-brand-gold/40 transition-colors",
        "hover:bg-brand-cta-hover hover:ring-brand-gold/60",
      )}
    >
      Registro
    </Link>
  );
}
