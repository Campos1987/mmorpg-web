import type { Metadata } from "next";

import { LoginForm } from "@/components/auth/login/LoginForm";

export const metadata: Metadata = {
  title: "Acessar Conta — Portal MMORPG",
  description: "Faça login para gerenciar seus personagens, doações e acessar o painel exclusivo.",
};

export default function LoginPage() {
  return (
    <div className="container-content flex flex-1 flex-col items-center justify-center py-16 md:py-24">
      {/* Container principal com estética dark imersiva e borda dourada sutil */}
      <div className="container-bg w-full max-w-md rounded-xl border border-brand-gold/15 bg-brand-card/75 p-8 shadow-2xl shadow-black/85 backdrop-blur-md">
        <div className="mb-8 text-center">
          {/* Logo ou Título estilizado em Cinzel */}
          <span className="font-serif text-xs uppercase tracking-[0.3em] text-brand-logo">
            Grankain Platform
          </span>
          <h1 className="mt-2 font-serif text-fluid-h2 font-bold tracking-wide text-foreground">
            Acessar Conta
          </h1>
          <p className="mt-2 text-sm text-muted">
            Insira suas credenciais para entrar no portal
          </p>
        </div>

        {/* Componente Client-side do Formulário */}
        <LoginForm />
      </div>
    </div>
  );
}
