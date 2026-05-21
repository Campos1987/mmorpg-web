import {
  FOOTER_EXTERNAL_LINK_REL,
  FOOTER_EXTERNAL_LINK_TARGET,
} from "@/config/footer-data";
import { FooterSocialIcon } from "@/components/layout/footer/FooterSocialIcon";
import type { FooterSocialLink as FooterSocialLinkItem } from "@/types/footer";
import { cn } from "@/lib/utils";

type FooterSocialLinkProps = {
  readonly link: FooterSocialLinkItem;
};

/**
 * Link externo de rede social — `<a>` nativo (URL absoluta, fora do App Router).
 */
export function FooterSocialLink({ link }: FooterSocialLinkProps) {
  return (
    <a
      href={link.href}
      target={FOOTER_EXTERNAL_LINK_TARGET}
      rel={FOOTER_EXTERNAL_LINK_REL}
      aria-label={link.label}
      className={cn(
        "focus-ring inline-flex min-h-12 min-w-12 items-center justify-center rounded-md",
        "text-muted transition-colors hover:text-brand-gold",
      )}
    >
      <FooterSocialIcon icon={link.icon} />
    </a>
  );
}
