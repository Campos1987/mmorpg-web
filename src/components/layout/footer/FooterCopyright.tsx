import {
  FOOTER_BRAND_NAME,
  FOOTER_COPYRIGHT_NOTICE,
} from "@/config/footer-data";
import { SERVER_INFO } from "@/config/server-info";
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
        ©{SERVER_INFO.createdServer}-{currentYear} {FOOTER_BRAND_NAME}. {FOOTER_COPYRIGHT_NOTICE}
      </p>
    </div>
  );
}
