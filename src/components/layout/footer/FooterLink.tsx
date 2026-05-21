import Link from "next/link";

import type { FooterInternalLink } from "@/types/footer";
import { cn } from "@/lib/utils";

type FooterLinkProps = {
  readonly link: FooterInternalLink;
};

/**
 * Link interno do rodapé — `next/link` com `AppRoute` tipado.
 */
export function FooterLink({ link }: FooterLinkProps) {
  return (
    <Link
      href={link.href}
      className={cn(
        "focus-ring block min-h-12 py-2 text-sm text-foreground",
        "transition-colors hover:text-brand-gold",
      )}
    >
      {link.label}
    </Link>
  );
}
