import type { AppRoute } from "@/config/routes";

/** Identificador de ícone para redes sociais no rodapé (Fase 4+). */
export type FooterSocialIconId = "discord" | "reddit";

/** Link interno — navegação dentro do portal via `AppRoute`. */
export type FooterInternalLink = {
  readonly kind: "internal";
  readonly label: string;
  readonly href: AppRoute;
};

/** Link externo — URL absoluta (comunidade, fóruns). */
export type FooterExternalLink = {
  readonly kind: "external";
  readonly label: string;
  readonly href: string;
  readonly isExternal: true;
};

/** Item de rede social — extensão de link externo com ícone acessível. */
export type FooterSocialLink = FooterExternalLink & {
  readonly icon: FooterSocialIconId;
};

export type FooterLinkItem = FooterInternalLink | FooterExternalLink;

export function isFooterInternalLink(
  item: FooterLinkItem,
): item is FooterInternalLink {
  return item.kind === "internal";
}

export function isFooterExternalLink(
  item: FooterLinkItem,
): item is FooterExternalLink {
  return item.kind === "external";
}

export function isFooterSocialLink(item: FooterLinkItem): item is FooterSocialLink {
  return item.kind === "external" && "icon" in item;
}
