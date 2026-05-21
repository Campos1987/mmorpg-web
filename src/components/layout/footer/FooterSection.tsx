import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type FooterSectionProps = {
  readonly sectionId: string;
  readonly heading: string;
  readonly children?: ReactNode;
  readonly className?: string;
};

/**
 * Coluna do rodapé — heading acessível + `<nav>` para lista de links (Fases 4–6).
 */
export function FooterSection({
  sectionId,
  heading,
  children,
  className,
}: FooterSectionProps) {
  return (
    <section
      className={cn("min-w-0", className)}
      aria-labelledby={sectionId}
    >
      <h2
        id={sectionId}
        className="mb-4 font-sans text-xs font-semibold uppercase tracking-wider text-muted"
      >
        {heading}
      </h2>
      <nav aria-labelledby={sectionId}>{children}</nav>
    </section>
  );
}
