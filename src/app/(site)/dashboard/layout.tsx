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
    <div className="flex flex-1 flex-col bg-brand-dark text-foreground">
      {children}
    </div>
  );
}
