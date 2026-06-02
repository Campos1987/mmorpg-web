import type { Metadata } from "next";
import { SERVER_INFO } from "@/config/server-info";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: `Painel do Jogador | ${SERVER_INFO.serverName}`,
  description: "Gerencie personagens, missões e progresso da sua conta",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={cn("dashboard-surface",
      "flex flex-1 flex-col")}>
      {children}
    </div>
  );
}
