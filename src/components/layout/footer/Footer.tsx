import { FooterCopyright } from "@/components/layout/footer/FooterCopyright";
import { FooterLegalSection } from "@/components/layout/footer/FooterLegalSection";
import { FooterQuickLinksSection } from "@/components/layout/footer/FooterQuickLinksSection";
import { FooterSocialSection } from "@/components/layout/footer/FooterSocialSection";
import { cn } from "@/lib/utils";

/** Rodapé global — Server Component (RSC). */
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
          <FooterLegalSection />
        </div>
        <FooterCopyright />
      </div>
    </footer>
  );
}
