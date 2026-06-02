import type { DashboardMockData } from "@/types/dashboard";

const ASSETS = {
  avatar: "/assets/dashboard/avatars/user.svg",
  warrior: "/assets/dashboard/characters/warrior.svg",
  mage: "/assets/dashboard/characters/mage.svg",
  archer: "/assets/dashboard/characters/archer.svg",
  siegeBanner: "/assets/dashboard/events/siege-banner.svg",
} as const;

export const dashboardMockData: DashboardMockData = {
  user: {
    id: "user-1",
    displayName: "Alex",
    level: 92,
    avatarSrc: ASSETS.avatar,
    connectionStatus: "online",
    unreadNotifications: 3,
  },
  subAccounts: [
    {
      id: "sub-1",
      nickname: "NightCrawler",
      className: "Guerreiro",
      level: 85,
      characterCount: 2,
      characters: [
        { name: "NightCrawler", level: 85 },
        { name: "IronWall", level: 80 },
      ],
    },
    {
      id: "sub-2",
      nickname: "MoonBlade",
      className: "Arqueiro",
      level: 78,
      characterCount: 1,
      characters: [
        { name: "MoonBlade", level: 78 },
      ],
    },
    {
      id: "sub-3",
      nickname: "ArcaneSoul",
      className: "Mago",
      level: 82,
      characterCount: 1,
      characters: [
        { name: "ArcaneSoul", level: 82 },
      ],
    },
  ],
  characters: [
    {
      id: "char-1",
      subAccountId: "sub-1",
      name: "NightCrawler",
      className: "Guerreiro",
      level: 85,
      statusLabel: "Ativo",
      isOnline: true,
      imageSrc: ASSETS.warrior,
      stats: {
        hp: { current: 8420, max: 9200 },
        mp: { current: 1200, max: 2100 },
        xpPercent: 67,
        equipmentScore: 2847,
        activeQuests: { current: 3, total: 5 },
        guildName: "Dragon Slayers",
        equipmentSummary: "Set Dynasty +6",
      },
    },
    {
      id: "char-2",
      subAccountId: "sub-1",
      name: "IronWall",
      className: "Paladino",
      level: 80,
      statusLabel: "Inativo",
      isOnline: false,
      imageSrc: ASSETS.warrior,
      stats: {
        hp: { current: 7100, max: 8800 },
        mp: { current: 900, max: 1800 },
        xpPercent: 42,
        equipmentScore: 2100,
        activeQuests: { current: 1, total: 5 },
        guildName: "Dragon Slayers",
        equipmentSummary: "Set Vesper",
      },
    },
    {
      id: "char-3",
      subAccountId: "sub-2",
      name: "MoonBlade",
      className: "Arqueiro",
      level: 78,
      statusLabel: "Ativo",
      isOnline: true,
      imageSrc: ASSETS.archer,
      stats: {
        hp: { current: 5200, max: 6100 },
        mp: { current: 3400, max: 4000 },
        xpPercent: 88,
        equipmentScore: 2650,
        activeQuests: { current: 5, total: 5 },
        guildName: "Silver Arrows",
        equipmentSummary: "Bow Icarus +12",
      },
    },
    {
      id: "char-4",
      subAccountId: "sub-3",
      name: "ArcaneSoul",
      className: "Mago",
      level: 82,
      statusLabel: "Ativo",
      isOnline: true,
      imageSrc: ASSETS.mage,
      stats: {
        hp: { current: 3100, max: 4500 },
        mp: { current: 8900, max: 9200 },
        xpPercent: 95,
        equipmentScore: 3010,
        activeQuests: { current: 4, total: 5 },
        guildName: "Mystic Order",
        equipmentSummary: "Robe Moirai +8",
      },
    },
  ],
  currencies: {
    gold: 12_450_800,
    diamonds: 3_420,
  },
  dailyQuests: [
    {
      id: "dq-1",
      label: "PvP",
      icon: "⚔️",
      borderColor: "border-dashboard-danger",
      completed: true,
    },
    {
      id: "dq-2",
      label: "Raid",
      icon: "🏰",
      borderColor: "border-dashboard-neon-blue",
      completed: true,
    },
    {
      id: "dq-3",
      label: "Farm",
      icon: "🌿",
      borderColor: "border-dashboard-neon-purple",
      completed: false,
    },
    {
      id: "dq-4",
      label: "Trade",
      icon: "💰",
      borderColor: "border-dashboard-gold",
      completed: false,
    },
  ],
  weeklyChallenges: [
    {
      id: "wc-1",
      name: "Incursões",
      icon: "🗡️",
      progress: { current: 9, total: 10 },
      barVariant: "blue",
    },
    {
      id: "wc-2",
      name: "PvP",
      icon: "🛡️",
      progress: { current: 24, total: 30 },
      barVariant: "purple",
    },
    {
      id: "wc-3",
      name: "Bosses",
      icon: "👹",
      progress: { current: 2, total: 5 },
      barVariant: "blue",
    },
  ],
  nextEvent: {
    id: "event-1",
    title: "Castle Siege — Aden",
    dateLabel: "Domingo, 25 Mai",
    timeLabel: "20:00 BRT",
    bannerSrc: ASSETS.siegeBanner,
  },
  achievements: [
    {
      id: "ach-1",
      title: "Matador de Dragões",
      icon: "🐉",
      status: "unlocked",
    },
    {
      id: "ach-2",
      title: "Campeão da Olimpíada",
      icon: "🏆",
      status: "unlocked",
    },
    {
      id: "ach-3",
      title: "Lorde dos Castelos",
      icon: "🏰",
      status: "locked",
    },
  ],
};

/** Filtra personagens pela sub-conta selecionada. */
export function getCharactersBySubAccount(
  subAccountId: string,
  characters = dashboardMockData.characters,
) {
  return characters.filter((c) => c.subAccountId === subAccountId);
}
