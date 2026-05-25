import { FOOTER_EXTERNAL_LINKS } from "@/config/footer-links";
import { ROUTES } from "@/config/routes";
import type {
  FooterInternalLink,
  FooterSocialLink,
} from "@/types/footer";

/**
 * Atributos HTML para links externos do rodapé (comunidade).
 * Aplicar em `<a>` na Fase 4+; não armazenar segredos neste módulo.
 */
export const FOOTER_EXTERNAL_LINK_TARGET = "_blank" as const;
export const FOOTER_EXTERNAL_LINK_REL = "noopener noreferrer" as const;

/** Nome exibido na faixa de copyright do rodapé. */
export const FOOTER_BRAND_NAME = "Portal MMORPG" as const;

/**
 * Menção a marcas registradas — texto configurável sem alterar componentes.
 * Complementa o ano dinâmico renderizado em `FooterCopyright`.
 */
export const FOOTER_COPYRIGHT_NOTICE =
  "Lineage II é marca registrada da NCsoft Corporation. Os logotipos da família \"PS\", \"PS5\", \"Xbox Series X|S\", \"Xbox\" e \"Steam\" são marcas registradas ou comerciais de seus respectivos proprietários. Todos os direitos reservados." as const;

/**
 * Metadados por coluna — `id` estável para `aria-labelledby` / `id` do heading.
 */
export const FOOTER_SECTIONS = {
  social: {
    id: "footer-section-social",
    heading: "Comunidade",
  },
  quickLinks: {
    id: "footer-section-quick-links",
    heading: "Atalhos",
  },
  legal: {
    id: "footer-section-legal",
    heading: "Legal",
  },
} as const;

export type FooterSectionKey = keyof typeof FOOTER_SECTIONS;

/** Títulos por seção — derivado de `FOOTER_SECTIONS` para uso direto em headings. */
export const FOOTER_SECTION_HEADINGS = {
  social: FOOTER_SECTIONS.social.heading,
  quickLinks: FOOTER_SECTIONS.quickLinks.heading,
  legal: FOOTER_SECTIONS.legal.heading,
} as const satisfies Record<FooterSectionKey, string>;

/**
 * Redes sociais e comunidade — URLs públicas via `FOOTER_EXTERNAL_LINKS`.
 */
export const FOOTER_SOCIAL_LINKS = [
  {
    kind: "external",
    label: "Discord",
    href: FOOTER_EXTERNAL_LINKS.DISCORD,
    isExternal: true,
    icon: "discord",
  },
  {
    kind: "external",
    label: "Twitch",
    href: FOOTER_EXTERNAL_LINKS.TWITCH,
    isExternal: true,
    icon: "twitch",
  },
  {
    kind: "external",
    label: "X",
    href: FOOTER_EXTERNAL_LINKS.X,
    isExternal: true,
    icon: "x",
  },
  {
    kind: "external",
    label: "Facebook",
    href: FOOTER_EXTERNAL_LINKS.FACEBOOK,
    isExternal: true,
    icon: "facebook",
  },
  {
    kind: "external",
    label: "YouTube",
    href: FOOTER_EXTERNAL_LINKS.YOUTUBE,
    isExternal: true,
    icon: "youtube",
  },
  {
    kind: "external",
    label: "Instagram",
    href: FOOTER_EXTERNAL_LINKS.INSTAGRAM,
    isExternal: true,
    icon: "instagram",
  },
  {
    kind: "external",
    label: "TikTok",
    href: FOOTER_EXTERNAL_LINKS.TIKTOK,
    isExternal: true,
    icon: "tiktok",
  },
] as const satisfies readonly FooterSocialLink[];

/**
 * Atalhos rápidos — páginas cruciais do portal.
 */
export const FOOTER_QUICK_LINKS = [
  {
    kind: "internal",
    label: "Downloads",
    href: ROUTES.DOWNLOADS,
  },
  {
    kind: "internal",
    label: "Regras",
    href: ROUTES.RULES,
  },
  {
    kind: "internal",
    label: "Suporte",
    href: ROUTES.SUPPORT,
  },
] as const satisfies readonly FooterInternalLink[];

/**
 * Área legal e conformidade.
 */
export const FOOTER_LEGAL_LINKS = [
  {
    kind: "internal",
    label: "EULA",
    href: ROUTES.LEGAL.EULA,
  },
  {
    kind: "internal",
    label: "Aviso de Privacidade",
    href: ROUTES.LEGAL.PRIVACY,
  },
  {
    kind: "internal",
    label: "Termos de Uso",
    href: ROUTES.LEGAL.TERMS,
  },
  {
    kind: "internal",
    label: "Preferências de Cookies",
    href: ROUTES.LEGAL.COOKIES,
  },
] as const satisfies readonly FooterInternalLink[];
