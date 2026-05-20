import type { AppRoute } from "@/config/routes";

/**
 * Folha de menu — sempre possui href; não aceita filhos (impede dropdowns aninhados).
 */
export type NavigationLeafItem = {
  readonly label: string;
  readonly href: AppRoute;
};

/** Item de navegação com link direto. */
export type NavigationLinkItem = NavigationLeafItem & {
  readonly kind: "link";
};

/** Item de navegação com submenu — filhos restritos a folhas com href. */
export type NavigationDropdownItem = {
  readonly kind: "dropdown";
  readonly label: string;
  readonly children: readonly NavigationLeafItem[];
};

export type NavigationItem = NavigationLinkItem | NavigationDropdownItem;

export function isNavigationLinkItem(
  item: NavigationItem,
): item is NavigationLinkItem {
  return item.kind === "link";
}

export function isNavigationDropdownItem(
  item: NavigationItem,
): item is NavigationDropdownItem {
  return item.kind === "dropdown";
}
