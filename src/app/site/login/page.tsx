import type { Metadata } from "next";
import { SERVER_INFO } from "@/config/server-info";

import { LoginForm } from "@/components/auth/login/LoginForm";

export const metadata: Metadata = {
  title: `Acessar Conta — ${SERVER_INFO.serverName}`,
  description: "Faça login para gerenciar seus personagens, doações e acessar o painel exclusivo.",
};

export default function LoginPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center py-16 md:py-24">
      {/* Container principal com estética dark imersiva e borda dourada sutil */}
      <div className="container-content w-full max-w-md rounded-xl p-8">
        <div className="mb-8 text-center">
          {/* Logo ou Título estilizado em Cinzel */}
          <span className="font-serif text-xs uppercase tracking-[0.3em] text-brand-logo">
            {SERVER_INFO.serverName}
          </span>
          <h1 className="text-fluid-h1 uppercase text-text-h1-content">
            Acessar Conta
          </h1>
          <p className="mt-2 text-sm text-muted">
            Insira suas credenciais para entrar no {SERVER_INFO.serverName}
          </p>
        </div>

        {/* Componente Client-side do Formulário */}
        <LoginForm />
      </div>
    </div>
  );
}
