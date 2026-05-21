"use client";

import { useCallback, useMemo, useState } from "react";

import { AccountHeader } from "@/components/dashboard/account";
import { ActivityDashboard } from "@/components/dashboard/activity";
import { CharacterCarousel } from "@/components/dashboard/character";
import { DashboardNavbar } from "@/components/dashboard/navbar";
import { getCharactersBySubAccount } from "@/mocks/dashboard-mock-data";
import type { DashboardMockData } from "@/types/dashboard";

type DashboardViewProps = {
  data: DashboardMockData;
};

export function DashboardView({ data }: DashboardViewProps) {
  const [selectedSubAccountId, setSelectedSubAccountId] = useState(
    data.subAccounts[0]?.id ?? "",
  );

  const visibleCharacters = useMemo(
    () => getCharactersBySubAccount(selectedSubAccountId, data.characters),
    [selectedSubAccountId, data.characters],
  );

  const [activeCharacterId, setActiveCharacterId] = useState<string | null>(
    () => visibleCharacters[0]?.id ?? null,
  );

  const handleSubAccountChange = useCallback(
    (subAccountId: string) => {
      setSelectedSubAccountId(subAccountId);
      const nextCharacters = getCharactersBySubAccount(subAccountId, data.characters);
      setActiveCharacterId(nextCharacters[0]?.id ?? null);
    },
    [data.characters],
  );

  const handleCharacterSelect = useCallback((characterId: string) => {
    setActiveCharacterId(characterId);
  }, []);

  return (
    <>
      <DashboardNavbar user={data.user} />
      <AccountHeader
        subAccounts={data.subAccounts}
        selectedSubAccountId={selectedSubAccountId}
        onSubAccountChange={handleSubAccountChange}
        currencies={data.currencies}
      />
      <CharacterCarousel
        characters={visibleCharacters}
        activeCharacterId={activeCharacterId}
        onCharacterSelect={handleCharacterSelect}
      />
      <ActivityDashboard
        dailyQuests={data.dailyQuests}
        weeklyChallenges={data.weeklyChallenges}
        nextEvent={data.nextEvent}
        achievements={data.achievements}
      />
    </>
  );
}
