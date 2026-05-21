import { FOOTER_QUICK_LINKS, FOOTER_SECTIONS } from "@/config/footer-data";
import { FooterLink } from "@/components/layout/footer/FooterLink";
import { FooterSection } from "@/components/layout/footer/FooterSection";

export function FooterQuickLinksSection() {
  return (
    <FooterSection
      sectionId={FOOTER_SECTIONS.quickLinks.id}
      heading={FOOTER_SECTIONS.quickLinks.heading}
    >
      <ul className="flex flex-col gap-1">
        {FOOTER_QUICK_LINKS.map((link) => (
          <li key={link.href}>
            <FooterLink link={link} />
          </li>
        ))}
      </ul>
    </FooterSection>
  );
}
