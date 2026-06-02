import type { Metadata } from "next";
import Link from "next/link";

import { RegisterForm } from "@/components/auth/register/RegisterForm";
import { ROUTES } from "@/config/routes";
import { SERVER_INFO } from "@/config/server-info";

export const metadata: Metadata = {
  title: `Registro — ${SERVER_INFO.serverName}`,
  description: `Crie sua conta no ${SERVER_INFO.serverName}`,
};

export default function RegisterPage() {
  return (
    <div className="container-content w-full max-w-md rounded-xl p-8">
      <div className="w-full max-w-lg">
        <header className="mb-8 text-center">
          <h1 className="text-fluid-h1 uppercase text-text-h1-content">
            Crie sua conta {SERVER_INFO.serverName}
          </h1>
          <p className="mt-2 text-sm text-muted">
            Preencha os dados abaixo para se registrar no servidor {SERVER_INFO.serverName}.
          </p>
        </header>

        <RegisterForm />

        <p className="mt-6 text-center text-sm text-muted">
          <Link
            href={ROUTES.HOME}
            className="focus-ring text-brand-logo hover:text-brand-logo-hover"
          >
            Voltar para a página inicial
          </Link>
        </p>
      </div>
    </div>
  );
}
