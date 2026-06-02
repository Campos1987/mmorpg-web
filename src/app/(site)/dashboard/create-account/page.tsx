import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { CreateAccountForm } from "@/components/dashboard/create-account/CreateAccountForm";
import { SERVER_INFO } from "@/config/server-info";

export const metadata: Metadata = {
  title: `Criar Conta de Jogo | ${SERVER_INFO.serverName}`,
  description: `Crie sua conta de jogo no ${SERVER_INFO.serverName} e acesse rankings, personagens e eventos exclusivos.`,
};

/**
 * Página de criação de Gamer Account — Server Component (RSC).
 *
 * TODO: integrar com POST /gamer/account quando o endpoint estiver disponível.
 * O formulário já está preparado para receber um Server Action via `startTransition`.
 */
export default function CreateAccountPage() {
  return (
    <main aria-label="Criar conta de jogo" className="container-content w-full max-w-7xl mx-auto flex flex-1 flex-col py-12 px-4 sm:px-6 lg:px-8">

      {/* ── Cabeçalho ─────────────────────────────────────────────────────── */}
      <header className="mb-2">
        <Link
          href="/dashboard"
          className="focus-ring inline-flex items-center gap-2 text-xs text-dashboard-muted transition-dashboard hover:text-foreground"
          aria-label="Voltar para o painel"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          Voltar para o painel
        </Link>
      </header>

      {/* ── Formulário (Client Component) ─────────────────────────────────── */}
      <CreateAccountForm />

    </main>
  );
}
