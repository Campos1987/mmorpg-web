import { ROUTES } from "@/config/routes";
import type { NavigationItem } from "@/types/navigation";

/**
 * Estrutura estática da navegação principal (Top Bar).
 * Consumida por componentes de layout nas fases 3–6.
 */
export const MAIN_NAVIGATION: readonly NavigationItem[] = [
  {
    kind: "link",
    label: "Home",
    href: ROUTES.HOME,
  },
  {
    kind: "link",
    label: "Downloads",
    href: ROUTES.DOWNLOADS,
  },
  {
    kind: "dropdown",
    label: "Informações",
    children: [
      { label: "Sistemas", href: ROUTES.INFO.SYSTEMS },
      { label: "Itens", href: ROUTES.INFO.ITEMS },
      { label: "Habilidades", href: ROUTES.INFO.SKILLS },
      { label: "Life Stone", href: ROUTES.INFO.LIFE_STONE },
      { label: "Moedas", href: ROUTES.INFO.COINS },
    ],
  },
  {
    kind: "dropdown",
    label: "Comunidade & PvP",
    children: [
      { label: "Olimpíada", href: ROUTES.COMMUNITY.OLYMPIAD },
      { label: "Siege", href: ROUTES.COMMUNITY.SIEGE },
      { label: "Clã", href: ROUTES.COMMUNITY.CLAN },
    ],
  },
  {
    kind: "dropdown",
    label: "Rankings",
    children: [
      { label: "Top PvP", href: ROUTES.RANKINGS.TOP_PVP },
      { label: "Top PK", href: ROUTES.RANKINGS.TOP_PK },
      { label: "Top Clan", href: ROUTES.RANKINGS.TOP_CLAN },
    ],
  },
  {
    kind: "link",
    label: "Regras",
    href: ROUTES.RULES,
  },
  {
    kind: "link",
    label: "Doações",
    href: ROUTES.DONATIONS,
  },
] as const satisfies readonly NavigationItem[];
