import { FOOTER_SECTIONS, FOOTER_SOCIAL_LINKS } from "@/config/footer-data";
import { FooterSection } from "@/components/layout/footer/FooterSection";
import { FooterSocialLink } from "@/components/layout/footer/FooterSocialLink";

export function FooterSocialSection() {
  return (
    <FooterSection
      sectionId={FOOTER_SECTIONS.social.id}
      heading={FOOTER_SECTIONS.social.heading}
    >
      <ul className="flex flex-wrap gap-2">
        {FOOTER_SOCIAL_LINKS.map((link) => (
          <li key={link.icon}>
            <FooterSocialLink link={link} />
          </li>
        ))}
      </ul>
    </FooterSection>
  );
}
