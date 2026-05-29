import Link from "next/link";

import { FooterAgeRating } from "@/components/layout/footer/FooterAgeRating";
import { FooterSocialLink } from "@/components/layout/footer/FooterSocialLink";
import { FOOTER_LEGAL_LINKS, FOOTER_SOCIAL_LINKS } from "@/config/footer-data";
import { cn } from "@/lib/utils";

/**
 * Rodapé global — Server Component (RSC), renderizado no `RootLayout`.
 * Layout reestruturado:
 * - Linha 1 (Grid): Classificação à esquerda, Nome do Servidor (L2GK) no centro, Redes Sociais à direita.
 * - Linha 2: Menu legal horizontal centralizado.
 * - Linha 3: Direitos autorais customizados.
 */
export function Footer() {
  return (
    <footer
      className={"footer-gradient-bg"}
    >

      <div className="w-2/3 py-10 md:py-12 w-max-[2560px] relative mx-auto px-4">
        {/* Linha Superior: Grid de 3 Colunas */}
        <div
          className={cn(
            "grid w-full grid-cols-1 items-center gap-8 text-center",
            "lg:grid-cols-3 lg:text-left",
          )}
        >
          {/* Coluna Esquerda: Classificação Indicativa */}
          <div className="flex items-center justify-center lg:justify-start">
            <FooterAgeRating rating="14" />
          </div>

          {/* Coluna Central: Nome do Servidor */}
          <div className="flex flex-col items-center justify-center text-center">
            <Link
              href="/"
              className="font-serif text-4xl font-bold tracking-[0.2em] text-brand-logo transition-colors hover:text-brand-logo-hover uppercase"
            >
              Portal
            </Link>
            <span className="text-sm tracking-[0.3em] uppercase text-muted mt-1">
              portal.com
            </span>
          </div>

          {/* Coluna Direita: Redes Sociais */}
          <div className="flex items-center justify-center lg:justify-end">
            <ul className="flex items-center gap-1" aria-label="Redes sociais e comunidade">
              {FOOTER_SOCIAL_LINKS.map((link) => (
                <li key={link.icon}>
                  <FooterSocialLink link={link} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Menu Legal (Horizontal e Centralizado) */}
        <div className="mt-10 border-t border-border/40 pt-8 flex justify-center">
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-semibold uppercase tracking-wider text-muted">
            {FOOTER_LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-brand-gold transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Direitos Autorais */}
        <div className="mt-6 text-center text-xs text-muted/60">
          <p>© 2026, portal.com. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
