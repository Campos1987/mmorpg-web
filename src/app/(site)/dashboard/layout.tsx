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
      <div className="container-content py-8 md:py-12 md:my-[50px] rounded-xl">
        {children}
      </div>
    </div>
  );
}
