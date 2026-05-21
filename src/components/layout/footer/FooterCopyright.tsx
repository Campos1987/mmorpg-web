import {
  FOOTER_BRAND_NAME,
  FOOTER_COPYRIGHT_NOTICE,
} from "@/config/footer-data";
import { cn } from "@/lib/utils";

/**
 * Faixa de copyright — ano calculado no servidor (RSC), sem hidratação client-side.
 */
export function FooterCopyright() {
  const currentYear = new Date().getFullYear();

  return (
    <div
      className={cn(
        "mt-10 border-t border-border pt-8",
        "text-center text-xs leading-relaxed text-muted",
      )}
    >
      <p>
        ©{currentYear} {FOOTER_BRAND_NAME}. {FOOTER_COPYRIGHT_NOTICE}
      </p>
    </div>
  );
}
