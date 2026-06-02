import type { Metadata } from "next";
import Link from "next/link";
import { MailCheck, ArrowLeft, Clock } from "lucide-react";
import { ROUTES } from "@/config/routes";
import { SERVER_INFO } from "@/config/server-info";

export const metadata: Metadata = {
  title: `Conta Pendente de Ativação | ${SERVER_INFO.serverName}`,
  description: "Sua conta ainda não foi ativada. Verifique seu e-mail para concluir o cadastro.",
};

export default function ContaPendentePage() {
  return (
    <div className="container-content flex min-h-[70vh] w-full max-w-md items-center justify-center rounded-xl p-8 py-16">
      {/* Card principal */}
      <div
        className="relative overflow-hidden"
        role="alert"
        aria-labelledby="pending-title"
        aria-describedby="pending-desc"
      >

        {/* Ícone de status */}
        <div className="mb-6 flex justify-center">
          <div className="relative flex size-20 items-center justify-center rounded-full border border-amber-600/50 bg-amber-950/60 shadow-lg shadow-amber-950/60">
            <Clock className="size-9 text-amber-400" aria-hidden="true" />
          </div>
        </div>

        {/* Badge de severidade */}
        <div className="mb-4 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-700/40 bg-amber-950/60 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-amber-400">
            <span className="size-1.5 animate-pulse rounded-full bg-amber-500" aria-hidden="true" />
            Ativação Pendente
          </span>
        </div>

        {/* Título */}
        <h1
          id="pending-title"
          className="mb-3 text-center font-serif text-2xl font-bold tracking-wide text-amber-300"
        >
          Conta Pendente
        </h1>

        {/* Descrição */}
        <p id="pending-desc" className="mb-2 text-center text-sm leading-relaxed text-slate-300">
          Sua conta no <strong className="text-amber-400">{SERVER_INFO.serverName}</strong> foi{" "}
          criada, mas ainda <strong>não foi ativada</strong>.
        </p>
        <p className="mb-6 text-center text-sm leading-relaxed text-slate-400">
          Verifique sua caixa de entrada (e o spam) e clique no link de
          ativação que enviamos por e-mail para liberar o acesso.
        </p>

        {/* Divisor */}
        <div className="mb-6 h-px bg-gradient-to-r from-transparent via-amber-900/50 to-transparent" aria-hidden="true" />

        {/* Links de referência */}
        <div className="mb-6 flex flex-col gap-2 text-center text-xs text-slate-500">
          <span>Não recebeu o e-mail? Entre em contato com o suporte:</span>
          <Link
            href={ROUTES.SUPPORT}
            className="focus-ring text-amber-400/70 underline underline-offset-2 hover:text-amber-300"
          >
            Falar com o suporte
          </Link>
        </div>

        {/* Ações */}
        <div className="flex flex-col gap-3">
          <Link
            href={ROUTES.SUPPORT}
            className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-lg border border-amber-700/50 bg-amber-900/20 px-5 py-2.5 text-sm font-semibold text-amber-300 transition-colors hover:bg-amber-900/40"
          >
            <MailCheck className="size-4" aria-hidden="true" />
            Contatar Suporte
          </Link>
          <Link
            href={ROUTES.AUTH.LOGIN}
            className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm text-slate-400 transition-colors hover:text-slate-200"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Voltar ao login
          </Link>
        </div>
      </div>
    </div>
  );
}
