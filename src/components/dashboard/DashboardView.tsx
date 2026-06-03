"use client";

import { useState } from "react";

import { AccountHeader } from "./account";
import { CharacterPanel } from "./character";
import type { DashboardMockData } from "@/types/dashboard";

type DashboardViewProps = {
  data: DashboardMockData;
};

export function DashboardView({ data }: DashboardViewProps) {
  const defaultAccountId = data.subAccounts[0]?.id ?? "";
  const [selectedSubAccountId, setSelectedSubAccountId] =
    useState<string>(defaultAccountId);
  const [activeCharIndex, setActiveCharIndex] = useState<number>(0);

  // Reset character index when sub-account changes
  const handleSubAccountChange = (id: string) => {
    setSelectedSubAccountId(id);
    setActiveCharIndex(0);
  };

  // Filtrar personagens pertencentes à sub-conta selecionada
  const subAccountCharacters = data.characters.filter(
    (c) => c.subAccountId === selectedSubAccountId
  );

  // Fallback para todos os personagens caso a sub-conta não tenha nenhum (garante robustez)
  const displayCharacters =
    subAccountCharacters.length > 0 ? subAccountCharacters : data.characters;

  const safeIndex =
    activeCharIndex < displayCharacters.length ? activeCharIndex : 0;
  const activeCharacter = displayCharacters[safeIndex] ?? null;

  const handleNextCharacter = () => {
    if (displayCharacters.length <= 1) return;
    setActiveCharIndex((prev) => (prev + 1) % displayCharacters.length);
  };

  const handlePrevCharacter = () => {
    if (displayCharacters.length <= 1) return;
    setActiveCharIndex(
      (prev) => (prev - 1 + displayCharacters.length) % displayCharacters.length,
    );
  };

  return (
    <main
      aria-label="Painel do jogador"
      className="w-full max-w-7xl mx-auto flex flex-1 flex-col gap-6"
    >
      {/* ── Cabeçalho de conta: seletor de sub-contas + saldo ── */}
      <AccountHeader
        subAccounts={data.subAccounts}
        selectedSubAccountId={selectedSubAccountId}
        onSubAccountChange={handleSubAccountChange}
        currencies={data.currencies}
      />

      {/* ── Painel do personagem ativo: arte + barras CP / HP / MP ── */}
      {activeCharacter && (
        <CharacterPanel
          character={activeCharacter}
          onNext={handleNextCharacter}
          onPrev={handlePrevCharacter}
          hasMultipleCharacters={displayCharacters.length > 1}
        />
      )}
    </main>
  );
}
