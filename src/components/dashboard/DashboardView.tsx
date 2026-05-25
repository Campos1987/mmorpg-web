"use client";

import { CharacterPanel } from "./CharacterPanel";
import { WalletPanel } from "./WalletPanel";
import { AchievementsPanel } from "./AchievementsPanel";
import { ChallengesPanel } from "./ChallengesPanel";
import { CalendarPanel } from "./CalendarPanel";
import { RankingsPanel } from "./RankingsPanel";

import type { DashboardMockData } from "@/types/dashboard";

type DashboardViewProps = {
  data: DashboardMockData;
};

export function DashboardView({ data: _data }: DashboardViewProps) {
  return (
    <div className="container-content py-8 md:py-12 flex-1 flex flex-col justify-center">
      {/* Bento Grid Principal */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-stretch">
        
        {/* Coluna da Esquerda (Perfil e Status) */}
        <div className="lg:col-span-3 h-full">
          <CharacterPanel />
        </div>

        {/* Coluna do Meio (Economia, Conquistas, Desafios) */}
        <div className="flex flex-col gap-6 lg:col-span-5 justify-between">
          <WalletPanel />
          <AchievementsPanel />
          <ChallengesPanel />
        </div>

        {/* Coluna da Direita (Calendário de Eventos, Rankings) */}
        <div className="flex flex-col gap-6 lg:col-span-4 justify-between">
          <CalendarPanel />
          <RankingsPanel />
        </div>

      </div>
    </div>
  );
}
