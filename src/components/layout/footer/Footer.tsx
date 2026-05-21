import { FOOTER_SECTIONS } from "@/config/footer-data";
import { FooterQuickLinksSection } from "@/components/layout/footer/FooterQuickLinksSection";
import { FooterSection } from "@/components/layout/footer/FooterSection";
import { FooterSocialSection } from "@/components/layout/footer/FooterSocialSection";
import { cn } from "@/lib/utils";

/**
 * Rodapé global — Server Component (shell). Links por seção nas Fases 4–6.
 */
export function Footer() {
  return (
    <footer className={cn("mt-auto border-t border-border bg-brand-dark")}>
      <div className="container-content py-10 md:py-12">
        <div
          className={cn(
            "flex flex-col gap-10",
            "lg:flex-row lg:items-start lg:justify-between lg:gap-8",
          )}
        >
          <FooterSocialSection />
          <FooterQuickLinksSection />
          <FooterSection
            sectionId={FOOTER_SECTIONS.legal.id}
            heading={FOOTER_SECTIONS.legal.heading}
          />
        </div>
      </div>
    </footer>
  );
}
