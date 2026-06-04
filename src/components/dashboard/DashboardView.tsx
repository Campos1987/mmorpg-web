"use client";

import { useState, useEffect } from "react";

import { AccountHeader } from "./account";
import { CharacterPanel } from "./character";
import { findCharacterAction } from "@/actions/gamer-account-actions";
import type { DashboardMockData, Character } from "@/types/dashboard";

type DashboardViewProps = {
  data: DashboardMockData;
  initialCharacter: Character | null;
};

export function DashboardView({ data, initialCharacter }: DashboardViewProps) {
  const defaultAccountId = data.subAccounts[0]?.id ?? "";
  const [selectedSubAccountId, setSelectedSubAccountId] =
    useState<string>(defaultAccountId);
  const [activeCharIndex, setActiveCharIndex] = useState<number>(0);
  const [activeCharDetails, setActiveCharDetails] = useState<Character | null>(
    initialCharacter,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Reset character index when sub-account changes
  const handleSubAccountChange = (id: string) => {
    setSelectedSubAccountId(id);
    setActiveCharIndex(0);
  };

  // Obter a sub-conta selecionada para extrair a lista de personagens
  const selectedSubAccount = data.subAccounts.find(
    (acc) => acc.id === selectedSubAccountId,
  ) || data.subAccounts[0];

  const subAccountCharacters = selectedSubAccount?.characters ?? [];

  // Buscar detalhes do personagem via server action quando o ID do personagem selecionado mudar
  const activeCharBasic = subAccountCharacters[activeCharIndex];
  const activeCharId = activeCharBasic?.id;

  useEffect(() => {
    if (!activeCharId) {
      setActiveCharDetails(null);
      return;
    }

    // Se o detalhe ativo já for o do personagem selecionado, evita requisição duplicada
    if (activeCharDetails?.id === activeCharId) return;

    let isMounted = true;
    setIsLoading(true);

    findCharacterAction(activeCharId)
      .then((details) => {
        if (isMounted) {
          setActiveCharDetails(details);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error("[DashboardView] Erro ao buscar detalhes do personagem:", err);
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [activeCharId, activeCharDetails?.id]);

  const handleNextCharacter = () => {
    if (subAccountCharacters.length <= 1) return;
    setActiveCharIndex((prev) => (prev + 1) % subAccountCharacters.length);
  };

  const handlePrevCharacter = () => {
    if (subAccountCharacters.length <= 1) return;
    setActiveCharIndex(
      (prev) => (prev - 1 + subAccountCharacters.length) % subAccountCharacters.length,
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
      {activeCharDetails && (
        <CharacterPanel
          character={activeCharDetails}
          onNext={handleNextCharacter}
          onPrev={handlePrevCharacter}
          hasMultipleCharacters={subAccountCharacters.length > 1}
          isLoading={isLoading}
        />
      )}
    </main>
  );
}
