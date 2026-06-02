"use client";

import { useState } from "react";

import { AccountHeader } from "./account";
import type { DashboardMockData } from "@/types/dashboard";

type DashboardViewProps = {
  data: DashboardMockData;
};

export function DashboardView({ data }: DashboardViewProps) {
  const defaultAccountId = data.subAccounts[0]?.id ?? "";
  const [selectedSubAccountId, setSelectedSubAccountId] =
    useState<string>(defaultAccountId);

  return (
    <main
      aria-label="Painel do jogador"
      className="w-full max-w-7xl mx-auto flex flex-1 flex-col gap-6 py-8 px-4 sm:px-6 lg:px-8"
    >
      {/* ── Cabeçalho de conta: seletor de sub-contas + saldo ── */}
      <AccountHeader
        subAccounts={data.subAccounts}
        selectedSubAccountId={selectedSubAccountId}
        onSubAccountChange={setSelectedSubAccountId}
        currencies={data.currencies}
      />
    </main>
  );
}
