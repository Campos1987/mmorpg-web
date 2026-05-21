import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Painel do Jogador | Portal MMORPG",
  description: "Gerencie personagens, missões e progresso da sua conta",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="dashboard-surface flex flex-1 flex-col text-white">
      {children}
    </div>
  );
}
