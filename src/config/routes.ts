/**
 * Rotas da aplicação — camada de configuração, desacoplada da UI.
 * Placeholders alinhados à estrutura de navegação da Top Bar; ajustar quando as páginas existirem.
 */
export const ROUTES = {
  HOME: "/",
  DOWNLOADS: "/downloads",
  RULES: "/regras",
  DONATIONS: "/doacoes",
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/registro",
  },
  INFO: {
    SYSTEMS: "/informacoes/sistemas",
    ITEMS: "/informacoes/itens",
    SKILLS: "/informacoes/habilidades",
    LIFE_STONE: "/informacoes/life-stone",
    COINS: "/informacoes/moedas",
  },
  COMMUNITY: {
    OLYMPIAD: "/comunidade/olimpiada",
    SIEGE: "/comunidade/siege",
    CLAN: "/comunidade/cla",
  },
  RANKINGS: {
    TOP_PVP: "/rankings/pvp",
    TOP_PK: "/rankings/pk",
    TOP_CLAN: "/rankings/clan",
  },
} as const;

type RouteValue<T> = T extends string
  ? T
  : T extends Record<string, infer U>
    ? RouteValue<U>
    : never;

/** Caminho interno válido para links de navegação. */
export type AppRoute = RouteValue<typeof ROUTES>;
