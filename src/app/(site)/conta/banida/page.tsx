import type { Metadata } from "next";
import Link from "next/link";
import { ShieldX, ArrowLeft, MailCheck } from "lucide-react";
import { ROUTES } from "@/config/routes";
import { SERVER_INFO } from "@/config/server-info";

export const metadata: Metadata = {
  title: `Conta Banida | ${SERVER_INFO.serverName}`,
  description: "Sua conta foi banida permanentemente. Entre em contato com o suporte para mais informações.",
};

export default function ContaBanidaPage() {
  return (
    <div className="container-content flex min-h-[70vh] w-full max-w-md items-center justify-center rounded-xl p-8 py-16">
      {/* Card principal */}
      <div
        className="relative overflow-hidden"
        role="alert"
        aria-labelledby="banned-title"
        aria-describedby="banned-desc"
      >

        {/* Ícone de status */}
        <div className="mb-6 flex justify-center">
          <div className="relative flex size-20 items-center justify-center rounded-full border border-red-700/50 bg-red-950/60 shadow-lg shadow-red-950/60">
            <ShieldX className="size-9 text-red-400" aria-hidden="true" />
          </div>
        </div>

        {/* Badge de severidade */}
        <div className="mb-4 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-red-700/40 bg-red-950/60 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-red-400">
            <span className="size-1.5 rounded-full bg-red-500" aria-hidden="true" />
            Banimento Permanente
          </span>
        </div>

        {/* Título */}
        <h1
          id="banned-title"
          className="mb-3 text-center font-serif text-2xl font-bold tracking-wide text-red-300"
        >
          Conta Banida
        </h1>

        {/* Descrição */}
        <p id="banned-desc" className="mb-2 text-center text-sm leading-relaxed text-slate-300">
          Sua conta no <strong className="text-red-400">{SERVER_INFO.serverName}</strong> foi{" "}
          <strong>banida permanentemente</strong> por violação dos Termos de
          Uso do servidor.
        </p>
        <p className="mb-6 text-center text-sm leading-relaxed text-slate-400">
          O acesso ao jogo e ao portal foi bloqueado. Se você acredita que
          isso foi um erro, entre em contato com nossa equipe de suporte.
        </p>

        {/* Divisor */}
        <div className="mb-6 h-px bg-gradient-to-r from-transparent via-red-900/50 to-transparent" aria-hidden="true" />

        {/* Links de referência */}
        <div className="mb-6 flex flex-col gap-2 text-center text-xs text-slate-500">
          <span>Consulte nossas regras para entender os motivos de banimento:</span>
          <Link
            href={ROUTES.RULES}
            className="focus-ring text-red-400/70 underline underline-offset-2 hover:text-red-300"
          >
            Regras do servidor
          </Link>
        </div>

        {/* Ações */}
        <div className="flex flex-col gap-3">
          <Link
            href={ROUTES.SUPPORT}
            className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-lg border border-red-700/50 bg-red-900/20 px-5 py-2.5 text-sm font-semibold text-red-300 transition-colors hover:bg-red-900/40"
          >
            <MailCheck className="size-4" aria-hidden="true" />
            Contatar Suporte
          </Link>
          <Link
            href={ROUTES.HOME}
            className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm text-slate-400 transition-colors hover:text-slate-200"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}
