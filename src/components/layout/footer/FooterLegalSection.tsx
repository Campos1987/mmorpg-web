import { FOOTER_LEGAL_LINKS, FOOTER_SECTIONS } from "@/config/footer-data";
import { FooterLink } from "@/components/layout/footer/FooterLink";
import { FooterSection } from "@/components/layout/footer/FooterSection";

/**
 * Área legal — links internos tipados via `ROUTES.LEGAL.*`.
 * Preferências de Cookies aponta para `/legal/cookies` (placeholder) até CMP na Fase futura.
 */
export function FooterLegalSection() {
  return (
    <FooterSection
      sectionId={FOOTER_SECTIONS.legal.id}
      heading={FOOTER_SECTIONS.legal.heading}
    >
      <ul className="flex flex-col gap-1">
        {FOOTER_LEGAL_LINKS.map((link) => (
          <li key={link.href}>
            <FooterLink link={link} />
          </li>
        ))}
      </ul>
    </FooterSection>
  );
}
