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
        "mx-auto w-full max-w-3xl",
        "px-0 text-center text-xs leading-relaxed text-muted",
        "sm:px-[var(--spacing-container)]",
      )}
    >
      <p className="text-pretty">
        ©{currentYear} {FOOTER_BRAND_NAME}. {FOOTER_COPYRIGHT_NOTICE}
      </p>
    </div>
  );
}
