import { FooterCopyright } from "@/components/layout/footer/FooterCopyright";
import { FooterLegalSection } from "@/components/layout/footer/FooterLegalSection";
import { FooterQuickLinksSection } from "@/components/layout/footer/FooterQuickLinksSection";
import { FooterSocialSection } from "@/components/layout/footer/FooterSocialSection";
import { cn } from "@/lib/utils";

/**
 * Rodapé global — Server Component (RSC), renderizado no `RootLayout`.
 * Layout: colunas empilhadas no mobile, grid 3 colunas a partir de `lg`, `container-content` em ultrawide.
 */
export function Footer() {
  return (
    <footer className={cn("mt-auto shrink-0 border-t border-border bg-brand-dark")}>
      <div className="container-content w-full py-10 md:py-12">
        <div
          className={cn(
            "grid w-full grid-cols-1",
            "gap-x-8 gap-y-[var(--spacing-container)]",
            "lg:grid-cols-3 lg:items-start lg:gap-y-8",
          )}
        >
          <FooterSocialSection />
          <FooterQuickLinksSection />
          <FooterLegalSection />
        </div>
        <FooterCopyright />
      </div>
    </footer>
  );
}
