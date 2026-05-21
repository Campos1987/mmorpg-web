import { ROUTES } from "@/config/routes";

export type DashboardNavItem = {
  id: string;
  label: string;
  href: string;
};

export const DASHBOARD_NAV_ITEMS: DashboardNavItem[] = [
  { id: "home", label: "Início", href: ROUTES.DASHBOARD.ROOT },
  { id: "profile", label: "Perfil", href: ROUTES.DASHBOARD.PROFILE },
  { id: "market", label: "Mercado", href: ROUTES.DASHBOARD.MARKET },
  { id: "guild", label: "Guilda", href: ROUTES.DASHBOARD.GUILD },
  { id: "settings", label: "Configurações", href: ROUTES.DASHBOARD.SETTINGS },
];

export const DASHBOARD_ACTIVE_NAV_ID = "home";
