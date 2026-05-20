import type { Metadata } from "next";
import Link from "next/link";

import { RegisterForm } from "@/components/auth/register/RegisterForm";
import { ROUTES } from "@/config/routes";

export const metadata: Metadata = {
  title: "Registro — Portal MMORPG",
  description: "Crie sua conta no portal do servidor Lineage II",
};

export default function RegisterPage() {
  return (
    <div className="container-content flex flex-1 flex-col items-center py-12">
      <div className="w-full max-w-lg">
        <header className="mb-8 text-center">
          <h1 className="font-serif text-fluid-h1 text-foreground">
            Criar conta
          </h1>
          <p className="mt-2 text-sm text-muted">
            Preencha os dados abaixo para se registrar no servidor.
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
