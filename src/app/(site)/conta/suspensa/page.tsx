import type { Metadata } from "next";
import Link from "next/link";
import { ShieldAlert, ArrowLeft, MailCheck } from "lucide-react";
import { ROUTES } from "@/config/routes";
import { SERVER_INFO } from "@/config/server-info";

export const metadata: Metadata = {
  title: `Conta Suspensa | ${SERVER_INFO.serverName}`,
  description: "Sua conta foi suspensa temporariamente. Entre em contato com o suporte para mais informações.",
};

export default function ContaSuspensaPage() {
  return (
    <div className="container-content flex min-h-[70vh] w-full max-w-md items-center justify-center rounded-xl p-8 py-16">
      {/* Card principal */}
      <div
        className="relative overflow-hidden"
        role="alert"
        aria-labelledby="suspended-title"
        aria-describedby="suspended-desc"
      >

        {/* Ícone de status */}
        <div className="mb-6 flex justify-center">
          <div className="relative flex size-20 items-center justify-center rounded-full border border-orange-700/50 bg-orange-950/60 shadow-lg shadow-orange-950/60">
            <ShieldAlert className="size-9 text-orange-400" aria-hidden="true" />
          </div>
        </div>

        {/* Badge de severidade */}
        <div className="mb-4 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-700/40 bg-orange-950/60 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-orange-400">
            <span className="size-1.5 animate-pulse rounded-full bg-orange-500" aria-hidden="true" />
            Suspensão Temporária
          </span>
        </div>

        {/* Título */}
        <h1
          id="suspended-title"
          className="mb-3 text-center font-serif text-2xl font-bold tracking-wide text-orange-300"
        >
          Conta Suspensa
        </h1>

        {/* Descrição */}
        <p id="suspended-desc" className="mb-2 text-center text-sm leading-relaxed text-slate-300">
          Sua conta no <strong className="text-orange-400">{SERVER_INFO.serverName}</strong> está{" "}
          <strong>temporariamente suspensa</strong> por violação das regras de
          conduta do servidor.
        </p>
        <p className="mb-6 text-center text-sm leading-relaxed text-slate-400">
          Ao término do período de suspensão, seu acesso será restaurado
          automaticamente. Em caso de dúvidas, entre em contato com o suporte.
        </p>

        {/* Divisor */}
        <div className="mb-6 h-px bg-gradient-to-r from-transparent via-orange-900/50 to-transparent" aria-hidden="true" />

        {/* Links de referência */}
        <div className="mb-6 flex flex-col gap-2 text-center text-xs text-slate-500">
          <span>Lembre-se de seguir as regras ao retornar ao servidor:</span>
          <Link
            href={ROUTES.RULES}
            className="focus-ring text-orange-400/70 underline underline-offset-2 hover:text-orange-300"
          >
            Regras do servidor
          </Link>
        </div>

        {/* Ações */}
        <div className="flex flex-col gap-3">
          <Link
            href={ROUTES.SUPPORT}
            className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-lg border border-orange-700/50 bg-orange-900/20 px-5 py-2.5 text-sm font-semibold text-orange-300 transition-colors hover:bg-orange-900/40"
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
