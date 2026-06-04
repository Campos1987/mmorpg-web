export type ConnectionStatus = "online" | "offline" | "away";

export type ProgressFraction = {
  current: number;
  total: number;
};

export type CharacterCardState = {
  isActive: boolean;
};

export type SubAccount = {
  id: string;
  nickname: string;
  className: string;
  level: number;
  characterCount?: number;
  characters?: { name: string; level: number }[];
};

export type CharacterStats = {
  cp: { current: number; max: number };
  hp: { current: number; max: number };
  mp: { current: number; max: number };
  xpPercent: number;
  equipmentScore: number;
  activeQuests: ProgressFraction;
  guildName: string;
  equipmentSummary: string;
};

export type Character = {
  id: string;
  subAccountId: string;
  name: string;
  className: string;
  classId?: number;
  level: number;
  statusLabel: string;
  isOnline: boolean;
  imageSrc: string;
  stats: CharacterStats;
};

export type CurrencyBalance = {
  gold: number;
  diamonds: number;
};

export type DashboardUser = {
  id: string;
  displayName: string;
  level: number;
  avatarSrc: string;
  connectionStatus: ConnectionStatus;
  unreadNotifications: number;
};

export type DailyQuest = {
  id: string;
  label: string;
  icon: string;
  borderColor: string;
  completed: boolean;
};

export type WeeklyChallenge = {
  id: string;
  name: string;
  icon: string;
  progress: ProgressFraction;
  barVariant: "blue" | "purple";
};

export type GameEvent = {
  id: string;
  title: string;
  dateLabel: string;
  timeLabel: string;
  bannerSrc: string;
};

export type Achievement = {
  id: string;
  title: string;
  icon: string;
  status: "locked" | "unlocked";
};

export type DashboardMockData = {
  user: DashboardUser;
  subAccounts: SubAccount[];
  characters: Character[];
  currencies: CurrencyBalance;
  dailyQuests: DailyQuest[];
  weeklyChallenges: WeeklyChallenge[];
  nextEvent: GameEvent;
  achievements: Achievement[];
};
