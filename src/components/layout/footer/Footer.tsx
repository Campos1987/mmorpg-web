import { FOOTER_SECTIONS } from "@/config/footer-data";
import { FooterSection } from "@/components/layout/footer/FooterSection";
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
          <FooterSection
            sectionId={FOOTER_SECTIONS.social.id}
            heading={FOOTER_SECTIONS.social.heading}
          />
          <FooterSection
            sectionId={FOOTER_SECTIONS.quickLinks.id}
            heading={FOOTER_SECTIONS.quickLinks.heading}
          />
          <FooterSection
            sectionId={FOOTER_SECTIONS.legal.id}
            heading={FOOTER_SECTIONS.legal.heading}
          />
        </div>
      </div>
    </footer>
  );
}
